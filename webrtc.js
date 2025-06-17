// webrtc.js - truyền giọng nói 2 chiều dùng Firebase, đã fix lỗi isCaller

// 1. Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDACFZgZazMOnjzmGM_lrKswVcsoTFHxA",
  authDomain: "veonline-3bcbf.firebaseapp.com",
  projectId: "veonline-3bcbf",
  storageBucket: "veonline-3bcbf.appspot.com",
  messagingSenderId: "83902304195",
  appId: "1:83902304195:web:2f9ec1ee0c23d6e21bb776"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const remoteAudio = document.getElementById("remoteAudio");
const micButton = document.getElementById("btnToggleMic");
const speakerButton = document.getElementById("btnToggleSpeaker");

let micEnabled = false;
let speakerEnabled = true;

let peer = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

console.log("🚀 WebRTC script bắt đầu...");

// Bắt đầu lấy mic
navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
  console.log("🎤 Đã truy cập được micro");

  stream.getAudioTracks()[0].enabled = false; // mic mặc định tắt
  stream.getTracks().forEach((track) => peer.addTrack(track, stream));

  peer.ontrack = (event) => {
    console.log("🔊 Nhận stream từ peer");
    remoteAudio.srcObject = event.streams[0];
  };

  const callDoc = db.collection("calls").doc("room-v1");
  const callSnapshot = await callDoc.get();

  let isCaller = false;

  if (!callSnapshot.exists) {
    isCaller = true;
    console.log("📞 Là người đầu tiên → tạo offer");
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await callDoc.set({ offer });

    callDoc.onSnapshot(async (snap) => {
      const data = snap.data();
      if (data.answer && !peer.currentRemoteDescription) {
        console.log("✅ Nhận answer từ peer");
        await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });
  } else {
    console.log("📞 Là người tham gia → nhận offer và tạo answer");
    const data = callSnapshot.data();
    await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    await callDoc.update({ answer });
  }

  // Đặt lại xử lý ICE sau khi có isCaller
  peer.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("📡 Gửi ICE Candidate");
      const candidatesCollection = isCaller
        ? callDoc.collection("callerCandidates")
        : callDoc.collection("calleeCandidates");
      candidatesCollection.add(event.candidate.toJSON());
    }
  };

  // Lắng nghe ICE candidate của bên kia
  const candidatesCollection = isCaller
    ? callDoc.collection("calleeCandidates")
    : callDoc.collection("callerCandidates");

  candidatesCollection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        await peer.addIceCandidate(candidate);
        console.log("🔁 Thêm ICE candidate từ peer");
      }
    });
  });

  // Toggle MIC
  micButton.onclick = () => {
    micEnabled = !micEnabled;
    stream.getAudioTracks()[0].enabled = micEnabled;
    console.log(micEnabled ? "🎙️ Mic BẬT" : "🎙️ Mic TẮT");
    micButton.textContent = micEnabled ? "🎙️ Mic đang bật" : "🎙️ Bật/Tắt Micro";
  };

  // Toggle Loa
  speakerButton.onclick = () => {
    speakerEnabled = !speakerEnabled;
    remoteAudio.muted = !speakerEnabled;
    console.log(speakerEnabled ? "🔊 Loa BẬT" : "🔇 Loa TẮT");
    speakerButton.textContent = speakerEnabled ? "🔊 Loa đang bật" : "🔇 Loa tắt";
  };

  peer.onconnectionstatechange = () => {
    console.log("📶 Trạng thái kết nối:", peer.connectionState);
  };

}).catch((err) => {
  console.error("❌ Không truy cập được micro:", err);
  alert("Không truy cập được micro: " + err.message);
});

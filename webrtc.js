
// webrtc.js - phiên bản đã sửa đầy đủ, tương thích trình duyệt cũ và mới, dùng Firebase compat SDK

// 1. Cấu hình Firebase (sử dụng compat SDK)
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
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:relay1.expressturn.com:3478",
      username: "efzV2kTkZ5sMfA0FoZzN2A==",
      credential: "tJzpCwbknxKyFCrKeIn1xAHC7GzDqaJBNd+U1V2yz0E="
    }
  ]
});

navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
  console.log("✅ Đã truy cập được microphone");

  stream.getAudioTracks()[0].enabled = false; // mic mặc định tắt

  // gửi stream local
  stream.getTracks().forEach((track) => peer.addTrack(track, stream));

  // nhận âm thanh từ peer
  peer.ontrack = (event) => {
    console.log("🔊 Nhận stream từ peer");
    remoteAudio.srcObject = event.streams[0];
  };

  peer.oniceconnectionstatechange = () => {
    console.log("📶 Trạng thái kết nối:", peer.iceConnectionState);
  };

  const callDoc = db.collection("calls").doc("room-v1");
  const callSnapshot = await callDoc.get();

  if (!callSnapshot.exists) {
    // bạn là người đầu tiên → tạo offer
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await callDoc.set({ offer });

    callDoc.onSnapshot(async (snap) => {
      const data = snap.data();
      if (data.answer && !peer.currentRemoteDescription) {
        await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });
  } else {
    // người sau → tạo answer
    const data = callSnapshot.data();
    await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    await callDoc.set({ ...data, answer });
  }

  // Mic toggle
  micButton.onclick = () => {
    micEnabled = !micEnabled;
    stream.getAudioTracks()[0].enabled = micEnabled;
    micButton.textContent = micEnabled ? "🎙️ Mic đang bật" : "🎙️ Bật/Tắt Micro";
  };

  // Loa toggle
  speakerButton.onclick = () => {
    speakerEnabled = !speakerEnabled;
    remoteAudio.muted = !speakerEnabled;
    speakerButton.textContent = speakerEnabled ? "🔊 Loa đang bật" : "🔊 Bật/Tắt Loa";
  };
}).catch((err) => {
  alert("❌ Không truy cập được microphone: " + err.message);
  console.error(err);
});

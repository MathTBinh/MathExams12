// webrtc.js - Truyền giọng nói 2 chiều dùng Firebase với log chi tiết và phòng gọi động

// 1. Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDACFZgZazMOnjzmGM_lrKswVcsoTFHxA",
  authDomain: "veonline-3bcbf.firebaseapp.com",
  projectId: "veonline-3bcbf",
  storageBucket: "veonline-3bcbf.appspot.com",
  messagingSenderId: "83902304195",
  appId: "1:83902304195:web:2f9ec1ee0c23d6e21bb776"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const remoteAudio = document.getElementById("remoteAudio");
const micButton = document.getElementById("btnToggleMic");
const speakerButton = document.getElementById("btnToggleSpeaker");

let micEnabled = false;
let speakerEnabled = true;
let localStream = null;
let peer = null;
let callDoc = null;
let isCaller = false;

// Tạo phòng gọi động
const roomId = `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
console.log(`🚀 Tạo phòng gọi: ${roomId}`);

// Cấu hình RTCPeerConnection với STUN và TURN server
function createPeerConnection() {
  return new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // Thêm TURN server nếu có (bỏ comment nếu bạn có TURN server)
      // {
      //   urls: "turn:your-turn-server.com",
      //   username: "your-username",
      //   credential: "your-password"
      // }
    ]
  });
}

// Khởi tạo WebRTC
async function initializeWebRTC() {
  try {
    // Lấy luồng âm thanh từ micro
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("🎤 Đã truy cập được micro");

    // Tắt micro mặc định
    localStream.getAudioTracks()[0].enabled = false;

    // Tạo RTCPeerConnection
    peer = createPeerConnection();

    // Thêm tracks vào peer
    localStream.getTracks().forEach((track) => {
      peer.addTrack(track, localStream);
      console.log(`📥 Thêm track ${track.kind} vào peer`);
    });

    // Xử lý luồng âm thanh từ peer khác
    peer.ontrack = (event) => {
      console.log("🔊 Nhận stream từ peer");
      remoteAudio.srcObject = event.streams[0];
    };

    // Xử lý ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("📡 Gửi ICE Candidate:", event.candidate.toJSON());
        const candidatesCollection = isCaller
          ? callDoc.collection("callerCandidates")
          : callDoc.collection("calleeCandidates");
        candidatesCollection.add(event.candidate.toJSON());
      } else {
        console.log("📡 Không còn ICE Candidate");
      }
    };

    // Theo dõi trạng thái kết nối
    peer.onconnectionstatechange = () => {
      console.log("📶 Trạng thái kết nối:", peer.connectionState);
      if (peer.connectionState === "failed") {
        console.error("❌ Kết nối WebRTC thất bại");
        alert("Kết nối WebRTC thất bại. Vui lòng kiểm tra mạng hoặc cấu hình.");
      } else if (peer.connectionState === "connected") {
        console.log("✅ Kết nối WebRTC thành công");
      }
    };

    // Thiết lập Firestore
    callDoc = db.collection("calls").doc(roomId);
    const callSnapshot = await callDoc.get();

    if (!callSnapshot.exists) {
      isCaller = true;
      console.log("📞 Là người gọi → tạo offer");
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      await callDoc.set({ offer });

      // Lắng nghe answer từ peer khác
      callDoc.onSnapshot(async (snap) => {
        const data = snap.data();
        if (data && data.answer && !peer.currentRemoteDescription) {
          console.log("✅ Nhận answer từ peer");
          await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      });
    } else {
      isCaller = false;
      console.log("📞 Là người tham gia → nhận offer và tạo answer");
      const data = callSnapshot.data();
      await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      await callDoc.update({ answer });
    }

    // Lắng nghe ICE candidates từ peer khác
    const candidatesCollection = isCaller
      ? callDoc.collection("calleeCandidates")
      : callDoc.collection("callerCandidates");

    candidatesCollection.onSnapshot((snapshot) => {
      snapshotрос

System: snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          await peer.addIceCandidate(candidate);
          console.log("🔁 Thêm ICE candidate từ peer");
        }
      });
    });

    // Toggle MIC
    micButton.onclick = () => {
      if (!localStream) {
        console.error("❌ Không có stream âm thanh để bật/tắt micro");
        return;
      }
      console.log("Nhấn nút Mic");
      micEnabled = !micEnabled;
      localStream.getAudioTracks()[0].enabled = micEnabled;
      console.log(micEnabled ? "🎙️ Mic BẬT" : "🎙️ Mic TẮT");
      micButton.textContent = micEnabled ? "🎙️ Mic đang bật" : "🎙️ Bật/Tắt Micro";
    };

    // Toggle Loa
    speakerButton.onclick = () => {
      console.log("Nhấn nút Loa");
      speakerEnabled = !speakerEnabled;
      remoteAudio.muted = !speakerEnabled;
      console.log(speakerEnabled ? "🔊 Loa BẬT" : "🔇 Loa TẮT");
      speakerButton.textContent = speakerEnabled ? "🔊 Loa đang bật" : "🔇 Bật/Tắt Loa";
    };

  } catch (err) {
    console.error("❌ Lỗi khởi tạo WebRTC:", err.name, err.message);
    alert(`Không truy cập được micro: ${err.name} - ${err.message}`);
  }
}

// Khởi động WebRTC khi trang tải
window.onload = initializeWebRTC;

// Xử lý đóng kết nối khi thoát trang
window.onbeforeunload = () => {
  if (peer) {
    peer.close();
    console.log("🔌 Đóng kết nối WebRTC");
  }
  if (callDoc) {
    callDoc.delete().then(() => console.log("🗑️ Xóa phòng gọi trong Firestore"));
  }
};
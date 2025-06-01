let stream = null;
let recorder = null;
let chunks = [];
let isRecording = false;

// Khởi tạo recorder và giao diện
function initializeRecorder() {
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const pauseRecordingBtn = document.getElementById('pauseRecording');
    const videoPreview = document.getElementById('videoPreview');
    const downloadLink = document.getElementById('downloadLink');

    // Bắt đầu ghi màn hình
    async function startRecording() {
        if (isRecording) return;
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: 'screen' },
                audio: false
            });
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const combinedStream = new MediaStream([
                ...displayStream.getVideoTracks(),
                ...audioStream.getAudioTracks()
            ]);

            stream = combinedStream;
            recorder = new MediaRecorder(stream);
            chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                displayStream.getTracks().forEach(track => track.stop());
                audioStream.getTracks().forEach(track => track.stop());
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                videoPreview.src = url;
                downloadLink.href = url;
                downloadLink.download = 'recording.webm';
                downloadLink.style.display = 'inline';
                isRecording = false;
                startRecordingBtn.disabled = false;
                stopRecordingBtn.disabled = true;
                pauseRecordingBtn.disabled = true;
            };

            recorder.start();
            isRecording = true;
            startRecordingBtn.disabled = true;
            stopRecordingBtn.disabled = false;
            pauseRecordingBtn.disabled = false;
        } catch (err) {
            console.error('Error starting recording:', err);
            alert('Failed to start recording. Please ensure screen sharing and microphone access are granted.');
        }
    }

    // Dừng ghi màn hình
    function stopRecording() {
        if (recorder && isRecording) {
            recorder.stop();
            stopRecordingBtn.disabled = true;
        }
    }

    // Tạm dừng ghi màn hình
    function pauseRecording() {
        if (recorder && isRecording) {
            recorder.pause();
            pauseRecordingBtn.textContent = 'Resume';
            pauseRecordingBtn.onclick = resumeRecording;
        }
    }

    // Tiếp tục ghi sau khi tạm dừng
    function resumeRecording() {
        if (recorder && recorder.state === 'paused') {
            recorder.resume();
            pauseRecordingBtn.textContent = 'Pause';
            pauseRecordingBtn.onclick = pauseRecording;
        }
    }

    startRecordingBtn.addEventListener('click', startRecording);
    stopRecordingBtn.addEventListener('click', stopRecording);
    pauseRecordingBtn.addEventListener('click', pauseRecording);

    // Khởi tạo trạng thái ban đầu
    stopRecordingBtn.disabled = true;
    pauseRecordingBtn.disabled = true;
}

// Khởi tạo khi trang tải
document.addEventListener('DOMContentLoaded', initializeRecorder);
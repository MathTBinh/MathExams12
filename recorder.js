let stream = null;
let recorder = null;
let chunks = [];
let isRecording = false;

// Kiểm tra hỗ trợ API trước khi khởi tạo
function checkApiSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia || !window.MediaRecorder) {
        alert('This browser does not support screen recording. Please use a modern browser like Chrome or Firefox.');
        return false;
    }
    return true;
}

// Khởi tạo recorder và giao diện
function initializeRecorder() {
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const pauseRecordingBtn = document.getElementById('pauseRecording');
    const videoPreview = document.getElementById('videoPreview');
    const downloadLink = document.getElementById('downloadLink');

    // Đảm bảo video không có controls mặc định
    videoPreview.removeAttribute('controls');

    // Tạo nút play/pause tùy chỉnh
    function createCustomControls() {
        const existingControl = document.getElementById('customPlayPause');
        if (existingControl) existingControl.remove();

        const playPauseBtn = document.createElement('button');
        playPauseBtn.id = 'customPlayPause';
        playPauseBtn.textContent = 'Play';
        playPauseBtn.style.marginTop = '5px';
        playPauseBtn.style.padding = '5px 10px';
        playPauseBtn.style.fontSize = '14px';
        playPauseBtn.style.cursor = 'pointer';

        // Thêm style để video thu nhỏ và căn giữa
        videoPreview.style.maxWidth = '50%';
        videoPreview.style.width = '100%';
        videoPreview.style.display = 'none';

        playPauseBtn.onclick = () => {
            if (videoPreview.paused) {
                videoPreview.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                videoPreview.pause();
                playPauseBtn.textContent = 'Play';
            }
        };

        videoPreview.parentNode.insertBefore(playPauseBtn, videoPreview.nextSibling);
    }

    // Bắt đầu ghi màn hình
    async function startRecording() {
        if (isRecording) return;
        if (!checkApiSupport()) return;

        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    mediaSource: 'screen',
                    frameRate: { ideal: 15, max: 30 },
                    width: { max: 1280 },
                    height: { max: 720 }
                },
                audio: false
            });

            displayStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

            let combinedStream = displayStream;
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });
                combinedStream = new MediaStream([
                    ...displayStream.getVideoTracks(),
                    ...audioStream.getAudioTracks()
                ]);
            } catch (audioErr) {
                console.warn('Audio capture failed, proceeding with video only:', audioErr);
            }

            stream = combinedStream;
            const mimeType = getSupportedMimeType();
            recorder = new MediaRecorder(stream, { mimeType });

            chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
                const blob = new Blob(chunks, { type: mimeType });
                const url = URL.createObjectURL(blob);
                videoPreview.src = url;
                videoPreview.style.display = 'block';
                downloadLink.href = url;
                downloadLink.download = `recording.${mimeType.includes('mp4') ? 'mp4' : 'webm'}`;
                downloadLink.style.display = 'inline';
                isRecording = false;
                startRecordingBtn.disabled = false;
                stopRecordingBtn.disabled = true;
                pauseRecordingBtn.disabled = true;
                createCustomControls(); // Tạo nút play/pause tùy chỉnh
            };

            recorder.onerror = (err) => {
                console.error('Recorder error:', err);
                alert('An error occurred during recording: ' + err.message);
                stopRecording();
            };

            recorder.start(1000);
            isRecording = true;
            startRecordingBtn.disabled = true;
            stopRecordingBtn.disabled = false;
            pauseRecordingBtn.disabled = false;
        } catch (err) {
            console.error('Error starting recording:', err);
            alert('Failed to start recording. Please ensure screen sharing and microphone permissions are granted.');
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
        if (recorder && isRecording && recorder.state === 'recording') {
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

    // Lấy định dạng video hỗ trợ
    function getSupportedMimeType() {
        const types = [
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/mp4;codecs=h264'
        ];
        for (const type of types) {
            if (MediaRecorder.isTypeSupported(type)) {
                return type;
            }
        }
        return 'video/webm';
    }

    // Kiểm tra và yêu cầu quyền
    async function requestPermissions() {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            return true;
        } catch (err) {
            console.warn('Permission check failed:', err);
            return false;
        }
    }

    // Sự kiện click cho các nút
    startRecordingBtn.addEventListener('click', async () => {
        const hasPermission = await requestPermissions();
        if (hasPermission) {
            startRecording();
        } else {
            alert('Microphone permission is required to start recording.');
        }
    });
    stopRecordingBtn.addEventListener('click', stopRecording);
    pauseRecordingBtn.addEventListener('click', pauseRecording);

    // Khởi tạo trạng thái ban đầu
    stopRecordingBtn.disabled = true;
    pauseRecordingBtn.disabled = true;
}

// Khởi tạo khi trang tải
document.addEventListener('DOMContentLoaded', initializeRecorder);
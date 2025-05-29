function bangXanh(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Không tìm thấy container với ID: ${containerId}`);
        return;
    }

    // Tạo HTML cho bảng vẽ
    container.innerHTML = `
         <div class="controls">
            <button onclick="setMode${containerId}('draw')" title="Bút Vẽ">✏️</button>
            <button onclick="setMode${containerId}('line')" title="Đường Thẳng">➖</button>
            <button onclick="setMode${containerId}('circle')" title="Hình Tròn">⚪</button>
            <button onclick="setMode${containerId}('square')" title="Hình Vuông">⬜</button>
            <button onclick="setMode${containerId}('text')" title="Gõ Chữ">🖋️</button>
            <button onclick="clearBoard${containerId}()" title="Xóa Bảng">🗑️</button>
            <button onclick="saveImage${containerId}()" title="Lưu Hình">💾</button>
            <input type="color" id="color-${containerId}" value="#FFFFFF" title="Chọn Màu">
            <input type="range" id="brushSize-${containerId}" min="1" max="10" value="5" title="Kích thước bút">
            <input type="number" id="fontSize-${containerId}" min="10" max="50" value="20" style="width: 60px;" title="Cỡ chữ">
        </div>
        <canvas id="whiteboard-${containerId}" width="800" height="600"></canvas>
        <input type="text" id="textInput-${containerId}" class="text-input" placeholder="Nhập chữ...">
    `;

    // Thêm CSS
    const style = document.createElement('style');
    style.textContent = `
        #${containerId} {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
            margin: 0;
        }
        #${containerId} .controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 10px 0;
            background-color: #333;
            padding: 5px;
            border-radius: 8px;
        }
        #${containerId} button, #${containerId} input, #${containerId} select {
            margin: 3px;
            padding: 6px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #${containerId} input[type="color"], #${containerId} input[type="range"], #${containerId} input[type="number"] {
            width: auto;
            height: auto;
            padding: 2px;
        }
        #whiteboard-${containerId} {
            border: 2px solid #000;
            background-color: #0A3D2E;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            touch-action: none; /* Ngăn chặn cuộn trang */
            -ms-touch-action: none; /* Hỗ trợ IE */
        }
        #${containerId} .text-input {
            display: none;
            position: absolute;
            font-size: 16px;
            padding: 5px;
        }
        #${containerId} .latex-label {
            font-size: 20px;
            font-weight: normal;
            white-space: nowrap;
            z-index: 10;
        }
    `;
    document.head.appendChild(style);

    // JavaScript logic
    const canvas = document.getElementById(`whiteboard-${containerId}`);
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById(`textInput-${containerId}`);
    let isDrawing = false;
    let mode = 'draw';
    let startX, startY;
    let lastX, lastY; // Để theo dõi điểm vẽ trước đó

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const colorPicker = document.getElementById(`color-${containerId}`);
    const brushSize = document.getElementById(`brushSize-${containerId}`);
    const fontSize = document.getElementById(`fontSize-${containerId}`);

    // Tính tọa độ tương đối trên canvas
    function getCanvasCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        let x, y;

        if (event.type.includes('touch')) {
            x = event.touches[0].pageX - rect.left;
            y = event.touches[0].pageY - rect.top;
        } else if (event.type.includes('pointer')) {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        } else if (event.type.includes('mouse')) {
            x = event.offsetX;
            y = event.offsetY;
        }

        return { x, y };
    }

    window[`setMode${containerId}`] = function(newMode) {
        mode = newMode;
        textInput.style.display = 'none';
    };

    // Xử lý sự kiện bắt đầu vẽ
    function startDrawing(event) {
        event.preventDefault();
        isDrawing = true;
        const coords = getCanvasCoordinates(event);
        startX = coords.x;
        startY = coords.y;
        lastX = startX;
        lastY = startY;

        if (mode === 'text') {
            textInput.style.display = 'block';
            textInput.style.left = `${event.pageX || event.clientX || event.touches[0].pageX}px`;
            textInput.style.top = `${event.pageY || event.clientY || event.touches[0].pageY}px`;
            textInput.focus();
        } else {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
    }

    // Xử lý sự kiện vẽ khi di chuyển
    function draw(event) {
        event.preventDefault();
        if (!isDrawing || mode === 'text') return;

        const coords = getCanvasCoordinates(event);
        const currentX = coords.x;
        const currentY = coords.y;

        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;

        // Lọc điểm vẽ để tránh nét gãy trên cảm ứng
        if (mode === 'draw' && (Math.abs(currentX - lastX) > 2 || Math.abs(currentY - lastY) > 2)) {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            lastX = currentX;
            lastY = currentY;
        } else if (mode !== 'draw') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(tempCanvas, 0, 0);

            ctx.beginPath();
            if (mode === 'line') {
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
            } else if (mode === 'circle') {
                const radius = Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2);
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            } else if (mode === 'square') {
                const size = Math.max(Math.abs(currentX - startX), Math.abs(currentY - startY));
                ctx.rect(startX, startY, size, size);
            }
            ctx.stroke();
        }
    }

    // Xử lý sự kiện kết thúc vẽ
    function stopDrawing() {
        if (mode !== 'text') {
            isDrawing = false;
            ctx.closePath();
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
        }
    }

    // Đăng ký sự kiện cho tất cả các loại đầu vào
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    // Tạo canvas tạm để lưu trạng thái
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Xử lý nhập văn bản với LaTeX
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const latexContainer = document.createElement('div');
            latexContainer.className = 'latex-label';
            latexContainer.style.position = 'absolute';
            latexContainer.style.left = (canvas.offsetLeft + startX) + 'px';
            latexContainer.style.top = (canvas.offsetTop + startY) + 'px';
            latexContainer.style.color = colorPicker.value;
            latexContainer.innerHTML = `\\(${textInput.value}\\)`;
            container.appendChild(latexContainer);
            if (window.MathJax && MathJax.typeset) {
                MathJax.typeset([latexContainer]);
            }
            textInput.value = '';
            textInput.style.display = 'none';
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
        }
    });

    window[`clearBoard${containerId}`] = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tempCanvas.getContext('2d').clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    };

    window[`saveImage${containerId}`] = function() {
        const link = document.createElement('a');
        link.download = 'whiteboard.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    // Hàm ẩn/hiện bảng vẽ
    window[`toggleBoard${containerId}`] = function() {
        if (container.style.display === 'none') {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    };
}
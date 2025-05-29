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
        }
        #${containerId} .text-input {
            display: none;
            position: absolute;
            font-size: 16px;
            padding: 5px;
            #${containerId} .latex-label {
            font-size: 20px;
            font-weight: normal;
             white-space: nowrap;
            z-index: 10;
            }
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

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const colorPicker = document.getElementById(`color-${containerId}`);
    const brushSize = document.getElementById(`brushSize-${containerId}`);
    const fontSize = document.getElementById(`fontSize-${containerId}`);

    window[`setMode${containerId}`] = function(newMode) {
        mode = newMode;
        textInput.style.display = 'none';
    };

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;

        if (mode === 'text') {
            textInput.style.display = 'block';
            textInput.style.left = `${e.clientX}px`;
            textInput.style.top = `${e.clientY}px`;
            textInput.focus();
        } else {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing || mode === 'text') return;

        const currentX = e.offsetX;
        const currentY = e.offsetY;

        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;

        if (mode === 'draw') {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        } else {
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
    });

    canvas.addEventListener('mouseup', () => {
        if (mode !== 'text') {
            isDrawing = false;
            ctx.closePath();
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
        }
    });

    canvas.addEventListener('mouseout', () => {
        if (mode !== 'text') {
            isDrawing = false;
            ctx.closePath();
        }
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
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
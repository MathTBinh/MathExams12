function bangXanh(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Không tìm thấy container với ID: ${containerId}`);
        return;
    }

    container.innerHTML = `
        <div class="whiteboard-container">
            <canvas id="whiteboard-${containerId}" width="800" height="600"></canvas>
            <div class="controls">
                <button onclick="setMode${containerId}('draw')">✏️</button>
                <button onclick="setMode${containerId}('eraser')">🧹</button>
                <button onclick="setMode${containerId}('line')">➖</button>
                <button onclick="setMode${containerId}('circle')">⚪</button>
                <button onclick="setMode${containerId}('square')">⬜</button>
                <button onclick="setMode${containerId}('text')">🖋️</button>
                <button onclick="setMode${containerId}('triangularPyramid')">▲</button>
                <button onclick="setMode${containerId}('squarePyramid')">◼</button>
                <button onclick="setMode${containerId}('prism')">🔲</button>
                <button onclick="setMode${containerId}('sphere')">🌐</button>
                <button onclick="clearBoard${containerId}()">🗑️</button>
                <button onclick="saveImage${containerId}()">💾</button>
                <input type="color" id="color-${containerId}" value="#FFFFFF">
                <input type="range" id="brushSize-${containerId}" min="1" max="10" value="3">
                <input type="number" id="fontSize-${containerId}" min="10" max="50" value="20" style="width: 30px;">
            </div>
            <input type="text" id="textInput-${containerId}" class="text-input" placeholder="Nhập LaTeX...">
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        #${containerId} {
            display: flex;
            justify-content: center;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        #${containerId} .whiteboard-container {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            width: 100%;
            height: 100%;
        }
        #${containerId} .controls {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin: 10px;
            background-color: #333;
            padding: 5px;
            border-radius: 8px;
            width: 40px;
            z-index: 5;
        }
        #${containerId} button, #${containerId} input {
            margin: 2px 0;
            padding: 3px;
            font-size: 8px;
            border-radius: 3px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #${containerId} input[type="color"] {
            padding: 0;
            width: 30px;
            height: 30px;
        }
        #${containerId} input[type="range"] {
            width: 30px;
        }
        #${containerId} input[type="number"] {
            width: 30px;
            height: 20px;
            font-size: 8px;
        }
        #whiteboard-${containerId} {
            border: 2px solid #000;
            background-color: #0A3D2E;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            touch-action: none;
            -ms-touch-action: none;
            flex-grow: 1;
            width: calc(100% - 60px);
            height: 100%;
        }
        #${containerId} .text-input {
            display: none;
            position: absolute;
            font-size: 13px;
            padding: 8px;
            width: 200px;
            height: 40px;
            background-color: #FFFF00;
            border: 1px solid #000;
            border-radius: 4px;
            z-index: 10;
        }
        #${containerId} .latex-label {
            position: absolute;
            font-size: 13px;
            white-space: nowrap;
            z-index: 10;
        }
    `;
    document.head.appendChild(style);

    const canvas = document.getElementById(`whiteboard-${containerId}`);
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById(`textInput-${containerId}`);
    const colorPicker = document.getElementById(`color-${containerId}`);
    const brushSize = document.getElementById(`brushSize-${containerId}`);
    const fontSize = document.getElementById(`fontSize-${containerId}`);
    let isDrawing = false;
    let mode = 'draw';
    let startX, startY;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    function resizeCanvas() {
        const containerRect = container.getBoundingClientRect();
        canvas.width = containerRect.width - 60;
        canvas.height = containerRect.height;
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window[`setMode${containerId}`] = function(newMode) {
        mode = newMode;
        textInput.style.display = 'none';
        ctx.globalCompositeOperation = (newMode === 'eraser') ? 'destination-out' : 'source-over';
    };

    function drawTriangularPyramid(ctx, startX, startY, endX, endY) {
        const height = Math.abs(endY - startY);
        const base = Math.abs(endX - startX);
        const apexX = startX + base / 2;
        const apexY = startY - height;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + base, startY);
        ctx.lineTo(apexX, apexY);
        ctx.lineTo(startX, startY);
        ctx.moveTo(startX + base, startY);
        ctx.lineTo(apexX, apexY);
        ctx.stroke();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(startX + base / 2, startY);
        ctx.lineTo(apexX, apexY);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawSquarePyramid(ctx, startX, startY, endX, endY) {
        const size = Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
        const apexX = startX + size / 2;
        const apexY = startY - size;
        ctx.beginPath();
        ctx.rect(startX, startY, size, size);
        ctx.moveTo(startX, startY);
        ctx.lineTo(apexX, apexY);
        ctx.moveTo(startX + size, startY);
        ctx.lineTo(apexX, apexY);
        ctx.moveTo(startX + size, startY + size);
        ctx.lineTo(apexX, apexY);
        ctx.moveTo(startX, startY + size);
        ctx.lineTo(apexX, apexY);
        ctx.stroke();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(startX + size / 2, startY + size / 2);
        ctx.lineTo(apexX, apexY);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawPrism(ctx, startX, startY, endX, endY) {
        const size = Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
        const offset = size / 3;
        ctx.beginPath();
        ctx.rect(startX, startY, size, size);
        ctx.rect(startX + offset, startY - offset, size, size);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + offset, startY - offset);
        ctx.moveTo(startX + size, startY);
        ctx.lineTo(startX + size + offset, startY - offset);
        ctx.moveTo(startX, startY + size);
        ctx.lineTo(startX + offset, startY + size - offset);
        ctx.moveTo(startX + size, startY + size);
        ctx.lineTo(startX + size + offset, startY + size - offset);
        ctx.stroke();
    }

    function drawSphere(ctx, startX, startY, endX, endY) {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.ellipse(startX, startY, radius * 0.8, radius * 0.4, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(startX, startY, radius * 0.4, radius * 0.8, Math.PI / 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

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
        if (mode === 'draw' || mode === 'eraser') {
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
            } else if (mode === 'triangularPyramid') {
                drawTriangularPyramid(ctx, startX, startY, currentX, currentY);
            } else if (mode === 'squarePyramid') {
                drawSquarePyramid(ctx, startX, startY, currentX, currentY);
            } else if (mode === 'prism') {
                drawPrism(ctx, startX, startY, currentX, currentY);
            } else if (mode === 'sphere') {
                drawSphere(ctx, startX, startY, currentX, currentY);
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

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startX = touch.clientX - rect.left;
        startY = touch.clientY - rect.top;
        isDrawing = true;
        if (mode === 'text') {
            textInput.style.display = 'block';
            textInput.style.left = `${touch.clientX}px`;
            textInput.style.top = `${touch.clientY}px`;
            textInput.focus();
        } else {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawing || mode === 'text') return;
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        if (mode === 'draw' || mode === 'eraser') {
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
            } else if (mode === 'triangularPyramid') {
                drawTriangularPyramid(ctx, startX, startY, currentX, currentY);
            } else if (mode === 'squarePyramid') {
                drawSquarePyramid(ctx, startX, startY, currentX, currentY);
            } else if (mode === 'prism') {
                drawPrism(ctx, startX, startY, currentX, currentY);
            } else if (mode === 'sphere') {
                drawSphere(ctx, startX, startY, currentX, currentY);
            }
            ctx.stroke();
        }
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (mode !== 'text') {
            isDrawing = false;
            ctx.closePath();
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
        }
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const latexContainer = document.createElement('div');
            latexContainer.className = 'latex-label';
            latexContainer.style.left = `${canvas.offsetLeft + startX}px`;
            latexContainer.style.top = `${canvas.offsetTop + startY}px`;
            latexContainer.style.color = colorPicker.value;
            latexContainer.innerHTML = `\\(${textInput.value}\\)`;
            latexContainer.style.position = 'absolute';
            container.appendChild(latexContainer);
            if (window.MathJax && MathJax.typeset) {
                MathJax.typeset([latexContainer]);
            }
            textInput.value = '';
            textInput.style.display = 'none';
        }
    });

    window[`clearBoard${containerId}`] = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tempCanvas.getContext('2d').clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        const labels = container.querySelectorAll('.latex-label');
        labels.forEach(label => label.remove());
    };

    window[`saveImage${containerId}`] = function () {
        const link = document.createElement('a');
        link.download = 'whiteboard.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    window[`toggleBoard${containerId}`] = function () {
        container.style.display = (container.style.display === 'none') ? 'flex' : 'none';
    };
}

function bangXanhSimple(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Không tìm thấy container với ID: ${containerId}`);
        return;
    }

    container.innerHTML = `
        <div class="whiteboard-simple-wrapper">
            <div class="controls">
                <button title="Tắt vẽ" onclick="toggleDrawing${containerId}()">✏️</button>
                <input type="color" id="color-${containerId}" title="Chọn màu" value="#FF0000">
                <button title="Xóa nét" onclick="clearDrawing${containerId}()">🧹</button>
            </div>
            <canvas id="whiteboard-${containerId}"></canvas>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        #${containerId} {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        #${containerId} .whiteboard-simple-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
        }
        #${containerId} .controls {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 5;
            display: flex;
            flex-direction: column;
            gap: 8px;
            background-color: rgba(0,0,0,0.7);
            padding: 8px;
            border-radius: 6px;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        #${containerId} button {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 4px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #${containerId} input[type="color"] {
            width: 32px;
            height: 32px;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            background: none;
        }
        #${containerId} input[type="color"]::-webkit-color-swatch {
            border: none;
            border-radius: 4px;
        }
        #whiteboard-${containerId} {
            background-color: transparent;
            touch-action: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);

    const canvas = document.getElementById(`whiteboard-${containerId}`);
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById(`color-${containerId}`);
    let isDrawing = false;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;

    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
    }
    resizeCanvas();
    setTimeout(resizeCanvas, 100);
    setTimeout(resizeCanvas, 300);
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        ctx.strokeStyle = colorPicker.value;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        isDrawing = true;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.strokeStyle = colorPicker.value;
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
        ctx.closePath();
    });

    window[`clearDrawing${containerId}`] = function () {
        const canvas = document.querySelector(`#whiteboard-${containerId}`);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    window[`toggleDrawing${containerId}`] = function () {
        const canvas = document.querySelector(`#whiteboard-${containerId}`);
        if (canvas) {
            canvas.style.pointerEvents = canvas.style.pointerEvents === 'none' ? 'auto' : 'none';
        }
    };
}

function ve3(fullIds, simpleIds) {
    if (!Array.isArray(fullIds) || !Array.isArray(simpleIds)) {
        console.error('ve3 yêu cầu hai mảng container IDs: một cho bangXanh và một cho bangXanhSimple');
        return;
    }
    fullIds.forEach(id => {
        if (document.getElementById(id)) bangXanh(id);
    });
    simpleIds.forEach(id => {
        if (document.getElementById(id)) bangXanhSimple(id);
    });
}
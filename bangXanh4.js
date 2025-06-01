function bangXanh(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Không tìm thấy container với ID: ${containerId}`);
        return;
    }

    container.innerHTML = `
        <div class="controls">
            <button onclick="setMode${containerId}('draw')">✏️</button>
            <button onclick="setMode${containerId}('line')">➖</button>
            <button onclick="setMode${containerId}('circle')">⚪</button>
            <button onclick="setMode${containerId}('square')">⬜</button>
            <button onclick="setMode${containerId}('text')">🖋️</button>
            <button onclick="setMode${containerId}('erase')">🧽</button>
            <button onclick="setMode${containerId}('pyramid3')">△⛰️</button>
            <button onclick="setMode${containerId}('pyramid4')">🔺⛰️</button>
            <button onclick="setMode${containerId}('prism')">📦</button>
            <button onclick="setMode${containerId}('sphere')">🌐</button>
            <button onclick="clearBoard${containerId}()">🗑️</button>
            <button onclick="saveImage${containerId}()">💾</button>
            <input type="color" id="color-${containerId}" value="#000000">
            <input type="range" id="brushSize-${containerId}" min="1" max="10" value="3">
            <input type="number" id="fontSize-${containerId}" min="10" max="50" value="20" style="width: 60px;">
        </div>
        <canvas id="whiteboard-${containerId}" width="800" height="600"></canvas>
        <input type="text" id="textInput-${containerId}" class="text-input" placeholder="Nhập LaTeX...">
    `;

    const style = document.createElement('style');
    style.textContent = `
        #${containerId} {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
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
        #${containerId} button, #${containerId} input {
            margin: 3px;
            padding: 6px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }
        #whiteboard-${containerId} {
            border: 2px solid #000;
            background-color: #0A3D2E;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            touch-action: none;
        }
        #${containerId} .text-input {
            display: none;
            position: absolute;
            font-size: 16px;
            padding: 5px;
            z-index: 10;
        }
        #${containerId} .latex-label {
            position: absolute;
            font-size: 20px;
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
        } else if (mode === 'erase') {
            ctx.clearRect(currentX - brushSize.value / 2, currentY - brushSize.value / 2, brushSize.value, brushSize.value);
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

    canvas.addEventListener('mouseup', (e) => {
        if (mode !== 'text') {
            isDrawing = false;
            ctx.closePath();
            if (['pyramid3','pyramid4','prism','sphere'].includes(mode)) {
                drawShape(mode, ctx, startX, startY, e.offsetX, e.offsetY);
            }
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
        }
    });

    canvas.addEventListener('mouseout', () => {
        if (mode !== 'text') {
            isDrawing = false;
            ctx.closePath();
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

    function drawShape(mode, ctx, x1, y1, x2, y2) {
        if (mode === 'pyramid3') {
            const midX = (x1 + x2) / 2;
            ctx.beginPath();
            ctx.moveTo(midX, y1);
            ctx.lineTo(x1, y2);
            ctx.lineTo(x2, y2);
            ctx.lineTo(midX, y1);
            ctx.stroke();
        } else if (mode === 'pyramid4') {
            const topX = (x1 + x2) / 2, topY = y1;
            ctx.beginPath();
            ctx.moveTo(topX, topY);
            ctx.lineTo(x1, y2);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2, y1 + (y2 - y1) / 2);
            ctx.lineTo(topX, topY);
            ctx.stroke();
        } else if (mode === 'prism') {
            const offset = 30;
            ctx.beginPath();
            ctx.rect(x1, y1, x2 - x1, y2 - y1);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + offset, y1 - offset);
            ctx.lineTo(x2 + offset, y1 - offset);
            ctx.lineTo(x2 + offset, y2 - offset);
            ctx.lineTo(x1 + offset, y2 - offset);
            ctx.lineTo(x1, y2);
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2 + offset, y1 - offset);
            ctx.stroke();
        } else if (mode === 'sphere') {
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const rx = Math.abs(x2 - x1) / 2;
            const ry = Math.abs(y2 - y1) / 2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry / 3, 0, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}

const examList = [
    { id: 1, title: "Đề thi Toán – Đề số 1 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de1.html", available: true },
    { id: 2, title: "Đề thi Toán – Đề số 2 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de2.html", available: true },
    { id: 3, title: "Đề thi Toán – Đề số 3 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de3.html", available: true },
    { id: 4, title: "Đề thi Toán – Đề số 4 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de4.html", available: true },
    { id: 5, title: "Đề thi Toán – Đề số 5 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de5.html", available: true },
    { id: 6, title: "Đề thi Toán – Đề số 6 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de6.html", available: true },
    { id: 7, title: "Đề thi Toán – Đề số 7 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de7.html", available: true },
    { id: 8, title: "Đề thi Toán – Đề số 8 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de8.html", available: true },
    { id: 9, title: "Đề thi Toán – Đề số 9 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de9.html", available: true },
    { id: 10, title: "Đề thi Toán – Đề số 10 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de10.html", available: true},
    { id: 11, title: "Đề thi Toán – Đề số 11 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de11.html", available: true },
    { id: 12, title: "Đề thi Toán – Đề số 12 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de12.html", available: true },
    { id: 13, title: "Đề thi Toán – Đề số 13 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de13.html", available: true },
    { id: 14, title: "Đề thi Toán – Đề số 14 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de14.html", available: true },
    { id: 15, title: "Đề thi Toán – Đề số 15 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de15.html", available: true },
    { id: 16, title: "Đề thi Toán – Đề số 16 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de16.html", available: true },
    { id: 17, title: "Đề thi Toán – Đề số 17 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de17.html", available: true },
    { id: 18, title: "Đề thi Toán – Đề số 18 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de18.html", available: true },
    { id: 19, title: "Đề thi Toán – Đề số 19 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de19.html", available: true },
    { id: 20, title: "Đề thi Toán – Đề số 20 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de20.html", available: true },
    { id: 21, title: "Đề thi Toán – Đề số 21 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de21.html", available: true },
    { id: 22, title: "Đề thi Toán – Đề số 22 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de22.html", available: true },
    { id: 23, title: "Đề thi Toán – Đề số 23 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de23.html", available: true },
    { id: 24, title: "Đề thi Toán – Đề số 24 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de24.html", available: true },
    { id: 25, title: "Đề thi Toán – Đề số 25 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de25.html", available: true },
    { id: 26, title: "Đề thi Toán – Đề số 26 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de26.html", available: true },
    { id: 27, title: "Đề thi Toán – Đề số 27 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de27.html", available: true },
    { id: 28, title: "Đề thi Toán – Đề số 28 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de28.html", available: true },
    { id: 29, title: "Đề thi Toán – Đề số 29 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de29.html", available: false },
    { id: 30, title: "Đề thi Toán – Đề số 30 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de30.html", available: false },
    { id: 31, title: "Đề thi Toán – Đề số 31 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de31.html", available: false },
    { id: 32, title: "Đề thi Toán – Đề số 32 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de32.html", available: false },
    { id: 33, title: "Đề thi Toán – Đề số 33 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de33.html", available: false },
    { id: 34, title: "Đề thi Toán – Đề số 34 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de34.html", available: false },
    { id: 35, title: "Đề thi Toán – Đề số 35 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de35.html", available: false },
    { id: 36, title: "Đề thi Toán – Đề số 36 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de36.html", available: false },
    { id: 37, title: "Đề thi Toán – Đề số 37 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de37.html", available: false },
    { id: 38, title: "Đề thi Toán – Đề số 38 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de38.html", available: false },
    { id: 39, title: "Đề thi Toán – Đề số 39 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de39.html", available: false },
    { id: 40, title: "Đề thi Toán – Đề số 40 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de40.html", available: false },
    { id: 41, title: "Đề thi Toán – Đề số 41 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de41.html", available: false },
    { id: 42, title: "Đề thi Toán – Đề số 42 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de42.html", available: false },
    { id: 43, title: "Đề thi Toán – Đề số 43 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de43.html", available: false },
    { id: 44, title: "Đề thi Toán – Đề số 44 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de44.html", available: false },
    { id: 45, title: "Đề thi Toán – Đề số 45 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de45.html", available: false },
    { id: 46, title: "Đề thi Toán – Đề số 46 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de46.html", available: false },
    { id: 47, title: "Đề thi Toán – Đề số 47 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de47.html", available: false },
    { id: 48, title: "Đề thi Toán – Đề số 48 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de48.html", available: false },
    { id: 49, title: "Đề thi Toán – Đề số 49 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de49.html", available: false },
    { id: 50, title: "Đề thi Toán – Đề số 50 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de50.html", available: false },
    { id: 51, title: "Đề thi Toán – Đề số 51 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de51.html", available: false },
    { id: 52, title: "Đề thi Toán – Đề số 52 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de52.html", available: false },
    { id: 53, title: "Đề thi Toán – Đề số 53 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de53.html", available: false },
    { id: 54, title: "Đề thi Toán – Đề số 54 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de54.html", available: false },
    { id: 55, title: "Đề thi Toán – Đề số 55 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de55.html", available: false },
    { id: 56, title: "Đề thi Toán – Đề số 56 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de56.html", available: false },
    { id: 57, title: "Đề thi Toán – Đề số 57 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de57.html", available: false },
    { id: 58, title: "Đề thi Toán – Đề số 58 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de58.html", available: false },
    { id: 59, title: "Đề thi Toán – Đề số 59 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de59.html", available: false },
    { id: 60, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Nguyên hàm, tích phân và ứng dụng", file: "de60.html", available: false },
];

function createDropdownMenu() {
    const dropdown = document.getElementById('examDropdown');
    examList.forEach(exam => {
        const link = document.createElement('a');
        link.href = exam.available ? exam.file : '#';
        link.textContent = `Đề ${exam.id}`;
        if (!exam.available) {
            link.onclick = (e) => {
                e.preventDefault();
                alert(`Đề ${exam.id} chưa có sẵn!`);
            };
        }
        dropdown.appendChild(link);
    });
}

function goToRandomExam() {
    const availableExams = examList.filter(exam => exam.available);
    if (availableExams.length === 0) {
        alert('Chưa có đề thi nào sẵn sàng!');
        return;
    }
    const randomIndex = Math.floor(Math.random() * availableExams.length);
    window.location.href = availableExams[randomIndex].file;
}

function checkAnswer(questionId, correctAnswer) {
    const options = document.getElementsByName(questionId);
    let selectedAnswer = null;
    for (const option of options) {
        if (option.checked) {
            selectedAnswer = option.value;
            break;
        }
    }
    const feedback = document.getElementById(`feedback-${questionId}`);
    if (selectedAnswer === null) {
        feedback.textContent = "Vui lòng chọn một đáp án!";
        feedback.style.color = "red";
    } else if (selectedAnswer === correctAnswer) {
        feedback.textContent = "Đúng rồi! Chúc mừng bạn!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Sai rồi! Đáp án đúng là: ${correctAnswer}`;
        feedback.style.color = "red";
    }
}

function checkTrueFalseAnswer(questionId, correctAnswers) {
    const feedback = document.getElementById(`feedback-${questionId}`);
    let allCorrect = true;
    let userAnswers = [];
    for (let i = 0; i < correctAnswers.length; i++) {
        const options = document.getElementsByName(`${questionId}${String.fromCharCode(97 + i)}`);
        let selectedAnswer = null;
        for (const option of options) {
            if (option.checked) {
                selectedAnswer = option.value;
                break;
            }
        }
        userAnswers.push(selectedAnswer);
        if (selectedAnswer !== correctAnswers[i]) {
            allCorrect = false;
        }
    }
    if (userAnswers.includes(null)) {
        feedback.textContent = "Vui lòng trả lời tất cả các câu hỏi!";
        feedback.style.color = "red";
    } else if (allCorrect) {
        feedback.textContent = "Đúng hết rồi! Chúc mừng bạn!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Sai rồi! Đáp án đúng là: ${correctAnswers.join(', ')}`;
        feedback.style.color = "red";
    }
}

function checkShortAnswer(questionId, correctAnswer) {
    const userAnswer = document.getElementById(`${questionId}-input`).value.trim();
    const feedback = document.getElementById(`feedback-${questionId}`);
    if (userAnswer === "") {
        feedback.textContent = "Vui lòng nhập đáp án!";
        feedback.style.color = "red";
    } else if (userAnswer === correctAnswer) {
        feedback.textContent = "Đúng rồi! Chúc mừng bạn!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Sai rồi! Đáp án đúng là: ${correctAnswer}`;
        feedback.style.color = "red";
    }
}

function toggleSolution(element) {
    const solution = element.nextElementSibling;
    if (solution.style.display === "block") {
        solution.style.display = "none";
        element.textContent = "Xem lời giải";
    } else {
        solution.style.display = "block";
        element.textContent = "Ẩn lời giải";
    }
}
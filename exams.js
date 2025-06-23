const examList = [
    { id: 1, title: "Đề thi Toán – Đề số 1 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de1.html", available: true },
    { id: 2, title: "Đề thi Toán – Đề số 2 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de2.html", available: true },
    { id: 3, title: "Đề thi Toán – Đề số 3 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de3.html", available: true },
    { id: 4, title: "Đề thi Toán – Đề số 4 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de4.html", available: true },
    { id: 5, title: "Đề thi Toán – Đề số 5 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de5.html", available: true },
    { id: 6, title: "Đề thi Toán – Đề số 6 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de6.html", available: true },
    { id: 7, title: "Đề thi Toán – Đề số 7 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de7.html", available: true },
    { id: 8, title: "Đề thi Toán – Đề số 8 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de8.html", available: true },
    { id: 9, title: "Đề thi Toán – Đề số 9 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de9.html", available: true },
    { id: 10, title: "Đề thi Toán – Đề số 10 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de10.html", available: true},
    { id: 11, title: "Đề thi Toán – Đề số 11 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de11.html", available: true },
    { id: 12, title: "Đề thi Toán – Đề số 12 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de12.html", available: true },
    
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
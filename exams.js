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
    { id: 13, title: "Đề thi Toán – Đề số 13 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de13.html", available: true },
    { id: 14, title: "Đề thi Toán – Đề số 14 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de14.html", available: true },
    { id: 15, title: "Đề thi Toán – Đề số 15 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de15.html", available: true },
    { id: 16, title: "Đề thi Toán – Đề số 16 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de16.html", available: true },
    { id: 17, title: "Đề thi Toán – Đề số 17 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de17.html", available: true },
    { id: 18, title: "Đề thi Toán – Đề số 18 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de18.html", available: true },
    { id: 19, title: "Đề thi Toán – Đề số 19 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de19.html", available: true },
    { id: 20, title: "Đề thi Toán – Đề số 20 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de20.html", available: true },
    { id: 21, title: "Đề thi Toán – Đề số 21 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de21.html", available: true },
    { id: 22, title: "Đề thi Toán – Đề số 22 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de22.html", available: true },
    { id: 23, title: "Đề thi Toán – Đề số 23 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de23.html", available: true },
    { id: 24, title: "Đề thi Toán – Đề số 24 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de24.html", available: true },
    { id: 25, title: "Đề thi Toán – Đề số 25 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de25.html", available: true },
    { id: 26, title: "Đề thi Toán – Đề số 26 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de26.html", available: true },
    { id: 27, title: "Đề thi Toán – Đề số 27 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de27.html", available: true },
    { id: 28, title: "Đề thi Toán – Đề số 28 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de28.html", available: true },
    { id: 29, title: "Đề thi Toán – Đề số 29 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de29.html", available: true },
    { id: 30, title: "Đề thi Toán – Đề số 30 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de30.html", available: true },
    { id: 31, title: "Đề thi Toán – Đề số 31 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de31.html", available: true },
    { id: 32, title: "Đề thi Toán – Đề số 32 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de32.html", available: true },
    { id: 33, title: "Đề thi Toán – Đề số 33 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de33.html", available: true },
    { id: 34, title: "Đề thi Toán – Đề số 34 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de34.html", available: true },
    { id: 35, title: "Đề thi Toán – Đề số 35 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de35.html", available: true },
    { id: 36, title: "Đề thi Toán – Đề số 36 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de36.html", available: true },
    { id: 37, title: "Đề thi Toán – Đề số 37 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de37.html", available: true },
    { id: 38, title: "Đề thi Toán – Đề số 38 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de38.html", available: true },
    { id: 39, title: "Đề thi Toán – Đề số 39 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de39.html", available: true },
    { id: 40, title: "Đề thi Toán – Đề số 40 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de40.html", available: true },
    { id: 41, title: "Đề thi Toán – Đề số 41 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de41.html", available: true },
    { id: 42, title: "Đề thi Toán – Đề số 42 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de42.html", available: true },
    { id: 43, title: "Đề thi Toán – Đề số 43 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de43.html", available: true },
    { id: 44, title: "Đề thi Toán – Đề số 44 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de44.html", available: true },
    { id: 45, title: "Đề thi Toán – Đề số 45 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de45.html", available: true },
    { id: 46, title: "Đề thi Toán – Đề số 46 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de46.html", available: true },
    { id: 47, title: "Đề thi Toán – Đề số 47 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de47.html", available: true },
    { id: 48, title: "Đề thi Toán – Đề số 48 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de48.html", available: true },
    { id: 49, title: "Đề thi Toán – Đề số 49 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de49.html", available: true },
    { id: 50, title: "Đề thi Toán – Đề số 50 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de50.html", available: true },
    { id: 51, title: "Đề thi Toán – Đề số 51 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de51.html", available: true },
    { id: 52, title: "Đề thi Toán – Đề số 52 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de52.html", available: true },
    { id: 53, title: "Đề thi Toán – Đề số 53 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de53.html", available: true },
    { id: 54, title: "Đề thi Toán – Đề số 54 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de54.html", available: true },
    { id: 55, title: "Đề thi Toán – Đề số 55 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de55.html", available: true },
    { id: 56, title: "Đề thi Toán – Đề số 56 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de56.html", available: true },
    { id: 57, title: "Đề thi Toán – Đề số 57 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de57.html", available: true },
    { id: 58, title: "Đề thi Toán – Đề số 58 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de58.html", available: true },
    { id: 59, title: "Đề thi Toán – Đề số 59 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de59.html", available: true },
    { id: 60, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de60.html", available: true },
    { id: 61, title: "Đề thi Toán – Đề số 61 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de61.html", available: true },
    { id: 62, title: "Đề thi Toán – Đề số 62 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de62.html", available: true },
    { id: 64, title: "Đề thi Toán – Đề số 63 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de63.html", available: true },
    { id: 65, title: "Đề thi Toán – Đề số 64 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de64.html", available: true },
    { id: 66, title: "Đề thi Toán – Đề số 65 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de65.html", available: true },
    { id: 67, title: "Đề thi Toán – Đề số 66 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de66.html", available: true },
    { id: 68, title: "Đề thi Toán – Đề số 67 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de67.html", available: true },
    { id: 69, title: "Đề thi Toán – Đề số 68 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de68.html", available: true },
    { id: 70, title: "Đề thi Toán – Đề số 69 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de69.html", available: true },
    { id: 71, title: "Đề thi Toán – Đề số 71 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de71.html", available: true },
    { id: 72, title: "Đề thi Toán – Đề số 72 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de72.html", available: true },
    { id: 73, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de60.html", available: true },
    { id: 75, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de60.html", available: true },
    { id: 76, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de60.html", available: true },
    { id: 77, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de77.html", available: true },
    { id: 78, title: "Đề thi Toán – Đề số 60 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de78.html", available: true },
    { id: 79, title: "Đề thi Toán – Đề số 6060 – Ôn thi TN THPT", topic: "Luyện Đề", file: "de79.html", available: true },
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
function createDropdownMenu() {
      const dropdown = document.getElementById('examDropdown');
      examList.forEach(exam => {
          const link = document.createElement('a');
          link.href = exam.available ? exam.file : '#';
          link.textContent = exam.title;
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
      const randomExam = availableExams[Math.floor(Math.random() * availableExams.length)];
      window.location.href = randomExam.file;
  }

  function loadSidebar() {
      fetch('sidebar.html')
          .then(response => response.text())
          .then(data => {
              document.getElementById('sidebar').innerHTML = data;
          })
          .catch(error => console.error('Error loading sidebar:', error));
  }

  function checkAnswer(questionId, correctAnswer) {
      const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
      const feedbackDiv = document.getElementById(`feedback-${questionId}`);
      if (selectedOption) {
          if (selectedOption.value === correctAnswer) {
              feedbackDiv.innerHTML = '<p style="color: green;">Chính xác!</p>';
          } else {
              feedbackDiv.innerHTML = '<p style="color: red;">Sai rồi! Hãy thử lại.</p>';
          }
      } else {
          feedbackDiv.innerHTML = '<p style="color: orange;">Vui lòng chọn một đáp án!</p>';
      }
  }

  function checkTrueFalseAnswer(questionId, correctAnswers) {
      const feedbackDiv = document.getElementById(`feedback-${questionId}`);
      let allCorrect = true;
      correctAnswers.forEach((answer, index) => {
          const selectedOption = document.querySelector(`input[name="${questionId}${String.fromCharCode(97 + index)}"]:checked`);
          if (!selectedOption || selectedOption.value !== answer) {
              allCorrect = false;
          }
      });
      if (allCorrect) {
          feedbackDiv.innerHTML = '<p style="color: green;">Chính xác!</p>';
      } else {
          feedbackDiv.innerHTML = '<p style="color: red;">Sai rồi! Hãy thử lại.</p>';
      }
  }

  function checkShortAnswer(questionId, correctAnswer) {
      const userAnswer = document.getElementById(`${questionId}-input`).value.trim();
      const feedbackDiv = document.getElementById(`feedback-${questionId}`);
      if (userAnswer === correctAnswer) {
          feedbackDiv.innerHTML = '<p style="color: green;">Chính xác!</p>';
      } else {
          feedbackDiv.innerHTML = '<p style="color: red;">Sai rồi! Đáp án đúng là: ' + correctAnswer + '</p>';
      }
  }

  function toggleSolution(element) {
      const solutionDiv = element.nextElementSibling;
      if (solutionDiv.style.display === 'block') {
          solutionDiv.style.display = 'none';
          element.textContent = 'Xem lời giải';
      } else {
          solutionDiv.style.display = 'block';
          element.textContent = 'Ẩn lời giải';
      }
  }
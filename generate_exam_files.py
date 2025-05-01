# Script to generate 60 HTML exam files (de1.html to de60.html)

# HTML template for each exam file
template = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ĐỀ THI TOÁN - ĐỀ SỐ {exam_number} với các câu hỏi trắc nghiệm và lời giải chi tiết.">
    <title>ĐỀ THI TOÁN - ĐỀ {exam_number} - ĐỒNG HÀNH CÙNG HỌC SINH</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="header">
        <div class="logo">ĐỒNG HÀNH CÙNG HỌC SINH</div>
        <div class="course">
            <a href="#">Khóa học Toán Thầy Bình</a>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Tìm kiếm đề thi (VD: Đề 50)">
        </div>
        <div class="nav-links">
            <a href="#">Học online</a>
            <a href="#">Tài liệu</a>
            <a href="#">Liên hệ</a>
        </div>
    </div>

    <div class="nav-tabs">
        <div class="dropdown">
            <span class="dropdown-btn">Chọn đề thi ▼</span>
            <div class="dropdown-content" id="examDropdown"></div>
        </div>
        <a href="#" class="random-exam" onclick="goToRandomExam()">Đề ngẫu nhiên</a>
    </div>

    <div class="container">
        <div class="sidebar" id="sidebar"></div>

        <div class="main-content">
            <h1>ĐỀ THI TOÁN - ĐỀ SỐ {exam_number} <span class="hot">HOT</span></h1>

            <h2>Phần I: Trắc Nghiệm Nhiều Lựa Chọn</h2>
            <!-- Ghi chú: Thêm 12 câu trắc nghiệm nhiều lựa chọn tại đây (Câu 1 đến Câu 12). Copy-paste nội dung từ PDF vào các vị trí được ghi chú bên dưới. -->
{part1_questions}

            <h2>Phần II: Trắc Nghiệm Đúng/Sai</h2>
            <!-- Ghi chú: Thêm 4 câu trắc nghiệm Đúng/Sai tại đây (Câu 1 đến Câu 4). Copy-paste nội dung từ PDF vào các vị trí được ghi chú bên dưới. -->
{part2_questions}

            <h2>Phần III: Trắc Nghiệm Trả Lời Ngắn</h2>
            <!-- Ghi chú: Thêm 6 câu trắc nghiệm trả lời ngắn tại đây (Câu 1 đến Câu 6). Copy-paste nội dung từ PDF vào các vị trí được ghi chú bên dưới. -->
{part3_questions}

            <div class="navigation-buttons">
                <a href="{prev_exam}" {prev_disabled}>Đề trước: {prev_label}</a>
                <a href="{next_exam}" {next_disabled}>Đề sau: {next_label}</a>
            </div>
        </div>
    </div>

    <script src="exams.js"></script>
    <script src="scripts.js"></script>
    <script>
        createDropdownMenu();
        loadSidebar();
    </script>
</body>
</html>
"""

# Template for a single multiple-choice question
part1_question_template = """            <div class="question">
                <h3>Câu {question_number}:</h3>
                <p><!-- [Thêm câu hỏi tại đây] --></p>
                <div class="options">
                    <div class="option">A. <!-- [Thêm đáp án A] --></div>
                    <div class="option">B. <!-- [Thêm đáp án B] --></div>
                    <div class="option">C. <!-- [Thêm đáp án C] --></div>
                    <div class="option">D. <!-- [Thêm đáp án D] --></div>
                </div>
                <div class="answer-check">
                    <p>Chọn đáp án:</p>
                    <label><input type="radio" name="q{question_id}" value="A"> A</label>
                    <label><input type="radio" name="q{question_id}" value="B"> B</label>
                    <label><input type="radio" name="q{question_id}" value="C"> C</label>
                    <label><input type="radio" name="q{question_id}" value="D"> D</label>
                    <button onclick="checkAnswer('q{question_id}', 'A')"><!-- [Thêm đáp án đúng vào checkAnswer, ví dụ: checkAnswer('q{question_id}', 'A')] -->Kiểm tra</button>
                </div>
                <div class="answer-feedback" id="feedback-q{question_id}"></div>
                <div class="solution-toggle" onclick="toggleSolution(this)">Xem lời giải</div>
                <div class="solution">
                    <p><strong>Cách giải:</strong> <!-- [Thêm lời giải tại đây] --></p>
                </div>
            </div>"""

# Template for a single true/false question
part2_question_template = """            <div class="question">
                <h3>Câu {question_number}:</h3>
                <p><!-- [Thêm câu hỏi tại đây] --></p>
                <div class="options">
                    <div class="option">a) <!-- [Thêm phát biểu a] --></div>
                    <div class="option">b) <!-- [Thêm phát biểu b] --></div>
                </div>
                <div class="answer-check">
                    <p>Chọn đáp án cho từng phát biểu:</p>
                    <p>a) <label><input type="radio" name="q{question_id}a" value="Đúng"> Đúng</label> <label><input type="radio" name="q{question_id}a" value="Sai"> Sai</label></p>
                    <p>b) <label><input type="radio" name="q{question_id}b" value="Đúng"> Đúng</label> <label><input type="radio" name="q{question_id}b" value="Sai"> Sai</label></p>
                    <button onclick="checkTrueFalseAnswer('q{question_id}', ['Đúng', 'Sai'])"><!-- [Thêm đáp án đúng vào checkTrueFalseAnswer, ví dụ: checkTrueFalseAnswer('q{question_id}', ['Đúng', 'Sai'])] -->Kiểm tra</button>
                </div>
                <div class="answer-feedback" id="feedback-q{question_id}"></div>
                <div class="solution-toggle" onclick="toggleSolution(this)">Xem lời giải</div>
                <div class="solution">
                    <p><strong>Cách giải:</strong> <!-- [Thêm lời giải tại đây] --></p>
                </div>
            </div>"""

# Template for a single short-answer question
part3_question_template = """            <div class="question">
                <h3>Câu {question_number}:</h3>
                <p><!-- [Thêm câu hỏi tại đây] --></p>
                <div class="answer-check">
                    <p>Nhập đáp án: <input type="text" id="q{question_id}-input"> <button onclick="checkShortAnswer('q{question_id}', '1')"><!-- [Thêm đáp án đúng vào checkShortAnswer, ví dụ: checkShortAnswer('q{question_id}', '1')] -->Kiểm tra</button></p>
                </div>
                <div class="answer-feedback" id="feedback-q{question_id}"></div>
                <div class="solution-toggle" onclick="toggleSolution(this)">Xem lời giải</div>
                <div class="solution">
                    <p><strong>Cách giải:</strong> <!-- [Thêm lời giải tại đây] --></p>
                </div>
            </div>"""

# Generate 60 exam files
for exam_number in range(1, 61):
    # Generate Part I: 12 multiple-choice questions
    part1_questions = ""
    for q in range(1, 13):
        question_id = q
        part1_questions += part1_question_template.format(question_number=q, question_id=question_id)

    # Generate Part II: 4 true/false questions
    part2_questions = ""
    for q in range(1, 5):
        question_id = 12 + q
        part2_questions += part2_question_template.format(question_number=q, question_id=question_id)

    # Generate Part III: 6 short-answer questions
    part3_questions = ""
    for q in range(1, 7):
        question_id = 16 + q
        part3_questions += part3_question_template.format(question_number=q, question_id=question_id)

    # Navigation links
    prev_exam = "#" if exam_number == 1 else f"de{exam_number-1}.html"
    prev_label = "Không có" if exam_number == 1 else f"Đề {exam_number-1}"
    prev_disabled = 'class="disabled"' if exam_number == 1 else ""
    
    next_exam = "#" if exam_number == 60 else f"de{exam_number+1}.html"
    next_label = "Không có" if exam_number == 60 else f"Đề {exam_number+1}"
    next_disabled = 'class="disabled"' if exam_number == 60 else ""

    # Generate the full HTML content
    html_content = template.format(
        exam_number=exam_number,
        part1_questions=part1_questions,
        part2_questions=part2_questions,
        part3_questions=part3_questions,
        prev_exam=prev_exam,
        prev_label=prev_label,
        prev_disabled=prev_disabled,
        next_exam=next_exam,
        next_label=next_label,
        next_disabled=next_disabled
    )

    # Write to file
    with open(f"de{exam_number}.html", "w", encoding="utf-8") as f:
        f.write(html_content)

print("Generated 60 HTML files (de1.html to de60.html).")
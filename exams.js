const examList = Array.from({ length: 100 }, (_, i) => {
    let topic = "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số"; // Mặc định
    if (i === 0) topic = "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số"; // Đề 1
    else if (i === 1) topic = "Khối đa diện và thể tích"; // Đề 2
    else if (i === 2) topic = "Thống kê và xác suất"; // Đề 3
    else if (i % 5 === 0) topic = "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số";
    else if (i % 5 === 1) topic = "Nguyên hàm, tích phân và ứng dụng";
    else if (i % 5 === 2) topic = "Thống kê và xác suất";
    else if (i % 5 === 3) topic = "Khối đa diện và thể tích";
    else topic = "Phương pháp tọa độ trong không gian";

    return {
        id: i + 1,
        title: `Đề thi Toán - Đề số ${i + 1}`,
        file: `de${i + 1}.html`,
        available: i <= 2, // Đề 1, Đề 2, Đề 3 có sẵn
        topic: topic
    };
});
// --- KHU VỰC NHẬP DỮ LIỆU PHÒNG TRỌ (Giữ nguyên dữ liệu cũ của bạn hoặc dùng mẫu này) ---
const rooms = [
    {
        id: 1,
        name: "Căn hộ studio full nội thất, ban công thoáng mát",
        district: "Quận 1",
        price: 5500000,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example1"
    },
    {
        id: 2,
        name: "Phòng trọ sinh viên giá tốt, gần trường ĐH",
        district: "Bình Thạnh",
        price: 2800000,
        image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example2"
    },
    {
        id: 3,
        name: "Căn hộ mini hiện đại, an ninh 24/7",
        district: "Quận 7",
        price: 4500000,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example3"
    },
    {
        id: 4,
        name: "Phòng duplex sang trọng trung tâm Quận 3",
        district: "Quận 3",
        price: 7200000,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example4"
    }
];

// --- KHU VỰC XỬ LÝ (Đã cập nhật giao diện mới) ---
function displayRooms(data) {
    const list = document.getElementById("room-list");
    list.innerHTML = "";

    if(data.length === 0) {
        list.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                            <h3>Không tìm thấy kết quả nào!</h3>
                            <p>Vui lòng thử thay đổi bộ lọc.</p>
                          </div>`;
        return;
    }

    data.forEach(room => {
        // Định dạng giá tiền cho đẹp (ví dụ: 5.500.000 VNĐ)
        const formattedPrice = room.price.toLocaleString('vi-VN');

        const card = `
            <div class="room-card">
                <div class="img-wrapper">
                    <img src="${room.image}" alt="${room.name}" class="room-img">
                    <span class="price-badge">${formattedPrice}đ</span>
                </div>
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <div class="meta-info">
                        <span class="meta-icon">📍</span> ${room.district}
                    </div>
                    <a href="${room.map}" target="_blank" class="btn-map-outline">Xem vị trí trên Map →</a>
                </div>
            </div>
        `;
        list.innerHTML += card;
    });
}

function filterRooms() {
    const district = document.getElementById("filter-district").value;
    const priceRange = document.getElementById("filter-price").value;
    const btn = document.querySelector('.btn-search');
    
    // Hiệu ứng loading nhẹ cho nút bấm
    btn.textContent = "Đang tìm...";
    setTimeout(() => {
        const filtered = rooms.filter(room => {
            const matchDistrict = district === "all" || room.district === district;
            let matchPrice = false;
            if (priceRange === "all") matchPrice = true;
            else if (priceRange === "duoi3") matchPrice = room.price < 3000000;
            else if (priceRange === "3den5") matchPrice = room.price >= 3000000 && room.price <= 5000000;
            else if (priceRange === "tren5") matchPrice = room.price > 5000000;
            return matchDistrict && matchPrice;
        });
        displayRooms(filtered);
        btn.textContent = "Áp dụng bộ lọc"; // Trả lại tên nút cũ
    }, 300); // Giả lập độ trễ nhẹ cho chuyên nghiệp
}

// Chạy hàm hiển thị lần đầu
displayRooms(rooms);

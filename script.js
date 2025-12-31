// --- KHU VỰC NHẬP DỮ LIỆU PHÒNG TRỌ ---
const rooms = [
    {
        id: 1,
        name: "Phòng trọ cao cấp có ban công",
        district: "Quận 1",
        price: 5500000, // Nhập số liền, không dấu chấm
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500", // Link ảnh
        map: "https://goo.gl/maps/example1" // Link Google Map
    },
    {
        id: 2,
        name: "Homestay giá rẻ sinh viên",
        district: "Bình Thạnh",
        price: 2800000,
        image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?w=500",
        map: "https://goo.gl/maps/example2"
    },
    {
        id: 3,
        name: "Căn hộ mini Quận 7",
        district: "Quận 7",
        price: 4500000,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        map: "https://goo.gl/maps/example3"
    }
    // Muốn thêm phòng thì copy cụm {} ở trên, dán xuống dưới và sửa thông tin
];

// --- KHU VỰC XỬ LÝ (KHÔNG CẦN SỬA) ---
function displayRooms(data) {
    const list = document.getElementById("room-list");
    list.innerHTML = ""; // Xóa danh sách cũ

    if(data.length === 0) {
        list.innerHTML = "<p>Không tìm thấy phòng phù hợp!</p>";
        return;
    }

    data.forEach(room => {
        const card = `
            <div class="room-card">
                <img src="${room.image}" alt="${room.name}" class="room-img">
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <p class="room-district">📍 ${room.district}</p>
                    <p class="room-price">${room.price.toLocaleString()} VNĐ</p>
                    <a href="${room.map}" target="_blank" class="btn-map">Xem Bản Đồ</a>
                </div>
            </div>
        `;
        list.innerHTML += card;
    });
}

function filterRooms() {
    const district = document.getElementById("filter-district").value;
    const priceRange = document.getElementById("filter-price").value;

    const filtered = rooms.filter(room => {
        // Lọc theo Quận
        const matchDistrict = district === "all" || room.district === district;
        
        // Lọc theo Giá
        let matchPrice = false;
        if (priceRange === "all") matchPrice = true;
        else if (priceRange === "duoi3") matchPrice = room.price < 3000000;
        else if (priceRange === "3den5") matchPrice = room.price >= 3000000 && room.price <= 5000000;
        else if (priceRange === "tren5") matchPrice = room.price > 5000000;

        return matchDistrict && matchPrice;
    });

    displayRooms(filtered);
}

// Chạy hàm hiển thị lần đầu khi mở web
displayRooms(rooms);

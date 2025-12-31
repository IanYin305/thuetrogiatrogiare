const rooms = [
    {
        id: 1,
        name: "Căn hộ Studio view Landmark 81",
        district: "Bình Thạnh",
        price: 5500000,
        electricity: "3.500đ/kwh",
        water: "100.000đ/người",
        parking: "Miễn phí",
        tags: ["Sẵn nội thất", "Ban công", "Giờ tự do"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        map: "https://goo.gl/maps/example1"
    },
    {
        id: 2,
        name: "Phòng trọ Full nội thất gần ĐH Tôn Đức Thắng",
        district: "Quận 7",
        price: 3200000,
        electricity: "4.000đ/kwh",
        water: "15.000đ/khối",
        parking: "100.000đ/xe",
        tags: ["Sẵn nội thất", "Máy giặt chung"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        map: "https://goo.gl/maps/example2"
    }
    // Bạn có thể thêm các phòng khác tương tự ở đây
];

function displayRooms(data) {
    const list = document.getElementById("room-list");
    list.innerHTML = "";

    data.forEach(room => {
        const formattedPrice = room.price.toLocaleString('vi-VN');
        
        // Tạo chuỗi HTML cho các Tag tiện ích
        const tagsHTML = room.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

        const card = `
            <div class="room-card">
                <div class="img-wrapper" onclick="window.open('${room.map}', '_blank')">
                    <img src="${room.image}" alt="${room.name}" class="room-img">
                    <div class="parking-badge">${room.parking === 'Miễn phí' ? '🚲 Free xe' : '🚲 Có chỗ để xe'}</div>
                </div>
                <div class="room-info">
                    <div class="tags-container">${tagsHTML}</div>
                    <h3 onclick="window.open('${room.map}', '_blank')">${room.name}</h3>
                    <p class="room-district">📍 ${room.district}</p>
                    
                    <div class="fees">
                        <span>⚡ ${room.electricity}</span>
                        <span>💧 ${room.water}</span>
                    </div>

                    <div class="card-footer">
                        <div class="room-price">${formattedPrice}₫<span class="price-label">/tháng</span></div>
                        <a href="https://zalo.me/0984877846" target="_blank" class="btn-zalo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="20"> Nhắn Zalo
                        </a>
                    </div>
                </div>
            </div>
        `;
        list.innerHTML += card;
    });
}

// Giữ nguyên hàm filterRooms cũ của bạn
displayRooms(rooms);

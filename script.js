// Dữ liệu mẫu (Bạn có thể thêm nhiều hơn)
const rooms = [
    {
        id: 1,
        name: "Căn hộ Studio view Landmark 81",
        district: "Bình Thạnh",
        price: 5500000,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example1"
    },
    {
        id: 2,
        name: "Phòng trọ Full nội thất gần ĐH Tôn Đức Thắng",
        district: "Quận 7",
        price: 3200000,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example2"
    },
    {
        id: 3,
        name: "Chung cư mini cao cấp trung tâm Quận 1",
        district: "Quận 1",
        price: 7500000,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example3"
    },
    {
        id: 4,
        name: "Phòng có gác lửng, ban công thoáng",
        district: "Quận 3",
        price: 4800000,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example4"
    },
     {
        id: 5,
        name: "Căn hộ dịch vụ đường Nguyễn Gia Trí",
        district: "Bình Thạnh",
        price: 6000000,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example1"
    },
     {
        id: 6,
        name: "Phòng xinh xắn cho nữ thuê",
        district: "Quận 7",
        price: 2500000,
        image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?w=800&auto=format&fit=crop",
        map: "https://goo.gl/maps/example1"
    }
];

function displayRooms(data) {
    const list = document.getElementById("room-list");
    list.innerHTML = "";

    if(data.length === 0) {
        list.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #222;">
                            <h3>Không tìm thấy phòng phù hợp</h3>
                            <p>Hãy thử thay đổi lựa chọn tìm kiếm của bạn.</p>
                          </div>`;
        return;
    }

    data.forEach(room => {
        // Định dạng giá tiền
        const formattedPrice = room.price.toLocaleString('vi-VN');

        // Cấu trúc thẻ theo phong cách Airbnb (Nhấn vào ảnh để mở Map)
        const card = `
            <div class="room-card" onclick="window.open('${room.map}', '_blank')">
                <div class="img-wrapper">
                    <img src="${room.image}" alt="${room.name}" class="room-img">
                </div>
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <p class="room-district">${room.district}</p>
                    <div class="room-price">
                        ${formattedPrice}₫ <span class="price-label"> / tháng</span>
                    </div>
                </div>
            </div>
        `;
        list.innerHTML += card;
    });
}

function filterRooms() {
    const district = document.getElementById("filter-district").value;
    const priceRange = document.getElementById("filter-price").value;
    const btnText = document.querySelector('.btn-search-round span');
    
    btnText.textContent = "Đang tìm...";

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
        btnText.textContent = "Tìm kiếm";
    }, 200); 
}

// Chạy lần đầu
displayRooms(rooms);

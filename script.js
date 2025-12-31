// 1. DANH SÁCH DỮ LIỆU PHÒNG
const rooms = [
    {
        id: 1,
        name: "Phòng trọ Full nội thất Quận 1",
        district: "Quận 1",
        price: 4500000,
        lat: 10.7769, // Cách lấy: Chuột phải vào bản đồ Google Maps chọn số đầu tiên
        lng: 106.7009, // Số thứ hai
        tags: ["Nội thất", "Free xe"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
    }
];

// 2. KHỞI TẠO BẢN ĐỒ
const map = L.map('map-container').setView([10.7769, 106.7009], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const markerGroup = L.layerGroup().addTo(map);

// 3. HÀM HIỂN THỊ
function displayRooms(data) {
    const list = document.getElementById("room-list");
    list.innerHTML = "";
    markerGroup.clearLayers();

    data.forEach(room => {
        // Hiện danh sách bên trái
        list.innerHTML += `
            <div class="room-card" onclick="map.flyTo([${room.lat}, ${room.lng}], 16)">
                <div class="img-wrapper"><img src="${room.image}"></div>
                <div>${room.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
                <h3 style="font-size: 16px; margin: 5px 0;">${room.name}</h3>
                <div class="room-price">${room.price.toLocaleString()}đ / tháng</div>
                <a href="https://zalo.me/0984877846" style="color:#0068FF; font-size:14px; text-decoration:none; font-weight:700;">Nhắn Zalo</a>
            </div>
        `;

        // Hiện chấm giá tiền lên bản đồ
        const priceTag = (room.price / 1000000).toFixed(1) + "tr";
        const icon = L.divIcon({
            className: 'price-marker-icon',
            html: `<div class="price-marker">${priceTag}</div>`
        });

        L.marker([room.lat, room.lng], {icon: icon})
            .addTo(markerGroup)
            .bindPopup(`<b>${room.name}</b><br>${room.price.toLocaleString()}đ`);
    });
}

// 4. HÀM LỌC (FILTER)
function filterRooms() {
    const d = document.getElementById("filter-district").value;
    const p = document.getElementById("filter-price").value;

    const filtered = rooms.filter(r => {
        const matchD = d === "all" || r.district === d;
        let matchP = true;
        if(p === "duoi3") matchP = r.price < 3000000;
        if(p === "3den5") matchP = r.price >= 3000000 && r.price <= 5000000;
        return matchD && matchP;
    });
    displayRooms(filtered);
}

displayRooms(rooms);
function filterRooms() {
    const d = document.getElementById("filter-district").value;
    const p = document.getElementById("filter-price").value;
    
    // Lấy danh sách các tiện ích đang được tick
    const selectedAmenities = Array.from(document.querySelectorAll('.amenity-check:checked'))
                                   .map(cb => cb.value);

    const filtered = rooms.filter(r => {
        // Lọc theo quận
        const matchD = d === "all" || r.district === d;
        
        // Lọc theo giá
        let matchP = true;
        if(p === "duoi3") matchP = r.price < 3000000;
        if(p === "3den5") matchP = r.price >= 3000000 && r.price <= 5000000;

        // Lọc theo tiện ích (Phòng phải có TẤT CẢ các tiện ích đã chọn)
        const matchAmenities = selectedAmenities.every(amenity => r.tags.includes(amenity));

        return matchD && matchP && matchAmenities;
    });

    displayRooms(filtered);
}

// Lắng nghe sự kiện click vào checkbox để lọc ngay lập tức
document.querySelectorAll('.amenity-check').forEach(check => {
    check.addEventListener('change', filterRooms);
});
// Tự động lọc khi bấm vào bất kỳ checkbox nào
document.querySelectorAll('.amenity-check').forEach(check => {
    check.addEventListener('change', filterRooms);
});
function surpriseMe() {
    // 1. Kiểm tra nếu có danh sách phòng
    if (rooms.length === 0) return;

    // 2. Chọn ngẫu nhiên một vị trí trong mảng
    const randomIndex = Math.floor(Math.random() * rooms.length);
    const luckyRoom = rooms[randomIndex];

    // 3. Hiệu ứng bản đồ bay đến phòng đó
    map.flyTo([luckyRoom.lat, luckyRoom.lng], 16, {
        animate: true,
        duration: 2 // Bay trong 2 giây cho mượt
    });

    // 4. Tự động mở Popup của phòng đó trên bản đồ (tùy chọn)
    // Để làm điều này, bạn cần lưu trữ marker vào một mảng khi tạo marker ở hàm displayRooms
    
    alert("VietHome đã chọn cho bạn: " + luckyRoom.name + " ✨. Xem ngay nhé!");
}
// Global variable to store markers so we can interact with them later
let currentMarkers = [];

function displayRooms(data) {
    const list = document.getElementById("room-list");
    list.innerHTML = "";
    markerGroup.clearLayers(); // Xóa các chấm cũ trên bản đồ
    currentMarkers = []; // Reset danh sách markers

    if (data.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding:20px; color:#717171;">Không tìm thấy phòng phù hợp. Hãy thử lại nhé!</p>`;
        return;
    }

    data.forEach((room, index) => { // Thêm 'index' để tạo độ trễ
        const priceTag = (room.price / 1000000).toFixed(1) + "tr";
        
        // 1. Tạo thẻ phòng (Danh sách bên trái)
        // Dùng setTimeout để thêm class 'show' sau một độ trễ
        setTimeout(() => {
            const roomCardDiv = document.createElement('div');
            roomCardDiv.className = 'room-card'; // ban đầu chưa có 'show'
            roomCardDiv.setAttribute('data-lat', room.lat); // Lưu trữ lat, lng
            roomCardDiv.setAttribute('data-lng', room.lng);
            roomCardDiv.setAttribute('id', `room-${room.id}`); // ID duy nhất cho mỗi phòng

            roomCardDiv.innerHTML = `
                <div class="img-wrapper"><img src="${room.image}"></div>
                <div>${room.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
                <h3 style="font-size: 16px; margin: 5px 0;">${room.name}</h3>
                <div class="room-price">${room.price.toLocaleString()}đ / tháng</div>
                <a href="https://zalo.me/0984877846" target="_blank" style="color:#0068FF; font-size:14px; text-decoration:none; font-weight:700;">Nhắn Zalo</a>
            `;
            list.appendChild(roomCardDiv);

            // Thêm class 'show' để kích hoạt animation
            setTimeout(() => {
                roomCardDiv.classList.add('show');
            }, 50); // Độ trễ nhỏ giữa các thẻ
            
            // Thêm sự kiện click vào thẻ để bản đồ bay đến
            roomCardDiv.addEventListener('click', () => {
                map.flyTo([room.lat, room.lng], 16, { animate: true, duration: 1.5 });
                // Optional: Open the marker popup when clicking the card
                // const markerToOpen = currentMarkers.find(m => m.options.id === room.id);
                // if (markerToOpen) {
                //     markerToOpen.openPopup();
                // }
            });

        }, index * 100); // Mỗi thẻ xuất hiện cách nhau 0.1 giây

        // 2. Tạo chấm hiển thị giá trên bản đồ
        const icon = L.divIcon({
            className: 'price-marker-icon',
            html: `<div class="price-marker">${priceTag}</div>`
        });

        const marker = L.marker([room.lat, room.lng], {icon: icon, id: room.id}) // Lưu ID vào marker
            .addTo(markerGroup)
            .bindPopup(`
                <div style="width:150px">
                    <img src="${room.image}" style="width:100%; border-radius:8px">
                    <h4 style="margin:5px 0">${room.name}</h4>
                    <p style="color:red; font-weight:bold">${room.price.toLocaleString()}đ</p>
                    <a href="#room-${room.id}" style="color:blue">Xem chi tiết</a>
                </div>
            `);
        currentMarkers.push(marker); // Lưu marker vào mảng
    });
}

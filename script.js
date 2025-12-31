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

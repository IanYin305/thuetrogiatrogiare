// Code JavaScript tùy chỉnh cho website
document.addEventListener('DOMContentLoaded', function() {
    // Bản đồ Leaflet
    var map = L.map('map').setView([10.7769, 106.7009], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    new OSMBuildings(map).load();
    L.Control.geocoder().addTo(map);

    // Markers phòng trọ
    L.marker([10.7765, 106.7010]).addTo(map).bindPopup("<b>Phòng Quận 1</b><br>5 triệu/tháng");
    L.marker([10.7626, 106.6822]).addTo(map).bindPopup("<b>Phòng Quận 7</b><br>7 triệu/tháng");
    L.marker([10.7965, 106.6658]).addTo(map).bindPopup("<b>Phòng Bình Thạnh</b><br>4 triệu/tháng");

    // Tìm kiếm danh sách phòng
    const searchInput = document.getElementById('roomSearch');
    const roomCards = document.querySelectorAll('.room-card');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        roomCards.forEach(card => {
            const district = card.getAttribute('data-district').toLowerCase();
            const price = parseInt(card.getAttribute('data-price'));
            const features = card.getAttribute('data-features').toLowerCase();
            
            let match = district.includes(query) || features.includes(query);
            if (query.includes('dưới') && query.includes('triệu')) {
                const maxPrice = parseInt(query.match(/\d+/)?.[0] || 0) * 1000000;
                if (price <= maxPrice) match = true;
            }
            card.style.display = match ? 'block' : 'none';
        });
    });
});

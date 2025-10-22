# Self Restaurant - Quầy Tự Phục Vụ

Ứng dụng web quầy tự phục vụ cho nhà hàng với giao diện hiện đại và chức năng đầy đủ.

## Tính năng

- 🍽️ **Menu đa dạng**: Món chính, món phụ, đồ uống, tráng miệng
- 📱 **Đặt món tại bàn**: Giao diện cảm ứng thân thiện
- 💰 **Thanh toán đa phương thức**: Tiền mặt, thẻ, QR code, chuyển khoản
- 🌙 **Chế độ sáng/tối**: Tự động lưu preference
- 📊 **Quản lý đơn hàng**: Theo dõi và xử lý đơn hàng real-time
- 💾 **Lưu trữ local**: Dữ liệu được lưu trong localStorage

## Cách sử dụng

### Đặt món tại bàn
1. Chọn món ăn từ menu
2. Điều chỉnh số lượng
3. Nhập số bàn
4. Xác nhận đơn hàng

### Thanh toán tại quầy
1. Nhập số bàn để tìm đơn hàng
2. Chọn phương thức thanh toán
3. Nhập số tiền (nếu thanh toán tiền mặt)
4. Xác nhận thanh toán

## Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Storage**: localStorage API
- **Responsive**: Mobile-first design
- **Accessibility**: Keyboard navigation, touch-friendly

## Cài đặt và chạy

1. Clone repository:
```bash
git clone <repository-url>
cd selfrestaurant
```

2. **Cách 1: Mở trực tiếp**
   - Mở file `index.html` trong trình duyệt web
   - Hoặc double-click vào `index.html`

3. **Cách 2: Sử dụng local server (khuyến nghị)**
```bash
# Python 3
python -m http.server 8000

# Node.js
node server.js

# Hoặc sử dụng npx
npx http-server

# PHP
php -S localhost:8000
```

4. Truy cập `http://localhost:8000` trong trình duyệt

## Cấu trúc thư mục

```
selfrestaurant/
├── index.html              # Trang chủ
├── order.html              # Trang đặt món
├── payment.html            # Trang thanh toán
├── demo.html               # Trang demo và quản lý dữ liệu
├── server.js               # Optional local server
├── package.json             # Project metadata
├── .gitignore              # Git ignore rules
├── static/
│   ├── css/
│   │   └── style.css       # Stylesheet chính
│   ├── js/
│   │   ├── main.js         # JavaScript chung
│   │   ├── order.js        # Logic đặt món
│   │   ├── payment.js      # Logic thanh toán
│   │   └── data-storage.js # Quản lý dữ liệu localStorage
│   └── images/             # Hình ảnh món ăn (40+ files)
├── README.md               # Hướng dẫn sử dụng
└── DEPLOYMENT.md           # Hướng dẫn deploy GitHub Pages
```

## Tính năng nâng cao

- **PWA Ready**: Có thể cài đặt như ứng dụng
- **Offline Support**: Hoạt động offline với localStorage
- **Theme System**: Hỗ trợ dark/light mode
- **Touch Optimized**: Tối ưu cho màn hình cảm ứng
- **Keyboard Shortcuts**: Hỗ trợ phím tắt

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## Liên hệ

Nếu có câu hỏi hoặc góp ý, vui lòng liên hệ qua GitHub Issues.
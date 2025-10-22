# Hướng Dẫn Deploy Lên GitHub Pages

## Bước 1: Chuẩn bị Repository

1. Tạo repository mới trên GitHub
2. Clone repository về máy local:
```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```

3. Copy tất cả file đã chuyển đổi vào thư mục repository

## Bước 2: Cấu trúc File

Đảm bảo cấu trúc thư mục như sau:
```
repository-name/
├── index.html
├── order.html
├── payment.html
├── demo.html
├── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js
    │   ├── order.js
    │   ├── payment.js
    │   └── data-storage.js
    └── images/
        ├── pho-bo.jpg
        ├── bun-bo-hue.jpg
        └── ... (tất cả hình ảnh món ăn)
```

## Bước 3: Commit và Push

```bash
git add .
git commit -m "Convert Flask app to static JavaScript for GitHub Pages"
git push origin main
```

## Bước 4: Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. Click vào tab **Settings**
3. Scroll xuống phần **Pages**
4. Trong **Source**, chọn **Deploy from a branch**
5. Chọn branch **main** và folder **/ (root)**
6. Click **Save**

## Bước 5: Kiểm tra Deployment

- GitHub Pages sẽ tự động build và deploy
- URL sẽ là: `https://username.github.io/repository-name`
- Quá trình deploy có thể mất 5-10 phút

## Bước 6: Test Tính Năng

1. **Trang chủ**: Kiểm tra navigation và theme toggle
2. **Đặt món**: 
   - Chọn món ăn
   - Điều chỉnh số lượng
   - Nhập số bàn
   - Xác nhận đơn hàng
3. **Thanh toán**:
   - Tìm đơn hàng bằng số bàn
   - Chọn phương thức thanh toán
   - Nhập số tiền và xác nhận
4. **Demo**: Kiểm tra các chức năng quản lý dữ liệu

## Troubleshooting

### Lỗi 404
- Kiểm tra đường dẫn file có đúng không
- Đảm bảo tất cả file đã được commit và push

### Hình ảnh không hiển thị
- Kiểm tra đường dẫn trong file CSS và HTML
- Đảm bảo tất cả file hình ảnh đã được upload

### JavaScript không hoạt động
- Mở Developer Tools (F12) để kiểm tra console errors
- Đảm bảo tất cả file JS đã được load đúng

### localStorage không hoạt động
- Kiểm tra browser có hỗ trợ localStorage không
- Thử trên browser khác

## Tính Năng Đặc Biệt

### Offline Support
- Ứng dụng hoạt động offline sau khi load lần đầu
- Dữ liệu được lưu trong localStorage
- Không cần server backend

### Responsive Design
- Tự động adapt với mọi kích thước màn hình
- Touch-friendly cho mobile và tablet
- Keyboard navigation support

### Theme System
- Dark/Light mode tự động lưu preference
- Smooth transitions giữa các theme
- Consistent styling across all pages

## Custom Domain (Tùy chọn)

Nếu muốn sử dụng domain riêng:

1. Mua domain từ nhà cung cấp
2. Trong GitHub Pages settings, nhập custom domain
3. Cấu hình DNS records theo hướng dẫn của GitHub

## Backup và Restore

- Sử dụng trang Demo để export/import dữ liệu
- Backup được lưu dưới dạng JSON file
- Có thể restore dữ liệu trên bất kỳ browser nào

## Performance Tips

- Tất cả assets được optimize cho web
- CSS và JS được minify tự động
- Images được compress để giảm kích thước
- Sử dụng CDN của GitHub để tăng tốc độ load

## Security Notes

- Không có server-side processing
- Tất cả dữ liệu chỉ lưu local
- Không có risk về data breach
- Perfect cho demo và testing

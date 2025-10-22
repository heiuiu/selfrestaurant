// Data Storage System for Self Restaurant
// Replaces Flask backend with localStorage-based data management

class DataStorage {
    constructor() {
        this.initializeData();
    }

    // Initialize default data if not exists
    initializeData() {
        if (!localStorage.getItem('menuItems')) {
            this.setDefaultMenuItems();
        }
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
        if (!localStorage.getItem('tables')) {
            this.setDefaultTables();
        }
    }

    // Set default menu items
    setDefaultMenuItems() {
        const menuItems = [
            // MÓN CHÍNH
            { id: 1, name: "Phở Bò", description: "Phở bò truyền thống với thịt bò tái, bánh phở mềm và nước dùng đậm đà", price: 55000, category: "Món chính", image_url: "static/images/pho-bo.jpg", is_available: true },
            { id: 2, name: "Bún Bò Huế", description: "Bún bò cay đặc sản Huế với thịt bò, chả cua và rau thơm", price: 60000, category: "Món chính", image_url: "static/images/bun-bo-hue.jpg", is_available: true },
            { id: 3, name: "Cơm Tấm Sườn Nướng", description: "Cơm tấm với sườn nướng thơm lừng, chả trứng và đồ chua", price: 45000, category: "Món chính", image_url: "static/images/com-tam.jpg", is_available: true },
            { id: 4, name: "Bún Chả Hà Nội", description: "Bún chả truyền thống với thịt nướng, nước mắm chua ngọt", price: 50000, category: "Món chính", image_url: "static/images/bun-cha.jpg", is_available: true },
            { id: 5, name: "Cơm Gà Nướng", description: "Cơm gà nướng mật ong với rau xào và nước mắm gừng", price: 48000, category: "Món chính", image_url: "static/images/com-ga-nuong.jpg", is_available: true },
            { id: 6, name: "Bún Riêu Cua", description: "Bún riêu cua đồng với cà chua, đậu phụ và rau sống", price: 42000, category: "Món chính", image_url: "static/images/bun-rieu.jpg", is_available: true },
            { id: 7, name: "Phở Gà", description: "Phở gà với thịt gà luộc, bánh phở và nước dùng trong", price: 50000, category: "Món chính", image_url: "static/images/pho-ga.jpg", is_available: true },
            { id: 8, name: "Cơm Sườn Ram", description: "Cơm sườn ram mặn ngọt với trứng chiên và rau xào", price: 52000, category: "Món chính", image_url: "static/images/com-suon-ram.jpg", is_available: true },
            { id: 9, name: "Bún Mắm", description: "Bún mắm miền Tây với cá lóc, tôm và rau đắng", price: 55000, category: "Món chính", image_url: "static/images/bun-mam.jpg", is_available: true },
            { id: 10, name: "Cơm Cháy", description: "Cơm cháy giòn với thịt kho tàu và dưa chua", price: 45000, category: "Món chính", image_url: "static/images/com-chay.jpg", is_available: true },
            
            // MÓN PHỤ
            { id: 11, name: "Chả Cá Lã Vọng", description: "Chả cá chiên giòn với nghệ và thì là", price: 35000, category: "Món phụ", image_url: "static/images/cha-ca.jpg", is_available: true },
            { id: 12, name: "Nem Nướng Nha Trang", description: "Nem nướng đặc sản Nha Trang với bánh tráng", price: 30000, category: "Món phụ", image_url: "static/images/nem-nuong.jpg", is_available: true },
            { id: 13, name: "Chả Giò", description: "Chả giò chiên giòn với thịt heo và tôm", price: 25000, category: "Món phụ", image_url: "static/images/cha-gio.jpg", is_available: true },
            { id: 14, name: "Gỏi Cuốn", description: "Gỏi cuốn tôm thịt với bánh tráng và rau sống", price: 28000, category: "Món phụ", image_url: "static/images/goi-cuon.jpg", is_available: true },
            { id: 15, name: "Chả Cá Viên", description: "Chả cá viên chiên giòn với nước mắm chua ngọt", price: 20000, category: "Món phụ", image_url: "static/images/cha-ca-vien.jpg", is_available: true },
            { id: 16, name: "Bánh Xèo", description: "Bánh xèo miền Tây với tôm thịt và giá đỗ", price: 32000, category: "Món phụ", image_url: "static/images/banh-xeo.jpg", is_available: true },
            { id: 17, name: "Nem Lụi", description: "Nem lụi nướng với thịt heo và lá lốt", price: 30000, category: "Món phụ", image_url: "static/images/nem-lui.jpg", is_available: true },
            { id: 18, name: "Chả Bò", description: "Chả bò chiên với thịt bò xay và gia vị", price: 25000, category: "Món phụ", image_url: "static/images/cha-bo.jpg", is_available: true },
            { id: 19, name: "Bánh Khọt", description: "Bánh khọt nhỏ với tôm và hành tây", price: 18000, category: "Món phụ", image_url: "static/images/banh-khot.jpg", is_available: true },
            { id: 20, name: "Chả Cá Basa", description: "Chả cá basa chiên với sả và ớt", price: 22000, category: "Món phụ", image_url: "static/images/cha-ca-basa.jpg", is_available: true },
            
            // ĐỒ UỐNG
            { id: 21, name: "Trà Đá", description: "Trà đá truyền thống mát lạnh", price: 8000, category: "Đồ uống", image_url: "static/images/tra-da.jpg", is_available: true },
            { id: 22, name: "Nước Cam Tươi", description: "Nước cam tươi vắt không đường", price: 25000, category: "Đồ uống", image_url: "static/images/nuoc-cam.jpg", is_available: true },
            { id: 23, name: "Cà Phê Sữa Đá", description: "Cà phê sữa đá đậm đà", price: 20000, category: "Đồ uống", image_url: "static/images/ca-phe-sua.jpg", is_available: true },
            { id: 24, name: "Sinh Tố Bơ", description: "Sinh tố bơ thơm ngon bổ dưỡng", price: 30000, category: "Đồ uống", image_url: "static/images/sinh-to-bo.jpg", is_available: true },
            { id: 25, name: "Nước Dừa Tươi", description: "Nước dừa tươi mát lạnh tự nhiên", price: 18000, category: "Đồ uống", image_url: "static/images/nuoc-dua.jpg", is_available: true },
            { id: 26, name: "Trà Sữa Trân Châu", description: "Trà sữa trân châu đen ngọt ngào", price: 35000, category: "Đồ uống", image_url: "static/images/tra-sua.jpg", is_available: true },
            { id: 27, name: "Sinh Tố Xoài", description: "Sinh tố xoài chua ngọt tự nhiên", price: 28000, category: "Đồ uống", image_url: "static/images/sinh-to-xoai.jpg", is_available: true },
            { id: 28, name: "Nước Chanh Dây", description: "Nước chanh dây chua ngọt giải nhiệt", price: 22000, category: "Đồ uống", image_url: "static/images/chanh-day.jpg", is_available: true },
            { id: 29, name: "Cà Phê Đen Đá", description: "Cà phê đen đá đậm đà", price: 15000, category: "Đồ uống", image_url: "static/images/ca-phe-den.jpg", is_available: true },
            { id: 30, name: "Sinh Tố Dâu", description: "Sinh tố dâu tươi ngọt ngào", price: 32000, category: "Đồ uống", image_url: "static/images/sinh-to-dau.jpg", is_available: true },
            { id: 31, name: "Nước Ép Táo", description: "Nước ép táo tươi không đường", price: 20000, category: "Đồ uống", image_url: "static/images/nuoc-ep-tao.jpg", is_available: true },
            { id: 32, name: "Trà Ô Long", description: "Trà ô long thơm ngon", price: 12000, category: "Đồ uống", image_url: "static/images/tra-o-long.jpg", is_available: true },
            
            // MÓN TRÁNG MIỆNG
            { id: 33, name: "Chè Đậu Đỏ", description: "Chè đậu đỏ với nước cốt dừa", price: 15000, category: "Món tráng miệng", image_url: "static/images/che-dau-do.jpg", is_available: true },
            { id: 34, name: "Bánh Flan", description: "Bánh flan caramel thơm ngon", price: 18000, category: "Món tráng miệng", image_url: "static/images/banh-flan.jpg", is_available: true },
            { id: 35, name: "Chè Thái", description: "Chè Thái với nhiều loại trái cây", price: 20000, category: "Món tráng miệng", image_url: "static/images/che-thai.jpg", is_available: true },
            { id: 36, name: "Kem Dừa", description: "Kem dừa mát lạnh tự nhiên", price: 12000, category: "Món tráng miệng", image_url: "static/images/kem-dua.jpg", is_available: true },
            { id: 37, name: "Chè Chuối", description: "Chè chuối với nước cốt dừa", price: 14000, category: "Món tráng miệng", image_url: "static/images/che-chuoi.jpg", is_available: true },
            { id: 38, name: "Bánh Tiramisu", description: "Bánh tiramisu Ý thơm ngon", price: 25000, category: "Món tráng miệng", image_url: "static/images/tiramisu.jpg", is_available: true },
            { id: 39, name: "Chè Ba Màu", description: "Chè ba màu truyền thống", price: 16000, category: "Món tráng miệng", image_url: "static/images/che-ba-mau.jpg", is_available: true },
            { id: 40, name: "Kem Socola", description: "Kem socola đậm đà", price: 15000, category: "Món tráng miệng", image_url: "static/images/kem-socola.jpg", is_available: true }
        ];
        
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }

    // Set default tables
    setDefaultTables() {
        const tables = [];
        for (let i = 1; i <= 20; i++) {
            tables.push({
                id: i,
                table_number: i,
                is_occupied: false,
                current_order_id: null
            });
        }
        localStorage.setItem('tables', JSON.stringify(tables));
    }

    // Get all menu items
    getMenuItems() {
        const items = JSON.parse(localStorage.getItem('menuItems') || '[]');
        return items.filter(item => item.is_available);
    }

    // Get menu item by ID
    getMenuItemById(id) {
        const items = JSON.parse(localStorage.getItem('menuItems') || '[]');
        return items.find(item => item.id === parseInt(id));
    }

    // Get all orders
    getOrders() {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    }

    // Get order by table number
    getOrderByTable(tableNumber) {
        const orders = this.getOrders();
        return orders.find(order => 
            order.table_number === parseInt(tableNumber) && 
            order.status === 'confirmed'
        );
    }

    // Create new order
    createOrder(tableNumber, items) {
        const orders = this.getOrders();
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderNumber = `ORD${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)}`;
        
        const newOrder = {
            id: Date.now(), // Simple ID generation
            table_number: parseInt(tableNumber),
            items: items,
            total_amount: total,
            status: 'confirmed',
            created_at: new Date().toISOString(),
            order_number: orderNumber
        };
        
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        return {
            success: true,
            order_number: orderNumber,
            total: total,
            order_id: newOrder.id
        };
    }

    // Process payment
    processPayment(orderId, amountPaid, paymentMethod = 'cash') {
        const orders = this.getOrders();
        const orderIndex = orders.findIndex(order => order.id === parseInt(orderId));
        
        if (orderIndex === -1) {
            return { success: false, message: 'Không tìm thấy đơn hàng' };
        }
        
        const order = orders[orderIndex];
        
        if (amountPaid < order.total_amount) {
            return { success: false, message: 'Số tiền không đủ' };
        }
        
        // Update order status
        orders[orderIndex].status = 'paid';
        orders[orderIndex].payment_method = paymentMethod;
        orders[orderIndex].amount_paid = amountPaid;
        orders[orderIndex].paid_at = new Date().toISOString();
        
        localStorage.setItem('orders', JSON.stringify(orders));
        
        const change = amountPaid - order.total_amount;
        
        return {
            success: true,
            change: change,
            order_number: order.order_number,
            transaction_id: `${paymentMethod.toUpperCase()}${Date.now()}`
        };
    }

    // Get order by ID
    getOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(order => order.id === parseInt(orderId));
    }

    // Clear all data (for testing)
    clearAllData() {
        localStorage.removeItem('menuItems');
        localStorage.removeItem('orders');
        localStorage.removeItem('tables');
        this.initializeData();
    }

    // Export data (for backup)
    exportData() {
        return {
            menuItems: JSON.parse(localStorage.getItem('menuItems') || '[]'),
            orders: JSON.parse(localStorage.getItem('orders') || '[]'),
            tables: JSON.parse(localStorage.getItem('tables') || '[]'),
            exported_at: new Date().toISOString()
        };
    }

    // Import data (for restore)
    importData(data) {
        if (data.menuItems) {
            localStorage.setItem('menuItems', JSON.stringify(data.menuItems));
        }
        if (data.orders) {
            localStorage.setItem('orders', JSON.stringify(data.orders));
        }
        if (data.tables) {
            localStorage.setItem('tables', JSON.stringify(data.tables));
        }
    }
}

// Create global instance
const dataStorage = new DataStorage();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataStorage;
}

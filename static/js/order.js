// Order page JavaScript

let currentOrder = [];
let menuData = [];
let currentCategory = 'all';

// Utility function for currency formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadOrderFromStorage();
});

// Load menu from localStorage
function loadMenu() {
    try {
        menuData = dataStorage.getMenuItems();
        displayMenu();
    } catch (error) {
        console.error('Failed to load menu:', error);
        showErrorMessage('Không thể tải menu. Vui lòng thử lại.', 'menu-grid');
    }
}

// Display menu items
function displayMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const filteredItems = currentCategory === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === currentCategory);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <div class="menu-item-image" style="background-image: url('${item.image_url}')">
                <img src="${item.image_url}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='${getFoodEmoji(item.name)}';">
            </div>
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-price">${formatCurrency(item.price)}</div>
            <div class="menu-item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-display" id="qty-${item.id}">0</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    `).join('');
}

// Get food emoji based on item name
function getFoodEmoji(name) {
    const emojiMap = {
        'Phở': '🍜',
        'Bún': '🍜',
        'Cơm': '🍚',
        'Chả': '🥩',
        'Nem': '🌯',
        'Trà': '🍵',
        'Nước': '🥤',
        'Cà Phê': '☕',
        'Sinh Tố': '🥤',
        'Gỏi': '🥗',
        'Bánh': '🥞',
        'Chè': '🍧',
        'Kem': '🍦',
        'Tiramisu': '🍰',
        'Flan': '🍮'
    };
    
    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (name.includes(key)) return emoji;
    }
    
    return '🍽️';
}

// Category tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            // Update current category
            currentCategory = this.dataset.category;
            // Refresh menu display
            displayMenu();
        });
    });
});

// Quantity controls
function increaseQuantity(itemId) {
    const qtyDisplay = document.getElementById(`qty-${itemId}`);
    const currentQty = parseInt(qtyDisplay.textContent);
    qtyDisplay.textContent = currentQty + 1;
}

function decreaseQuantity(itemId) {
    const qtyDisplay = document.getElementById(`qty-${itemId}`);
    const currentQty = parseInt(qtyDisplay.textContent);
    if (currentQty > 0) {
        qtyDisplay.textContent = currentQty - 1;
    }
}

// Add to cart
function addToCart(itemId) {
    const qtyDisplay = document.getElementById(`qty-${itemId}`);
    const quantity = parseInt(qtyDisplay.textContent);
    
    if (quantity <= 0) {
        alert('Vui lòng chọn số lượng lớn hơn 0');
        return;
    }
    
    const menuItem = menuData.find(item => item.id === itemId);
    const existingItem = currentOrder.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        currentOrder.push({
            id: itemId,
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantity
        });
    }
    
    // Reset quantity display
    qtyDisplay.textContent = '0';
    
    // Update order summary
    updateOrderSummary();
    saveOrderToStorage();
}

// Update order summary
function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const menuActions = document.getElementById('menu-actions');
    
    if (currentOrder.length === 0) {
        orderSummary.style.display = 'none';
        menuActions.style.display = 'none';
        return;
    }
    
    orderSummary.style.display = 'block';
    menuActions.style.display = 'flex';
    
    orderItems.innerHTML = currentOrder.map(item => `
        <div class="order-item">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-controls">
                <span class="order-item-qty">${item.quantity}</span>
                <button class="remove-item-btn" onclick="removeFromOrder(${item.id})">Xóa</button>
            </div>
        </div>
    `).join('');
    
    const total = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotal.textContent = `Tổng: ${formatCurrency(total)}`;
}

// Remove item from order
function removeFromOrder(itemId) {
    currentOrder = currentOrder.filter(item => item.id !== itemId);
    updateOrderSummary();
    saveOrderToStorage();
}

// Clear entire order
function clearOrder() {
    if (confirm('Bạn có chắc muốn xóa tất cả món đã chọn?')) {
        currentOrder = [];
        updateOrderSummary();
        saveOrderToStorage();
    }
}

// Show table input screen
function showTableInput() {
    if (currentOrder.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn');
        return;
    }
    
    // Update final order summary
    updateFinalOrderSummary();
    
    // Show table screen
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('table-screen').classList.remove('hidden');
}

// Update final order summary
function updateFinalOrderSummary() {
    const finalOrderItems = document.getElementById('final-order-items');
    const finalOrderTotal = document.getElementById('final-order-total');
    
    finalOrderItems.innerHTML = currentOrder.map(item => `
        <div class="order-item">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-controls">
                <span class="order-item-qty">${item.quantity}</span>
            </div>
        </div>
    `).join('');
    
    const total = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    finalOrderTotal.textContent = `Tổng: ${formatCurrency(total)}`;
}

// Table input functionality
let tableNumber = '';

function inputNumber(number) {
    if (tableNumber.length < 2) {
        tableNumber += number;
        document.getElementById('table-input').value = tableNumber;
    }
}

function clearTableInput() {
    tableNumber = '';
    document.getElementById('table-input').value = '';
}

// Show menu screen
function showMenuScreen() {
    document.getElementById('table-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}

// Confirm order
function confirmOrder() {
    if (!tableNumber || parseInt(tableNumber) <= 0) {
        alert('Vui lòng nhập số bàn hợp lệ');
        return;
    }
    
    if (currentOrder.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn');
        return;
    }
    
    const confirmBtn = document.getElementById('confirm-btn');
    showLoading(confirmBtn);
    
    try {
        const result = dataStorage.createOrder(parseInt(tableNumber), currentOrder);
        
        if (result.success) {
            // Show success screen
            document.getElementById('table-screen').classList.add('hidden');
            document.getElementById('success-screen').classList.remove('hidden');
            document.getElementById('order-number-display').textContent = result.order_number;
            
            // Clear order and storage
            currentOrder = [];
            localStorage.removeItem('currentOrder');
        } else {
            alert('Có lỗi xảy ra khi đặt món. Vui lòng thử lại.');
        }
    } catch (error) {
        console.error('Failed to create order:', error);
        alert('Có lỗi xảy ra khi đặt món. Vui lòng thử lại.');
    } finally {
        hideLoading(confirmBtn, '✅ Xác Nhận Đặt Món');
    }
}

// Start new order
function startNewOrder() {
    currentOrder = [];
    tableNumber = '';
    localStorage.removeItem('currentOrder');
    
    // Reset all screens
    document.getElementById('success-screen').classList.add('hidden');
    document.getElementById('table-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
    
    // Reset form
    document.getElementById('table-input').value = '';
    updateOrderSummary();
}

// Local storage functions
function saveOrderToStorage() {
    saveToStorage('currentOrder', currentOrder);
}

function loadOrderFromStorage() {
    const savedOrder = loadFromStorage('currentOrder');
    if (savedOrder) {
        currentOrder = savedOrder;
        updateOrderSummary();
    }
}

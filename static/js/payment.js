// Payment page JavaScript

let currentOrderData = null;
let totalAmount = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Focus on table search input
    document.getElementById('table-search').focus();
    
    // Add event listeners for payment method changes
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            showPaymentMethod(this.value);
        });
    });
});

// Show payment method section
function showPaymentMethod(method) {
    // Hide all payment method sections
    const sections = document.querySelectorAll('.payment-method-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected method
    const selectedSection = document.getElementById(method + '-payment');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Search for order by table number
function searchOrder() {
    const tableNumber = document.getElementById('table-search').value;
    
    if (!tableNumber || parseInt(tableNumber) <= 0) {
        alert('Vui lòng nhập số bàn hợp lệ');
        return;
    }
    
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '<div style="text-align: center; padding: 20px;"><span class="loading"></span> Đang tìm kiếm...</div>';
    searchResult.style.display = 'block';
    
    try {
        const order = dataStorage.getOrderByTable(tableNumber);
        
        if (order) {
            currentOrderData = order;
            totalAmount = order.total_amount;
            displayOrderDetails();
            showPaymentSection();
        } else {
            searchResult.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 10px; text-align: center;">
                    <h4>❌ Không tìm thấy đơn hàng</h4>
                    <p>Không có đơn hàng nào cho bàn số ${tableNumber}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to search order:', error);
        searchResult.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 10px; text-align: center;">
                <h4>❌ Lỗi tìm kiếm</h4>
                <p>Có lỗi xảy ra khi tìm kiếm đơn hàng. Vui lòng thử lại.</p>
            </div>
        `;
    }
}

// Display order details
function displayOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    
    orderDetails.innerHTML = `
        <div style="margin-bottom: 15px;">
            <strong>Số bàn:</strong> ${currentOrderData.table_number}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Số phiếu:</strong> ${currentOrderData.order_number}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Chi tiết món ăn:</strong>
        </div>
        ${currentOrderData.items.map(item => `
            <div class="order-detail-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${formatCurrency(item.price * item.quantity)}</span>
            </div>
        `).join('')}
        <div class="order-detail-item">
            <span><strong>Tổng cộng:</strong></span>
            <span><strong>${formatCurrency(totalAmount)}</strong></span>
        </div>
    `;
}

// Show payment section
function showPaymentSection() {
    document.getElementById('payment-section').style.display = 'grid';
    document.getElementById('amount-paid').focus();
}

// Set amount using quick buttons
function setAmount(amount) {
    document.getElementById('amount-paid').value = amount;
    calculateChange();
}

// Calculate change
function calculateChange() {
    const amountPaid = parseFloat(document.getElementById('amount-paid').value) || 0;
    const change = amountPaid - totalAmount;
    
    const changeDisplay = document.getElementById('change-display');
    const processBtn = document.getElementById('process-payment-btn');
    
    if (change < 0) {
        changeDisplay.innerHTML = `❌ Thiếu: ${formatCurrency(Math.abs(change))}`;
        changeDisplay.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        processBtn.disabled = true;
        processBtn.style.opacity = '0.5';
    } else if (change === 0) {
        changeDisplay.innerHTML = `✅ Vừa đủ`;
        changeDisplay.style.background = 'linear-gradient(45deg, #00b894, #00a085)';
        processBtn.disabled = false;
        processBtn.style.opacity = '1';
    } else {
        changeDisplay.innerHTML = `💰 Tiền thối: ${formatCurrency(change)}`;
        changeDisplay.style.background = 'linear-gradient(45deg, #00b894, #00a085)';
        processBtn.disabled = false;
        processBtn.style.opacity = '1';
    }
}

// Process payment
function processPayment() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // Validate payment method specific fields
    if (!validatePaymentMethod(selectedMethod)) {
        return;
    }
    
    const processBtn = document.getElementById('process-payment-btn');
    showLoading(processBtn);
    
    try {
        let amountPaid = totalAmount;
        
        // Add method-specific data
        if (selectedMethod === 'cash') {
            amountPaid = parseFloat(document.getElementById('amount-paid').value) || 0;
            if (amountPaid < totalAmount) {
                alert('Số tiền khách đưa không đủ để thanh toán');
                return;
            }
        }
        
        const result = dataStorage.processPayment(currentOrderData.id, amountPaid, selectedMethod);
        
        if (result.success) {
            showPaymentResult(result, selectedMethod);
        } else {
            alert(result.message || 'Có lỗi xảy ra khi thanh toán');
        }
    } catch (error) {
        console.error('Failed to process payment:', error);
        alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
    } finally {
        hideLoading(processBtn, '✅ Xác Nhận Thanh Toán');
    }
}

// Validate payment method
function validatePaymentMethod(method) {
    if (method === 'cash') {
        const amountPaid = parseFloat(document.getElementById('amount-paid').value) || 0;
        if (amountPaid < totalAmount) {
            alert('Số tiền khách đưa không đủ để thanh toán');
            return false;
        }
    } else if (method === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        
        if (!cardNumber || !cardExpiry || !cardCvv) {
            alert('Vui lòng điền đầy đủ thông tin thẻ');
            return false;
        }
        
        if (cardNumber.length < 16) {
            alert('Số thẻ không hợp lệ');
            return false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert('Ngày hết hạn không đúng định dạng MM/YY');
            return false;
        }
        
        if (cardCvv.length < 3) {
            alert('CVV không hợp lệ');
            return false;
        }
    } else if (method === 'transfer') {
        const accountNumber = document.getElementById('account-number').value;
        const bankName = document.getElementById('bank-name').value;
        
        if (!accountNumber || !bankName) {
            alert('Vui lòng điền đầy đủ thông tin chuyển khoản');
            return false;
        }
    }
    
    return true;
}

// Show payment result
function showPaymentResult(result, paymentMethod) {
    const paymentResult = document.getElementById('payment-result');
    
    let resultContent = '';
    
    if (paymentMethod === 'cash') {
        const amountPaid = parseFloat(document.getElementById('amount-paid').value) || 0;
        const change = amountPaid - totalAmount;
        
        resultContent = `
            <div class="success-message">
                <h2>🎉 Thanh Toán Tiền Mặt Thành Công!</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Số phiếu:</strong> ${result.order_number}</p>
                    <p><strong>Số bàn:</strong> ${currentOrderData.table_number}</p>
                    <p><strong>Tổng tiền:</strong> ${formatCurrency(totalAmount)}</p>
                    <p><strong>Khách đưa:</strong> ${formatCurrency(amountPaid)}</p>
                    <p><strong>Tiền thối:</strong> ${formatCurrency(change)}</p>
                </div>
                <p>Giao dịch đã được hoàn tất thành công!</p>
            </div>
        `;
    } else if (paymentMethod === 'card') {
        resultContent = `
            <div class="success-message">
                <h2>🎉 Thanh Toán Thẻ Thành Công!</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Số phiếu:</strong> ${result.order_number}</p>
                    <p><strong>Số bàn:</strong> ${currentOrderData.table_number}</p>
                    <p><strong>Tổng tiền:</strong> ${formatCurrency(totalAmount)}</p>
                    <p><strong>Phương thức:</strong> Thẻ tín dụng/ghi nợ</p>
                    <p><strong>Mã giao dịch:</strong> ${result.transaction_id || 'TXN' + Date.now()}</p>
                </div>
                <p>Giao dịch đã được hoàn tất thành công!</p>
            </div>
        `;
    } else if (paymentMethod === 'qr') {
        resultContent = `
            <div class="success-message">
                <h2>🎉 Thanh Toán QR Thành Công!</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Số phiếu:</strong> ${result.order_number}</p>
                    <p><strong>Số bàn:</strong> ${currentOrderData.table_number}</p>
                    <p><strong>Tổng tiền:</strong> ${formatCurrency(totalAmount)}</p>
                    <p><strong>Phương thức:</strong> QR Code</p>
                    <p><strong>Mã giao dịch:</strong> ${result.transaction_id || 'QR' + Date.now()}</p>
                </div>
                <p>Giao dịch đã được hoàn tất thành công!</p>
            </div>
        `;
    } else if (paymentMethod === 'transfer') {
        resultContent = `
            <div class="success-message">
                <h2>🎉 Chuyển Khoản Thành Công!</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Số phiếu:</strong> ${result.order_number}</p>
                    <p><strong>Số bàn:</strong> ${currentOrderData.table_number}</p>
                    <p><strong>Tổng tiền:</strong> ${formatCurrency(totalAmount)}</p>
                    <p><strong>Phương thức:</strong> Chuyển khoản ngân hàng</p>
                    <p><strong>Mã giao dịch:</strong> ${result.transaction_id || 'TRF' + Date.now()}</p>
                </div>
                <p>Giao dịch đã được hoàn tất thành công!</p>
            </div>
        `;
    }
    
    resultContent += `
        <div class="action-buttons" style="margin-top: 30px;">
            <button class="btn btn-primary" onclick="startNewPayment()">
                🆕 Thanh Toán Mới
            </button>
            <a href="/" class="btn btn-secondary">
                🏠 Về Trang Chủ
            </a>
        </div>
    `;
    
    paymentResult.innerHTML = resultContent;
    paymentResult.classList.remove('hidden');
    
    // Hide payment section
    document.getElementById('payment-section').style.display = 'none';
}

// Start new payment
function startNewPayment() {
    // Reset form
    document.getElementById('table-search').value = '';
    document.getElementById('amount-paid').value = '';
    document.getElementById('search-result').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
    document.getElementById('payment-result').classList.add('hidden');
    
    // Reset payment method to cash
    document.querySelector('input[name="payment-method"][value="cash"]').checked = true;
    showPaymentMethod('cash');
    
    // Reset card fields
    document.getElementById('card-number').value = '';
    document.getElementById('card-expiry').value = '';
    document.getElementById('card-cvv').value = '';
    
    // Reset transfer fields
    document.getElementById('account-number').value = '';
    document.getElementById('bank-name').value = '';
    
    // Reset data
    currentOrderData = null;
    totalAmount = 0;
    
    // Focus on search input
    document.getElementById('table-search').focus();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to search
    if (e.key === 'Enter' && e.target.id === 'table-search') {
        searchOrder();
    }
    
    // Enter key to process payment
    if (e.key === 'Enter' && e.target.id === 'amount-paid') {
        processPayment();
    }
    
    // Escape key to start new payment
    if (e.key === 'Escape') {
        startNewPayment();
    }
});

// Auto-calculate change when amount is entered
document.getElementById('amount-paid').addEventListener('input', calculateChange);

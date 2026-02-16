// script.js - RuigeTest 网页交互脚本
// 这是一个完整的JavaScript示例，展示了网页的交互功能

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 RuigeTest脚本加载完成！');
    console.log('📖 查看控制台了解更多功能演示');
    
    // 初始化所有功能
    initTimeDisplay();
    initButtons();
    initThemeSwitcher();
    initDynamicContent();
    initKeyboardShortcuts();
    initFormValidation();
    initLocalStorage();
    initAnimationEffects();
    
    // 显示欢迎消息
    showWelcomeMessage();
});

// 1. 时间显示功能
function initTimeDisplay() {
    const timeElement = document.getElementById('currentTime');
    if (!timeElement) return;
    
    function updateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        const dateStr = now.toLocaleDateString('zh-CN', options);
        const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
        
        timeElement.innerHTML = `
            <strong>${dateStr}</strong><br>
            <span style="color: #667eea;">${timeStr}</span>
        `;
        
        // 添加一些有趣的时间提示
        const hour = now.getHours();
        let greeting = '';
        if (hour < 6) greeting = '🌙 深夜好，夜猫子！';
        else if (hour < 12) greeting = '☀️ 早上好，新的一天开始了！';
        else if (hour < 18) greeting = '🌤️ 下午好，继续加油！';
        else greeting = '🌙 晚上好，放松一下吧！';
        
        // 每10秒更新一次问候语（如果存在问候语元素）
        const greetingElement = document.getElementById('timeGreeting');
        if (greetingElement && now.getSeconds() % 10 === 0) {
            greetingElement.textContent = greeting;
        }
    }
    
    // 立即更新并设置定时器
    updateTime();
    setInterval(updateTime, 1000);
    
    console.log('⏰ 时间显示功能已启用');
}

// 2. 按钮交互功能
function initButtons() {
    // 欢迎消息按钮
    const welcomeBtn = document.getElementById('showMessage');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            const messages = [
                "🎉 欢迎来到RuigeTest！",
                "✨ 这是一个网页制作与部署的实践项目",
                "💡 查看项目文档学习如何制作自己的网页",
                "🚀 准备好将你的创意变为现实了吗？",
                "🌟 每个伟大的网站都从一个简单的页面开始"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const emojis = ['🎨', '💻', '🚀', '🌟', '✨', '💡'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            alert(`${randomEmoji} ${randomMessage}\n\n💪 开始你的网页制作之旅吧！`);
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // 添加项目按钮
    const addItemBtn = document.getElementById('addItem');
    if (addItemBtn) {
        let itemCounter = 0;
        
        addItemBtn.addEventListener('click', function() {
            itemCounter++;
            const itemsContainer = document.getElementById('items');
            const itemList = document.getElementById('itemList');
            
            if (!itemsContainer) return;
            
            // 显示容器（如果是第一次添加）
            if (itemList && itemCounter === 1) {
                itemList.style.display = 'block';
                itemList.style.animation = 'fadeIn 0.5s ease';
            }
            
            // 创建新项目
            const newItem = document.createElement('li');
            newItem.className = 'list-item';
            newItem.style.animation = 'slideIn 0.3s ease';
            
            const itemTypes = ['任务', '想法', '项目', '笔记', '提醒'];
            const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            
            const icons = ['📝', '💡', '🎯', '📌', '⭐', '🔥', '🚀'];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            
            const now = new Date();
            const timeStr = now.toLocaleTimeString('zh-CN', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            newItem.innerHTML = `
                <span style="font-size: 1.2em; margin-right: 10px;">${icon}</span>
                <strong>${itemType} ${itemCounter}</strong>
                <span style="color: #666; font-size: 0.9em; margin-left: 10px;">
                    ${timeStr}
                </span>
                <button class="delete-btn" style="margin-left: auto; background: none; border: none; color: #dc3545; cursor: pointer;">
                    ×
                </button>
            `;
            
            // 添加删除功能
            const deleteBtn = newItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                newItem.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    newItem.remove();
                    // 如果没有项目了，隐藏容器
                    if (itemsContainer.children.length === 0 && itemList) {
                        itemList.style.display = 'none';
                    }
                }, 300);
            });
            
            // 添加点击效果
            newItem.addEventListener('click', function() {
                this.style.background = '#f8f9fa';
                setTimeout(() => {
                    this.style.background = '';
                }, 300);
            });
            
            itemsContainer.appendChild(newItem);
            
            // 添加按钮动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`📋 添加了第 ${itemCounter} 个项目`);
        });
    }
}

// 3. 主题切换功能
function initThemeSwitcher() {
    const themeBtn = document.getElementById('changeTheme');
    if (!themeBtn) return;
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('ruigetest-theme');
    if (savedTheme === 'dark') {
        applyDarkTheme();
        updateThemeButton(true);
    }
    
    themeBtn.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            removeDarkTheme();
            updateThemeButton(false);
            localStorage.setItem('ruigetest-theme', 'light');
        } else {
            applyDarkTheme();
            updateThemeButton(true);
            localStorage.setItem('ruigetest-theme', 'dark');
        }
        
        // 添加切换动画
        document.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
    
    function applyDarkTheme() {
        document.body.classList.add('dark-theme');
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        document.body.style.color = '#f0f0f0';
        
        // 更新所有卡片
        document.querySelectorAll('.card').forEach(card => {
            card.style.background = '#2c3e50';
            card.style.color = '#ecf0f1';
        });
    }
    
    function removeDarkTheme() {
        document.body.classList.remove('dark-theme');
        document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        document.body.style.color = '#333';
        
        // 恢复所有卡片
        document.querySelectorAll('.card').forEach(card => {
            card.style.background = 'white';
            card.style.color = '#333';
        });
    }
    
    function updateThemeButton(isDark) {
        if (isDark) {
            themeBtn.innerHTML = '<i class="fas fa-sun"></i> 切换到亮色主题';
            themeBtn.classList.remove('btn-secondary');
            themeBtn.classList.add('btn-primary');
        } else {
            themeBtn.innerHTML = '<i class="fas fa-moon"></i> 切换到深色主题';
            themeBtn.classList.remove('btn-primary');
            themeBtn.classList.add('btn-secondary');
        }
    }
    
    console.log('🎨 主题切换功能已启用');
}

// 4. 动态内容功能
function initDynamicContent() {
    // 创建动态内容区域（如果不存在）
    let dynamicSection = document.getElementById('dynamicContent');
    if (!dynamicSection) {
        dynamicSection = document.createElement('div');
        dynamicSection.id = 'dynamicContent';
        dynamicSection.className = 'card';
        dynamicSection.innerHTML = '<h3><i class="fas fa-magic"></i> 动态内容演示</h3>';
        document.querySelector('.container').appendChild(dynamicSection);
    }
    
    // 添加一些动态内容
    const features = [
        { icon: '⚡', text: '实时时间显示', desc: '精确到秒的本地时间' },
        { icon: '🎨', text: '主题切换', desc: '亮色/深色模式自由切换' },
        { icon: '📝', text: '动态列表', desc: '可添加和删除项目' },
        { icon: '⌨️', text: '键盘快捷键', desc: 'Ctrl+M 显示消息，Ctrl+A 添加项目' },
        { icon: '💾', text: '本地存储', desc: '记住你的主题偏好' },
        { icon: '🎯', text: '表单验证', desc: '实时输入验证和反馈' }
    ];
    
    const featuresList = document.createElement('div');
    featuresList.className = 'features-grid';
    featuresList.style.display = 'grid';
    featuresList.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    featuresList.style.gap = '1rem';
    featuresList.style.marginTop = '1rem';
    
    features.forEach(feature => {
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        featureItem.style.padding = '1rem';
        featureItem.style.background = 'rgba(102, 126, 234, 0.1)';
        featureItem.style.borderRadius = '8px';
        featureItem.style.textAlign = 'center';
        featureItem.style.transition = 'transform 0.3s ease';
        
        featureItem.innerHTML = `
            <div style="font-size: 2em; margin-bottom: 0.5rem;">${feature.icon}</div>
            <strong>${feature.text}</strong>
            <p style="font-size: 0.9em; color: #666; margin-top: 0.5rem;">${feature.desc}</p>
        `;
        
        featureItem.addEventListener('mouseenter', () => {
            featureItem.style.transform = 'translateY(-5px)';
        });
        
        featureItem.addEventListener('mouseleave', () => {
            featureItem.style.transform = '';
        });
        
        featuresList.appendChild(featureItem);
    });
    
    dynamicSection.appendChild(featuresList);
    
    console.log('✨ 动态内容功能已启用');
}

// 5. 键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl + M: 显示消息
        if (event.ctrlKey && event.key === 'm') {
            event.preventDefault();
            const welcomeBtn = document.getElementById('showMessage');
            if (welcomeBtn) welcomeBtn.click();
            showShortcutFeedback('显示欢迎消息');
        }
        
        // Ctrl + A: 添加项目
        if (event.ctrlKey && event.key === 'a') {
            event.preventDefault();
            const addItemBtn = document.getElementById('addItem');
            if (addItemBtn) addItemBtn.click();
            showShortcutFeedback('添加新项目');
        }
        
        // Ctrl + D: 切换主题
        if (event.ctrlKey && event.key === 'd') {
            event.preventDefault();
            const themeBtn = document.getElementById('changeTheme');
            if (themeBtn) themeBtn.click();
            showShortcutFeedback('切换主题');
        }
        
        // Ctrl + ?: 显示帮助
        if (event.ctrlKey && event.key === '?') {
            event.preventDefault();
            showKeyboardHelp();
        }
    });
    
    function showShortcutFeedback(action) {
        // 创建反馈提示
        const feedback = document.createElement('div');
        feedback.textContent = `✅ ${action}`;
        feedback.style.position = 'fixed';
        feedback.style.top = '20px';
        feedback.style.right = '20px';
        feedback.style.background = '#28a745';
        feedback.style.color = 'white';
        feedback.style.padding = '10px 20px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '9999';
        feedback.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        feedback.style.animation = 'slideInRight 0.3s ease';
        
        document.body.appendChild(feedback);
        
        // 3秒后移除
        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 3000);
    }
    
    console.log('⌨️ 键盘快捷键已启用：Ctrl+M, Ctrl+A, Ctrl+D, Ctrl+?');
}

// 6. 表单验证演示
function initFormValidation() {
    // 创建演示表单
    const formSection = document.createElement('div');
    formSection.className = 'card';
    formSection.innerHTML = `
        <h3><i class="fas fa-edit"></i> 表单验证演示</h3>
        <form id="demoForm" style="margin-top: 1rem;">
            <div style="margin-bottom: 1rem;">
                <label for="demoName">姓名：</label>
                <input type="text" id="demoName" placeholder="请输入你的姓名" required>
                <div class="error-message" style="color: #dc3545; font-size: 0.9em; margin-top: 0.25rem; display: none;"></div>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="demoEmail">邮箱：</label>
                <input type="email" id="demoEmail" placeholder="example@email.com" required>
                <div class="error-message" style="color: #dc3545; font-size: 0.9em; margin-top: 0.25rem; display: none;"></div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label for="demoMessage">留言：</label>
                <textarea id="demoMessage" placeholder="请输入你的留言..." rows="3" required></textarea>
                <div class="error-message" style="color: #dc3545; font-size: 0.9em; margin-top: 0.25rem; display: none;"></div>
            </div>
            
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-paper-plane"></i> 提交表单
            </button>
            <button type="reset" class="btn btn-secondary" style="margin-left: 1rem;">
                <i class="fas fa-redo"></i> 重置
            </button>
        </form>
        
        <div id="formResult" style="margin-top: 1.5rem; display: none;"></div>
    `;
    
    // 插入到页面中
    const container = document.querySelector('.container');
    const footer = document.querySelector('footer');
    if (container && footer) {
        container.insertBefore(formSection, footer);
    }
    
    // 表单验证逻辑
    const form = document.getElementById('demoForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            const resultDiv = document.getElementById('formResult');
            
            // 验证姓名
            const nameInput = document.getElementById('demoName');
            const nameError = nameInput.nextElementSibling;
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, '请输入姓名');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }
            
            // 验证邮箱
            const emailInput = document.getElementById('demoEmail');
            const emailError = emailInput.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, '请输入邮箱');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, emailError, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }
            
            // 验证留言
            const messageInput = document.getElementById('demoMessage');
            const messageError = messageInput.nextElementSibling;
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, '请输入留言');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, '留言至少需要10个字符');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }
            
            // 如果验证通过
            if (isValid && resultDiv) {
                resultDiv.style.display = 'block';
                resultDiv.style.animation = 'fadeIn 0.5s ease';
                resultDiv.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px;">
                        <h4 style="margin-top: 0;"><i class="fas fa-check-circle"></i> 表单提交成功！</h4>
                        <p><strong>姓名：</strong>${nameInput.value}</p>
                        <p><strong>邮箱：</strong>${emailInput.value}</p>
                        <p><strong>留言：</strong>${messageInput.value}</p>
                        <p style="margin-top: 1rem; font-size: 0.9em;">
                            <i class="fas fa-info-circle"></i> 这是一个演示，数据不会被实际发送。
                        </p>
                    </div>
                `;
                
                // 滚动到结果
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                console.log('📝 表单提交成功：', {
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });
            }
        });
        
        // 实时验证
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    if (this.value.trim()) {
                        clearError(this, errorElement);
                    }
                }
            });
            
            input.addEventListener('blur', function() {
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    if (!this.value.trim()) {
                        showError(this, errorElement, '此字段为必填项');
                    }
                }
            });
        });
        
        function showError(input, errorElement, message) {
            input.style.borderColor = '#dc3545';
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function clearError(input, errorElement) {
            input.style.borderColor = '#ddd';
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    console.log('📋 表单验证功能已启用');
}

// 7. 本地存储功能
function initLocalStorage() {
    // 检查并显示存储的信息
    const storageInfo = document.createElement('div');
    storageInfo.id = 'storageInfo';
    storageInfo.className = 'card';
    storageInfo.style.marginTop = '2rem';
    storageInfo.innerHTML = `
        <h3><i class="fas fa-database"></i> 本地存储状态</h3>
        <div id="storageData" style="margin-top: 1rem;">
            <p><i class="fas fa-spinner fa-spin"></i> 加载中...</p>
        </div>
        <div style="margin-top: 1rem;">
            <button id="clearStorage" class="btn btn-secondary" style="margin-right: 1rem;">
                <i class="fas fa-trash"></i> 清除存储
            </button>
            <button id="testStorage" class="btn btn-primary">
                <i class="fas fa-vial"></i> 测试存储
            </button>
        </div>
    `;
    
    // 插入到页面中
    const container = document.querySelector('.container');
    const footer = document.querySelector('footer');
    if (container && footer) {
        container.insertBefore(storageInfo, footer);
    }
    
    // 更新存储显示
    function updateStorageDisplay() {
        const storageData = document.getElementById('storageData');
        if (!storageData) return;
        
        const theme = localStorage.getItem('ruigetest-theme') || '未设置';
        const visitCount = localStorage.getItem('ruigetest-visit-count') || '0';
        const lastVisit = localStorage.getItem('ruigetest-last-visit') || '从未访问';
        
        storageData.innerHTML = `
            <p><strong>主题偏好：</strong> <span style="color: #667eea;">${theme}</span></p>
            <p><strong>访问次数：</strong> <span style="color: #28a745;">${visitCount}</span></p>
            <p><strong>上次访问：</strong> <span style="color: #6c757d;">${lastVisit}</span></p>
            <p><strong>存储用量：</strong> <span style="color: #17a2b8;">${calculateStorageSize()} KB</span></p>
        `;
    }
    
    // 计算存储大小
    function calculateStorageSize() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            total += key.length + value.length;
        }
        return (total / 1024).toFixed(2);
    }
    
    // 更新访问信息
    function updateVisitInfo() {
        let visitCount = parseInt(localStorage.getItem('ruigetest-visit-count') || '0');
        visitCount++;
        localStorage.setItem('ruigetest-visit-count', visitCount.toString());
        localStorage.setItem('ruigetest-last-visit', new Date().toLocaleString('zh-CN'));
    }
    
    // 清除存储按钮
    const clearBtn = document.getElementById('clearStorage');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('确定要清除所有本地存储数据吗？')) {
                localStorage.clear();
                updateStorageDisplay();
                alert('本地存储已清除！');
                console.log('🗑️ 本地存储已清除');
            }
        });
    }
    
    // 测试存储按钮
    const testBtn = document.getElementById('testStorage');
    if (testBtn) {
        testBtn.addEventListener('click', function() {
            const testData = {
                timestamp: new Date().toISOString(),
                randomNumber: Math.floor(Math.random() * 1000),
                message: '这是一个测试存储的数据'
            };
            
            localStorage.setItem('ruigetest-test-data', JSON.stringify(testData));
            updateStorageDisplay();
            
            alert(`测试数据已保存！\n随机数：${testData.randomNumber}`);
            console.log('🧪 测试数据已保存：', testData);
        });
    }
    
    // 初始更新
    updateVisitInfo();
    updateStorageDisplay();
    
    console.log('💾 本地存储功能已启用');
}

// 8. 动画效果
function initAnimationEffects() {
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from { 
                opacity: 0;
                transform: translateX(20px);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.5s ease;
        }
        
        .animate-slide-in {
            animation: slideIn 0.5s ease;
        }
        
        .animate-pulse {
            animation: pulse 2s infinite;
        }
        
        .animate-bounce {
            animation: bounce 1s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // 为卡片添加动画
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-slide-in');
        });
    }, 100);
    
    console.log('🎬 动画效果已启用');
}

// 9. 显示欢迎消息
function showWelcomeMessage() {
    setTimeout(() => {
        console.log(`
╔══════════════════════════════════════════════════════════╗
║                 🚀 欢迎使用 RuigeTest！                 ║
║                                                          ║
║  这是一个完整的网页制作与部署示例项目。                  ║
║  包含了现代网页开发的核心功能：                         ║
║                                                          ║
║  • 响应式设计                                            ║
║  • 交互式JavaScript功能                                 ║
║  • 主题切换系统                                          ║
║  • 表单验证                                              ║
║  • 本地存储                                              ║
║  • 键盘快捷键                                            ║
║  • 动画效果                                              ║
║                                                          ║
║  查看项目目录中的详细指南文档，学习如何制作              ║
║  和部署你自己的网页！                                    ║
║                                                          ║
║  祝你学习愉快！ 🎉                                       ║
╚══════════════════════════════════════════════════════════╝
        `);
        
        // 在控制台显示有用的提示
        console.log('%c💡 提示：', 'color: #667eea; font-weight: bold; font-size: 14px;');
        console.log('1. 查看页面源代码学习HTML/CSS结构');
        console.log('2. 查看控制台了解JavaScript功能实现');
        console.log('3. 尝试所有交互功能（按钮、表单、主题切换等）');
        console.log('4. 查看项目目录中的详细指南文档');
        console.log('5. 尝试修改代码并观察效果！');
        
    }, 1000);
}

// 10. 显示键盘帮助
function showKeyboardHelp() {
    const helpContent = `
        <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 500px; margin: 2rem auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0; color: #667eea;">
                <i class="fas fa-keyboard"></i> 键盘快捷键
            </h3>
            
            <div style="margin: 1.5rem 0;">
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                    <span><kbd>Ctrl</kbd> + <kbd>M</kbd></span>
                    <span>显示欢迎消息</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                    <span><kbd>Ctrl</kbd> + <kbd>A</kbd></span>
                    <span>添加新项目</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                    <span><kbd>Ctrl</kbd> + <kbd>D</kbd></span>
                    <span>切换主题</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                    <span><kbd>Ctrl</kbd> + <kbd>?</kbd></span>
                    <span>显示此帮助</span>
                </div>
            </div>
            
            <p style="color: #666; font-size: 0.9em; margin-top: 1.5rem;">
                <i class="fas fa-info-circle"></i> 提示：这些快捷键只在当前页面有效
            </p>
            
            <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                关闭
            </button>
        </div>
    `;
    
    const helpDiv = document.createElement('div');
    helpDiv.innerHTML = helpContent;
    helpDiv.style.position = 'fixed';
    helpDiv.style.top = '0';
    helpDiv.style.left = '0';
    helpDiv.style.width = '100%';
    helpDiv.style.height = '100%';
    helpDiv.style.background = 'rgba(0,0,0,0.5)';
    helpDiv.style.display = 'flex';
    helpDiv.style.alignItems = 'center';
    helpDiv.style.justifyContent = 'center';
    helpDiv.style.zIndex = '9999';
    helpDiv.style.animation = 'fadeIn 0.3s ease';
    
    document.body.appendChild(helpDiv);
    
    // 点击背景关闭
    helpDiv.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => this.remove(), 300);
        }
    });
}

// 页面卸载前的清理
window.addEventListener('beforeunload', function() {
    console.log('👋 感谢使用RuigeTest！期待下次再见！');
});

// 导出一些函数供控制台调试使用
window.RuigeTest = {
    version: '1.0.0',
    showWelcomeMessage,
    showKeyboardHelp,
    getStorageInfo: function() {
        return {
            theme: localStorage.getItem('ruigetest-theme'),
            visitCount: localStorage.getItem('ruigetest-visit-count'),
            lastVisit: localStorage.getItem('ruigetest-last-visit')
        };
    }
};

console.log('🔧 调试工具：在控制台输入 RuigeTest 查看可用功能');

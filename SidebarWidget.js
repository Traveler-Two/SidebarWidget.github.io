(function () {
    'use strict';

    // 创建容器
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.right = '20px';
    container.style.transform = 'translateY(-50%)';
    container.style.width = '60px';
    container.style.height = '330px';
    container.style.backgroundColor = '#007BFF';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'space-between';
    container.style.borderRadius = '10px';
    container.style.overflow = 'hidden';
    container.style.transition = 'height 0.3s ease';
    container.style.zIndex = '1000';

    // 创建五个格子
    const links = [
        { text: '排行榜', url: 'http://edu.sebri.cn/login?goto=/', icon: '🏆' },
        { text: '每日一学', url: 'http://edu.sebri.cn/login?goto=/', icon: '📚' },
        { text: '每周一课', url: 'http://edu.sebri.cn/login?goto=/', icon: '📅' },
        { text: '每月一考', url: 'http://edu.sebri.cn/login?goto=/', icon: '📝' },
        { text: '运维服务', url: '', icon: '🎧' }
    ];

    const boxes = links.map(link => {
        const box = document.createElement('div');
        box.style.flex = '1';
        box.style.borderBottom = '1px solid rgba(255, 255, 255, 0.5)';
        box.style.display = 'flex';
        box.style.flexDirection = 'column';
        box.style.alignItems = 'center';
        box.style.justifyContent = 'center';
        box.style.color = 'white';
        box.style.cursor = 'pointer';

        // 添加图标和文字的包裹层
        const contentWrapper = document.createElement('div');
        contentWrapper.style.display = 'flex';
        contentWrapper.style.flexDirection = 'column';
        contentWrapper.style.alignItems = 'center';

        // 添加图标
        const icon = document.createElement('div');
        icon.textContent = link.icon;
        icon.style.fontSize = '24px';

        // 添加文字
        const text = document.createElement('div');
        text.textContent = link.text;
        text.style.fontSize = '12px';
        text.style.textAlign = 'center';

        contentWrapper.appendChild(icon);
        contentWrapper.appendChild(text);

        box.appendChild(contentWrapper);

        // 点击跳转（仅对前四个格子有效）
        if (link.url) {
            box.addEventListener('click', () => {
                window.location.href = link.url;
            });
        }

        // 点击事件（仅对运维服务模块有效）
        if (link.text === '运维服务') {
            box.addEventListener('click', showModal);
        }

        return box;
    });

    // 添加所有格子到容器
    boxes.forEach(box => {
        container.appendChild(box);
    });

    // 添加底部收起/展开按钮
    const toggleButton = document.createElement('div');
    toggleButton.style.height = '30px';
    toggleButton.style.width = '60px';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.backgroundColor = 'white';
    toggleButton.style.borderTop = '1px solid #007BFF';
    toggleButton.style.borderBottomLeftRadius = '10px';
    toggleButton.style.borderBottomRightRadius = '10px';
    toggleButton.textContent = '▲';

    // 收起/展开功能
    let isCollapsed = false;
    toggleButton.addEventListener('click', () => {
        if (isCollapsed) {
            container.style.height = '330px';
            toggleButton.textContent = '▲';
            boxes.forEach(box => box.style.display = 'block');
        } else {
            container.style.height = '96px';
            toggleButton.textContent = '▼';
            boxes.forEach((box, index) => {
                if (index === 0) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        }
        isCollapsed = !isCollapsed;
    });

    container.appendChild(toggleButton);

    // 弹窗函数
    function showModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.position = 'relative';
        modalContent.style.backgroundColor = 'white';
        modalContent.style.margin = 'auto';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.width = '50%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.display = 'flex';
        modalContent.style.flexDirection = 'column';
        modalContent.style.alignItems = 'flex-start'; // 默认左对齐

        // 在HTML字符串中定义模态窗口内容及关闭按钮
        modalContent.innerHTML = `
            <h2>联系我们</h2>
            <p style="margin-bottom: 10px; line-height: 1;">以下是我们提供的联系方式：</p>
            <p style="margin-bottom: 10px; line-height: 1;">侯老师：13777856668&nbsp;&nbsp;18969176668&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;李经理：18958129088</p>
            <p style="margin-bottom: 10px; line-height: 1;">传真：0571-86904592&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编：310018</p>
            <p style="margin-bottom: 10px; line-height: 1;">Email：yskjxs@163.com</p>
            <p style="margin-bottom: 10px; line-height: 1;">地址：浙江省杭州市下沙3号大街8号路口和达创意园5号楼6楼602、604、606室</p>
            <p style="margin-bottom: 10px; line-height: 1;">公众号二维码：</p>
            <div class="image-container-wrapper">
                <div class="image-container">
                    <img src="https://img.picui.cn/free/2024/10/23/6718cf53a1ec9.jpg" alt="公众号二维码" class="contact-image">
                </div>
            </div>
            <button class="close-button" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; border: none; background-color: transparent; font-size: 24px; cursor: pointer;">×</button>
        `;

        // 获取关闭按钮元素并添加点击事件
        const closeButton = modalContent.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });

        // 设置图片样式
        const imageContainerWrapper = modalContent.querySelector('.image-container-wrapper');
        imageContainerWrapper.style.display = 'block'; 
        const imageContainer = imageContainerWrapper.querySelector('.image-container');
        imageContainer.style.display = 'block'; 
        imageContainer.style.width = '30%'; // 设置宽度为模态框宽度的 30%

        const contactImage = imageContainer.querySelector('.contact-image');
        contactImage.style.maxWidth = '100%'; // 图片最大宽度为容器宽度
        contactImage.style.minWidth = '150px'; // 设置最小宽度
        contactImage.style.height = 'auto'; // 自动调整高度以保持比例

        // 加载完成后检查图片尺寸
        contactImage.onload = function() {
            console.log('Image dimensions:', this.width, this.height);
        };

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    document.body.appendChild(container);
})();
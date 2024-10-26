(function () {
    'use strict';

    // 创建容器
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = 'calc(100% - 80px)'; // 默认位置在窗口右侧
    container.style.top = '50%';
    container.style.transform = 'translateY(-50%)';
    container.style.width = '60px';
    container.style.height = '270px';
    container.style.backgroundColor = '#007BFF';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'space-between';
    container.style.borderRadius = '10px';
    container.style.overflow = 'hidden';
    container.style.transition = 'height 0.3s ease';
    container.style.zIndex = '9999999999'; // 置顶

    // 创建三个格子
    const links = [
        { text: '每日一练', url: 'https://yskj.cjrh.sebri.cn/gather/4/exam/daily/do', icon: '📖' },
        { text: '每周一测', url: 'https://yskj.cjrh.sebri.cn/gather/3/exam/monthly/do', icon: '📝' },
        { text: '每月一考', url: 'https://yskj.cjrh.sebri.cn/gather/3/exam/weekly/do', icon: '📅' },
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
        contentWrapper.style.justifyContent = 'center';

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

        // 点击跳转
        if (link.url) {
            box.addEventListener('click', () => {
                window.location.href = link.url;
            });
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
            container.style.height = '270px';
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

    // 拖动功能
    let isDragging = false;
    let offsetX, offsetY;
    let wasDragging = false; // 新增标志位
    let startX, startY; // 记录拖动的初始位置

    container.addEventListener('mousedown', startDrag, false);
    document.addEventListener('mousemove', doDrag, false);
    document.addEventListener('mouseup', stopDrag, false);

    function startDrag(e) {
        isDragging = true;
        wasDragging = true; // 标记开始拖动
        offsetX = e.clientX - container.offsetLeft;
        offsetY = e.clientY - container.offsetTop;
        startX = e.clientX;
        startY = e.clientY;
        document.onselectstart = function () { return false; }; // 禁止选择
    }

    function doDrag(e) {
        if (!isDragging) return;
        container.style.left = `${e.clientX - offsetX}px`;
        container.style.top = `${e.clientY - offsetY}px`;
    }

    function stopDrag(e) {
        isDragging = false;
        const deltaX = Math.abs(e.clientX - startX);
        const deltaY = Math.abs(e.clientY - startY);

        // 判断位移是否超过阈值（5px）
        if (deltaX > 5 || deltaY > 5) {
            wasDragging = true;
        } else {
            wasDragging = false;
        }
        document.onselectstart = null;
    }

    // 阻止点击事件传播
    function preventClickDuringDrag(e) {
        if (wasDragging) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }

    // 给所有可能触发点击事件的元素添加事件监听器
    container.querySelectorAll('*').forEach(el => {
        el.addEventListener('click', preventClickDuringDrag, { capture: true });
    });

    // 插入到页面
    document.body.appendChild(container);

})();
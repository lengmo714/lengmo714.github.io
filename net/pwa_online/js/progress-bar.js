function createProgressBar(containerId, url) {
    let container = document.getElementById(containerId);
  
    if (!container) {
      console.error('没有找到指定的容器元素。');
      return;
    }
  
    // 动态插入进度条 HTML 内容
    container.innerHTML = `
      <div class="container">
        <div class="image">
          <div id="install-text" class="install-text"></div>
          <div class="progress-bar">
            <div id="progress" class="progress">0%</div>
          </div>
          <button id="new-btn" class="new-btn">Abra o aplicativo</button>
        </div>
      </div>
    `;
  
    let progress = document.getElementById('progress');
    let installText = document.getElementById('install-text');
    let newBtn = document.getElementById('new-btn');
    let progressValue = 0;
    let duration = 10000; // 进度条的持续时间（10秒）
    let intervalTime = 50; // 更新进度的时间间隔
    let increment = 100 / (duration / intervalTime);
  
    // 进度条动画
    let interval = setInterval(function() {
      progressValue += increment;
      progress.style.width = progressValue + '%';
      progress.innerHTML = Math.round(progressValue) + '%';
  
      if (progressValue >= 100) {
        clearInterval(interval);
        installText.innerHTML = '';
        setTimeout(function() {
          progress.style.display = 'none';
          newBtn.style.display = 'inline-block';
        }, 500);
      }
    }, intervalTime);
  
    // 完成后点击按钮隐藏进度条，并跳转
    newBtn.addEventListener('click', function() {
      document.getElementById(containerId).style.display = 'none'; // 隐藏进度条界面
      window.location.href = url; // 跳转到传入的 URL
    });
  }
  
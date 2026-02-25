// --- スクロールリビール (Scroll Reveal) ---
document.addEventListener("DOMContentLoaded", function () {
    // リビール対象に reveal クラスを JS で付与（JS 無効時は非表示にならない）
    document.querySelectorAll('.lead, .urakami').forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// --- ナビゲーション：現在ページのアクティブ表示 ---
document.addEventListener("DOMContentLoaded", function () {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav ul li a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFile || (!currentFile && href === 'index.html')) {
            link.classList.add('nav-active');
        }
    });
});

// --- ハンバーガーメニュー関連 ---
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('nav ul li a');

    hamburger.addEventListener('click', function () {
        menu.classList.toggle("active");
    });
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menu.classList.remove('active');
        });
    });
});


// --- 動的スライドショー (slideshow.json から画像を読み込み) ---
(async function initSlideshow() {
    const container = document.getElementById('slideshow-container');
    if (!container) return; // index.html 以外のページでは何もしない

    // slideshow.json を取得（キャッシュ回避のクエリ付き）
    let images = [];
    try {
        const res = await fetch('slideshow.json?v=' + Date.now());
        if (!res.ok) throw new Error('HTTP ' + res.status);
        images = await res.json();
    } catch (e) {
        console.warn('slideshow.json の読み込みに失敗しました:', e);
        return;
    }
    if (images.length === 0) return;

    // ナビボタンの手前に slide 要素を動的に生成
    const prevBtn = container.querySelector('.prev');
    images.forEach((filename, i) => {
        const div = document.createElement('div');
        div.className = 'slide' + (i === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = 'img/slideshow/' + filename;
        img.alt = '柔道部の集合写真' + (i + 1);
        div.appendChild(img);
        container.insertBefore(div, prevBtn);
    });

    // スライド制御
    let slideIndex = 0;
    const slides = container.getElementsByClassName('slide');
    const totalSlides = slides.length;
    let autoSlideTimer;

    window.changeSlide = function(n, isManual) {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + n + totalSlides) % totalSlides;
        slides[slideIndex].classList.add('active');
        if (isManual) resetAutoTimer();
    };

    function showNextSlide() { changeSlide(1, false); }

    function resetAutoTimer() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(showNextSlide, 7000);
    }

    resetAutoTimer();
})();



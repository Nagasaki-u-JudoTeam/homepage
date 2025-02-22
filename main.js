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


document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const totalSlides = slides.length;

    let autoSlideTimer; // setIntervalのIDを保持

    // 最初のスライドを表示
    slides[slideIndex].classList.add("active");

    // 自動切り替え用の関数
    function showNextSlide() {
        changeSlide(1, false); 
        // 第二引数をfalseにすることで「手動ではない」ことを示す
    }

    // 前後にスライド切り替えする共通関数
    // n: 1なら次へ、-1なら前へ
    // isManual: 手動操作ならtrue、自動切り替えならfalse
    window.changeSlide = function(n, isManual) {
        // 現在のスライド非表示
        slides[slideIndex].classList.remove("active");
        
        // 次(または前)のスライドを計算
        slideIndex = (slideIndex + n + totalSlides) % totalSlides;

        // 新しいスライドを表示
        slides[slideIndex].classList.add("active");

        // 手動クリック時だけタイマーをリセット（＝次の自動切り替えを「今から7秒後」にする）
        if (isManual) {
            resetAutoTimer();
        }
    }

    // タイマーを再セットする関数
    function resetAutoTimer(){
        clearInterval(autoSlideTimer); 
        autoSlideTimer = setInterval(showNextSlide, 7000); 
    }

    // ページ読み込み時に自動再生スタート
    resetAutoTimer();
});



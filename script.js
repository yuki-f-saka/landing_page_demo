// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// アニメーション効果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を設定
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// モバイルメニューの処理
document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューボタンを追加
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // ハンバーガーメニューボタンを作成
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #333;
        cursor: pointer;
    `;
    
    nav.appendChild(mobileMenuBtn);
    
    // モバイルメニューの切り替え
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
    });
    
    // モバイルメニューのスタイルを動的に追加
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            .nav-menu.mobile-active {
                max-height: 300px;
                padding: 1rem 0;
            }
            .nav-menu li {
                text-align: center;
                padding: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// フォーム処理（予約ボタン）
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // 実際のサービスでは予約フォームや外部サービスにリダイレクト
        if (this.textContent.includes('予約') || this.textContent.includes('相談')) {
            e.preventDefault();
            showModal();
        }
    });
});

// モーダル表示
function showModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎉 お問い合わせありがとうございます！</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>レンタルおじさんサービスにご興味をお持ちいただき、ありがとうございます。</p>
                <p>実際のサービスでは、こちらで予約フォームまたは連絡先が表示されます。</p>
                <div class="contact-info">
                    <p>📧 <strong>メール:</strong> info@rental-ojisan.com</p>
                    <p>📞 <strong>電話:</strong> 0120-XXX-XXX</p>
                    <p>🕒 <strong>受付時間:</strong> 平日 10:00-22:00</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary modal-close">閉じる</button>
            </div>
        </div>
    `;
    
    // モーダルスタイル
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
        position: relative;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    `;
    
    document.body.appendChild(modal);
    
    // モーダルを閉じる
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });
    
    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// カウントアップアニメーション（料金表示用）
function animateNumbers() {
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const text = price.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        if (number) {
            let current = 0;
            const increment = number / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                price.textContent = text.replace(number, Math.floor(current).toLocaleString());
            }, 50);
        }
    });
}

// 画面読み込み時の処理
window.addEventListener('load', function() {
    // 少し遅延してアニメーションを開始
    setTimeout(animateNumbers, 1000);
});

// パフォーマンス向上のための画像遅延読み込み（今回は絵文字なので不要ですが、実装例として）
document.addEventListener('DOMContentLoaded', function() {
    // 実際の画像がある場合の遅延読み込み処理
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});
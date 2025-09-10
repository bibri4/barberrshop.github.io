document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mainNav = document.getElementById('mainNav');
    
    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Закрытие по клику на ссылки
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

function replaceMobileImages() {
    // Все картинки которые нужно менять
    const images = [
        document.querySelector('.footer-logo[data-desktop][data-mobile]'),
        document.querySelector('.hero-image[data-desktop][data-mobile]'),
        document.querySelector('.screenshot-image[data-desktop][data-mobile]')
    ];
    
    const isMobile = window.innerWidth <= 768;
    
    images.forEach(img => {
        if (img) {
            img.src = isMobile ? img.dataset.mobile : img.dataset.desktop;
            
            // Добавляем классы если нужно
            img.classList.toggle('mobile-version', isMobile);
            img.classList.toggle('desktop-version', !isMobile);
        }
    });
}

// Оптимизация ресайза
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(replaceMobileImages, 250);
});

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', replaceMobileImages);

// Функция показа оверлея с фото
function showGalleryOverlay() {
    // Показываем оверлей
    const overlay = document.querySelector('.gallery-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }
}

// Функция скрытия оверлея
function hideGalleryOverlay() {
    const overlay = document.querySelector('.gallery-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Разблокируем прокрутку
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "Ещё фото"
    const showMoreBtn = document.querySelector('.show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', showGalleryOverlay);
    }
    
    // Кнопка закрытия
    const closeBtn = document.querySelector('.close-overlay');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideGalleryOverlay);
    }
    
    // Закрытие по клику на оверлей
    const overlay = document.querySelector('.gallery-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideGalleryOverlay();
            }
        });
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideGalleryOverlay();
        }
    });
});


if (window.innerWidth <= 768) {
    let currentSlide = 0;
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-track .barber-img');
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        track.scrollTo({
            left: currentSlide * window.innerWidth,
            behavior: 'smooth'
        });
    }
    
    // Автопрокрутка каждые 3 секунды
    setInterval(nextSlide, 3000);
}
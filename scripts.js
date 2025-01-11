const carousels = document.querySelectorAll('.carousel');
const carouselContainers = document.querySelectorAll('.carousel-container');
let currentIndexes = []; // Índices para rastrear a posição atual de cada carrossel.

carousels.forEach((_, index) => {
    currentIndexes[index] = 0;
});

const intervalTime = 5000; // Tempo entre mudanças de imagem.

function updateIndicators(carouselIndex) {
    const indicatorsParent = document.querySelectorAll('.carousel-indicators')[carouselIndex];
    const indicators = indicatorsParent.children;
    Array.from(indicators).forEach(indicator => indicator.classList.remove('active'));
    indicators[currentIndexes[carouselIndex]].classList.add('active');
}

function showNextImage(carouselIndex) {
    currentIndexes[carouselIndex] = (currentIndexes[carouselIndex] + 1) % carouselContainers[carouselIndex].children.length;
    const offset = -currentIndexes[carouselIndex] * 100;
    carouselContainers[carouselIndex].style.transform = `translateX(${offset}%)`;
    updateIndicators(carouselIndex);
}

function showPreviousImage(carouselIndex) {
    currentIndexes[carouselIndex] = (currentIndexes[carouselIndex] - 1 + carouselContainers[carouselIndex].children.length) % carouselContainers[carouselIndex].children.length;
    const offset = -currentIndexes[carouselIndex] * 100;
    carouselContainers[carouselIndex].style.transform = `translateX(${offset}%)`;
    updateIndicators(carouselIndex);
}

function initializeIndicators() {
    carousels.forEach((carousel, index) => {
        const indicatorsParent = document.querySelectorAll('.carousel-indicators')[index];
        const containerChildren = carouselContainers[index].children;
        for (let i = 0; i < containerChildren.length; i++) {
            const indicator = document.createElement('span');
            indicator.dataset.index = i;
            indicator.addEventListener('click', () => {
                currentIndexes[index] = i;
                const offset = -currentIndexes[index] * 100;
                carouselContainers[index].style.transform = `translateX(${offset}%)`;
                updateIndicators(index);
            });
            indicatorsParent.appendChild(indicator);
        }
        indicatorsParent.children[0].classList.add('active');
    });
}

function startAutoCarousel() {
    carousels.forEach((carousel, index) => {
        setInterval(() => showNextImage(index), intervalTime);
    });
}

const scrollArrow = document.getElementById('scroll-arrow');
const contents = ['hero-section', 'first-content', 'second-content', 'third-content', 'fourth-content'];
let currentContentIndex = 0;

if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        currentContentIndex++;
        if (currentContentIndex < contents.length) {
            const nextContent = document.getElementById(contents[currentContentIndex]);
            nextContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nextContent.style.opacity = '1';

            if (currentContentIndex >= contents.length - 1) {
                scrollArrow.style.display = 'none';
            }
        }
    });
}

window.addEventListener('scroll', () => {
    contents.forEach(contentId => {
        const content = document.getElementById(contentId);
        const contentPosition = content.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (contentPosition < screenPosition) {
            content.style.opacity = '1';
        }
    });
});

// Inicializa indicadores e executa o carrossel automático.
initializeIndicators();
startAutoCarousel();

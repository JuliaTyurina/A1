import Swiper from 'swiper';
import { Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const initSwiperPaginationInvisible = (swiper, card) => {
    const pagination = card.querySelector('[data-product-card-pagination-invisible]');
    if (!pagination) return;

    const paginationElems = pagination.querySelectorAll('[data-slide-index]');
    let currentIndex = 0;

    paginationElems.forEach((elem) => {
        const index = Number(elem.dataset.slideIndex);
        if (!Number.isFinite(index)) return;

        elem.addEventListener('mouseenter', () => {
            if (currentIndex === index) return;
            currentIndex = index;
            swiper.slideTo(index);
        });
    });

    pagination.addEventListener('mouseleave', () => {
        if (currentIndex === 0) return;
        currentIndex = 0;
        swiper.slideTo(0);
    });
};


export function initProductCardSliders() {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const cards = document.querySelectorAll('[data-product-card]');

    cards.forEach((card) => {
        const sliderEl = card.querySelector('[data-product-card-slider]');
        const paginationEl = card.querySelector('[data-product-card-pagination]');

        if (!sliderEl || !paginationEl) return;

        const swiperOptions = {
            modules: [Pagination, Keyboard],
            slidesPerView: 1,
            watchOverflow: true,
            allowTouchMove: !isDesktop,

            pagination: {
                el: paginationEl,
                clickable: true,
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        };


        const swiper = new Swiper(sliderEl, swiperOptions);


        if (isDesktop) {
            initSwiperPaginationInvisible(swiper, card);
        }
    });
}

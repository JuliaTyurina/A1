import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';

export function initBannerSliders() {
    const sections = document.querySelectorAll('[data-banner-section]');

    sections.forEach((section) => {
        const sliderEl = section.querySelector('[data-banner-slider]');
        const paginationEl = section.querySelector('[data-banner-pagination]');
        const prevBtn = section.querySelector('[data-banner-prev]');
        const nextBtn = section.querySelector('[data-banner-next]');

        if (!sliderEl) return;

        new Swiper(sliderEl, {
            modules: [Pagination, Navigation],
            slidesPerView: 1.1,
            spaceBetween: 8,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            pagination: {
                el: paginationEl,
                clickable: true,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 1.25,
                },

            },
        });
    });
}

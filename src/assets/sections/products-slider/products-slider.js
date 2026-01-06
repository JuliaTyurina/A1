import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css';

export function initProductsSliders() {

    const sections = document.querySelectorAll('[data-products-section]');

    sections.forEach((section) => {
        const sliderEl = section.querySelector('[data-products-slider]');
        const prevBtn = section.querySelector('[data-products-prev]');
        const nextBtn = section.querySelector('[data-products-next]');

        if (!sliderEl) return;

        new Swiper(sliderEl, {
            modules: [Navigation],
            slidesPerView: 2.1,
            spaceBetween: 8,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
            loop: false,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },

            breakpoints: {
                576: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },

                768: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },

                1300: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
            },
        });
    });
}

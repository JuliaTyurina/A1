import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css';

export function initSetCardsSliders() {

    const sections = document.querySelectorAll('[data-set-cards-section]');

    sections.forEach((section) => {
        const sliderEl = section.querySelector('[data-set-cards-slider]');
        const prevBtn = section.querySelector('[data-set-cards-prev]');
        const nextBtn = section.querySelector('[data-set-cards-next]');

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
                768: {
                    slidesPerView: 3.5,
                    spaceBetween: 12,
                    slidesOffsetBefore: 16,
                    slidesOffsetAfter: 16,
                },
                1300: {
                    slidesPerView: 3.5,
                    slidesOffsetBefore: 0,
                    spaceBetween: 20,
                },
            },
        });
    });
}

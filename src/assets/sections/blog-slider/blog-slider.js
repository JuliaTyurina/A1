import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

export function initBlogSliders() {
    const sections = document.querySelectorAll('[data-blog-section]');

    sections.forEach((section) => {
        const sliderEl = section.querySelector('[data-blog-slider]');
        const prevBtn = section.querySelector('[data-blog-prev]');
        const nextBtn = section.querySelector('[data-blog-next]');

        if (!sliderEl) return;

        new Swiper(sliderEl, {
            modules: [Navigation],
            slidesPerView: 1.5,
            spaceBetween: 8,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
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
                    spaceBetween: 20,
                },
            },
        });
    });
}

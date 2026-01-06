import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function initHeroSliders() {
    const sections = document.querySelectorAll('[data-hero-section]');

    sections.forEach((section) => {
        const sliderEl = section.querySelector('[data-hero-slider]');
        const paginationEl = section.querySelector('[data-hero-pagination]');
        const prevBtn = section.querySelector('[data-hero-prev]');
        const nextBtn = section.querySelector('[data-hero-next]');

        if (!sliderEl) return;

        new Swiper(sliderEl, {
            modules: [Pagination, Navigation],
            slidesPerView: "auto",
            spaceBetween: 12,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
            centeredSlides: true,
            initialSlide: 1,
            pagination: {
                el: paginationEl,
                clickable: true,
            },
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            breakpoints: {
                576: {
                    initialSlide: 0,
                    centeredSlides: false,
                },
            },
        });
    });
}

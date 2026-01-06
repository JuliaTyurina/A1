import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';

export function initProductRefSliders() {
    const sections = document.querySelectorAll('[data-product-ref-section]');

    sections.forEach((section) => {
        const sliderEl = section.querySelector('[data-product-ref-slider]');
        const prevBtn = section.querySelector('[data-product-ref-prev]');
        const nextBtn = section.querySelector('[data-product-ref-next]');

        if (!sliderEl) return;

        new Swiper(sliderEl, {
            modules: [Navigation],
            slidesPerView: "auto",
            spaceBetween: 4,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            breakpoints: {
                768: {
                    spaceBetween: 12,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
            },

        });
    });
}
export function initProductSliders() {
    const sections = document.querySelectorAll('[data-product-section]');

    sections.forEach((section) => {
        const mainSliderEl = section.querySelector('[data-product-main-slider]');
        const thumbsSliderEl = section.querySelector('[data-product-thumbs-slider]');

        if (!mainSliderEl) return;

        const thumbsSwiper = new Swiper(thumbsSliderEl, {
            modules: [Navigation, Thumbs],
            slidesPerView: 4,
            freeMode: true,
            breakpoints: {
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    direction: "vertical",
                    autoHeight: true,
                    slidesPerView: 'auto',
                },
            },
        });

        const mainSlider = new Swiper(mainSliderEl, {
            modules: [Navigation, Thumbs],
            watchSlidesProgress: true,
            slidesPerView: 1.5,
            slidesOffsetBefore: 4,
            slidesOffsetAfter: 4,
            spaceBetween: 4,
            thumbs: {
                swiper: thumbsSwiper,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },

                1024: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    spaceBetween: 24,
                },
            },
        });
    });
}

export const initExpandButtons = () => {
    const hasHiddenContent = (el) => el?.scrollWidth > el?.clientWidth || el?.scrollHeight > el?.clientHeight;

    const update = () => {
        document.querySelectorAll('[data-global-action="product-variants-toggle"]').forEach((button) => {
            const scrollBlock = document.querySelector(`[data-expand="${button.dataset.expand}"]`);
            button.hidden = !hasHiddenContent(scrollBlock);
        });
    };

    update();
    window.addEventListener('resize', update);
};


/*
(i) Код попадает в итоговый файл,
только когда вызвана функция,
например pkmFunctions.isWeb();
Или когда импортирован весь файл,
например import "files/script.js";
Неиспользуемый (не вызванный)
код в итоговый файл не попадает.

Если мы хотим добавить модуль
следует его расскоментировать
*/

import {initGlobalAction} from "./files/globalActions.js";
import { updateCounterClass } from "../sections/_components/bottom-nav/bottom-nav-counter.js";
import {initFancybox} from "./libs/fancybox.js";
import {initHeroSliders} from "../sections/hero/hero.js";
import {initProductsSliders} from "../sections/products-slider/products-slider.js";
import {initProductCardSliders} from "../sections/_components/product-card/product-card.js";
import {initBannerSliders} from "../sections/banner-slider/banner-slider.js";
import {initBlogSliders} from "../sections/blog-slider/blog-slider.js";
import {initExpandButtons, initProductRefSliders, initProductSliders} from "../sections/product/product.js";
import {initInputsRange} from "./files/functions.js";
import {initSetCardsSliders} from "../sections/set-cards-slider/set-cards-slider.js";

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('app');

    loader.classList.add('hidden');
    content.classList.add('visible');
});

document.addEventListener('DOMContentLoaded', () => {
    initGlobalAction();
    updateCounterClass();
    initHeroSliders()
    initProductCardSliders()
    initProductsSliders()
    initBannerSliders()
    initBlogSliders()
    initProductRefSliders()
    initProductSliders()
    initExpandButtons()
    initInputsRange()
    initSetCardsSliders()

    initFancybox()


});
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

import { initGlobalAction } from "./files/globalActions.js";
import { updateCounterClass } from "../sections/components/bottom-nav/bottom-nav-counter.js";
import {initClearInput} from "./files/functions.js";


// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    initGlobalAction();
    updateCounterClass();
    initClearInput()
});
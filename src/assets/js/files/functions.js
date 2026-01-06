export const initDragScroll = (selector = '.drag-scroll') => {
    // Находим все элементы по селектору
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
        console.warn(`enableDragScroll: элементы с селектором "${selector}" не найдены`);
        return;
    }

    elements.forEach(element => {
        let isDown = false;
        let startX;
        let scrollLeft;

        element.style.cursor = 'grab';
        element.style.userSelect = 'none';

        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.style.cursor = 'grabbing';

            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });

        element.addEventListener('mouseup', () => {
            isDown = false;
            element.style.cursor = 'grab';
        });

        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.style.cursor = 'grab';
        });

        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();

            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX);
            element.scrollLeft = scrollLeft - walk;
        });
    });

    console.log(`✅ Drag-scroll применён к ${elements.length} элементам`);
}


export const initInputsRange = () => {
    const ranges = document.querySelectorAll(".range");

    ranges.forEach(range => {
        const slider = getSliderElements(range);
        if (!slider.isValid) return;

        const state = createInitialState(range.dataset);

        setupSliders(slider, state);
        setupInputs(slider, state);
        updateUI(slider, state);
    });
};

// ========================================
// 1. СОБИРАЕМ ВСЕ ЭЛЕМЕНТЫ
// ========================================
function getSliderElements(range) {
    const sliderFrom = range.querySelector(".range__slider-from");
    const sliderTo = range.querySelector(".range__slider-to");
    const inputFrom = range.querySelector(".range__from input");
    const inputTo = range.querySelector(".range__to input");
    const trek = range.querySelector(".range__track");

    // Проверяем, что всё на месте
    const isValid = sliderFrom && sliderTo && inputFrom && inputTo && trek;

    return { sliderFrom, sliderTo, inputFrom, inputTo, trek, isValid };
}

// ========================================
// 2. СОЗДАЁМ НАЧАЛЬНОЕ СОСТОЯНИЕ
// ========================================
function createInitialState(dataset) {
    const max = Number(dataset.rangeMax) || 10000;
    const from = Number(dataset.rangeFrom) || 0;
    const to = Number(dataset.rangeTo) || max;

    return { from, to, max };
}

// ========================================
// 3. НАСТРАИВАЕМ СЛАЙДЕРЫ
// ========================================
function setupSliders(slider, state) {
    const { sliderFrom, sliderTo } = slider;

    // Устанавливаем диапазон
    sliderFrom.min = 0;
    sliderFrom.max = state.max;
    sliderTo.min = 0;
    sliderTo.max = state.max;

    // При движении левого слайдера
    sliderFrom.addEventListener('input', () => {
        state.from = limitValue(
            Number(sliderFrom.value),
            0,
            state.to - 1
        );
        updateUI(slider, state);
    });

    // При движении правого слайдера
    sliderTo.addEventListener('input', () => {
        state.to = limitValue(
            Number(sliderTo.value),
            state.from + 1,
            state.max
        );
        updateUI(slider, state);
    });
}

// ========================================
// 4. НАСТРАИВАЕМ ТЕКСТОВЫЕ ПОЛЯ
// ========================================
function setupInputs(slider, state) {
    const { inputFrom, inputTo } = slider;

    // Убираем буквы при вводе (для Firefox)
    [inputFrom, inputTo].forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9]/g, '');
        });
    });

    // Когда пользователь закончил ввод в левое поле
    inputFrom.addEventListener('change', () => {
        const value = Number(inputFrom.value);

        if (isNaN(value)) {
            state.from = 0;
        } else {
            state.from = limitValue(value, 0, state.to - 1);
        }

        updateUI(slider, state);
    });

    // Когда пользователь закончил ввод в правое поле
    inputTo.addEventListener('change', () => {
        const value = Number(inputTo.value);

        if (isNaN(value)) {
            state.to = state.max;
        } else {
            state.to = limitValue(value, state.from + 1, state.max);
        }

        updateUI(slider, state);
    });
}

// ========================================
// 5. ОБНОВЛЯЕМ ВСЁ НА ЭКРАНЕ
// ========================================
function updateUI(slider, state) {
    updateInputValues(slider, state);
    updateTrackColor(slider, state);
}

// Обновляем значения в полях и слайдерах
function updateInputValues(slider, state) {
    slider.inputFrom.value = state.from;
    slider.inputTo.value = state.to;
    slider.sliderFrom.value = state.from;
    slider.sliderTo.value = state.to;
}

// Закрашиваем трек между двумя значениями
function updateTrackColor(slider, state) {
    const { trek } = slider;
    if (!trek || state.max === 0) return;

    const percent1 = (state.from / state.max) * 100;
    const percent2 = (state.to / state.max) * 100;

    trek.style.background =
        `linear-gradient(to right,
            #C6CAD2 ${percent1}%,
            #337AFF ${percent1}%,
            #337AFF ${percent2}%,
            #C6CAD2 ${percent2}%)`;
}

// ========================================
// УТИЛИТА: ОГРАНИЧЕНИЕ ЗНАЧЕНИЯ
// ========================================
function limitValue(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}
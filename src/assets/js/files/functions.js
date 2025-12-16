/**
 * Input Clear — стирание текста в инпутах
 *
 * ЛОГИКА РАБОТЫ:
 * - Слушает событие input на [data-clearable-input]
 * - Добавляет/убирает класс has-value на [data-input-wrapper]
 * - По классу CSS показывает/прячет кнопку [data-clear-button]
 * - Слушает клики по кнопке и очищает инпут
 */

export const initClearInput = () => {
    // Отслеживаем ввод текста
    document.addEventListener('input', (event) => {
        const input = event.target.closest('[data-clearable-input]');
        if (!input) return;

        const wrapper = input.closest('[data-input-wrapper]');
        if (!wrapper) return;

        if (input.value.length > 0) {
            wrapper.classList.add('has-value');
        } else {
            wrapper.classList.remove('has-value');
        }
    });

    // Обработка клика по кнопке стирания
    document.addEventListener('click', (event) => {
        const clearBtn = event.target.closest('[data-clear-button]');
        if (!clearBtn) return;

        event.preventDefault();

        const wrapper = clearBtn.closest('[data-input-wrapper]');
        const input = wrapper?.querySelector('[data-clearable-input]');

        if (input) {
            input.value = '';
            input.focus();
            wrapper.classList.remove('has-value');
        }
    });
};

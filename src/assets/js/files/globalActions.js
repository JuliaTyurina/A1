/**
 * Global Actions — система управления действиями через один обработчик
 *
 * ЛОГИКА РАБОТЫ:
 * - Слушает ВСЕ клики на странице через document
 * - Проверяет, есть ли на кнопке атрибут data-global-action
 * - Если есть → выполняет нужный метод из класса App
 * - Метод добавляет/удаляет класс на <body>
 * - SCSS видит класс на body и показывает/прячет элементы
 *
 * КАК ДОБАВИТЬ НОВОЕ ДЕЙСТВИЕ:
 * 1. Добавь название в GLOBAL_ACTIONS, например: SearchOpen: 'search-open',
 * 2. Добавь метод (функцию — что именно должно происходить при клике) в класс App: searchOpen() { document.body.classList.add('search-open'); }
 * 3. Добавь проверку в initGlobalAction(): [GLOBAL_ACTIONS.SearchOpen]: (target) => app.searchOpen();
 * 4. В HTML: <button data-global-action="search-open">Поиск</button>
 * 5. В SCSS: body { &.search-open { .search-panel { display: block; } } }
 *
 * МОДАЛЬНЫЕ ОКНА (dialog):
 *  Клик на кнопку (любой элемент) с data-global-action="modal-open" и data-modal="modal-id" открывает модалку
 *  data-modal="modal-id" должен совпадать у кнопки и у модалки, чтобы открывалось то, что нужно
 *  Клик на кнопку с data-global-action="modal-close" внутри модалки закрывает модалку
 *  Можно вызвать modalOpen(element) / modalClose(element) из других файлов для программного управления
 *
 * В ДРУГИХ ФАЙЛАХ:
 * import { modalOpen, modalClose, mobileMenuToggle } from './globalActions.js';
 * modalOpen(element), modalClose(element) или любая другая функция
 *
 **/

const GLOBAL_ACTIONS = {
    MobileMenuToggle: 'mobile-menu-toggle',
    MobileCatalogToggle: 'mobile-catalog-toggle',
    MobileAccountToggle: 'mobile-account-toggle',
    MobileAllMenusToggle: 'mobile-all-menus-toggle',
    ModalOpen: 'modal-open',
    ModalClose: 'modal-close',
    DesktopMenuToggle: 'desktop-menu-toggle',
    SearchBarToggle: 'search-bar-toggle',
    ProductVariantsToggle: 'product-variants-toggle',
};

const GLOBAL_ACTION_ATTRIBUTE = 'data-global-action';

const getEventData = (event) => {
    const data = {
        elem: event.target || null,
        target: null,
        action: null,
        key: event.key || null,
    };

    data.target = data.elem?.closest(`[${GLOBAL_ACTION_ATTRIBUTE}]`) || null;
    data.action = data.target?.getAttribute(GLOBAL_ACTION_ATTRIBUTE) || null;

    return data;
};

export const mobileMenuToggle = () =>  {
    document.body.classList.toggle('mobile-menu-open');
    document.body.classList.remove('mobile-catalog-open');
    document.body.classList.remove('mobile-account-open');
}

export const mobileCatalogToggle = () => {
    document.body.classList.toggle('mobile-catalog-open');
    document.body.classList.remove('mobile-menu-open');
    document.body.classList.remove('mobile-account-open');
}

export const mobileAccountToggle = () => {
    document.body.classList.toggle('mobile-account-open');
    document.body.classList.remove('mobile-menu-open');
    document.body.classList.remove('mobile-catalog-open');
}

export const mobileAllMenusToggle = () => {
    const body = document.body;
    const mobileMenuOpen = body.classList.contains('mobile-menu-open');
    const mobileCatalogOpen = body.classList.contains('mobile-catalog-open');
    const mobileAccountOpen = body.classList.contains('mobile-account-open');

    // Если какое-то меню открыто → закрыть его
    if (mobileMenuOpen || mobileCatalogOpen || mobileAccountOpen) {
        body.classList.remove('mobile-menu-open');
        body.classList.remove('mobile-catalog-open');
        body.classList.remove('mobile-account-open');
    } else {
        // Если все закрыты → открыть главное меню
        body.classList.add('mobile-menu-open');
    }
}

export const modalOpen = (element) => {
    const modalId = element.dataset.modal;
    const dialog = document.querySelector(`dialog[data-modal="${modalId}"]`);
    dialog?.showModal();
};
export const modalClose = (element) => {
    const dialog = element.closest('dialog');
    dialog?.close();
};

export const desktopMenuToggle= () => {
    document.body.classList.toggle('desktop-menu-open');
}

export const searchBarToggle = () => {
    document.body.classList.toggle('search-bar-open');
}

export const productVariantsToggle = (button) => {
    document.body.classList.toggle('product-variants-expanded');
    const isExpanded = document.body.classList.contains('product-variants-expanded');
    button.toggleAttribute('data-expanded', isExpanded);
}


export const initGlobalAction = () => {

    const actionHandlers = {
        [GLOBAL_ACTIONS.MobileMenuToggle]: () => mobileMenuToggle(),
        [GLOBAL_ACTIONS.MobileCatalogToggle]: () => mobileCatalogToggle(),
        [GLOBAL_ACTIONS.MobileAccountToggle]: () => mobileAccountToggle(),
        [GLOBAL_ACTIONS.MobileAllMenusToggle]: () => mobileAllMenusToggle(),
        [GLOBAL_ACTIONS.ModalOpen]: (target) => modalOpen(target),
        [GLOBAL_ACTIONS.ModalClose]: (target) => modalClose(target),
        [GLOBAL_ACTIONS.DesktopMenuToggle]: () => desktopMenuToggle(),
        [GLOBAL_ACTIONS.SearchBarToggle]: () => searchBarToggle(),
        [GLOBAL_ACTIONS.ProductVariantsToggle]: (target) => productVariantsToggle(target),
    };

    document.addEventListener('click', (event) => {
        const {target, action} = getEventData(event);

        if (!target) return;

        const handler = actionHandlers[action];
        if (!handler) return;

        event.stopPropagation();
        handler(target);
    });
};
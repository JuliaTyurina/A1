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
 * 2. Добавь метод в класс App: searchOpen() { document.body.classList.add('search-open'); }
 * 3. Добавь проверку в initGlobalAction(): if (action === GLOBAL_ACTIONS.SearchOpen) app.searchOpen();
 * 4. В HTML: <button data-global-action="search-open">Поиск</button>
 * 5. В SCSS: body { &.search-open { .search-panel { display: block; } } }
 */

const GLOBAL_ACTIONS = {
    MobileMenuToggle: 'mobile-menu-toggle',
    MobileCatalogToggle: 'mobile-catalog-toggle',
    MobileAccountToggle: 'mobile-account-toggle',
    MobileAllMenusToggle: 'mobile-all-menus-toggle',
    SubmenuOpen: 'submenu-open',
    SubmenuBack: 'submenu-close',
    DesktopMenuToggle: 'desktop-menu-toggle',
    SearchBarToggle: 'search-bar-toggle',
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

class App {
    mobileMenuToggle() {
        document.body.classList.toggle('mobile-menu-open');
        document.body.classList.remove('mobile-catalog-open');
        document.body.classList.remove('mobile-account-open');
    }

    mobileCatalogToggle() {
        document.body.classList.toggle('mobile-catalog-open');
        document.body.classList.remove('mobile-menu-open');
        document.body.classList.remove('mobile-account-open');
    }

    mobileAccountToggle() {
        document.body.classList.toggle('mobile-account-open');
        document.body.classList.remove('mobile-menu-open');
        document.body.classList.remove('mobile-catalog-open');
    }

    mobileAllMenusToggle() {
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


    submenuOpen(element) {
        const submenuId = element.dataset.submenu;
        const dialog = document.querySelector(`dialog[data-submenu="${submenuId}"]`);
        dialog?.showModal();
    }

    submenuClose(element) {
        const dialog = element.closest('dialog');
        dialog?.close();
    }

    desktopMenuToggle() {
        document.body.classList.toggle('desktop-menu-open');
    }

    searchBarToggle() {
        document.body.classList.toggle('search-bar-open');
    }
}

export const initGlobalAction = () => {
    const app = new App();

    const actionHandlers = {
        [GLOBAL_ACTIONS.MobileMenuToggle]: () => app.mobileMenuToggle(),
        [GLOBAL_ACTIONS.MobileCatalogToggle]: () => app.mobileCatalogToggle(),
        [GLOBAL_ACTIONS.MobileAccountToggle]: () => app.mobileAccountToggle(),
        [GLOBAL_ACTIONS.MobileAllMenusToggle]: () => app.mobileAllMenusToggle(),
        [GLOBAL_ACTIONS.SubmenuOpen]: (target) => app.submenuOpen(target),
        [GLOBAL_ACTIONS.SubmenuBack]: (target) => app.submenuClose(target),
        [GLOBAL_ACTIONS.DesktopMenuToggle]: () => app.desktopMenuToggle(),
        [GLOBAL_ACTIONS.SearchBarToggle]: () => app.searchBarToggle(),
    };

    document.addEventListener('click', (event) => {
        const { target, action } = getEventData(event);

        if (!target) return;

        const handler = actionHandlers[action];
        if (!handler) return;

        event.stopPropagation();
        handler(target);
    });
};
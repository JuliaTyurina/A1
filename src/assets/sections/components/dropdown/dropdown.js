export const initDropdown = () => {
    const dropdowns = document.querySelectorAll('[data-dropdown]');

    dropdowns.forEach((dropdown) => {
        const header = dropdown.querySelector('[data-dropdown-header]');

        const store = {
            isActive: false,
            setActive(active) {
                this.isActive = active;

                if (this.isActive) {
                    dropdown.dataset.active = 'true';
                    header?.setAttribute('aria-expanded', 'true');
                } else {
                    dropdown.dataset.active = 'false';
                    header?.setAttribute('aria-expanded', 'false');
                }
            },
        };

        const unfocusDropdownChild = (eventTarget) => {
            if (!eventTarget) {
                store.setActive(false);
            } else {
                const newFocusedDropdown = eventTarget.closest && eventTarget.closest('[data-dropdown]');
                if (!newFocusedDropdown || newFocusedDropdown !== dropdown) {
                    store.setActive(false);
                }
            }
        };

        // Desktop: mouseenter/mouseleave
        dropdown.addEventListener('mouseenter', () => store.setActive(true));
        dropdown.addEventListener('mouseleave', () => store.setActive(false));

        // Фокус
        header?.addEventListener('focusin', () => store.setActive(true));
        header?.addEventListener('focusout', (e) => unfocusDropdownChild(e.relatedTarget));

        // Escape
        dropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                store.setActive(false);
            }
        });
    });
};

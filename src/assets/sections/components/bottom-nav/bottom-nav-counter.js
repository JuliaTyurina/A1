export function updateCounterClass() {
    const counters = document.querySelectorAll('[data-nav-counter]');

    counters.forEach((counter) => {
        const value = parseInt(counter.dataset.navCounter, 10);

        if (value >= 100) {
            counter.classList.add('over-100');
        } else {
            counter.classList.remove('over-100');
        }
    });
}


// Если counter обновляется динамически, вызывай функцию после обновления updateCounterClass();

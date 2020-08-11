module.exports = function observeMutations(intersectionObserver) {

    // observing mutations DOM of gallery grid
    let mutation = function(entries, mutationObserver) {

        entries.forEach(function(entry) {

            if (entry.type === 'childList') {

                // fetching only added nodes mutation
                // and filtering nodes to only observe grid item node
                Array.from(entry.addedNodes)
                    .filter(function(node) {
                        return typeof node.classList !== 'undefined' && node.classList.contains('flat-gallery-grid-item');
                    })
                    .forEach(function(node) {

                        let image = node.querySelector('img');

                        if (image !== null && false === image.hasAttribute('data-observing')) {

                            image.setAttribute('data-observing', true);
                            intersectionObserver.observe(image);
                        }
                    });
            }
        });
    };

    let grid = document.querySelector('[data-role="flat-gallery-grid"]');

    if (grid) {

        // grid found in document, starting mutation observer
        let mutationObserver = new MutationObserver(mutation);
        mutationObserver.observe(grid, {

            childList: true,
            attributes: false,
            subtree: false,
        });
    }
};

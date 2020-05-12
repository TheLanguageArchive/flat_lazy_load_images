if (!'IntersectionObserver' in window &&
    !'IntersectionObserverEntry' in window &&
    !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    require('intersection-observer');
}

(function() {

    window.addEventListener('load', function(event) {

        let getViewportDimensions = require('./dimensions');
        let lazyLoader            = require('./loader');
        let viewportHeight        = getViewportDimensions(window).h;

        let intersectObserver = new IntersectionObserver(lazyLoader, {

            root: document,
            rootMargin: `${viewportHeight}px 0px ${viewportHeight}px 0px`,
            threshold: 0.5
        });

        // finding lazy loadable images
        let targets = document.querySelectorAll('[data-flat-lazy-load-image][data-loaded="0"]');

        // adding to intersect observer
        targets.forEach(function(target) {
            intersectObserver.observe(target);
        });

        // lazy loading new elements
        let observeMutations = require('./mutations');
        observeMutations(intersectObserver);
    });

})();

module.exports = function loader(entries, observer) {

    entries.forEach(function(entry) {

        let target = entry.target;

        if (entry.isIntersecting === true && target.getAttribute('data-loaded') == '0') {

            // marking it as loaded
            target.setAttribute('data-loaded', '1');

            // removing image from observer
            observer.unobserve(target);

            // dispatch lazyload intersected event if applicable
            if (target.getAttribute('data-flat-lazy-load-intersected') == '1') {
                target.dispatchEvent(new CustomEvent('flat.lazyload.intersected', {bubbles: true}));
            }

            // and finally loading image
            target.src = target.getAttribute('data-src');
        }
    });
};

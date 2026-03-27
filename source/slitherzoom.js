window.default_gsc = 0.9;
window.desired_gsc = window.gsc || window.default_gsc;
window.last_user_gsc = window.desired_gsc;

if (!window.__slitherZoomInstalled) {
    window.__slitherZoomInstalled = true;

    document.body.addEventListener('wheel', function (e) {
        if (!window.gsc) return;
        e.preventDefault();

        window.desired_gsc *= Math.pow(0.9, e.deltaY / 120);

        if (window.desired_gsc < 0.1) window.desired_gsc = 0.1;
        if (window.desired_gsc > 4) window.desired_gsc = 4;

        window.last_user_gsc = window.desired_gsc;
        window.gsc = window.desired_gsc;
    }, { passive: false });

    // Prevent middle-click autoscroll
    document.addEventListener('mousedown', function (e) {
        if (e.button === 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Middle click toggles between default zoom and the last user-selected zoom
    document.addEventListener('auxclick', function (e) {
        if (e.button !== 1) return;
        e.preventDefault();

        const isDefault = Math.abs(window.desired_gsc - window.default_gsc) < 0.01;

        if (isDefault) {
            window.desired_gsc = window.last_user_gsc || 0.5;
        } else {
            window.last_user_gsc = window.desired_gsc;
            window.desired_gsc = window.default_gsc;
        }

        window.gsc = window.desired_gsc;
    });

    (function keepZoom() {
        if (window.desired_gsc !== undefined) {
            window.gsc = window.desired_gsc;
        }
        requestAnimationFrame(keepZoom);
    })();
}
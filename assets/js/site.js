(() => {
  const header = document.querySelector('.site-header');

  if (!header) return;

  const topBoundary = 96;
  const directionThreshold = 10;
  let previousY = Math.max(window.scrollY, 0);
  let directionDistance = 0;
  let ticking = false;

  const showNavigation = () => header.classList.remove('is-hidden');
  const hideNavigation = () => header.classList.add('is-hidden');
  const navigationHasKeyboardFocus = () => {
    const activeElement = document.activeElement;

    return (
      activeElement instanceof HTMLElement &&
      header.contains(activeElement) &&
      activeElement.matches(':focus-visible')
    );
  };

  const updateNavigation = () => {
    const currentY = Math.max(window.scrollY, 0);
    const delta = currentY - previousY;

    if (
      (delta > 0 && directionDistance < 0) ||
      (delta < 0 && directionDistance > 0)
    ) {
      directionDistance = 0;
    }

    directionDistance += delta;

    if (currentY <= topBoundary || navigationHasKeyboardFocus()) {
      showNavigation();
      directionDistance = 0;
    } else if (directionDistance > directionThreshold) {
      hideNavigation();
      directionDistance = 0;
    } else if (directionDistance < -directionThreshold) {
      showNavigation();
      directionDistance = 0;
    }

    previousY = currentY;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;

      window.requestAnimationFrame(updateNavigation);
      ticking = true;
    },
    { passive: true }
  );

  header.addEventListener('focusin', showNavigation);
})();

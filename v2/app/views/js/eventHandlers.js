'use strict';

/**
 * Function to toggle header's drawer's visibility.
 * @export
 */
export const showHideDrawer = () => {
  document.getElementById('drawer').classList.toggle('hide');
};

/**
 * Function to add/remove owner image from header's signature on scroll.
 * @export
 */
export const changeHeaderOnScroll = () => {
  if (screen.width > 600) {
    const owner = document.getElementById('header-image');
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = owner.offsetHeight;

    owner.style.marginTop = -scroll + 'px';

    if (scroll > threshold) {
      owner.style.display = 'none';
    } else {
      owner.style.display = 'block';
    }
  }
};

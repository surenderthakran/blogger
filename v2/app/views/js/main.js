'use strict';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hamburger')
        .addEventListener('click', showHideDrawer);

    window.addEventListener('scroll', changeHeaderOnScroll);
  });

  function showHideDrawer() {
    document.getElementById('drawer').classList.toggle('hide');
  }

  function changeHeaderOnScroll() {
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
})();

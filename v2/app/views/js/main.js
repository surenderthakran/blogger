'use strict';

(() => {
  window.addEventListener('scroll', changeHeaderOnScroll);

  function changeHeaderOnScroll() {
    const owner = document.getElementById('header-image');
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 100;

    owner.style.marginTop = -scroll + 'px';

    if (scroll > threshold) {
      owner.style.display = 'none';
    } else {
      owner.style.display = 'block';
    }
  };
})();

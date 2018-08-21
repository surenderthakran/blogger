'use strict';

import * as handlers from './eventHandlers';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hamburger')
        .addEventListener('click', handlers.showHideDrawer);

    window.addEventListener('scroll', handlers.changeHeaderOnScroll);
  });
})();

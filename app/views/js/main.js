'use strict';

import * as handlers from './eventHandlers';
import * as utils from './utils';
import TableOfContent from './tableOfContent';

(() => {
  window.addEventListener('load', () => {
    // Add listener on hamburger icon to toggle header's drawer.
    document.getElementById('hamburger')
        .addEventListener('click', handlers.showHideDrawer);

    // Add listener on window scroll to minimize and maximize header signature.
    window.addEventListener('scroll', handlers.changeHeaderOnScroll);

    // Add table of content in article pages.
    if (utils.isArticlePage()) {
      const toc = new TableOfContent();
      toc.generateIndexObject();
      toc.displayTableOfContent();
    }
  });
})();

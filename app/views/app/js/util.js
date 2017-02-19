'use strict';

var Utils = {};

/**
 * Checks if the current page is an article page.
 * @returns {Boolean} Returns if the current page is an article page.
 */
Utils.IsArticlePage = function() {
  var article = document.getElementsByTagName('article')[0];
  if (article && article.className === 'article') {
    var lastChild = article.lastElementChild;
    if (lastChild.tagName === 'DIV' && lastChild.className === 'article-body') {
      return true;
    }
  }
  return false;
};

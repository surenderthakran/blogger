/** @module utils */
'use strict';

/**
 * Checks if the current page is an article page.
 * @return {Boolean} Returns true if the current page is an article page else
 *                   false.
 * @export
 */
export const isArticlePage = function() {
  const section = document.getElementsByTagName('section')[0];
  if (section && section.className === 'article') {
    return true;
  }
  return false;
};

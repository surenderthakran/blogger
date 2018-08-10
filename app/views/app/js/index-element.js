'use strict';

(function(exports) {
  /** Class defining an index element in the table of content. */
  function IndexElement(element) {
    this.element = element;
    this.text = element.textContent;

    var normalized = element.textContent.toLowerCase().replace(/\s+/g, '-')
        .replace(/[^a-z0-9+-]+/gi, '');
    this.href = normalized.split('-', 4).join('-');

    this.parent = null;
    this.children = [];
  }

  /**
    * Function to compare two header tags and deduce which is of higher order.
    *
    * @param {IndexElement} The IndexElement object for a header element.
    * @return {number} This is 0 if both headers have the same tagName property,
    *   1 if the new header is greater than the old one and -1 for vice-versa.
    */
  IndexElement.prototype.compareSeniority = function(indexElement) {
    var self = this;
    var headers = Constants.headers;

    if (!indexElement) {
      return 0;
    }

    var currentHeaderTag = self.element.tagName;
    var newHeaderTag = indexElement.element.tagName;
    if (headers.indexOf(currentHeaderTag) === headers.indexOf(newHeaderTag)) {
      return 0;
    } else if (
        headers.indexOf(currentHeaderTag) > headers.indexOf(newHeaderTag)) {
      return -1;
    } else if (
        headers.indexOf(currentHeaderTag) < headers.indexOf(newHeaderTag)) {
      return 1;
    }
  };

  exports.IndexElement = IndexElement;
})(window);

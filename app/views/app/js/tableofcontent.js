'use strict';

const headers = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

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

/** Class encapsulating the table of content in an article. */
function TableOfContent() {
  this.index = [];
}

/**
  * Function to parse all the header tags in an article and create an
  * TableOfContent object.
  */
TableOfContent.prototype.GenerateIndexObject = function() {
  var articleBody = document.getElementsByClassName('article-body')[0];
  var childs = articleBody.children;

  var currentLevel = 0;
  var currentParent = null;
  var lastHeader = null;
  for (var i = 0, len = childs.length; i < len; i++) {
    if (headers.indexOf(childs[i].tagName) !== -1) {
      var indexElement = new IndexElement(childs[i]);

      var seniorityComparison = indexElement.compareSeniority(lastHeader);
      if (seniorityComparison === 0) {
        // When the new and the last header have the same tag.
        if (currentLevel === 0) {
          this.index.push(indexElement);
        } else {
          indexElement.parent = currentParent;
          currentParent.children.push(indexElement);
        }
      } else if (seniorityComparison === -1) {
        // When the new header is smaller than the last header.
        currentParent = lastHeader;
        indexElement.parent = currentParent;
        currentParent.children.push(indexElement);
        currentLevel++;
      } else if (seniorityComparison === 1) {
        // When the new header is greater than the last header.
        if (currentLevel === 0) {
          // Header element higher than the first header will be treated as on
          // the same level.
          this.index.push(indexElement);
        } else {
          if (currentLevel - 1 === 0) {
            currentParent = null;
            this.index.push(indexElement);
          } else {
            currentParent = lastHeader.parent.parent;
            indexElement.parent = currentParent;
            currentParent.children.push(indexElement);
          }
        }
        currentLevel--;
      }
      lastHeader = indexElement;
    }
  }
};

/**
  * Function to populate an article with table of content from the
  * TableOfContent object.
  */
TableOfContent.prototype.CreateIndexList = function() {
  var indexList = createListForArray(this.index);
  indexList.className = 'article-index';

  var article = document.getElementsByTagName('article')[0];
  var articleBody = document.getElementsByClassName('article-body')[0];
  article.insertBefore(indexList, articleBody);
};

/**
  * Recursive function to create unordered list from TableOfContent object.
  *
  * @param {TableOfContent} Object containing list of table of content elements.
  * @return {Object}  DOM object for an unordered list.
  */
function createListForArray(list) {
  var indexList = document.createElement('ul');
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].element.id = list[i].href;
    var listItem = document.createElement('li');
    var itemAnchor = document.createElement('a');
    var itemText = document.createTextNode(list[i].text);
    itemAnchor.appendChild(itemText);
    itemAnchor.href = '#' + list[i].href;
    listItem.appendChild(itemAnchor);
    indexList.appendChild(listItem);

    if (list[i].children.length > 0) {
      var childListItem = document.createElement('li');
      childListItem.className = 'child-list-item';
      var childIndexList = createListForArray(list[i].children);
      childIndexList.className = 'child-list';
      childListItem.appendChild(childIndexList);
      indexList.appendChild(childListItem);
    }
  }

  return indexList;
}

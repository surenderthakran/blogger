'use strict';

(function(exports) {
  /** Class encapsulating the table of content in an article. */
  function TableOfContent() {
    this.index = [];
  }

  /**
    * Function to parse all the header tags in an article and create an
    * TableOfContent object.
    */
  TableOfContent.prototype.GenerateIndexObject = function() {
    var self = this;
    var articleBody = document.getElementsByClassName('article-body')[0];
    var childs = articleBody.children;

    var currentLevel = 0;
    var currentParent = null;
    var lastHeader = null;
    for (var i = 0, len = childs.length; i < len; i++) {
      if (Constants.headers.indexOf(childs[i].tagName) !== -1) {
        var indexElement = new IndexElement(childs[i]);

        var seniorityComparison = indexElement.compareSeniority(lastHeader);
        if (seniorityComparison === 0) {
          // When the new and the last header have the same tag.
          if (currentLevel === 0) {
            self.index.push(indexElement);
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
            self.index.push(indexElement);
          } else {
            if (currentLevel - 1 === 0) {
              currentParent = null;
              self.index.push(indexElement);
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
    var self = this;

    var article = document.getElementsByTagName('article')[0];
    if (article.getElementsByClassName('article-index').length === 0) {
      var indexList = createListForArray(self.index);
      indexList.className = 'article-index';

      var articleBody = document.getElementsByClassName('article-body')[0];
      article.insertBefore(indexList, articleBody);
    }
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

  exports.TableOfContent = TableOfContent;
})(window);

'use strict';

const headers = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

function IndexElement(element) {
  this.element = element;
  this.text = '';
  this.href = '';
  // TODO(surenderthakran): update to store children for multilevel index list.
  this.children = [];
}

IndexElement.prototype.createItemData = function() {
  this.text = this.element.textContent;
  var normalized = this.text.toLowerCase().replace(/\s+/g, '-')
      .replace(/[^a-z0-9+-]+/gi, '');
  this.href = normalized.split('-', 4).join('-');
};

function TableOfContent() {
  this.index = [];
}

TableOfContent.prototype.GenerateIndexObject = function() {
  var articleBody = document.getElementsByClassName('article-body')[0];
  var childs = articleBody.children;
  for (var i = 0, len = childs.length; i < len; i++) {
    if (headers.indexOf(childs[i].tagName) !== -1) {
      var indexElement = new IndexElement(childs[i]);
      indexElement.createItemData();
      this.index.push(indexElement);
    }
  }
};

TableOfContent.prototype.CreateIndexList = function() {
  var indexList = document.createElement('ul');
  indexList.className = 'article-index';
  for (var i = 0, len = this.index.length; i < len; i++) {
    this.index[i].element.id = this.index[i].href;
    var listItem = document.createElement('li');
    var itemAnchor = document.createElement('a');
    var itemText = document.createTextNode(this.index[i].text);
    itemAnchor.appendChild(itemText);
    itemAnchor.href = '#' + this.index[i].href;
    listItem.appendChild(itemAnchor);
    indexList.appendChild(listItem);
  }
  var article = document.getElementsByTagName('article')[0];
  var articleBody = document.getElementsByClassName('article-body')[0];
  article.insertBefore(indexList, articleBody);
};

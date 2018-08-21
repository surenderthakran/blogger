'use strict';

const headers =['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

export default class {
  constructor() {
    this.index = [];
  }

  generateIndexObject() {
    const section = document.getElementsByTagName('section')[0];
    const articleBody = section.getElementsByClassName('body')[0];
    const children = articleBody.children;

    let currentLevel = 0;
    let currentParent = null;
    let lastHeader = null;

    for (let child of children) {
      if (headers.indexOf(child.tagName) !== -1) {
        const indexElement = new IndexElement(child);

        const seniorityComparison = indexElement.compareSeniority(lastHeader);

        if (seniorityComparison === -1) {
          currentParent = lastHeader;
          indexElement.parent = currentParent;
          currentParent.children.push(indexElement);
          currentLevel++;
        } else if (seniorityComparison === 1) {
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
        } else {
          if (currentLevel === 0) {
            this.index.push(indexElement);
          } else {
            indexElement.parent = currentParent;
            currentParent.children.push(indexElement);
          }
        }
        lastHeader = indexElement;
      }
    }
  }

  displayTableOfContent() {
    const section = document.getElementsByTagName('section')[0];
    const articleBody = section.getElementsByClassName('body')[0];
    if (section.getElementsByClassName('article-toc').length === 0) {
      const nav = document.createElement('nav');
      nav.className = 'article-toc';
      section.insertBefore(nav, articleBody);

      const indexList = this.createTocFromArray();

      nav.appendChild(indexList);
    }
  }

  createTocFromArray(indexObj=this.index) {
    const list = document.createElement('ul');

    for (const indexElement of indexObj) {
      indexElement.element.id = indexElement.href;

      const listItem = document.createElement('li');
      list.appendChild(listItem);

      const itemAnchor = document.createElement('a');
      itemAnchor.href = '#' + indexElement.href;
      listItem.appendChild(itemAnchor);

      const itemText = document.createTextNode(indexElement.text);
      itemAnchor.appendChild(itemText);

      if (indexElement.children.length > 0) {
        const childListItem = document.createElement('li');
        childListItem.className = 'child-list-item';
        list.appendChild(childListItem);

        const childIndexList = this.createTocFromArray(indexElement.children);
        childIndexList.className = 'child-list';
        childListItem.appendChild(childIndexList);
      }
    }

    return list;
  }
}

class IndexElement {
  constructor(element) {
    this.element = element;
    this.text = element.textContent;

    const normalized = element.textContent.toLowerCase().replace(/\s+/g, '-')
        .replace(/[^a-z0-9+-]+/gi, '');
    this.href = normalized.split('-', 4).join('-');

    this.parent = null;
    this.children = [];
  }

  compareSeniority(newElement) {
    if (!newElement) {
      return 0;
    }

    const currentHeader = this.element.tagName;
    const newHeader = newElement.element.tagName;

    if (headers.indexOf(currentHeader) > headers.indexOf(newHeader)) {
      // If new header is smaller than the current header.
      return -1;
    } else if (headers.indexOf(currentHeader) < headers.indexOf(newHeader)) {
      // If new header is larger than the current header.
      return 1;
    }

    // If both header tags are same.
    return 0;
  }
}

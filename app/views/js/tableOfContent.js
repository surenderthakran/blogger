/** @module tableOfContent */
'use strict';

const headers =['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

/** Class representing table of contents in an article page. */
export default class {
  /** Initializes table of content. */
  constructor() {
    // Holds array of IndexElement objects.
    this.index = [];
  }

  /** Reads header tags in the articles as populates class's index object. */
  generateIndexObject() {
    const section = document.getElementsByTagName('section')[0];
    const articleBody = section.getElementsByClassName('body')[0];

    // Read all root level elements in the article body.
    const children = articleBody.children;

    for (let child of children) {
      if (headers.includes(child.tagName)) {
        this.addHeaderToIndexObj(new IndexElement(child), this.index);
      }
    }
  }

  /**
   * Add a new IndexElement to in the TableOfContent's index after recursively
   * finding its proper position.
   *
   * @param {IndexElement} newHeader
   * @param {Array.<IndexElement>} indexObj
   */
  addHeaderToIndexObj(newHeader, indexObj) {
    // Add header if the index is empty at the current level.
    if (indexObj.length == 0) {
      indexObj.push(newHeader);
      return;
    }

    // Last element at the current level.
    const lastHeader = indexObj[indexObj.length - 1];

    // Compare new and last header for seniority.
    const seniority = newHeader.compareSeniority(lastHeader);

    if (seniority == -1) { // If new header is smaller than the last header.
      // Add new header to the children of the last header.
      this.addHeaderToIndexObj(newHeader, lastHeader.children);
    } else {
      // If the new header is same or larger than the last header, add it at the
      // current level.
      indexObj.push(newHeader);
    }
  }

  /**
   * Displays table of content's index object as a nested list in te=he article
   * page.
   */
  displayTableOfContent() {
    if (this.index.length > 0) {
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
  }

  /**
   * Recursively creates html list from index object.
   *
   * @param {Array.<IndexElement>} indexObj - TableOfContent's index object.
   * @return {HTMLElement} HTMLUListElement
   */
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

/** Class representing an element in the table of content. */
export class IndexElement {
  /**
   * Initializes a table of content element.
   *
   * @param {HTMLHeadElement} element - HTML header element.
   */
  constructor(element) {
    this.element = element;
    this.text = element.textContent;

    const normalized = element.textContent.toLowerCase().replace(/\s+/g, '-')
        .replace(/[^a-z0-9+-]+/gi, '');
    this.href = normalized.split('-', 4).join('-');

    this.parent = null;
    this.children = [];
  }

  /**
   * Compares two header element for size.
   *
   * @param {HTMLHeadElement} newElement - HTML header element.
   * @return {number} Returns 1 if the new header is smaller, -1 if larger
   *                  and 0 if same.
   */
  compareSeniority(newElement) {
    if (!newElement) {
      return 0;
    }

    const currentHeader = this.element.tagName;
    const newHeader = newElement.element.tagName;

    if (headers.indexOf(currentHeader) > headers.indexOf(newHeader)) {
      // If new header is larger than the current header.
      return -1;
    } else if (headers.indexOf(currentHeader) < headers.indexOf(newHeader)) {
      // If new header is smaller than the current header.
      return 1;
    }

    // If both header tags are same.
    return 0;
  }
}

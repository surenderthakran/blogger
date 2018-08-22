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

    let currentLevel = 0;
    let currentParent = null;
    let lastHeader = null;

    for (let child of children) {
      // If child is a header element.
      if (headers.indexOf(child.tagName) !== -1) {
        const currentHeader = new IndexElement(child);

        // Compare current header with the previous header.
        const seniorityComparison = currentHeader.compareSeniority(lastHeader);

        if (seniorityComparison === -1) {
          // If the current header is smaller than the previous header.

          // Set last header as current header's parent.
          currentHeader.parent = lastHeader;

          // Add current header to last header's children.
          lastHeader.children.push(currentHeader);

          // Set last header as the new parent.
          currentParent = lastHeader;

          // Take current level one unit deeper.
          currentLevel++;
        } else if (seniorityComparison === 1) {
          // If the current header is larger than the previous header.

          if (currentLevel === 0) {
            // Header elements larger than the header at 0th level will be
            // added to the same level.
            this.index.push(currentHeader);
          } else {
            if (currentLevel - 1 === 0) {
              currentParent = null;
              this.index.push(currentHeader);
            } else {
              currentParent = lastHeader.parent.parent;
              currentHeader.parent = currentParent;
              currentParent.children.push(currentHeader);
            }
          }
          currentLevel--;
        } else {
          // If the current header is same as the previous header.

          if (currentLevel === 0) {
            this.index.push(currentHeader);
          } else {
            currentHeader.parent = currentParent;
            currentParent.children.push(currentHeader);
          }
        }
        lastHeader = currentHeader;
      }
    }
  }

  /**
   * Displays table of content's index object as a nested list in te=he article
   * page.
   */
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
class IndexElement {
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

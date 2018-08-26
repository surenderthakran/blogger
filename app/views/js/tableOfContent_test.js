'use strict';

import {expect} from 'chai';
import {JSDOM} from 'jsdom';

import {IndexElement} from './tableOfContent';
import TableOfContent from './tableOfContent';

describe('TableOfContent', function() {
  let toc;
  let articleSection;

  beforeEach(function() {
    const dom = new JSDOM(`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <section></section>
  </body>
</html>`);

    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = {
      userAgent: 'node.js',
    };

    articleSection = document.getElementsByTagName('section')[0];

    toc = new TableOfContent();
  });

  afterEach(function() {
    global.window = undefined;
    global.document = undefined;
    global.navigator = undefined;
  });

  it('should not have any IndexElements when the article has no headers',
      function() {
    articleSection.innerHTML = '<article class="body"></article>';
    toc.generateIndexObject();

    expect(toc.index).to.deep.equal([]);
  });

  it('should read root headers from article as IndexElements', function() {
    articleSection.innerHTML = `<article class="body">
      <h1>header element 1</h1>
      <p>some text</p>
      <h1>header element 2</h1>
      <p>some text</p>
      <h1>header element 3</h1>
    </article>`;

    toc.generateIndexObject();

    expect(toc.index).to.have.lengthOf(3);
  });
});

describe('IndexElement', function() {
  describe('constructor()', function() {
    it('should create IndexElement for header elements', function() {
      const indexElement = new IndexElement({
        tagName: 'H1',
        textContent: 'h1 element',
      });

      expect(indexElement.text).to.equal('h1 element');
    });
  });

  describe('compareSeniority', function() {
    let firstHeader;

    beforeEach(function() {
      firstHeader = new IndexElement({
        tagName: 'H2',
        textContent: 'h2 element',
      });
    });

    it('should return 0 for same headers', function() {
      const secondHeader = new IndexElement({
        tagName: 'H2',
        textContent: 'h2 element',
      });

      expect(firstHeader.compareSeniority(secondHeader)).to.equal(0);
    });

    it('should return 1 when compared with smaller headers', function() {
      const secondHeader = new IndexElement({
        tagName: 'H3',
        textContent: 'h3 element',
      });

      expect(firstHeader.compareSeniority(secondHeader)).to.equal(1);
    });

    it('should return -1 when compared with larger headers', function() {
      const secondHeader = new IndexElement({
        tagName: 'H1',
        textContent: 'h1 element',
      });

      expect(firstHeader.compareSeniority(secondHeader)).to.equal(-1);
    });
  });
});

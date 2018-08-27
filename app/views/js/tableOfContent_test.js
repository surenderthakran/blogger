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

  describe('generateIndexObject', function() {
    it('should not have any IndexElements when the article has no headers',
        function() {
      articleSection.innerHTML = '<article class="body"></article>';
      toc.generateIndexObject();

      expect(toc.index).to.deep.equal([]);
    });

    it('should read root headers from article', function() {
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

    it('should read child header from article', function() {
      articleSection.innerHTML = `<article class="body">
        <h1>header element 1</h1>
        <p>some text</p>
        <h2>header element 2</h2>
        <p>some text</p>
        <h1>header element 3</h1>
      </article>`;

      toc.generateIndexObject();

      expect(toc.index).to.have.lengthOf(2);

      expect(toc.index[0].element.tagName).to.equal('H1');
      expect(toc.index[0].children).to.have.lengthOf(1);

      expect(toc.index[0].children[0].element.tagName).to.equal('H2');
      expect(toc.index[0].children[0].children).to.have.lengthOf(0);

      expect(toc.index[1].element.tagName).to.equal('H1');
      expect(toc.index[1].children).to.have.lengthOf(0);
    });

    it('should read deep child headers from article', function() {
      articleSection.innerHTML = `<article class="body">
        <h1>header element 1</h1>
        <p>some text</p>
        <h2>header element 2</h2>
        <p>some text</p>
        <h3>header element 3</h3>
      </article>`;

      toc.generateIndexObject();

      expect(toc.index).to.have.lengthOf(1);

      expect(toc.index[0].element.tagName).to.equal('H1');
      expect(toc.index[0].children).to.have.lengthOf(1);

      expect(toc.index[0].children[0].element.tagName).to.equal('H2');
      expect(toc.index[0].children[0].children).to.have.lengthOf(1);

      expect(toc.index[0].children[0].children[0].element.tagName).to.equal('H3');
    });

    it('should make proper hierarchy of headers from article', function() {
      articleSection.innerHTML = `<article class="body">
        <h1>header element 1</h1>
        <p>some text</p>
        <h2>header element 2</h2>
        <p>some text</p>
        <h3>header element 3</h3>
        <p>some text</p>
        <h1>header element 6</h1>
      </article>`;

      toc.generateIndexObject();

      // expect(toc.index).to.deep.equal([]);
      expect(toc.index).to.have.lengthOf(2);

      expect(toc.index[0].element.tagName).to.equal('H1');
      expect(toc.index[0].children).to.have.lengthOf(1);

      expect(toc.index[0].children[0].element.tagName).to.equal('H2');
      expect(toc.index[0].children[0].children).to.have.lengthOf(1);

      expect(toc.index[0].children[0].children[0].element.tagName).to.equal('H3');
      expect(toc.index[0].children[0].children[0].children).to.have.lengthOf(0);

      expect(toc.index[1].element.tagName).to.equal('H1');
      expect(toc.index[1].children).to.have.lengthOf(0);
    });
  });

  describe('displayTableOfContent', function() {
    it('should display proper table of content in the article', function() {
      articleSection.innerHTML = `<article class="body">
        <h1>header element 1</h1>
        <p>some text</p>
        <h2>header element 2</h2>
        <p>some text</p>
        <h3>header element 3</h3>
        <p>some text</p>
        <h1>header element 6</h1>
      </article>`;

      toc.generateIndexObject();
      toc.displayTableOfContent();

      expect(articleSection.getElementsByClassName('article-toc').length)
          .to.equal(1);
      expect(articleSection.getElementsByClassName('article-toc')[0].tagName)
          .to.equal('NAV');
    });
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

    it('should return 0 if new header is null', function() {
      expect(firstHeader.compareSeniority(null)).to.equal(0);
    });
  });
});

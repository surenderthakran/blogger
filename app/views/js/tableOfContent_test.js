'use strict';

const assert = require('assert');

import {IndexElement} from './tableOfContent';

describe('IndexElement', function() {
  describe('constructor()', function() {
    it('should create IndexElement for header elements', function() {
      const indexElement = new IndexElement({
        tagName: 'H1',
        textContent: 'h1 element',
      });

      assert.equal(indexElement.text, 'h1 element');
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

      assert.equal(firstHeader.compareSeniority(secondHeader), 0);
    });

    it('should return 1 when compared with smaller headers', function() {
      const secondHeader = new IndexElement({
        tagName: 'H3',
        textContent: 'h3 element',
      });

      assert.equal(firstHeader.compareSeniority(secondHeader), 1);
    });

    it('should return -1 when compared with larger headers', function() {
      const secondHeader = new IndexElement({
        tagName: 'H1',
        textContent: 'h1 element',
      });

      assert.equal(firstHeader.compareSeniority(secondHeader), -1);
    });
  });
});

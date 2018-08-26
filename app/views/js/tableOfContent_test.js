'use strict';

const {expect} = require('chai');

import {IndexElement} from './tableOfContent';

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

'use strict';

const Chai = require('chai');
const IndexElement = require('./index-element.js');

const expect = Chai.expect;

describe('IndexElement', function() {
  describe('compareSeniority', function() {
    var firstHeader;
    var firstHeaderElement;

    beforeEach(function() {
      firstHeader = {
        tagName: 'H3',
        textContent: 'first header element',
      };
      firstHeaderElement = new IndexElement(firstHeader);
    });

    it('should return 0 for same header element', function() {
      let secondHeader = {
        tagName: 'H3',
        textContent: 'second header element',
      };
      let secondHeaderElement = new IndexElement(secondHeader);

      let result = firstHeaderElement.compareSeniority(secondHeaderElement);
      expect(result).to.equal(0);
    });

    it ('should return -1 for bigger header element', function() {
      let secondHeader = {
        tagName: 'H2',
        textContent: 'second header element',
      };
      let secondHeaderElement = new IndexElement(secondHeader);

      let result = firstHeaderElement.compareSeniority(secondHeaderElement);
      expect(result).to.equal(-1);
    });

    it ('should return 1 for smaller header element', function() {
      let secondHeader = {
        tagName: 'H4',
        textContent: 'second header element',
      };
      let secondHeaderElement = new IndexElement(secondHeader);

      let result = firstHeaderElement.compareSeniority(secondHeaderElement);
      expect(result).to.equal(1);
    });
  });
});

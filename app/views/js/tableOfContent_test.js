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

      assert.equal(indexElement.textContent, 'h1 element');
    });

    it('should properly compare headers');
  });
});

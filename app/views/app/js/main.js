/*global TableOfContent, Utils*/
'use strict';

(function() {
  document.addEventListener('DOMContentLoaded', function(){
    if (Utils.IsArticlePage()) {
      var toc = new TableOfContent();
      toc.GenerateIndexObject();
      toc.CreateIndex();
    }
  });
})();

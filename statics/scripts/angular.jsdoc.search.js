angular
  .module('search', ['angucomplete-alt'])
  .controller('SearchController', ['SEARCH_DATA', '$window', function (searchData, $window) {
      var me = this;

      me.docs = searchData.data;
      me.src = searchData.src;

      me.search = function (selected) {
          var doc,
              path;

          if (selected) {
              doc = selected.originalObject;
              me.src.forEach(function (src) {
                  if (doc.meta.path.indexOf(src) === 0) {
                      path = doc.meta.path.slice(src.length);
                  }
              });

              if (path) {
                $window.location = path.split('/')
                                       .concat([doc.meta.filename])
                                       .filter(function (p) { return p; })
                                       .join('_')  + '.html#line' + doc.meta.lineno;
              }
          }
      };
  }]);

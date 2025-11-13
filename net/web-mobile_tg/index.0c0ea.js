System.register(["./application.260cf.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;

  function topLevelImport(url) {
    return System["import"](url);
  }

  return {
    setters: [function (_application260cfJs) {
      Application = _application260cfJs.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      topLevelImport('cc').then(function (engine) {
        return application.init(engine);
      }).then(function () {
        return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});
window['pack_cfg']=`{"DBG": 1, "bundle_id": "", "channel_id": "telegram", "system": "telegram", "inStore": "false", "AfDevKey": "", "AfAppleID": "", "havaGG": "no"}`;window['pack_data']=JSON.parse(window['pack_cfg'])

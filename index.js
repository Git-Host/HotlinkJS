function isValidURL(str) {
  return driveSourcePattern.test(str)
    || dropboxSourcePattern.test(str)
  ;
}

jQuery(function($) {
  var hotlinkUrl = $("#hotlinkUrl");
  var message = $("#message");
  var sourceUrl = $("#sourceUrl");

  /* Init the 'Copy' button */
  $("#copyHotlink").clipboard({
    path: 'vendor/jquery.clipboard.swf',
    copy: function() {
      return hotlinkUrl.val();
    }
  });

  var controller = new FormController('.form');

  controller.addInputCallback(function(event) {
    var url = event.input.value;

    // Source URL matches rule(s) ?
    if (controller.isValid()) {
      var hotlink = generateHotlink(url);

      // Show hotlink URL
      hotlinkUrl.val(hotlink);
      // Hide error message
      message.hide("fast");
      // Change outline color
      sourceUrl.parent().addClass("has-success");
      sourceUrl.parent().removeClass("has-error");
    }
    else {
      if (! url) {
        // Hide error message
        message.hide("fast");
        // No outline color
        sourceUrl.parent().removeClass("has-error has-success");
      }
      else {
        hotlinkUrl.val('');
        message.show("fast");
        sourceUrl.parent().addClass("has-error");
        sourceUrl.parent().removeClass("has-success");
      }
    }
  });
  controller.getInput = function(property) {
    return document.querySelector('#sourceUrl');
  };
  controller.getProperty = function(input) {
    return 'source';
  };
  controller.setModel({ source: null });
  controller.setRules({ source: isValidURL });
  controller.setUp();
});

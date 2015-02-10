jQuery(function($) {
  $("#copyHotlink").clipboard({
    path: 'vendor/jquery.clipboard.swf',
    copy: function() {
      return $("#hotlinkUrl").val();
    }
  });
  $("#sourceUrl").keyup(function() {
    var url = $("#sourceUrl").val();

    if (url == "") {
      $("#message").hide("fast");
      $("#sourceUrl").parent().removeClass("has-error has-success");

      return;
    }

    var hotlink = generateHotlink(url);

    if (!hotlink) {
      $("#message").show("fast");
      $("#sourceUrl").parent().addClass("has-error");
      $("#sourceUrl").parent().removeClass("has-success");
    }
    else {
      $("#message").hide("fast");
      $("#hotlinkUrl").val(hotlink);
      $("#sourceUrl").parent().addClass("has-success");
      $("#sourceUrl").parent().removeClass("has-error");
    }
  });
});

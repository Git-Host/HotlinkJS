var driveHotlinkPattern = "https://drive.google.com/uc?export=view&id=<fileId>";
var driveSourcePattern = /^https?:\/\/drive\.google\.com\/file\/d\/([0-9a-zA-Z_-]+)\/edit\?usp=sharing$/i;
var dropboxHotlinkPattern = "https://dl.dropbox.com/s/<fileId>/<fileName>";
var dropboxSourcePattern = /^https?:\/\/www\.dropbox\.com\/s\/([0-9a-z]+)\/(.*)+$/i;

function generateHotlink(url) {
    var hotlink;

    // If URL matches Drive's sharing URL pattern
    if (driveSourcePattern.test(url)) {
        var fileId = RegExp.$1;

        hotlink = driveHotlinkPattern.replace("<fileId>", fileId);
    }
    // If URL matches Dropbox's sharing URL pattern
    else if (dropboxSourcePattern.test(url)) {
        var fileId = RegExp.$1;
        var fileName = RegExp.$2;

        hotlink = dropboxHotlinkPattern.replace("<fileId>", fileId);
        hotlink = hotlink.replace("<fileName>", fileName);
    }
    else {
        // Unknown URL pattern
        hotlink = null;
    }

    return hotlink;
}

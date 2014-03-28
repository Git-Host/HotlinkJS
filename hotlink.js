var driveHotlinkPattern = "https://drive.google.com/uc?export=view&id={fileId}";
var driveSourcePattern = /^https:\/\/drive\.google\.com\/file\/d\/([0-9a-zA-Z_-]+)\/edit\?usp=sharing$/i;

function generateHotlink(url) {
    var hotlink;

    // If URL matches Drive's sharing URL pattern
    if (driveSourcePattern.test(url)) {
        var fileId = RegExp.$1;

        hotlink = driveHotlinkPattern.replace("\{fileId\}", fileId);
    }
    else {
        // Unknown URL pattern
        hotlink = null;
    }

    return hotlink;
}
var drivePermalinkPattern = "https://drive.google.com/uc?export=view&id={fileId}";
var driveSourcePattern = /^https:\/\/drive\.google\.com\/file\/d\/([0-9a-zA-Z_-]+)\/edit\?usp=sharing$/i;

function generatePermalink(url) {
    var permalink;

    // If URL matches Drive's sharing URL pattern
    if (driveSourcePattern.test(url)) {
        var fileId = RegExp.$1;

        permalink = drivePermalinkPattern.replace("\{fileId\}", fileId);
    }
    else {
        // Unknown URL pattern
        permalink = null;
    }

    return permalink;
}
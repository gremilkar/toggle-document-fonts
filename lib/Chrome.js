const {Ci, Cu} = require("chrome");
const {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

var PrefServ = require("./PrefServ"),
actionButton = require("./ActionButton"),
branch = Services.prefs.getBranch("browser.display.use_document_fonts");

branch.addObserver("", observe, false);

function observe(subject, topic, data) {
    // instanceof actually also "casts" subject
    if (!(subject instanceof Ci.nsIPrefBranch)) {
        return;
    }
    
    actionButton.setIconAndLabel();
};

exports.onUnload = function(reason) {
    // Need to remove our observer again! This isn't automatic and will leak
    // otherwise.
    branch.removeObserver("", observe);
    
    if(reason == "disable" || reason == "uninstall"){
        //restore changes made by addon
        PrefServ.resetter("browser.display.use_document_fonts");
    }
};

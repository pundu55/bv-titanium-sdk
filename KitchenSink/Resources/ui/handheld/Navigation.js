function Navigation(firstWindow){
	var win;
	if(Ti.Platform.name == 'iPhone OS') {
		win = Titanium.UI.createWindow();
	    var nav = Titanium.UI.iPhone.createNavigationGroup({
	       window: firstWindow
	    });
    
 	    win.add(nav);
 	    
 	    win.pushWindow = function (toOpen){
 	    	nav.open(toOpen, {animated: true});
 	    }
 	}
	else {
		win = firstWindow;
		win.pushWindow = function (toOpen){
			toOpen.open({modal: true});
		}
	}
	
	return win;
}

module.exports = Navigation;

//
//  Navigation
//
//  Creates a window that may be used as a navigation stack in a cross-platform manner.  On iOS pushWindow pushes
//  the provided window (toOpen) to the top of a UINavigationController.  On Android, it pushes a new activity.

function Navigation(firstWindow){
	var win;
	
	// Check if iOS or Android
	if(Ti.Platform.name == 'iPhone OS') {
		
		// If IOS, create a navigation group
		win = Titanium.UI.createWindow();
	    var nav = Titanium.UI.iPhone.createNavigationGroup({
	       window: firstWindow
	    });
 	    win.add(nav);
 	    
 	    // pushWindow opens within the nav
 	    win.pushWindow = function (toOpen){
 	    	nav.open(toOpen, {animated: true});
 	    }
 	}
	else {
		// If Android, do nothing
		win = firstWindow;
		
		// pushWindow opens as a new, modal activity
		win.pushWindow = function (toOpen){
			toOpen.open({modal: true});
		}
	}
	
	return win;
}

module.exports = Navigation;

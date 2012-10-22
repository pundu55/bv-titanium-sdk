//
//  App
//
//  Single entry point for the application.  Simply creates MainScreen and opens it within our Navigation framework.

(function() {
	var MainScreen = require('ui/handheld/MainScreen');
	var firstScreen = new MainScreen();
	
	var Navigation = require('ui/handheld/Navigation');
	var nav = new Navigation(firstScreen);
	firstScreen.nav = nav;
	nav.open();
})();


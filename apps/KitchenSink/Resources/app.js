(function() {
	var MainScreen = require('ui/handheld/MainScreen');
	var firstScreen = new MainScreen();
	
	var Navigation = require('ui/handheld/Navigation');
	var nav = new Navigation(firstScreen);
	firstScreen.nav = nav;
	nav.open();
})();

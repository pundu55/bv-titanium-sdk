(function() {
	var ProductScreen = require('ui/handheld/ProductScreen');
	var firstScreen = new ProductScreen();
	
	var Navigation = require('ui/handheld/Navigation');
	var nav = new Navigation(firstScreen);
	firstScreen.nav = nav;
	nav.open();
})();


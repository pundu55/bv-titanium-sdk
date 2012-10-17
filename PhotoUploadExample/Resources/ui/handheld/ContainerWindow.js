//
//  ContainerWindow
//
//  This is the basic layout view used throughout the application.  It is a centered, bordered white backround over
//  a background image.

function ContainerWindow() {
	Ti.include("/lib/colors.js");

	// Set up window and background image
	// "translucent" allows the nav bar to partially obscure the background
	var win = Ti.UI.createWindow({
		backgroundImage : "images/app_background2.png",
		translucent : true,
		barColor : secondaryColor,

	});

	Ti.include("/lib/colors.js");

	// Creates a bordered view -- this is the view that will contain all of our content
	var view = Ti.UI.createView({
		top : Ti.Platform.name == 'iPhone OS' ? '10%' : '3%',
		bottom: '5px',
		width : '80%',
		height: Ti.Platform.name == 'iPhone OS' ? '87%' : '92%',
		borderWidth : 3,
		borderColor : borderColor,
		backgroundColor : 'white',
		layout : 'vertical'
	});
	win.add(view);

	// Allow access to the content view via window.mainView
	win.mainView = view;

	return win;
}

module.exports = ContainerWindow;

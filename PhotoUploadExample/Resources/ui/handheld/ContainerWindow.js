function ContainerWindow() {
	Ti.include("/lib/colors.js");

	var win = Ti.UI.createWindow({
		backgroundImage : "images/app_background2.png",
		translucent : true,
		barColor : secondaryColor,

	});

	win.orientationModes = [  
    	Titanium.UI.PORTRAIT
	];

	Ti.include("/lib/colors.js");

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

	win.mainView = view;

	return win;
}

module.exports = ContainerWindow;

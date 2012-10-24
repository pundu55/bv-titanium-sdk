//
//  MainScreen
//
//  This is the first screen that the user sees.  It allows the user to enter a search term, then passes the 
//  term to ProductsScreen to kick off a search.


function MainScreen() {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var mainScreen = new ContainerWindow();
	var mainView = mainScreen.mainView;
	
	var logo = Ti.UI.createImageView({
		image: "/images/bv_icon.jpg",
		height: 100,
		width: 100,
		top:10
	});
	mainView.add(logo);
	
	Ti.include("/lib/colors.js")
	
	var textBox = Ti.UI.createTextField({
		hintText:"try Olive",
		height: Ti.Platform.name == 'iPhone OS' ? 28 : '35dip',
		paddingLeft:5,
		paddingRight:5,
		width:"90%",
		borderWidth:1,
		borderRadius:5,
		borderColor:secondaryTextBoxColor,
		backgroundColor:"white",
		font: {fontSize: 15},
		top:10
	}); 
	mainView.add(textBox);
	
	var submit = Ti.UI.createButton({
		title: "Search",
		width: "80%",
		top:10
	})
	
	// Upoon submit, forward to the ProductsScreen with the textBox value as query to execute
    var ProductsScreen = require("ui/handheld/ProductsScreen");
	submit.addEventListener("click", function(){
		var productsScreen = new ProductsScreen(textBox.value);
		productsScreen.nav = mainScreen.nav;
		mainScreen.nav.pushWindow(productsScreen);
	});
	mainView.add(submit);
	
	return mainScreen;
};

module.exports = MainScreen;
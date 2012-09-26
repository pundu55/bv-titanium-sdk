function ReviewDetailScreen(review) {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var detailScreen = new ContainerWindow();
	var mainView = detailScreen.mainView;

	var Stars = require('stars/Stars');
	Ti.include("/lib/colors.js");

	var title = Ti.UI.createLabel({
		left : 10,
		height : "20%",
		width : "100%",
		text : review.Title,
		font : {
			fontSize : 15
		}
	});
	mainView.add(title);

	var middleView = Ti.UI.createView({
		width : '100%',
		height : '30%',
		layout : 'horizontal'
	});

	var productIm = Ti.UI.createImageView({
		image : review.Photos.length > 0 ? review.Photos[0] : "/images/camera_icon.gif",
		width : "50%",
		height: "100%",
		top : 10
	});
	middleView.add(productIm);

	var stars = Stars.createStars({
		top : 0,
		width : "50%",
		height : 100,
		rating : review.Rating
	});
	middleView.add(stars);
	mainView.add(middleView);

	var revText = Ti.UI.createTextArea({
		left : "5%",
		color : secondaryColor,
		height : "50%",
		width : "90%",
		value : review.ReviewText,
		editable: false,
		font : {
			fontSize : 12
		}
	});
	mainView.add(revText);

	return detailScreen;
};

module.exports = ReviewDetailScreen;

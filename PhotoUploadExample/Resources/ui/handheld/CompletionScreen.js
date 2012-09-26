function CompletionScreen(review) {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var completionScreen = new ContainerWindow();
	mainView = completionScreen.mainView;

	Ti.include("/lib/colors.js");

	var Stars = require('stars/Stars');

	var thanks = Ti.UI.createLabel({
		text : 'Thanks for your review!',
		font : {
			fontSize : 17
		},
		height : "10%",
		top : 10,
		textAlign : 'center'
	});
	mainView.add(thanks);
	
	var title = Ti.UI.createLabel({
		text : review.title,
		font : {
			fontSize : 14
		},
		color: secondaryColor,
		height : "10%",
		top : 10,
		textAlign : 'center'
	});
	mainView.add(title);

	var stars = Stars.createStars({
		top: 0,
		width : "100%",
		height : "20%",
		rating : review.rating
	});
	mainView.add(stars);
	
	var row = Ti.UI.createView({
		width: "100%",
		height: "50%",
		layout:"horizontal"
	})
	
	var imView = Ti.UI.createImageView({
		image : review.image,
		width : "40%",
		height : "100%",
		left: "7%"
	});
	row.add(imView);

	var reviewText = Ti.UI.createLabel({
		text: review.reviewText,
		backgroundColor : "white",
		width : "40%",
		height : "100%",
		left: "7%",
		borderWidth : 1,
		borderRadius : 5,
		borderColor : secondaryTextBoxColor,
		backgroundColor : "white",
		font : {
			fontSize : 12
		},
	});
	row.add(reviewText);

	mainView.add(row);

	return completionScreen;
};

module.exports = CompletionScreen;

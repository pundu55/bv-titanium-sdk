function FormScreen(imData) {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var formScreen = new ContainerWindow();

	var scrollView = Titanium.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});
	
	var mainView = Ti.UI.createView({
		width: "100%",
		height: "100%",
		layout: "vertical"
	});


	var Stars = require('stars/Stars');

	var title = Ti.UI.createTextField({
		hintText : "Title",
		height : Ti.Platform.name == 'iPhone OS' ? 28 : '35dip',
		paddingLeft : 5,
		paddingRight : 5,
		width : "90%",
		borderWidth : 1,
		borderRadius : 5,
		borderColor : secondaryTextBoxColor,
		backgroundColor : "white",
		font : {
			fontSize : 15
		},
		top : 10
	});
	mainView.add(title);

	var stars = Stars.createStars({
		top : 0,
		width : "100%",
		height : "10%",
		rating : 2
	});
	mainView.add(stars);

	var imView = Ti.UI.createImageView({
		image : imData,
		width : "30%",
		height : "20%",
		top : 5,
		left : "35%"
	});
	mainView.add(imView);

	var nickname = Ti.UI.createTextField({
		hintText : "Nickname",
		height : Ti.Platform.name == 'iPhone OS' ? 28 : '35dip',
		paddingLeft : 5,
		paddingRight : 5,
		width : "90%",
		borderWidth : 1,
		borderRadius : 5,
		borderColor : secondaryTextBoxColor,
		backgroundColor : "white",
		font : {
			fontSize : 15
		},
		top : 10
	});

	mainView.add(nickname);

	var review = Ti.UI.createTextArea({
		backgroundColor : "white",
		width : "100%",
		height : "30%",
		paddingLeft : 5,
		paddingRight : 5,
		width : "90%",
		borderWidth : 1,
		borderRadius : 5,
		borderColor : secondaryTextBoxColor,
		backgroundColor : "white",
		font : {
			fontSize : 15
		},
		top : 10
	})

	mainView.add(review);

	var submit = Ti.UI.createButton({
		title : "Submit",
		width : "80%",
		height : "10%",
		top : 10
	});
	mainView.add(submit);
	scrollView.add(mainView);
	formScreen.mainView.add(scrollView);

	var BV = require("lib/bv-js-sdk");
	BV.config({
		baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/",
		passkey : '2cpdrhohmgmwfz8vqyo48f52g',
		format : 'json',
		normalize : false
	});


	var submitClicked = false;
	var photoUploadUrl = "";
	submit.addEventListener("click", function(){
		submitClicked = true;
		if(photoUploadUrl != ""){
			submitReview();
		} 
	});


	function submitReview() {
		BV.submitReview().withTitle(title.value).withPhoto(photoUploadUrl).withUserId('craiggil').withProductId('12345').withRating(stars.rating).withUserNickname(nickname.value).withReviewText(review.value).withAction("preview").send({
			success : handleFormSubmission,
			error : formScreen.handleFormSubmission
		});
	}

	var CompletionScreen = require('ui/handheld/CompletionScreen');

	function handleFormSubmission(data){
		var completionScreen = new CompletionScreen({title: title.value, image: photoUploadUrl, rating: stars.rating, reviewText: review.value});
		completionScreen.nav = formScreen.nav;
		formScreen.nav.closeWindow(formScreen, false);
		formScreen.nav.pushWindow(completionScreen);		
	}

	formScreen.handlePhotoData = function(data) {
		photoUploadUrl = data.Photo.Sizes.normal.Url;
		if(submitClicked){
			submitReview();
		}
		photoUploaded = true;
	}

	return formScreen;
};

module.exports = FormScreen;

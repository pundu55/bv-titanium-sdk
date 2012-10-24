//
//  FormScreen
//
//  FormScreen allows the user to enter a review.  Handles both photo upload and review submission callbacks.

function showLoadingOverlay(win) {
	var loadView = Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.5,
		height : '100%',
		width : '100%'
	});

	var loadIndicator = Ti.UI.createActivityIndicator({
		style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		message : 'Loading...',
		font : 'Arial',
		color : '#FFF',
		top: '20%'
	});

	loadView.add(loadIndicator);
	
	win.add(loadView);
	
	loadIndicator.show();
}

function FormScreen(imData) {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var formScreen = new ContainerWindow();

	// Form needs to be placed in a scrollview in order to prevent the form from being obscured by the keyboard.
	var scrollView = Titanium.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});

	var mainView = Ti.UI.createView({
		width : "100%",
		height : "100%",
		layout : "vertical"
	});

	var Stars = require('stars/Stars');
	Ti.include("/lib/colors.js");

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
		left: 5,
		width : "100%",
		height : "20%",
		rating : 2,
		editable : true
	});
	mainView.add(stars);
	
	var imViewContainer = Ti.UI.createView({
		width : "100%",
		height : "20%"
	})
	var imView = Ti.UI.createImageView({
		image : imData,
		height : "100%"
	});
	imViewContainer.add(imView);
	mainView.add(imViewContainer);

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

	var reviewText = Ti.UI.createTextArea({
		backgroundColor : "white",
		width : "100%",
		height : "20%",
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

	mainView.add(reviewText);

	var submit = Ti.UI.createButton({
		title : "Submit",
		width : "80%",
		height : "10%",
		top : 10
	});
	mainView.add(submit);
	scrollView.add(mainView);
	formScreen.mainView.add(scrollView);

	// Initialize the BV library with the appropriate params
	var BV = require("lib/bv-js-sdk");
	BV.config({
		baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/",
		passkey : '2cpdrhohmgmwfz8vqyo48f52g',
		format : 'json',
		normalize : false
	});

	// Stores whether the user has clicked the submit button
	var submitClicked = false;
	// Stores the url of the photo received in the upload response - if empty, the photo
	// has not been uploaded.
	var photoUploadUrl = "";

	// Submit click handler... if the photo upload is completed, kick off the review submission, otherwise,
	// note the click but don't do anything.
	submit.addEventListener("click", function() {
		if(title.value.length == 0){
			alert("Please provide a title.");
			return;
		}
		if(stars.rating == 0){
			alert("Please provide a star rating.");
			return;
		}
		if(reviewText.value.length == 0){
			alert("Please provide a review.");
			return;
		}
		if(nickname.value == 0){
			alert("Please provide a nickname.");
			return;
		}
		showLoadingOverlay(formScreen);
		submitClicked = true;
		if (photoUploadUrl != "") {
			submitReview();
		}
	});

	// Kicks off a review submission
	function submitReview() {
		BV.submitReview().withTitle(title.value).withPhoto(photoUploadUrl).withUserId('craiggil').withProductId('12345').withRating(stars.rating).withUserNickname(nickname.value).withReviewText(reviewText.value).withAction("preview").send({
			success : handleFormSubmission,
			error : onError
		});
	}

	var CompletionScreen = require('ui/handheld/CompletionScreen');

	// Review submission handler, forwards to the completion screen
	function handleFormSubmission(data) {
		var completionScreen = new CompletionScreen({
			title : title.value,
			image : photoUploadUrl,
			rating : stars.rating,
			reviewText : reviewText.value
		});
		completionScreen.nav = formScreen.nav;
		// Note that we close this screen before forwarding -- this is so that a back button press on the completion
		// screen takes the user back to the initial product screen
		//formScreen.nav.closeWindow(formScreen, false);
		formScreen.nav.pushWindow(completionScreen);
	}

	function onError(data) {
		alert("An Error Occurred");
		formScreen.nav.closeWindow(formScreen, false);
	}

	// Handler function for photo upload response.  If submit has already been clicked, go ahead and start the submission.
	formScreen.handlePhotoData = function(data) {
		photoUploadUrl = data.Photo.Sizes.normal.Url;
		if (submitClicked) {
			submitReview();
		}
		photoUploaded = true;
	}

	return formScreen;
};

module.exports = FormScreen;

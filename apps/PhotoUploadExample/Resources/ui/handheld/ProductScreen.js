//
//  ProductScreen
//
//  ProductScreen for displaying the (fixed) product and kicking off the camera 

var BV = require("lib/bv-js-sdk");
	BV.config({
		baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/",
		passkey : '2cpdrhohmgmwfz8vqyo48f52g',
		format : 'json',
		normalize : false
	});



function ProductScreen() {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var productScreen = new ContainerWindow();
	var mainView = productScreen.mainView;

	var title = Ti.UI.createLabel({
		text : 'GE Profile" 30" 7.5 Cu. Ft. Colossal Capacity Electric Dryer',
		font : {
			fontSize : 17
		},
		height : "20%",
		top : 10,
		textAlign : 'center'
	});

	mainView.add(title);

	var row = Ti.UI.createView({
		width : "100%",
		height : "30%",
	});

	var rate = Ti.UI.createButton({
		title : "Rate",
		width : "40%",
		left : "5%",
	})
	
	function fetchImage() {
		Titanium.Media.showCamera({
			success : function(event) {
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					var FormScreen = require("ui/handheld/FormScreen");
					var formScreen = new FormScreen(event.media);
					formScreen.nav = productScreen.nav;
			
					BV.uploadPhoto().withContentType('review').withUserId('craiggil').withPhoto(event.media).send({success: formScreen.handlePhotoData, error: formScreen.onError});;
					productScreen.nav.pushWindow(formScreen);
				} 
			},
			cancel : function() {
				// called when user cancels taking a picture
			},
			error : function(error) {

				if (error.code == Titanium.Media.NO_CAMERA) {
					loadImageFromDisk();
				} else {
					// called when there's an error
					var a = Titanium.UI.createAlertDialog({
						title : 'Camera'
					});
					a.setMessage('Unexpected error: ' + error.code);
					a.show();
				}
			},
			saveToPhotoGallery : true,
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	function loadImageFromDisk(){
		// resourcesDirectory is actually the default location, so the first 
		// argument could be omitted here.
		var file = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/test.jpg');
		var blob = file.read();
		
		var FormScreen = require("ui/handheld/FormScreen");
		var formScreen = new FormScreen(blob);
		formScreen.nav = productScreen.nav;
		
		BV.uploadPhoto().withContentType('review').withUserId('craiggil').withPhoto(blob).send({success: formScreen.handlePhotoData, error: formScreen.onError});;
		productScreen.nav.pushWindow(formScreen);
	}

	
	rate.addEventListener("click", fetchImage);
	row.add(rate);

	var dryer = Ti.UI.createImageView({
		image : "/images/dryer.png",
		width : "40%",
		left : "55%"
	});
	row.add(dryer);

	mainView.add(row);

	var textBox = Ti.UI.createTextArea({
	editable: false,
	value: "Reliable and Efficient \
7.5 cu. ft. colossal capacity — Colossal-size stainless steel drum can take on everything the washer sends its way \
SteamRefresh — Refreshes fabrics, removes wrinkles and odors and rejuvenates clothes \
Steam Dewrinkle — Removes wrinkles and refreshes clean clothes  \
Reverse tumble — By reversing the rotation of the drum, you can expect gentle, fast, even drying \
DuoDry™ System — Quickly and consistently dries all types of clothes \
Specialty Dry Cycles — Provide just the right levels of drying for better fabric care", 
	width:"90%",
	height:"50%"
	});
	mainView.add(textBox);

	return productScreen;
};

module.exports = ProductScreen;

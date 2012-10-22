//
//  DetailView
//
//  Displays details related to a specific product and associated reviews.

// Creates a table view row for a particular review
function rowForReview(review) {	
	var Stars = require('stars/Stars');

	var row = Ti.UI.createTableViewRow({
		height : 80,
		width : "85%",
		className : "result",
		hasChild : true
	});

	var rowView = Ti.UI.createView({
		width : '100%',
		height : '100%',
		layout : 'vertical'
	});

	var topHalf = Ti.UI.createView({
		width : '100%',
		height : '30%',
		layout : 'horizontal'
	});

	var label = Ti.UI.createLabel({
		left : 10,
		height : "100%",
		width : "65%",
		text : review.Title,
		font : {
			fontSize : 15
		}
	});
	topHalf.add(label);

	var stars = Stars.createStars({
		top : 0,
		width : "30%",
		height : "100%",
		rating : review.Rating
	});
	topHalf.add(stars);
	rowView.add(topHalf);

	var description = Ti.UI.createLabel({
		left : 10,
		right : 10,
		color : "gray",
		height : "70%",
		width : "100%",
		text : review.ReviewText,
		font : {
			fontSize : 12
		}
	});
	rowView.add(description);
	row.add(rowView);
	return row;
}

function DetailScreen(product, reviews) {
	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var detailScreen = new ContainerWindow();
	var mainView = detailScreen.mainView;

	Ti.include("/lib/colors.js");
	
	var topRow = Ti.UI.createView({
		width : '100%',
		height : '40%',
		layout : 'horizontal'
	});

	var productIm = Ti.UI.createImageView({
		image : product.ImageUrl ? product.ImageUrl : "/images/camera_icon.gif",
		width : "25%",
		height : "100%",
		top : 5,
		left : "5%"
	});
	topRow.add(productIm);

	var topRight = Ti.UI.createView({
		width : '65%',
		height : '100%',
		layout : 'vertical'

	});

	var title = Ti.UI.createLabel({
		left : 10,
		top : 5,
		height : "20%",
		width : "100%",
		text : product.Name,
		font : {
			fontSize : 15
		}
	});
	topRight.add(title);

	var ratingString = "Average rating of " + product.ReviewStatistics.AverageOverallRating + " / " + product.ReviewStatistics.OverallRatingRange + " based on " + product.ReviewStatistics.TotalReviewCount + " reviews.";
	var ratingText = Ti.UI.createLabel({
		left : 10,
		right : 10,
		color : 'gray',
		height : "30%",
		width : "100%",
		text : ratingString,
		font : {
			fontSize : 12
		}
	});
	topRight.add(ratingText);

	var description = Ti.UI.createLabel({
		left : 10,
		right : 10,
		color : secondaryColor,
		height : "50%",
		width : "100%",
		ellipsize: true,
		text : product.Description,
		font : {
			fontSize : 12
		}
	});
	topRight.add(description);

	topRow.add(topRight);
	mainView.add(topRow);

	var tbl_data = [];
	var reviewIds = product.ReviewIds;

	// Handle no results case
	if (reviewIds.length == 0) {
		var row = Ti.UI.createTableViewRow({
			height : 70,
			width : "100%",
			title : "No Results"
		});
		tbl_data.push(row)
	}

	// Create table rows for each review and add to tbl_data
	for (var i in reviewIds) {
		var review = reviews[reviewIds[i]];
		var row = rowForReview(review);
		tbl_data.push(row);
	}

	// Create table view with tbl_data
	var table = Titanium.UI.createTableView({
		width : "100%",
		height : "60%",
		data : tbl_data
	});

	// Table click handling - forwards to ReviewDetailScreen to display review
	var ReviewDetailScreen = require("ui/handheld/ReviewDetailScreen");
	table.addEventListener('click', function(e) {
		var reviewIds = product.ReviewIds;
		var reviewId = reviewIds[e.index];
		var review = reviews[reviewId];

		var reviewDetailScreen = new ReviewDetailScreen(review);
		detailScreen.nav.pushWindow(reviewDetailScreen);
	});

	mainView.add(table);

	return detailScreen;
};

module.exports = DetailScreen;

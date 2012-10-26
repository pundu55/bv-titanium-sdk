//
//  Stars
//
//  Custom view for displaying star ratings.  Accepts args = {top, width, height, rating} where rating is
//  an integer value.

function createStars(args) {
	var view = Ti.UI.createView({
		top : args.top,
		width : args.width,
		height : args.height,
		layout : 'horizontal'
	});

	// Lay out rating number of filled stars...
	for (var i = 0; i < args.rating; i++) {
		var star = Ti.UI.createImageView({
			image : "/images/graphic_star_filled.png",
			width : "100%"
		});
		var starWrapper = Ti.UI.createView({
			width : "19%",
			height : "100%",
		});
		starWrapper.add(star);
		view.add(starWrapper);
	}
	

	// Lay out remaining unfilled stars
	for (var i = args.rating + 1; i <= 5; i++) {
		var star = Ti.UI.createImageView({
			image : "/images/graphic_star.png",
			width : "100%"
		});
		var starWrapper = Ti.UI.createView({
			width : "19%",
			height : "100%",
		});
		starWrapper.add(star);
		view.add(starWrapper);
	}
	
	return view;
}

exports.createStars = createStars;

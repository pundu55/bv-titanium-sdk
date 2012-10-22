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
		layout : 'horizontal',
		left: args.left ? args.left : 0
	});
	view.rating = args.rating;

	// Function to set stars to a new rating
	function setStarRating(rating){
		view.rating = rating;
		for (var i = 0; i < rating; i++) {
			view["star" + i].image = "/images/graphic_star_filled.png";
		}
		for (var i = rating; i < 5; i++) {
			view["star" + i].image = "/images/graphic_star.png";
		}
	}

	// Returns a handler function for setting star rating to the provided rating (clickedStar)
	// This is necessary to create a new context and corresponding handler
	function getHandler(clickedStar) {
	    return function() {
			setStarRating(clickedStar + 1);
	    };
	}

	// Lay out rating number of filled stars...
	for (var i = 0; i < args.rating; i++) {
		var star = Ti.UI.createImageView({
			image : "/images/graphic_star_filled.png",
			width : "19%"
		});
		if(args.editable){
			star.addEventListener("click", getHandler(i));			
		}
		view["star" + i] = star;
		view.add(star);
	}
	
	// Lay out unfilled stars...
	for (var i = args.rating; i < 5; i++) {
		var star = Ti.UI.createImageView({
			image : "/images/graphic_star.png",
			width : "19%"
		});
		if(args.editable){
			star.addEventListener("click", getHandler(i));
		}
		view["star" + i] = star;
		view.add(star);
	}
	
	return view;
}

exports.createStars = createStars;
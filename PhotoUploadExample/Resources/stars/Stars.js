function createStars(args) {
	var view = Ti.UI.createView({
		top : args.top,
		width : args.width,
		height : args.height,
		layout : 'horizontal'
	});
	view.rating = args.rating;

	function setStarRating(rating){
		view.rating = rating;
		for (var i = 0; i < rating; i++) {
			view["star" + i].image = "/stars/star.png";
		}
		for (var i = rating; i < 5; i++) {
			view["star" + i].image = "/stars/emptystar.png";
		}
	}

	function getHandler(clickedStar) {
	    return function() {
			setStarRating(clickedStar + 1);
	    };
	}

	for (var i = 0; i < args.rating; i++) {
		var star = Ti.UI.createImageView({
			image : "/stars/star.png",
			width : "19%"
		});
		star.addEventListener("click", getHandler(i));
		view["star" + i] = star;
		view.add(star);
	}
	
	for (var i = args.rating; i < 5; i++) {
		var star = Ti.UI.createImageView({
			image : "/stars/emptystar.png",
			width : "19%"
		});
		star.addEventListener("click", getHandler(i));
		view["star" + i] = star;
		view.add(star);
	}
	
	return view;
}

exports.createStars = createStars;

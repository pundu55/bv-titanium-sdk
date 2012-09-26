function createStars(args) {
	var view = Ti.UI.createView({
		top : args.top,
		width : args.width,
		height : args.height,
		layout : 'horizontal'
	});

	for (var i = 0; i < args.rating; i++) {
		var star = Ti.UI.createImageView({
			image : "/stars/star.png",
			width : "19%"
		});
		view.add(star);
	}
	
	for (var i = args.rating + 1; i <= 5; i++) {
		var star = Ti.UI.createImageView({
			image : "/stars/emptystar.png",
			width : "19%"
		});
		view.add(star);
	}
	
	return view;
}

exports.createStars = createStars;

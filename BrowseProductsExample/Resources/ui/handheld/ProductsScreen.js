function ProductsScreen(query) {
	var response;
	
	Ti.include("/lib/colors.js");

	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var productsScreen = new ContainerWindow();
	var mainView = productsScreen.mainView;

	var table = Titanium.UI.createTableView({
		width : "100%",
		height : "100%",
		top: 5
	});

	mainView.add(table);

	var BV = require("lib/bv-js-sdk");
	BV.config({
		baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/",
		passkey : '2cpdrhohmgmwfz8vqyo48f52g',
		format : 'json',
		normalize : false
	});
	BV.products().withStatsOn("reviews").include("reviews").send({
		success : handleData,
		error : handleData
	});

    var DetailScreen = require("ui/handheld/DetailScreen");
	table.addEventListener('click', function(e) {
		var product = response.Results[e.index];
		var detailScreen = new DetailScreen(product, response.Includes.Reviews);
		detailScreen.nav = productsScreen.nav;
		productsScreen.nav.pushWindow(detailScreen);
	});

	function handleData(data) {
		response = data;

		var Stars = require('stars/Stars');

		var tbl_data = [];
		var results = data.Results;
		Ti.API.log(results.length);
		for (var i in results) {
			var row = Ti.UI.createTableViewRow({
				height : 70,
				width : "100%",
				className : "result",
				hasChild : true
			});

			var rowView = Ti.UI.createView({
				width : '95%',
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
				width : "60%",
				text : results[i].Name,
				font : {
					fontSize : 15
				}
			});
			topHalf.add(label);

			var stars = Stars.createStars({
				top : 0,
				width : "25%",
				height : "100%",
				rating : Math.round(results[i].ReviewStatistics.AverageOverallRating)
			});
			topHalf.add(stars);

			rowView.add(topHalf);
			var description = Ti.UI.createLabel({
				left : 10,
				right : 10,
				color : secondaryColor,
				height : "70%",
				width : "100%",
				text : results[i].Description,
				font : {
					fontSize : 12
				}
			});
			rowView.add(description);

			row.add(rowView);

			tbl_data.push(row);
		}
		table.setData(tbl_data);
	}

	return productsScreen;
};

module.exports = ProductsScreen; 
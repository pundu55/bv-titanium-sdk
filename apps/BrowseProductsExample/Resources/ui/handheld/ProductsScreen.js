//
//  ProductsScreen
//
//  ProductsScreen, kicks off a search based on the provided query and displays the results in a table.
function rowForProduct(product) {
	var row = Ti.UI.createTableViewRow({
		height : 100,
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
		text : product.Name,
		font : {
			fontSize : 15
		}
	});
	topHalf.add(label);

	var Stars = require('stars/Stars');
	var stars = Stars.createStars({
		top : 0,
		width : "25%",
		height : "100%",
		rating : Math.round(product.ReviewStatistics.AverageOverallRating)
	});
	topHalf.add(stars);

	rowView.add(topHalf);
	var description = Ti.UI.createLabel({
		left : 10,
		right : 10,
		color : secondaryColor,
		height : "70%",
		width : "100%",
		text : product.Description,
		font : {
			fontSize : 12
		}
	});
	rowView.add(description);

	row.add(rowView);
	return row;
}

function ProductsScreen(query) {
	// Variable to hold the BV SDK response once received
	var response;

	Ti.include("/lib/colors.js");

	var ContainerWindow = require('ui/handheld/ContainerWindow');
	var productsScreen = new ContainerWindow();
	var mainView = productsScreen.mainView;

	var table = Titanium.UI.createTableView({
		width : "100%",
		height : "100%",
		top : 5
	});

	mainView.add(table);

	// Import the BV SDK and set up the required args
	var BV = require("lib/bv-js-sdk");
	BV.config({
		baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/",
		passkey : '2cpdrhohmgmwfz8vqyo48f52g',
		format : 'json',
		normalize : false
	});

	// Table click handling -- forward to DetailScreen for clicked product
	var DetailScreen = require("ui/handheld/DetailScreen");
	table.addEventListener('click', function(e) {
		if(response.Results.length == 0){
			return;
		}
		var product = response.Results[e.index];
		var detailScreen = new DetailScreen(product, response.Includes.Reviews);
		detailScreen.nav = productsScreen.nav;
		productsScreen.nav.pushWindow(detailScreen);
	});
	
	// SDK call -- fetches products, stats and associated reviews for the provided query
	BV.products().withStatsOn("reviews").search(query).include("reviews").send({
		success : handleData,
		error : onError
	});


	// SDK error callback
	function onError(data) {
		alert("An Error Occurred");
	}

	// SDK response callback
	function handleData(data) {
		response = data;
		
		var tbl_data = [];
		var results = data.Results;

		// Handle no results case
		if (results.length == 0) {
			var row = Ti.UI.createTableViewRow({
				height : 70,
				width : "100%",
				title : "No Results"
			});
			tbl_data.push(row);
			
			// this is not efficient, but avoids a drawing bug on android
			if(Ti.Platform.name == 'android'){
				table.appendRow(row);
			}
		}

		for (var i in results) {
			var row = rowForProduct(results[i]);
			tbl_data.push(row);
			if(Ti.Platform.name == 'android'){
				table.appendRow(row);
			}
		}
		
		if(Ti.Platform.name == 'iPhone OS') {
			table.setData(tbl_data);		
		}
	}

	return productsScreen;
};

module.exports = ProductsScreen;

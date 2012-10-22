//
//  MainScreen
//
//  A simple table view illustrating calls to all of the sdk hooks
//


function MainScreen() {
    var win = Ti.UI.createWindow({backgroundColor: "white"});

    // Display calls - Display Reviews, Answers...
    var sectionDisplay = Ti.UI.createTableViewSection({ headerTitle: 'Display Classes' });
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Review', hasChild: "true", color: "black"}));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Answers', hasChild: "true", color: "black"}));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Review Comment', hasChild: "true", color: "black"}));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Story Comment', hasChild: "true", color: "black"}));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Products', hasChild: "true", color: "black"}));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Questions', hasChild: "true", color: "black" }));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Stories', hasChild: "true", color: "black" }));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Profiles', hasChild: "true", color: "black" }));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Categories', hasChild: "true", color: "black" }));
    sectionDisplay.add(Ti.UI.createTableViewRow({ title: 'Statistics', hasChild: "true", color: "black" }));
    
    // Submit calls - Submit Reviews, Answers...
    var sectionSubmission = Ti.UI.createTableViewSection({ headerTitle: 'Submission Classes' });
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Review', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Answers', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Review Comments', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Story Comments', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Videos', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Questions', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Stories', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Photos', hasChild: "true", color: "black"}));
    sectionSubmission.add(Ti.UI.createTableViewRow({ title: 'Feedback', hasChild: "true", color: "black"}));

	// Create the table view with the display and submission sections
	var table = Ti.UI.createTableView({
		data : [sectionDisplay, sectionSubmission]
	});
	
	// Initialize the BV SDK and set the associated params
	var BV = require("lib/bv-js-sdk");
	BV.config({
		baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/",
		passkey : '2cpdrhohmgmwfz8vqyo48f52g',
		format : 'json',
		normalize : false
	}); 

	// SDK handler function -- forwards to the detail screen and shows formatted response
	var DetailScreen = require("ui/handheld/DetailScreen");
	function handleData(data){
		Ti.API.log(data);
		win.nav.pushWindow(new DetailScreen(JSON.stringify(data, null, '\t')));
	}

	// Array of all display endpoints -- i.e. the portion of the url /reviews.json, /answers.json etc.
	var displayFns = ["reviews", "answers", "reviewcomments", "products", "storycomments", "questions", "stories", "authors", "categories", "statistics"];
	
	// Submission clicks are handled differently -- this is basically an enum starting at 10 so that we can map a click index
	// to a particular submission call.  i.e. a click at index 10 maps to a review submission.
	var submitFns = {SUBMIT_REVIEW : 10, SUBMIT_ANSWER : 11, SUBMIT_REVIEW_COMMENTS : 12, SUBMIT_STORY_COMMENTS : 13, SUBMIT_VIDEO : 14, SUBMIT_QUESTIONS : 15, SUBMIT_STORIES : 16, SUBMIT_PHOTOS : 17, SUBMIT_FEEDBACK : 18};
	
	// Table click handler
	table.addEventListener('click', function(e) {
		if(e.section === sectionDisplay){
			// Handles a click in the display section
			
			// First, figure out the corresponding function name
			var fnName = displayFns[e.index];
			
			var req;
			// Statistics requires an additional parameter so handle it separately
			if(fnName == "statistics"){
				req = BV.get(fnName).withStatsOn('reviews').filterBy("productId", "test1");
			} else {
				// Otherwise, we can use the BV.get() syntax to kick off the request
				// Note that BV.get("reviews") is the same as BV.reviews()... these are two alternate ways to make
				// the same call.  In this app, we use the BV.get(<function>) syntax for display requests.
				req = BV.get(fnName);			
			}
			req.send({success: handleData, error: handleData});
		} else if(e.section === sectionSubmission){			
			// Handles a click in the submission section

			// Map the click index to a particular function and kick off the submission request
			var req;
			if(e.index == submitFns.SUBMIT_REVIEW){
				req = BV.submitReview().withProductId('12345').withAction('Preview').withRating('1').withReviewText('heyooheyooheyooheyooheyooheyooheyooheyooheyooheyooheyooheyooheyoo').withTitle('hi').withUserNickname('craiggil').withUserId('craiggil');
			} else if(e.index == submitFns.SUBMIT_ANSWER){
				req = BV.submitAnswer().withQuestionId(6104).withUserId('craiggil').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_REVIEW_COMMENTS){
				req = BV.submitReviewComment().withReviewId("83964").withUserId('craggil').withCommentText('Hello').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_STORY_COMMENTS){
				req = BV.submitStoryComment().withStoryId("14131").withUserId('craggil').withCommentText('Hello').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_VIDEO){
				req = BV.uploadVideo().withContentType('review').withUserId('craiggil').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_QUESTIONS){
				req = BV.submitQuestion().withCategoryId('1020').withUserId('craiggil').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_STORIES){
				req = BV.submitStory().withProductId(971).withUserId('craiggil').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_PHOTOS){
				req = BV.uploadPhoto().withContentType('review').withUserId('craiggil').withAction('Preview');
			} else if(e.index == submitFns.SUBMIT_FEEDBACK){
				req = BV.submitFeedback().withContentType('review').withContentId(124432).withUserId('craggil').withFeedbackType('helpfulness').withVote('Positive').withAction('Preview');
			}
			req.send({success: handleData, error: handleData});
		}
		
	});

	win.add(table);
	return win;
};

module.exports = MainScreen;
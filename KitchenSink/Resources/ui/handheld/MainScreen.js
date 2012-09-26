function MainScreen() {
    var win = Ti.UI.createWindow({backgroundColor: "white"});

    
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


	var table = Ti.UI.createTableView({
		data : [sectionDisplay, sectionSubmission]
	});



	var BV = require("lib/bv-js-sdk");
	BV.config( { baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/", passkey : '2cpdrhohmgmwfz8vqyo48f52g', format: 'json', normalize : false } );


	var DetailScreen = require("ui/handheld/DetailScreen");
	function handleData(data){
		Ti.API.log(data);
		win.nav.pushWindow(new DetailScreen(JSON.stringify(data, null, '\t')));
	}

	var displayFns = ["reviews", "answers", "reviewcomments", "products", "storycomments", "questions", "stories", "authors", "categories", "statistics"];
	var submitFns = {SUBMIT_REVIEW : 10, SUBMIT_ANSWER : 11, SUBMIT_REVIEW_COMMENTS : 12, SUBMIT_STORY_COMMENTS : 13, SUBMIT_VIDEO : 14, SUBMIT_QUESTIONS : 15, SUBMIT_STORIES : 16, SUBMIT_PHOTOS : 17, SUBMIT_FEEDBACK : 18};
	table.addEventListener('click', function(e) {
		if(e.section === sectionDisplay){
			var fnName = displayFns[e.index];
			var req;
			if(fnName == "statistics"){
				req = BV.get(fnName).withStatsOn('reviews').filterBy("productId", "test1");
			} else {
				req = BV.get(fnName);			
			}
			req.send({success: handleData, error: handleData});
		} else if(e.section === sectionSubmission){
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
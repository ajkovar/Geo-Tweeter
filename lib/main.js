(function($){

    $(document).ready(function(){
        $("ol.tweetList").hide();
		
		var aggregator = new z.twitter.TweetAggregator("bird", z.twitter.filterNonGeocode);
		
		/*var filteredTweets = [{"from_user":"bob", "text":"text", "geonames":[{"countryName":"countryName", "name":"name"}]}];
		var view = new EJS({url: 'view/tweets.ejs'});
		var html =  view.render({tweets:filteredTweets});
		$("ol.tweetList").html(html).show();*/
		
		aggregator.search(100, function(tweets){
			
			$.each(tweets, function(){
				var tweet = this;
				var geo = tweet.geo;
				if(geo) {
			        var coordinates = geo.coordinates;
					z.geo.retrieveGeoNames(coordinates[0], coordinates[1], function(geonames){
						tweet.geonames = geonames;
						if(geoNamesPopulated(tweets))
							displayTweets(tweets);
					});
				} else if(geoNamesPopulated(tweets))
					displayTweets(tweets);
			});
						

		});
		
    });
    
    var geoNamesPopulated = function(tweets) {
    	for(var i=0;i<tweets.length;i++) {
    		var tweet = tweets[i];
    		if(tweet.geo && !tweet.geonames) {
    			return false;
    		}
    	}
    	return true;
    }
    
    var displayTweets = function(tweets) {
    	// load a template file, then render it with data
		var view = new EJS({url: 'view/tweets.ejs'});
		var html = view.render({tweets:tweets});

		$("ol.tweetList").html(html).show();
    };

    var populateGeoNames = function(tweets){
        $.each(tweets, function(){
            tweet = this;
            tweet.url = "http://www.twitter.com/" + this.from_user;

            var geo = tweet.geo;

            var coordinates = geo.coordinates;

            if(coordinates && coordinates[0] !== 0 && coordinates[1] !== 0) {
                tweet.geonames = z.geo.retrieveGeoNames(coordinates[0], coordinates[1]);
            }
        });
    };

}(jQuery));


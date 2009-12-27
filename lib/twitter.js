(function($){
    
    z.twitter = {};
    
    /**
    *	Filters out tweets that don't have geocodes associated with them
    */
    z.twitter.filterNonGeocodes = function(tweets){
		return $.grep(tweets, function(tweet){
			return !!tweet.geo;
		});
    };
    
    /**
    *	Merges two lists of tweets, removing duplicates
    */
    z.twitter.mergeTweets = function(tweets1, tweets2){
		if(!tweets1 && !tweets2)
			return [];
		//if one is null or they both are the same object, return only one of them
		else if(tweets1 && !tweets2 || tweets1 === tweets2)
			return tweets1;
		else if(!tweets1 && tweets2)
			return tweets2;
		else {
			var result = $.merge(tweets1, tweets2);
			var idMap = [];
			return $.grep(result, function(tweet){
				if(idMap[tweet.id])
					return false;
				else {
					idMap[tweet.id]=true;
					return true;
				}
			});
		}
    };
    
    /**
    *	search for tweets for given search term, returned tweets get passed into
    *	callback function will continue to search until min has been reached
    *	TODO handle situation where total tweets for given term is less than min
    */
    z.twitter.search = function(searchTerm, min, callback){
		var tweets = [];
		var calls = min/100 > 0 ? Math.ceil(min/100) : 1;
		var numberOfCallsMade = 0;

		$.getJSON("http://search.twitter.com/search.json" + "?q=%23"+searchTerm+"&rpp=100",
            function receiveTweets(data){
            	numberOfCallsMade++;
                tweets = tweets.concat(data.results);
                if(numberOfCallsMade===calls)
	                callback(tweets);
	            else $.getJSON("http://search.twitter.com/search.json" + data.nextPage, receiveTweets);
       	});
	};
    
    window.z.twitter.TweetAggregator = function(tweets){
    	this.tweets = z.twitter.mergeTweets(z.storage.getLocal("tweets"), tweets);
    }
    window.z.twitter.TweetAggregator.prototype = {
    	search: function(searchTerm, min, callback){
    		var self = this;
    		z.twitter.search(searchTerm, min, function(tweets){
    			self.tweets = z.twitter.mergeTweets(self.tweets, tweets);
    			z.storage.setLocal("tweets", self.tweets);
    			callback.call(self, tweets);
    		});
    	}
    };
    

}(jQuery));


        /*

profile_image_url
created_at
from_user
to_user_id
text
id
from_user_id
geo
iso_language_code
source*/


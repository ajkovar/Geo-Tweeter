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
    
    z.twitter.search = function(searchTerm, max, callback){
		var tweets = [];
		var calls = max/100 > 0 ? Math.ceil(max/100) : 1;
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
    
    window.z.twitter.TweetAggregator = function(){
    	this.tweets = z.storage.getLocal("tweets") || [];
    }
    window.z.twitter.TweetAggregator.prototype = {
    	search: function(searchTerm, tweets, callback){
    		var self = this;
    		var calls = tweets/100 > 0 ? Math.ceil(tweets/100) : 1;
    		var numberOfCallsMade = 0;

			$.getJSON("http://search.twitter.com/search.json" + "?q=%23"+searchTerm+"&rpp=100",
	            function receiveTweets(data){
	            	numberOfCallsMade++;
	                self.tweets = self.tweets.concat(data.results);
	                if(numberOfCallsMade===calls)
		                callback(self.tweets);
		            else $.getJSON("http://search.twitter.com/search.json" + data.nextPage, receiveTweets);
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


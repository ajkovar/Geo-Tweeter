(function(){
    /*window.z.twitter.getTweets = function(searchTerm){
        var tweets = [];
        var nextPage = "?q=%23"+searchTerm+"&rpp=100";//&callback=?";

       for(var i = 0; i<1; i++) {
           $.getJSON("http://search.twitter.com/search.json" + nextPage,
                function(data){
                    nextPage = data.nextPage;
                    tweets = tweets.concat($.grep(data.results, function(tweet){
                        return !!tweet.geo;
                    }));
                    var a;
           });
       }

       return tweets;
    };*/
    
    z.twitter = {};
    
    z.twitter.filterNonGeocodes = function(tweets){
		return $.grep(tweets, function(tweet){
			return !!tweet.geo;
		});
    };
    
    window.z.twitter.TweetSearcher = function(){
    	this.tweets = [];
    }
    window.z.twitter.TweetSearcher.prototype = {
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
    

}());


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


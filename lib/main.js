(function($){

    $(document).ready(function(){
        $("ol.tweetList").hide();

        var tweets = getValidTweets();

        var storedTweets = getLocal("tweets");

        if(!storedTweets)
            storedTweets = [];

        storedTweets = storedTweets.concat(tweets);

        setLocal("tweets", storedTweets);

        populateGeoNames(tweets);

        var data = {};
        data.results = tweets;
        $("ol.tweetList").autoRender(data).show();
        var a;
    });

    var populateGeoNames = function(tweets){
        $.each(tweets, function(){
            tweet = this;
            tweet.url = "http://www.twitter.com/" + this.from_user;

            var geo = tweet.geo;

            var coordinates = geo.coordinates;

            if(coordinates && coordinates[0] !== 0 && coordinates[1] !== 0) {
                tweet.geonames = retrieveGeoNames(coordinates[0], coordinates[1]);
            }
        });
    };

}(jQuery);


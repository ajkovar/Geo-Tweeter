
describe 'z.twitter'
	before_each
	  	$.ajaxSetup({
	  		async:false
		});

		mock_request().and_return(fixture('twitter.json'));
		
		aggregator = new z.twitter.TweetAggregator();
	end

  	describe 'search()'
  		it 'should make calls to twitter service for tweets'
			$.should.receive('getJSON', 'once')
			z.twitter.search("pie", 3, function(){});
		end
		
		it 'should make multiple calls to twitter service if it extends beyond the limit per request'
			$.should.receive('getJSON', 4)
			z.twitter.search("pie", 310, function(){});
		end
	
		it 'should pass tweets into callback function'
			z.twitter.search("pie", 3, function(tweets){
				tweets.length.should.equal 3
				tweets[0].text.should.equal "geo"
			});
		end
  	end
  	
  	describe 'mergeTweets()'
  		it 'should remove duplicates'
  			var tweets1 = JSON.parse(fixture('twitter.json')).results;
  			var tweets2 = JSON.parse(fixture('twitter.json')).results;
  			tweets1.length.should.equal 3
  			tweets2.length.should.equal 3
  			z.twitter.mergeTweets(tweets1, tweets2).length.should.equal 3
  		end
  		
  		it 'should handle identical objects'
  			var tweets = JSON.parse(fixture('twitter.json')).results;
  			tweets.length.should.equal 3
  			z.twitter.mergeTweets(tweets, tweets).length.should.equal 3
  		end
  	end
  	
  
	describe 'filterNonGeocodes()'
		it "should filter out tweets that don't have geocodes"
			aggregator.search("pie", 3, function(tweets){
				z.twitter.filterNonGeocodes(tweets).length.should.equal 2
			});
		end
	end
  	
	describe 'TweetAggregator'

		describe 'search()'
	  
			it 'should make calls to twitter service for tweets'
				$.should.receive('getJSON', 'once')
				aggregator.search("pie", 3, function(){});
			end
		
		end
		
  	end
  	
end


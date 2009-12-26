
describe 'z.twitter'
	before_each
	  	$.ajaxSetup({
	  		async:false
		});

		mock_request().and_return(fixture('twitter.json'));
		
		searcher = new z.twitter.TweetSearcher();
	end

	describe 'TweetSearcher'

		describe 'search()'
	  
			it 'should make calls to twitter service for tweets'
				$.should.receive('getJSON', 'once')
				searcher.search("pie", 3, function(){});
			end
		
			it 'should make multiple calls to twitter service if it extends beyond the limit per request'
				$.should.receive('getJSON', 4)
				searcher.search("pie", 310, function(){});
			end
		
			it 'should pass tweets into callback function'
				searcher.search("pie", 3, function(tweets){
					tweets.length.should.equal 3
					tweets[0].text.should.equal "geo"
				});
			end
		
		end
		
  	end
  
	describe 'filterNonGeocodes()'
		it "should filter out tweets that don't have geocodes"
			searcher.search("pie", 3, function(tweets){
				z.twitter.filterNonGeocodes(tweets).length.should.equal 2
			});
		end
	end
  
end


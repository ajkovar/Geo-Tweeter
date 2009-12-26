
describe 'z.geo'
  before_each
  	$.ajaxSetup({
  		async:false
	});

    mock_request().and_return(fixture('geo.json'));//.and_return(, 'application/json', 200/*, { Accept: 'foo' }*/)
    
    //null out existing geo cache
    z.storage.setLocal("geonames", "");
  end

  describe '.retrieveGeoNames()'
    it 'should retrieve geonames from webservice or cache'
      z.geo.retrieveGeoNames(10, 10, function(geonames){
        geonames.should.be_an Array
      });
    end

    it 'should retrieve geonames from cache after the first time'
      z.geo.should.receive('getGeoCache', 'twice').with_args(10, 10)
      $.should.receive('getJSON', 'once')
      
      z.geo.retrieveGeoNames(10, 10, function(geonames){});
      z.geo.retrieveGeoNames(10, 10, function(geonames){});
    end
    
    it 'should retrieve geonames from cache the second time'
      
      z.geo.retrieveGeoNames(10, 10, function(geonames){
      	geonames.length.should.equal 1
      	geonames[0].countryName.should.equal "Cameroon"
      });
    end
    
  end
end


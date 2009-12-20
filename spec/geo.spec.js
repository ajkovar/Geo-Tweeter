
describe 'z.geo'
  before_each
    mock_request().and_return('{\
           "geonames":[\
              {\
                 "countryName":"Cameroon",\
                 "adminCode1":"12",\
                 "fclName":"city, village,...",\
                 "countryCode":"CM",\
                 "lng":15.007063,\
                 "fcodeName":"populated place",\
                 "distance":"0.8154",\
                 "fcl":"P",\
                 "name":"Lara",\
                 "fcode":"PPL",\
                 "geonameId":6861029,\
                 "lat":9.997677,\
                 "population":0,\
                 "adminName1":"Extreme-Nord"\
              }\
           ]\
        }', 'application/json', 200/*, { Accept: 'foo' }*/)
    geonames = z.geo.retrieveGeoNames(10, 10);
  end

  describe '.retrieveGeoNames()'
    it 'retrieve geonames from webservice or cache'
      geonames.should.be_an Object
    end
  end
end


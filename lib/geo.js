(function($){

    window.z.geo = {
        retrieveGeoNames: function(lat, lng, func) {
            var result = z.geo.getGeoCache(lat, lng);

            if(!result || !(result instanceof Array)) {

                log("http://ws.geonames.org/findNearbyPlaceNameJSON?lat="+ lat +"&lng=" + lng + "&callback=?");
                //TODO figure out how to make test suite work with jsonp
                $.getJSON("http://ws.geonames.org/findNearbyPlaceNameJSON?lat="+ lat +"&lng=" + lng + "&callback=?",
                    function(data){
                        result = data.geonames;
                        z.geo.setGeoCache(lat, lng, result);
                        func(result);
                    }
                );
            }
            else func(result);

        },

        getGeoCache: function(lat, lng) {
            var latRounded = roundValue(lat);
            var lngRounded = roundValue(lng);

            var geonames = z.storage.getLocal("geonames");

            return geonames && geonames[latRounded] ? geonames[latRounded][lngRounded] : undefined;
        },

        setGeoCache: function(lat, lng, value) {
            var latRounded = roundValue(lat);
            var lngRounded = roundValue(lng);

            var geonames = z.storage.getLocal("geonames");

            if(!geonames)
                geonames = [];

            if(!geonames[lat])
                geonames[lat]=[];

            geonames[lat][lng]=value;

            z.storage.setLocal("geonames", geonames);
        }

    };

    var roundValue = function(value) {
        return Math.round(value/5)*5;
    };

}(jQuery));


(function($){

    window.z.storage = {
        getLocal: function(varname) {
            var result;

            if(localStorage && localStorage[varname]) {
                var store = localStorage[varname];
                try {

                    result = JSON.parse(store);
                }
                catch(e) {
                    result = store;
                }
            }

            return result;
        },

        setLocal: function(varname, value) {
            if(!localStorage)
                localStorage = {};
			var stringified = JSON.stringify(value);
            localStorage[varname] = stringified;

        }
    };

}(jQuery));


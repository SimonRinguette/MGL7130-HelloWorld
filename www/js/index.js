/**
	Copyright (c) 2016 Simon Ringuette - The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        $(document).on('deviceready', this.onDeviceReady);
    },
    onDeviceReady: function() {
		// L'API Cordova est prête		
		$('#version').html(device.cordova);
		$('#plateforme').html(device.platform);
		$('#model').html(device.model);
		$('#uuid').html(device.uuid);

		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function(position){
				$('#gps').html("(" + position.coords.latitude.toFixed(4) + ", " + position.coords.longitude.toFixed(4) + ")"); 
			}, function(err){
				$('#gps').html(err.message)
			});
		} else {
				$('#gps').html("Geolocation is not supported by this device.")
		}
	}
};
app.initialize();


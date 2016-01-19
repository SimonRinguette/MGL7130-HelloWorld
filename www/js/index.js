/**
	Copyright (c) 2016 Simon Ringuette - The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var angularApp = angular.module('HelloWorld', []);
var angularScope;

angularApp.controller('HelloWorldController', function($scope) {
	angularScope = $scope;
	$scope.version = '';
	$scope.plateforme = '';
	$scope.model = '';
	$scope.uuid = '';
	$scope.gps = function() {
		if($scope.gpsError){
			return $scope.gpsError;
		}
		if($scope.latitude && $scope.longitude) {
				return "(" + $scope.latitude + ", " + $scope.longitude + ")";
		}
		return 'En attente';
	}
});		

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
		// L'API Cordova est prête		
		angularScope.$apply(function() {
			angularScope.version = device.version;
			angularScope.plateforme = device.platform;
			angularScope.model = device.model;
			angularScope.uuid = device.uuid;
		});
		
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function(position){				
				angularScope.$apply(function(){
					angularScope.latitude = position.coords.latitude.toFixed(4);
					angularScope.longitude = position.coords.longitude.toFixed(4);
				});
				
			}, function(err){
				angularScope.$apply(function(){
					angularScope.gpsError = err.message; 
				});
			});
		} else {
			angularScope.$apply(function(){
				angularScope.gpsError = "Geolocation is not supported by this device."; 
			});			
		}
	}
};
app.initialize();


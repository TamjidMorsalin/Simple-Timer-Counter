var app = angular.module('myApp', ['colorpicker.module']);
				app.directive('fileModel', ['$parse', function ($parse) {
			        return {
			           restrict: 'A',
			           link: function(scope, element, attrs) {
			              var model = $parse(attrs.fileModel);
			              var modelSetter = model.assign;
			              
			              element.bind('change', function(){
			                 scope.$apply(function(){
			                    modelSetter(scope, element[0].files[0]);
			                 });
			              });
			           }
			        };
			     }]);
				app.controller('myCtrl', function($scope,$interval) {
				    $scope.day = "00";
				    $scope.hour = "00";
				    $scope.minute = "00";
				    $scope.second = "00";
					var timer;
					$scope.status = false;
					$scope.Size = 20;
					$scope.width = '60px';
					$scope.height = '35px';
					$scope.inputPaddingRow = '20px'

					$scope.options = {
						swatchOnly: true,
						swatchBootstrap: false,
					};
					$scope.button = {
				      	background_color: '#ccffff',
				      	counter_color: '#006666',
				      	label_color: 'black'
				    };

				    $scope.startTimer = function(){
				    	if(parseInt($scope.day) == 0 && parseInt($scope.hour) == 0 && parseInt($scope.minute) == 0 && parseInt($scope.second) ==0){
				    		return;
				    	}
				    	else if(parseInt($scope.second) >60 || parseInt($scope.minute) >60 || parseInt($scope.hour) >24){
				    		return;
				    	}
				    	else{
				    		$scope.second = $scope.itoa(parseInt($scope.second));
					    	$scope.minute = $scope.itoa(parseInt($scope.minute));
					    	$scope.hour = $scope.itoa(parseInt($scope.hour));
					    	$scope.day = $scope.itoa(parseInt($scope.day));
					    	 timer = $interval(function(){
					    	 	$scope.status = true;
					    	 	$scope.second = parseInt($scope.second);
					    		$scope.second--;
					    		$scope.second = $scope.itoa($scope.second);
					    		if(parseInt($scope.second)<0 || parseInt($scope.second) >60){
					    			$scope.second = 59;
					    			$scope.minute = parseInt($scope.minute);
					    			$scope.minute--;
					    			$scope.minute = $scope.itoa($scope.minute);
					    		}
					    		if(parseInt($scope.minute)<0 || parseInt($scope.minute) >60){
					    			$scope.minute = 59;
					    			$scope.hour = parseInt($scope.hour);
					    			$scope.hour--;
					    			$scope.hour = $scope.itoa($scope.hour);
					    		}
					    		if(parseInt($scope.hour)<0 || parseInt($scope.hour) >24){
					    			$scope.hour = 23;
					    			$scope.day = parseInt($scope.day);
					    			$scope.day--;
					    			$scope.day = $scope.itoa($scope.day);
					    		}
					    	
					    		if(parseInt($scope.day) == 0 && parseInt($scope.hour) == 0 && parseInt($scope.minute) == 0 && parseInt($scope.second) ==0){
					    			 $interval.cancel(timer);
	           						 timer = undefined;
					    		}
					    	},1000);
				    	}
				    };

				    $scope.itoa = function(num){
				    	if(num >= 0 && num < 10) return '0'+num;
				    	else return num;
				    };

				    $scope.stopTimer = function(){
				    	$interval.cancel(timer);
           				timer = undefined;
				    };
				    
				    $scope.resetTimer = function(){

				    	$interval.cancel(timer);
           				timer = undefined;
           				$scope.status = false;
				    	$scope.day = "00";
				    	$scope.hour = "00";
				    	$scope.minute = "00";
				    	$scope.second = "00";
				    }
				    $scope.setFontSize = function(size){
				    	$scope.Size = size;
				    	var w = parseInt(size) + 44;
				    	var h = parseInt(size) + 19;
				    	$scope.width = w +'px';
				    	$scope.height = h + 'px';
				    	$scope.inputPaddingRow = 8 - parseInt(size)/10 +'px';
				    }

				    $scope.chooseFile = function(){
				    	document.getElementById("fileInput").click();
				    }

				    $(function(){
				    	$(":file").change(function(){
				    		if(this.files && this.files[0]){
				    			var reader = new FileReader();
				    			reader.onload = imageIsLoaded;
				    			reader.readAsDataURL(this.files[0]);
				    		}
				    	});
				    });

				    function imageIsLoaded(e){
				    	$('.jumbotron').css('background-image', 'url('+e.target.result+')');
				    	$('.jumbotron').css('background-size', 'cover');
				    	$('.jumbotron').css('background-position', 'center');
				    }
				});
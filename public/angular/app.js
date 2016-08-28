(function(){
	var MyProject = angular.module('MyProject', [
		'ngMaterial'
		]);
	MyProject.run(function($http){
		$http.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
	});
	MyProject.controller('ProjectCtrl', ['$scope','$http','$mdDialog', '$mdToast',
		function($scope, $http, $mdDialog, $mdToast){
			$scope.id_editData = '';
			$scope.type = ['Application', 'Website'];
			$scope.data = {};
			$scope.project = {
				name: '',
				description: '',
				clientName : '',
				type : '',
				clientEmail : ''
			};
			$scope.clear = function(){
				$scope.project = {
					name: '',
					description: '',
					clientName : '',
					type : '',
					clientEmail : ''
				};
			}
			$scope.getProject = function(){
				// $scope.clear();
				$http({
					method: 'GET',
					url: '/project'
				}).success(function(data){
					$scope.data = data;
				});
			};
			$scope.addProject = function(){
				$http({
					method: 'POST',
					url: '/project',
					data: $scope.project
				}).success(function(){
					$scope.getProject();
					$scope.clear();
					$scope.showSimpleToast('Project Saved');
				});
			};
			$scope.edit = function(data){
				$scope.id_editData = data._id;
				$scope.project = {
					name: data.name,
					description: data.description,
					clientName : data.clientName,
					type : data.type,
					clientEmail : data.clientEmail
				};
			};
			$scope.updateProject = function(id){
				$http({
					method: 'PUT',
					url: '/project/'+id,
					data: $scope.project
				}).success(function(){
					$scope.getProject();
					$scope.id_editData = '';
					$scope.clear();
					$scope.showSimpleToast('Project Edited');
				}).error(function(err){
					$scope.data = err;
				});
			}
			$scope.removeProject = function(id){
				var confirm = $mdDialog.confirm()
				.title('Would you like to delete your project?')
				.ok('Delete')
				.cancel('Cancel');
				$mdDialog.show(confirm).then(function() {
					$scope.status=id;
					$http({
						method: 'DELETE',
						url: '/project/'+id
					}).success(function(){
						$scope.getProject();
						$scope.showSimpleToast('Project Deleted');
					}).error(function(err){
						$scope.data = err;
					});
				});
			};
			$scope.showSimpleToast = function(data) {
			    $mdToast.show(
			      $mdToast.simple()
			        .textContent(data)
			        .hideDelay(3000)
			    );
			  };
			//run
			$scope.getProject();
		}]);
})();
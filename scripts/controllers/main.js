'use strict';
angular.module('demo').controller('MainCtrl', function ($scope, $http, S3UploadService) {

    $scope.product = {};

    $scope.save = function (obj) {
        console.log("saveOBJ", obj);
        /*$http.post('api/products', obj).then(function (res) {
            console.log("res::", res);
        })*/
    }

    $scope.uploadFiles = function (files) {
        $scope.Files = files;
        if (files && files.length > 0) {
            angular.forEach($scope.Files, function (file, key) {
                S3UploadService.Upload(file).then(function (result) {
                    console.log("result", result)
                    // Mark as success
                    file.Success = true;
                    $scope.product.image = "https://abdullahtest.s3.amazonaws.com/" + file.name;
                }, function (error) {
                    // Mark the error
                    $scope.Error = error;
                }, function (progress) {
                    // Write the progress as a percentage
                    file.Progress = (progress.loaded / progress.total) * 100
                });
            });
        }
    };


});

'use strict';

angular.module('demo')
    .service('S3UploadService', ['$q', function ($q) {
    // Us standard region
    AWS.config.region = 'us-east-1';
    /*AWS.config.update({ accessKeyId: 'AKIAJ6UMO5KRXCE7MOHA', secretAccessKey: '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' });*/
	 AWS.config.update({ accessKeyId: 'AKIAILNT4RGSN4DAENAQ', secretAccessKey: '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' });

    /*var bucket = new AWS.S3({ params: { Bucket: 'gajajewellery', maxRetries: 10 }, httpOptions: { timeout: 360000 } });*/
	 var bucket = new AWS.S3({ params: { Bucket: 'a4azad', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

    this.Progress = 0;
    this.Upload = function (file) {
        var deferred = $q.defer();
        var params = { Bucket: 'a4azad', Key: file.name, ContentType: file.type, Body: file };
        var options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: 'bucket-owner-full-control'
        };
        var uploader = bucket.upload(params, options, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve();
        });
        uploader.on('httpUploadProgress', function (event) {
            deferred.notify(event);
        });

        return deferred.promise;
    };
}]);
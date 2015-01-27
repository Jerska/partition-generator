var NOISE_RECORDING_TIME = 10;

var app = angular.module('app', [])

app.controller('Ctrl', ['$scope', '$timeout', function ($scope, $timeout) {
    var noise = new Float32Array(SIZEOF_SAMPLES);
    $scope.timer = 0;
    $scope.window = window;
    $scope.progress = 0;
    $scope.recordedNoise = false;

    var timer = function (time, cb) {
        $scope.timer = time;
        if (time) {
            $timeout(function () {
                timer(time - 1, cb);
            }, 1000);
        } else {
            cb();
        };
    };

    var recordNoise = function (time, total) {
        if (total === undefined) total = time;
        if (time < 0) {
            $scope.window.micState = 0;
            $scope.recordedNoise = true;
            return;
        }
        $scope.progress = Math.floor((1 - (time / total)) * 100);
        $timeout(function () {
            recordNoise(time - 1, total);
        }, 1000);
    };

    $scope.init = function () {
        console.log("In init");
    };

    $scope.recordNoise = function () {
        timer(3, function () {
            $scope.window.micState = window.RECORDING_NOISE;
            recordNoise(NOISE_RECORDING_TIME);
        });
    };

    $scope.recordSong = function () {
        timer(5, function () {
            $scope.window.micState = window.RECORDING_SONG;
        });
    };

    $scope.stopRecordingSong = function () {
        $scope.window.micState = 0;
    };
}]);

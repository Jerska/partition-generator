/**
 * \file controller.js
 * This file contains all the UX logic
 * It describes the angular controller of our application
 */

var NOISE_RECORDING_TIME = 10;

window.score = new JellyScore.ScoreInterface();

var app = angular.module('app', [])

app.controller('Ctrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.timer = 0;
    $scope.window = window;
    $scope.progress = 0;
    $scope.recordedNoise = false;

    /**
     * Displays a timer before executing cb
     */
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

    /**
     * Animates the progress bar of noise recording
     */
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

    /**
     * On initialization, we ask the user to accept to give access to his microphone
     */
    $scope.init = function () {
        window.score.resetScore();
        window.score.draw($('article'));
        $('#flash-modal').modal('show');
    };

    /**
     * Launches a timer before actually recording noise
     */
    $scope.recordNoise = function () {
        timer(3, function () {
            $scope.window.micState = window.RECORDING_NOISE;
            recordNoise(NOISE_RECORDING_TIME);
        });
    };

    /**
     * Set up the environment so that the sound callback knows that it should send back
     * note.
     */
    $scope.recordSong = function () {
        timer(5, function () {
            $scope.window.micState = window.RECORDING_SONG;
        });
    };

    /**
     * Stops recording
     */
    $scope.stopRecordingSong = function () {
        $scope.window.micState = 0;
    };

    /**
     * Resets everything (except noise)
     */
    $scope.reset = function () {
        $scope.window.micState = 0;
        $scope.window.lastNote = 0;
        $scope.window.lastNoteLength = 0;
        $scope.window.time = 0;
        window.score.resetScore();
        window.score.draw($('article'));
    };
}]);

(function() {
  'use strict';
  angular.module('divshot.support', []).directive('dsSupportModalLink', function() {
    return {
      restrict: 'A',
      scope: {
        dsTitle: '@',
        dsBtnLabel: '@',
        dsCancelCallback: '&',
        dsSubmitCallback: '&'
      },
      controller: function($scope, $injector) {
        $scope.modalTemplate = "<div class=\"modal-header\">\n  <h2>{{dsTitle}}</h2>\n  <a class=\"cancel\" ng-click=\"close()\">&times;</a>\n</div>\n<div class=\"modal-epicenter\">\n  <div ng-if=\"showErrorMessage\"><p class=\"error\">{{errorMessage}}</p></div>\n  <form name=\"supportModalForm\" role=\"form\">\n    <div class=\"form-group\">\n      <input type=\"text\" ng-model=\"$parent.subject\" class=\"form-control\" id=\"subject\" placeholder=\"Subject\">\n    </div>\n    <div class=\"form-group\">\n      <textarea ng-model=\"$parent.body\" class=\"form-control\" id=\"body\" placeholder=\"Message\" rows=\"5\"></textarea>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"submit()\">{{dsBtnLabel}}</button> \n</div>";
        return $scope.render = function() {
          var $modal;
          if ($injector.has('$modal')) {
            $modal = $injector.get('$modal');
          } else {
            console.error('dsSupportModal directive requires "angular-bootstrap": https://github.com/angular-ui/bootstrap');
            return;
          }
          return $modal.open({
            scope: $scope,
            template: this.modalTemplate,
            windowClass: 'support-modal',
            controller: function($scope, $injector, $modalInstance) {
              var divshot;
              $scope.errorMessage = 'Please provide a valid subject and message.';
              if ($injector.has('divshot')) {
                divshot = $injector.get('divshot');
              } else {
                console.error('dsSupportModal directive requires "divshot-api": https://github.com/divshot/divshot-api');
                return;
              }
              $scope.submit = function() {
                var $notification;
                if ($scope.subject && $scope.body) {
                  return divshot.user.sendHelpRequest($scope.subject, $scope.body).then(function() {
                    return $modalInstance.close();
                  });
                } else {
                  if ($injector.has('$notification')) {
                    $notification = $injector.get('$notification');
                    return $notification.error($scope.errorMessage);
                  } else {
                    return $scope.showErrorMessage = true;
                  }
                }
              };
              return $scope.close = function() {
                return $modalInstance.dismiss('cancel');
              };
            }
          }).result.then(function(result) {
            return $scope.dsSubmitCallback();
          }, function() {
            return $scope.dsCancelCallback();
          });
        };
      },
      link: function(scope, element, attrs) {
        var clickHandler;
        clickHandler = function(evt) {
          return scope.render();
        };
        return element.on('click', clickHandler);
      }
    };
  });

}).call(this);

'use strict'

angular.module('divshot.support', [])
  .directive 'dsSupportModalLink', ->
    restrict: 'A'
    scope:
      dsTitle: '@'
      dsBtnLabel: '@'
      dsCancelCallback: '&'
      dsSubmitCallback: '&'

    controller: ($scope, $injector) ->
      $scope.modalTemplate = """
        <div class="modal-header">
          <h2>{{dsTitle}}</h2>
          <a class="cancel" ng-click="close()">&times;</a>
        </div>
        <div class="modal-epicenter">
          <div ng-if="showErrorMessage"><p class="error">{{errorMessage}}</p></div>
          <form name="supportModalForm" role="form">
            <div class="form-group">
              <input type="text" ng-model="$parent.subject" class="form-control" id="subject" placeholder="Subject">
            </div>
            <div class="form-group">
              <textarea ng-model="$parent.body" class="form-control" id="body" placeholder="Message" rows="5"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" ng-click="submit()">{{dsBtnLabel}}</button> 
        </div>
      """

      $scope.render = ->
        if $injector.has('$modal')
          $modal = $injector.get('$modal')
        else
          console.error('dsSupportModal directive requires "angular-bootstrap": https://github.com/angular-ui/bootstrap')
          return

        $modal.open(
          scope: $scope
          template: @modalTemplate
          windowClass: 'support-modal'
          controller: ($scope, $injector, $modalInstance) ->
            $scope.errorMessage = 'Please provide a valid subject and message.'

            if $injector.has('divshot')
              divshot = $injector.get('divshot')
            else
              console.error('dsSupportModal directive requires "divshot-api": https://github.com/divshot/divshot-api')
              return

            $scope.submit = ->
              if $scope.subject and $scope.body
                divshot.user.sendHelpRequest($scope.subject, $scope.body).then ->
                  $modalInstance.close()
              else
                if $injector.has('$notification')
                  $notification = $injector.get('$notification')
                  $notification.error($scope.errorMessage)
                else
                  $scope.showErrorMessage = true
            $scope.close = ->
              $modalInstance.dismiss('cancel')
        ).result.then((result) ->
          $scope.dsSubmitCallback()
        , ->
          $scope.dsCancelCallback()
        )

    link: (scope, element, attrs) ->
      clickHandler = (evt) -> scope.render()
      element.on 'click', clickHandler
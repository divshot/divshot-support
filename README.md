# divshot-support

Support interface utilities for Divshot.

## Install

```
bower install divshot-support --save
```

## Dependencies

### Support Modal

* AngularJS
* [divshot-api](https://github.com/divshot/divshot-api) > 0.6.15
* angular-bootstrap (Modal Only)

## Usage with Angular

```html
<script src="/bower_components/divshot-support/dist/support.directive.js"></script>
```

#### Inject into app

```js
angular.modules('myApp', ['divshot.support']);
```

#### Angular Directive

HTML

```html
<a ds-support-modal-link ds-title="Support Modal" ds-btn-label="Submit Message" ds-submit-callback="submitMessage()" ds-cancel-callback="cancelMessage()">Quick Support</a>
```

Controller

```js
angular.modules('myApp')
  .controller('AppController', function ($scope) {
    $scope.submitMessage = function() {
      console.log('Do something after submitting the message.');
    };
    $scope.cancelMessage = function() {
      console.log('Do something else if the user cancels.');
    };
  });
```

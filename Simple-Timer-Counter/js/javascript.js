$scope.color = '#FF0000';

// options - if a list is given then choose one of the items. The first item in the list will be the default
$scope.options = {
    // html attributes
    required: [false, true],
    disabled: [false, true],
    placeholder: '',
    id: undefined,
    name: undefined,
    // color
    format: ['hsl', 'hsv', 'rgb', 'hex', 'hex8'],
    hue: [true, false],
    saturation: [false, true],
    lightness: [false, true], // Note: In the square mode this is HSV and in round mode this is HSL
    alpha: [true, false],
    case: ['upper', 'lower'],
    // swatch
    swatch: [true, false],
    swatchPos: ['left', 'right'],
    swatchBootstrap: [true, false],
    swatchOnly: [true, false],
    // popup
    round: [false, true],
    pos: ['bottom left', 'bottom right', 'top left', 'top right'],
    inline: [false, true],
    // show/hide
    show: {
        swatch: [true, false],
        focus: [true, false],
    },
    hide: {
        blur: [true, false],
        escape: [true, false],
        click: [true, false],
    },
    // buttons
    close: {
        show: [false, true],
        label: 'Close',
        class: '',
    },
    clear: {
        show: [false, true],
        label: 'Clear',
        class: '',
    },
    reset: {
        show: [false, true],
        label: 'Reset',
        class: '',
    },
};

// exposed api functions
$scope.api.open();       // opens the popup
$scope.api.close();      // closes the popup
$scope.api.clear();      // removes value
$scope.api.reset();      // resets color value to original value
$scope.api.getElement(); // returns the wrapping <color-picker> element
$scope.api.getScope();   // returns the color picker $scope

// api event handlers
$scope.eventApi = {
    onChange:  function(api, color, $event) {},
    onBlur:    function(api, color, $event) {},
    onOpen:    function(api, color, $event) {},
    onClose:   function(api, color, $event) {},
    onClear:   function(api, color, $event) {},
    onReset:   function(api, color, $event) {},
    onDestroy: function(api, color) {},
};

// decorator - all variables in options can be globally overridden here
angular
    .module('app', ['color.picker'])
    .config(function($provide) {
        $provide.decorator('ColorPickerOptions', function($delegate) {
            var options = angular.copy($delegate);
            options.round = true;
            options.alpha = false;
            options.format = 'hex';
            return options;
        });
    });
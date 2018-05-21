var gjs = angular.module('gjs_customiser', [
  'common.fabric',
  'common.fabric.utilities',
  'color.picker'
  // 'common.fabric.constants'
]);
  // .controller('GjsController', ['$scope', 'Fabric', 'Keypress', function($scope, Fabric, Keypress) {
  gjs.controller('GjsController', ['$scope', 'Fabric', '$timeout', '$http', function ($scope, Fabric, $timeout, $http) {
    $scope.gjs_loading = true;
    $scope.final_step = false;

    $scope.product_custom_qty = document.getElementById('ProductQuantity');
    $scope.product_custom_qty.value = product_qty;

    $scope.product_custom_name = '';

    // console.log($scope.product_custom_qty);
    $scope.fabric = {};
    // $scope.FabricConstants = FabricConstants;
    $scope.cs_fonts = load_cs_fonts;
    // console.log('------------------------------------');
    // console.log($scope.cs_fonts);
    // console.log('------------------------------------');
    //
    // Creating Canvas Objects
    // ================================================================
    $scope.addShape = function (path) {
      $scope.fabric.addShape('http://fabricjs.com/assets/15.svg');
    };
    // $scope.addBill = function (path) {
    //   $scope.fabric.addImage('/Content/customiser/img/pp.png');
    //   $scope.image_layers = $scope.fabric.image_layers;

      
    // };

    //
    // Editing Canvas Size
    // ================================================================
   

    $scope.setCanvasSize = function () {
      // $scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
      // $scope.fabric.setDirty(true);
      delete $scope.canvasCopy;
    };

    $scope.canvasSelect = function (object) {
      // console.log($scope.fabric);
      // console.log(object);
      // $scope.select(object);
      $scope.fabric.select_on_canvas(object);
    };
    $scope.delete_on_canvas = function (object) {
      // console.log(object);
      // $scope.select(object);
      $scope.canvasSelect(object);
      $scope.fabric.deleteActiveObject(object);
      $scope.fabric.selectedObject = false;
      // console.log('------------------------------------');
      // console.log($scope.text_layers);
      // console.log('------------------------------------');
    };

    //
    // Init
    // ================================================================

    var overlayURL = '';
    var final_overlayURL = '';

    $scope.init = function () {

      $scope.fabric = new Fabric({
        // JSONExportProperties: FabricConstants.JSONExportProperties,
        // textDefaults: FabricConstants.textDefaults,
        // shapeDefaults: FabricConstants.shapeDefaults,
        json: {},
        // canvasWidth: 500,
        // canvasHeight: 500,
        // canvasBackgroundColor: '#333'
      });

      var canvasWrap = document.querySelector('.fabric-container');
      var initialCanvasWidth = canvasWrap.offsetWidth;

      $scope.fabric.setCanvasSize(initialCanvasWidth, 500);

      $timeout(function () {
        // console.log("scope set > " + $scope.product_code + ' : ' + img_print)
        overlayURL = img_preview;
        final_overlayURL = img_print;
        $scope.fabric.addOverlay(overlayURL);
      });

      $timeout(function () {
        $scope.gjs_loading = false
      }, 500);



    }; // end init

// ========================================================
    // filestack function
    var client = filestack.init(filestack_key);

    $scope.showPicker = function () {
      client.pick({
        accept: ['image/jpg', 'image/jpeg', 'image/png', 'image/svg'],
        fromSources: ['local_file_system', 'imagesearch', 'facebook', 'instagram'],
        // fromSources: ['local_file_system', 'imagesearch'],
      }).then(function (result) {
        // console.log(result.filesUploaded);
        // add_image(result.filesUploaded[0].url, result.filesUploaded[0].filename);
        $scope.fabric.addImage(result.filesUploaded[0].url, result.filesUploaded[0].filename);
        // console.log('you need to create the image object on the canvas to be able to select, or find a way to select by id');
        $scope.image_layers = $scope.fabric.image_layers;
        // console.log($scope.image_layers);

        // $scope.create_image_layer(result.filesUploaded[0]);
      });
    }

    // $('#add_image_button').click(showPicker); // end loaded_img on click

    $scope.$on('canvas:created', $scope.init);

    // Keypress.onSave(function() {
    //   $scope.updatePage();
    // });

    //
    // setting the controls
    // ======================================================
    $scope._pixel_move = 10;
    $scope._angle_move = 15;

    $scope.object_action = function (_action) {
      var _active_element = $scope.fabric.selectedObject;
      // console.log();
      // console.log(_active_element);
      if ($scope.fabric.selectedObject) {
        switch (_action) {
          case 'up':
            _active_element.set({
              top: _active_element.top - $scope._pixel_move
            });
            break;
          case 'down':
            _active_element.set({
              top: _active_element.top + $scope._pixel_move
            });
            break;
          case 'left':
            _active_element.set({
              left: _active_element.left - $scope._pixel_move
            });
            break;
          case 'right':
            _active_element.set({
              left: _active_element.left + $scope._pixel_move
            });
            break;
          case 'rotate':
            _active_element.set({
              angle: _active_element.angle + $scope._angle_move
            });
            break;
          case 'scaleup':
            // console.log(_active_element);
            _active_element.set({
              // originX: 'center',
              // originY: 'center',
              // top: _active_element.top - _pixel_move
              scaleX: _active_element.scaleX * 1.1,
              scaleY: _active_element.scaleY * 1.1,
            });
            // check_image_resize(_active_element);
            break;
          case 'scaledown':
            _active_element.set({
              // originX: 'center',
              // originY: 'center',
              scaleX: _active_element.scaleX * 0.9,
              scaleY: _active_element.scaleY * 0.9,
            });
            // check_image_resize(_active_element);
            break;
          default:
            console.log('nada');
        }

        _active_element.setCoords();
        $scope.fabric.render();
      }
    }
    //
    // text panel
    // ==========================================
    $scope.text_updating = false;

    // if($scope.fabric.selectedObject){
    // 	$scope.object_text = $scope.fabric.selectedObject.text;
    // }else if(!$scope.fabric.selectedObject){
    // 	$scope.object_text = '';
    // }
    $scope.object_text = '';
    $scope.font_family = 'serif';

    $scope.text_layers = [];

    $scope.add_object_text = function () {
      if ($scope.object_text != '') {
        // console.log($scope.object_text);
        $scope.fabric.addText($scope.object_text);
        $scope.fabric.setTextColor($scope.text_color);
        $scope.fabric.setFontFamily($scope.font_family || 'sans-serif');
        $scope.text_updating = true;
        // $scope.text_layers.push($scope.fabric.selectedObject);
        $scope.text_layers = $scope.fabric.text_layers;
        // console.log($scope.text_layers);

      }

    }

    //
    // watching what's slected on canvas to attach events
    // =====================================================================================================

    $scope.$watch('fabric.selectedObject', function (newVal) {
      if ($scope.fabric.selectedObject) {
        if ($scope.fabric.selectedObject.type === 'text') {
          // console.log('text selected');
          $scope.object_text = $scope.fabric.selectedObject.text;
          $scope.text_updating = true;
          $scope.font_family = $scope.fabric.selectedObject.fontFamily;
          $scope.text_color = $scope.fabric.selectedObject.fill;
        }
      } else {
        $scope.clear_text();
      }

    });

    $scope.stretch_alert = false;

    $scope.$watch('fabric.selectedObject.scaleX', function (newVal, oldVal, scope) {
      // console.log(newVal);
      if($scope.fabric.selectedObject){
 if ( $scope.fabric.selectedObject.type === 'image' && newVal > $scope.fabric.selectedObject.originalScaleX) {
        $scope.stretch_alert = true;
        // console.log($scope.fabric.selectedObject);
        $scope.fabric.selectedObject.set({
          stroke: 'red',
          strokeWidth: 1
        });
        //  $scope.fabric.select_on_canvas($scope.fabric.selectedObject);
      } else {
         $scope.stretch_alert = false;
         $scope.fabric.selectedObject.set({
          // borderColor: '#adc8ff',
          // stroke: 'red',
          strokeWidth: 0
        });
        // $scope.fabric.select_on_canvas($scope.fabric.selectedObject);
      }
      }

    });

  //  ==================================== text functions
    $scope.clear_text = function () {
      // console.log('text cleared');
      $scope.text_updating = false;
      $scope.object_text = '';
      $scope.font_family = 'serif';
      $scope.text_color = '#000000';
    }

    $scope.update_object_text = function () {
      if ($scope.object_text != '') {
        $scope.fabric.setText($scope.object_text);
        $scope.fabric.setTextColor($scope.text_color);
        $scope.fabric.setFontFamily($scope.font_family);
      }
    }

    $scope.update_object_font = function (font) {
      $scope.font_family = font;

      if( $scope.fabric.selectedObject){
         
        $scope.fabric.setFontFamily(font);
        
      }
      $('#dropdown__font').foundation('close');
      // if ($scope.fabric.selectedObject) {
      //   $scope.fabric.setFontFamily($scope.font_family.name);
      // }
    }

    $scope.update_object_color = function () {
      if ($scope.object_text != '') {
        $scope.fabric.setTextColor($scope.text_color);
      }
    }
    // console.log($scope);
    // $scope.$on('canvas:element:selected', $scope.clear_text);

    // angular-color-picker color picker
    // =================================
    $scope.text_color = "#000000";
    // hard setting for plugin bug
    // $scope.text_color_options = {
    //   format: 'hex',
    //   hue: true,
    // // saturation: [false, true],
    // // lightness: [false, true], // Note: In the square mode this is HSV and in round mode this is HSL
    // // alpha: [true, false],

    // };
    // $scope.text_color_options.format = 'hex';
$scope.$watch('text_color', $scope.update_object_color);

    // load final step
    // ==============================================
    $scope.go_final_step = function( value ){ $scope.final_step = value }

    //
    // finish and export
    // ==========================================================================
    $scope.swap_frames = function () {
        // console.log('remove border');
        $scope.fabric.overlay_object.setSrc(final_overlayURL, function () {
            $scope.fabric.render();
            $scope.fabric.overlay_object.setCoords();
        });
        $scope.fabric.canvasLayers().forEach(function (single) {
            //console.log(single.object)
            single.object.strokeWidth = 0;
            single.object.stroke = 'transparent';
            // console.log(single.object)
        });
}

    $scope.finish_and_export = function () {
        // $scope.fabric.addOverlay(final_overlayURL);
        $scope.swap_frames();
      $timeout(function () {
        $scope.product_layers = [];
        $scope.product_layers = $scope.fabric.canvasLayers();
        if ($scope.product_layers.length > 0) {

          $scope.fabric.setCanvasImage();

          var img = $scope.fabric.setCanvasImageData; // $scope.product_layers[0].src; // use this for all uploaded assets

          var objects = [];

          // console.log('check length: ' + $scope.product_layers.length + ' : ' + objects.length);
          for (var i = 0; i < $scope.product_layers.length; i++) {
            console.log(i + ' : ' + $scope.product_layers[i].src + ' : ' + $scope.product_layers[i]);
            objects[objects.length] = $scope.product_layers[i].src;
          }

          //console.log('img: ' + img);
          var data = {
            img: img,
            product_id: product_id,
            product_variant: product_variant,
            product_qty: $scope.product_custom_qty.value,
            custom_name: $scope.product_custom_name,
            objects: objects,
            __RequestVerificationToken: 'thingo2' // $("[name='__RequestVerificationToken']").val();
          }
          //FabricDirtyStatus.endListening();
          $scope.fabric.setDirty(false);
          // console.log('hooray - ' + $scope.product_custom_name + ' : ' + $scope.product_custom_qty.value);
          // add to cart, using previous product page
          $http.post('/api/cart/addcustomtocart', addAntiForgeryToken2(data)).then(function successCallback(response) {
            // console.log(response.data);
            if (response.data) {
              // console.log('hooray again');
              $('.cart-quantity').html(' (' + response.data.Quantity + ')');
              $('#customiser_modal').foundation('open');
            } else {
              alert('An error has occurred, please try again.');
            }
          }, function errorCallback(err) {
            console.log(err);
            location.href = '/oops/';
          });
        } else {
          alert('Sorry, you need to cusomise the product to complete this step.');
        }
      },500);

    }
    // tabs
    // ================================
    // console.log('hello tabs');
    $scope.tab = 1;
    $scope.lockedTabs = {
      1: false,
      2: false,
      3: false
    };

    $scope.setTab = function (newTab) {
      $scope.tab = newTab;
      // console.log(tabNum);
      $scope.lockedTabs[newTab] = false;
      // console.log($scope.lockedTabs);
    };

    $scope.isSet = function (tabNum) {

      return $scope.tab === tabNum;
    };
    $scope.isLocked = function (tabNum) {
      // console.log($scope.lockedTabs);
      return $scope.lockedTabs[tabNum];
    };
  }]);
gjs.filter('nodash',function() {
  return function (input) {
    return input.replace(/-/g, ' ');
};
});
gjs.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
if(location.href.match('localhost')[0]){  
  console.log('------------------------------------');
  console.log("Apparently this angular works only on server");
  console.log('------------------------------------');
}
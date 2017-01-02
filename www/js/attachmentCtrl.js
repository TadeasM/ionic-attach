(function () {

    'use strict';

    angular
        .module('starter')
        .controller('attachmentCtrl', function ($cordovaCamera, dataService, $http, $scope) {
            var vm = this;
            vm.formNumber = 1;

            var isWebView = ionic.Platform.isWebView();
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();
            var isWindowsPhone = ionic.Platform.isWindowsPhone();
            var currentPlatform = ionic.Platform.platform();

            if (isWebView == false && isIPad == false && isIOS == false && isAndroid == false &&  isWindowsPhone == false ) {
                    vm.isDesktop = true;
                } else {
                    vm.isDesktop = false;
                }

            vm.init = function(ids) {
                console.log('idecka: ',ids)

                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/categories-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: { "brandIds": [1] }

                }).success(function(data){
                    vm.categories = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                    vm.brand[ids] = [
                        {
                            "id": "1",
                            "name": "new business"
                        },
                        {
                            "id": "2",
                            "name": "New business 2"
                        }
                        ];

                console.log(vm.brand);
                });
            }

            vm.categoriesByIds = function(ids) {
                vm.category[ids] = {};

                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/categories-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: { "brandId":"1", "categoryId": "4" }

                }).success(function(data){
                    vm.categories = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                    vm.category[ids] = [{
                            "id": "24",
                            "name": "PODNIKATELIA"
                        },
                        {
                            "id": "10",
                            "name": "Privát - ostatné"
                        },
                        {
                            "id": "33",
                            "name": "Intervencia-podn"
                        },
                        {
                            "id": "6",
                            "name": "MTPL"
                        },
                        {
                            "id": "44",
                            "name": "Intervencia privat"
                        }
                        ];

                console.log(vm.category);
                });
            }

            vm.typesByIds = function(ids) {
                vm.type[ids] = {};
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/types-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: ids
                }).success(function(data){
                    vm.types = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                    vm.type[ids] = [{
                            "id": "341",
                            "name": "Doklady o nadobudnutí veci"
                        },
                        {
                            "id": "380",
                            "name": "Nadobúd. doklady k MV (nadšt.)"
                        },
                        {
                            "id": "351",
                            "name": "Schválenie zľavy"
                        },
                        {
                            "id": "370",
                            "name": "Dohoda o uznaní záväzku"
                        },
                        {
                            "id": "361",
                            "name": "Podiel"
                        },
                        {
                            "id": "371",
                            "name": "Doplň. dotazník pre poisteného"
                        },
                        {
                            "id": "384",
                            "name": "Preberaci protokol od vozidla"
                        },
                        {
                            "id": "358",
                            "name": "Žiadanka na storno starej PZ"
                        }];
                console.log(vm.type)
                });
            }

            vm.category = {};
            vm.brand = {};
            vm.type = {};

            vm.attachmentsForm = [{name: 'form1', id: 1}];
  
            vm.addNewForm = function() {
                vm.formNumber = vm.formNumber +1;
                var newItemNo = vm.formNumber;
                vm.attachmentsForm.push({'name':'form'+newItemNo, id: newItemNo});
            };
                
            vm.removeForm = function(objId) {
                for(var i = 0; i < vm.attachmentsForm.length; i++) {
                    var obj = vm.attachmentsForm[i];

                    if(obj.id == objId) {
                        vm.attachmentsForm.splice(i, 1);
                    }
                }
            };

            vm.takePicture = function (objId) {
                if (isWebView == false && isIPad == false && isIOS == false && isAndroid == false &&  isWindowsPhone == false ) {
                    alert('only on mobile devices');
                    return
                } 
                                
                var options = {
                    fileName: 'image.png',
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    // console.log('image: ', imageURI);
                    
                    vm.fileName[objId] = options.fileName;
                    
                    
                }, function (err) {
                    // error
                });
            }
            vm.choosePhoto = function () {
               if (isWebView == false && isIPad == false && isIOS == false && isAndroid == false &&  isWindowsPhone == false ) {
                    alert('only on mobile devices');
                    return
                } 
                
                var options = {
                    fileName: 'image.png',
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                
                $cordovaCamera.getPicture(options).then(function (imageURI) {
                    // console.log('image: ', imageURI);
                    
                }, function (err) {
                    // An error occured. Show a message to the user
                });
            }


            vm.submit = function () {
                var dataResult = {
                    forms: vm.attachmentsForm,
                    pzNumber: vm.pzNumber,
                    npzNumber: vm.npzNumber,
                    ziadanka: vm.ziadanka,
                    
                };
                vm.dataResult = dataResult;
                dataService.postData(dataResult);
            }
        })
})();
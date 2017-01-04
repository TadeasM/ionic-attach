(function () {

    'use strict';

    angular
        .module('starter')
        .controller('attachmentCtrl', function (dataService, $http, $timeout, $scope, $location) {
            var vm = this;
            vm.mobileImages = [];
            vm.maxAttachments = 3;
            vm.maxSize = 60;
            vm.cameraShow = false;
            vm.setAttachCount = 1;
            vm.attachmentsForm = [];

            // url Params set forms
            var urlParams = $location.search();
            if(urlParams.pz) {
                vm.pzNumber = urlParams.pz;
            } else {
                vm.pzNumber = 123;
            }
            if(urlParams.npz) {
                vm.npzNumber = urlParams.npz;
            }
            if(urlParams.ziadanka) {
                vm.ziadanka = urlParams.ziadanka;
            }
            if(urlParams.quantity) {
                vm.formNumber = urlParams.quantity;
                for (var i = 0; i < vm.formNumber; i++) {
                    vm.attachmentsForm.push({name: 'form'+i, id: i})   
                }
            } else {
                vm.formNumber = 3;
                for (var i = 0; i < vm.formNumber; i++) {
                    vm.attachmentsForm.push({name: 'form'+i, id: i})   
                }
            }

            // ionic mobile od desktop
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
            
            // attachment forms
            // vm.attachmentsForm = [{name: 'form1', id: 1}];
  
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
            // init function to get brands object
            vm.init = function(ids) {

                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/brand-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    }
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

            // get categories object
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

            // get types object
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

            // to work with mobile file input
            // $scope.file_changed = function(element, id) {
                
            //     console.log(element, id);
            // $scope.$apply(function(scope) {
            //     var photofile = element.files[0];
            //     var reader = new FileReader();
            //     reader.onload = function(e) {
            //         // handle onload
            //         console.log('image', e);
            //     };
            //     reader.readAsDataURL(photofile);
            //     console.log('image2: ', photofile);
            //     vm.mobileImages.push(photofile);
            //     });
            // };

            // webcam on desktop
            vm.showCam = function() {
            vm.cameraShow = true;
            Webcam.set({
                width: 320,
                height: 240,
                dest_width: 640,
                dest_height: 480,
                image_format: 'jpeg',
                jpeg_quality: 90,
                force_flash: false,
                flip_horiz: false,
                fps: 45,
                upload_name: 'webcamImage'
            });
            var camera = document.getElementById('my_camera');
            var result = document.getElementById('my_result');
            Webcam.attach(camera);
            }

            vm.snapshot = function () {
                console.log('camera works');
                Webcam.snap( function(data_uri) {
                    result.innerHTML = '<img src="'+data_uri+'"/>';
                } );
            }
            vm.addWebcamImage = function () {
                vm.cameraShow = false;
            }
            
            // submit form
            vm.submit = function () {
                vm.fileSize = 0;
                vm.mb = 1000000;
                vm.dataResult = {
                    forms: vm.attachmentsForm,
                    pzNumber: vm.pzNumber,
                    npzNumber: vm.npzNumber,
                    ziadanka: vm.ziadanka,
                    mobileImages: vm.mobileImages
                };
                console.log(vm.dataResult);
                
                // file size validation 
                if (vm.isDesktop) {
                    for (var i = 0; i < vm.attachmentsForm.length; i++) {
                        var element = vm.attachmentsForm[i].file;
                        vm.fileSize += element[i+1].size;
                        
                        console.log('element: ', element);
                        console.log('file: ', vm.fileSize);
                        
                    }
                console.log(vm.fileSize / vm.mb);
                vm.fileSize = vm.fileSize / vm.mb;

                // if total size is bigger show alert otherwise post method
                if (vm.fileSize > vm.maxSize) {
                    alert('presahuje 60mb');
                } else {
                dataService.postData(vm.dataResult);
                }
                }
            }
        })
})();
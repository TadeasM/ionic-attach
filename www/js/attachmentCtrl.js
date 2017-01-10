(function () {

    'use strict';

    angular
        .module('starter')
        .controller('attachmentCtrl', attachmentCtrl);

         function attachmentCtrl(dataService, $http, $timeout, $scope, $location) {
            var vm = this;
            vm.maxAttachments = 3;
            vm.maxSize = 60;
            vm.cameraShow = false;
            vm.setAttachCount = 2;
            vm.attachmentsForm = [];
            vm.webcamImages = [];
                                console.log(vm.maxAttachments);

            // get attachment setup
            vm.getInitSetup = function() {
                $http({
                    method: 'GET',
                    url: '/amc-rest-api/attachments-api/settings',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                }).success(function(data){
                    vm.initSetup = data;
                    vm.maxAttachments = vm.initSetup.maxAttachmentsCount;
                    vm.maxSize = vm.initSetup.maxAttachmentsSizeInMB;
                }).error(function(e){
                    console.log("error", e);
                    vm.attachmentSetup = {
                        "maxAttachmentsSizeInMB": 1,
                        "maxAttachmentsCount": 2
                        }
                    vm.maxAttachments = vm.attachmentSetup.maxAttachmentsCount;
                    vm.maxSize = vm.attachmentSetup.maxAttachmentsSizeInMB;
                    console.log(vm.maxAttachments);
                });
            }
            vm.getInitSetup();


            // url Params set forms
            vm.urlParams = $location.search();
            if(vm.urlParams.pz) {
                vm.pzNumber = vm.urlParams.pz;
            } else {
                vm.pzNumber = 123;
            }
            if(vm.urlParams.npz) {
                vm.npzNumber = vm.urlParams.npz;
            }
            if(vm.urlParams.ziadanka) {
                vm.ziadanka = vm.urlParams.ziadanka;
            }
            if(vm.urlParams.quantity) {
                vm.formNumber = vm.urlParams.quantity;
                for (var i = 1; i <= vm.formNumber; i++) {
                    vm.attachmentsForm.push({name: 'form'+i, id: i})
                }
            } else {
                vm.formNumber = 2;
                for (var i = 1; i <= vm.formNumber; i++) {
                    vm.attachmentsForm.push({name: 'form'+i, id: i})
                }
            }

            // ionic mobile or desktop
            vm.isWebView = ionic.Platform.isWebView();
            vm.isIPad = ionic.Platform.isIPad();
            vm.isIOS = ionic.Platform.isIOS();
            vm.isAndroid = ionic.Platform.isAndroid();
            vm.isWindowsPhone = ionic.Platform.isWindowsPhone();
            vm.currentPlatform = ionic.Platform.platform();

            if (vm.isWebView == false && vm.isIPad == false && vm.isIOS == false && vm.isAndroid == false &&  vm.isWindowsPhone == false ) {
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

                    if(obj.name == objId) {
                        vm.attachmentsForm.splice(i, 1);
                    }
                }
            };
            // init function to get brands object
            vm.brandsByIds = function(ids) {
                vm.brand[ids] = {};
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/brand-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    }
                }).success(function(data){
                    vm.brand[ids] = data;
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


                }).finally(function () {
                    if (vm.urlParams['brand'+ids]) {
                    console.log('finaly');
                    // set brand
                    vm.attachmentsForm[ids-1].brand = vm.urlParams['brand'+ids];
                    vm.categoriesByIds(ids, vm.attachmentsForm[ids-1].brand, true);
                    }
                });
            }

            // get categories object
            vm.categoriesByIds = function(ids, value, onInit) {
                console.log('categories');
            console.log(ids, value);
            vm.category[ids] = {};

                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/categories-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: { "brandId": value }

                }).success(function(data){
                    vm.category[ids] = data;
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


                }).finally(function () {
                    if(onInit) {
                        console.log('onInit category');
                        vm.attachmentsForm[ids - 1].category = vm.urlParams['category' + ids];
                        vm.typesByIds(ids, vm.attachmentsForm[ids - 1].category, true);
                    }
                });
            }

            // get types object
            vm.typesByIds = function(ids, value, onInit) {
                vm.type[ids] = {};
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/types-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: { "categoryId": value }
                }).success(function(data){
                    vm.type[ids] = data;
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
                console.log(vm.type);


                }).finally(function () {
                    if(onInit) {
                        console.log('onInit type');
                        vm.attachmentsForm[ids - 1].type = vm.urlParams['type' + ids];
                    }
                });
            }

            vm.category = [];
            vm.brand = [];
            vm.type = [];

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
            var result;
            var formId;
            var formName;
            var webcamImage;
            var dataUri;
            vm.hideCam = function() {
                vm.cameraShow = false;
                result.innerHTML = '';
            }
            vm.showCam = function(id, name) {
                formId = id;
                formName = name;
                console.log('formId: ', formId, formName);

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
            result = document.getElementById('my_result');
            Webcam.attach(camera);
            }

            vm.snapshot = function () {
                console.log('camera works');
                Webcam.snap( function(data_uri) {
                    dataUri = data_uri;
                    result.innerHTML = '<img src="'+data_uri+'"/>';
                } );
                webcamImage = 'webcamImage' + formId + '.jpg'
            }
            vm.addWebcamImage = function () {
                for (var i = 0; i < vm.webcamImages.length; i++) {
                    var element = vm.webcamImages[i];
                    if(webcamImage == element.fileName) {
                        vm.webcamImages.splice(i,1)

                    }
                }
                vm.webcam['form' + formId] = webcamImage;
                vm.webcamImages.push( {file: formName, fileName: webcamImage, dataUri: dataUri});
                console.log(vm.webcamImages);
                console.log(vm.attachmentsForm);

                result.innerHTML = '';
                console.log('close');
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
                    webcam: vm.webcamImages
                };
                console.log(vm.dataResult);

                // file size validation
                for (var i = 0; i < vm.attachmentsForm.length; i++) {
                    if (vm.attachmentsForm[i].file) {
                    var element = vm.attachmentsForm[i].file.size;
                    vm.fileSize += element;
                    console.log('el: ', vm.fileSize);
                    }
                }

                console.log(vm.fileSize / vm.mb);
                vm.fileSize = vm.fileSize / vm.mb;

                // if total size is bigger show alert otherwise post method
                if (vm.fileSize > vm.maxSize) {
                    alert('Velikost priloh presahuje ' + vm.maxSize + 'mb');
                } else {
                dataService.postData(vm.dataResult);
                }
            }
        }
})();
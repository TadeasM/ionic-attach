(function () {

    'use strict';

    angular
        .module('starter')
        .service('dataService', function($http) {
            var vm = this;
            
            // Send whole formular 
            vm.postData = function(form) {

                // map data to formData object
                var formData = new FormData(form);
                var fd = new FormData();
                fd.append('cisloPz', form.pzNumber);
                fd.append('cisloNpz', form.npzNumber);
                fd.append('ziadanka', form.ziadanka);
                fd.append('subor1', form.forms[0].file);
                fd.append('subor2', form.webcam[0])

                console.log('http data: ', formData, fd, form);
                $http({
                    method: 'POST',
                    url: 'http://private-f98e00-penati1.apiary-mock.com/api/v1/upload', //testing URL
                    headers: {
                        'Content-Type': undefined,
                        'PrincipalId': 'hudak',
                    },
                    transformRequest: angular.identity,
                    data: fd
                }).success(function(data){
                    return data
                }).error(function(e){
                    console.log("error", e);
                    
                });
            }

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
                    return data
                }).error(function(e){
                    console.log("error", e);
                    vm.attachmentSetup = {
                        "maxAttachmentsSizeInMB": 50,
                        "maxAttachmentsCount": 2
                        }
                });
            }
            // BRANDS
            // get brands by ids
            vm.brandsByIds = function(ids) {
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/brands-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: ids
                }).success(function(data){
                    vm.brands = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                });
            }
            // get brands by module code
            vm.brandsByModuleCode = function(moduleCode) {
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/brands-by-module-code',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: formdata
                }).success(function(data){
                    vm.brands = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                });
            } // END BRANDS

            // CATEGORIES
            // get categories by ids
            vm.categoriesByIds = function(ids) {
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/categories-by-ids',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: ids
                }).success(function(data){
                    vm.categories = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                });
            }
            // get categories by module code
            vm.categoriesByModuleCode = function(moduleCode) {
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/categories-by-module-code',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: formdata
                }).success(function(data){
                    vm.categories = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                });
            } // END CATEGORIES

            // TYPES
            // get types by ids
            vm.typesByIds = function(ids) {
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
                });
            }
            // get types by module code
            vm.typesByModuleCode = function(moduleCode) {
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/params/types-by-module-code',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: formdata
                }).success(function(data){
                    vm.types = data;
                    return data
                }).error(function(e){
                    console.log("error", e);
                });
            }
            // END TYPES
            
            
        });
})();

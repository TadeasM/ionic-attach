(function () {

    'use strict';

    angular
        .module('starter')
        .service('dataService', function($http) {
            var vm = this;
            
            // Send whole formular 
            vm.postData = function(formdata) {
                console.log('http data: ', formdata);
                $http({
                    method: 'POST',
                    url: '/amc-rest-api/attachments-api/upload',
                    headers: {
                        'PrincipalId': 'hudak',
                    },
                    data: formdata
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

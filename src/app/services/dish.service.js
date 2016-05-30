(function () {
  'use strict';
 
  angular
    .module('bonappettit')
    .factory('DishService', DishService);
 
  DishService.$inject = ['$http','$log','Restangular'];

  function DishService($http, $log, Restangular) {
    var url = "http://localhost:8080/bonappettit-neo4j/rest/dishes/";
    var service = {};
    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;
    service.AddCharacteristic = AddCharacteristic;
    service.RemoveCharacteristic = RemoveCharacteristic;
    service.Rate = Rate;
 
    return service;

    function GetAll() {
      return $http({
        method: 'GET',
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError('Error al obtener los platillos'));
    }

    function GetById(id) {
      return $http({
        method: 'GET',
        url: url + id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError('Error al obtener el platillo '+id));
    }

    function Create(dish) {
      return $http({
        method: 'POST',
        url: url,
        data: $.param({name: dish.name, description: dish.description, picture: dish.picture, userId: dish.user}),
        dataType: "json",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(handleSuccess, handleError('Error creating dish'));
    }

    function Update(dish) {
      return $http({
        method: 'PUT',
        url: url,
        data: $.param({name: dish.name, description: dish.description, picture: dish.picture}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError('Error updating dish'));
    }

    function Delete(id) {
      return $http({
        method: 'DELETE',
        url: url + id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError('Error deleting dish'));
    }

    function AddCharacteristic(idDish,characteristic){
      return $http({
        method: 'POST',
        url: url + 'characteristics/',
        data: $.param({idDish: idDish, idCategory: characteristic}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError('Error updating characteristics'));
    }

    function RemoveCharacteristic(idDish,characteristic){
      return $http({
        method: 'POST',
        url: url + 'characteristics/delete/',
        data: $.param({idDish: idDish, idCategory: characteristic}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError('Error updating characteristics'));
    }

    function Rate(idDish, value){
      return $http({
        method: 'POST',
        url: url + 'rate/',
        data: $.param({idDish: idDish, rating: value}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(handleSuccess, handleError("Error al evaluar el platillo"));
    }

    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return { success: false, message: error };
      };
    }
  }
 
})();
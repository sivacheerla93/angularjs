var app = angular
    .module("Demo", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider
            .when("/home", {
                templateUrl: "templates/home.html",
                controller: "homeController"
            })
            .when("/courses", {
                templateUrl: "templates/courses.html",
                controller: "coursesController"
            })
            .when("/students", {
                templateUrl: "templates/students.html",
                controller: "studentsController"
            })
            .when("/students/:id", {
                templateUrl: "templates/studentDetails.html",
                controller: "studentDetailsController"
            })
            .when("/studentsSearch/:name?", {
                templateUrl: "templates/studentsSearch.html",
                controller: "studentsSearchController",
                controllerAs: "studentsSearchCtrl"

            })

            .otherwise({
                redirectTo: "/home"
            })
    })
    .controller("homeController", function ($scope) {
        $scope.message = "Home Page";
    })
    .controller("coursesController", function ($scope) {
        $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server"];
    })
    .controller("studentsController", function ($scope, $route, $location) {

        var vm = this;

        $scope.$on("$routeChangeStart", function (event, next, current) {
            if (!confirm("Are you sure you want to navigate away from this page to " +
                    next.$$route.originalPath)) {
                event.preventDefault();
            }
        });

        vm.studentSearch = function () {
            if (vm.name)
                $location.url("/studentsSearch/" + vm.name)
            else
                $location.url("/studentsSearch")
        }

        vm.reloadData = function () {
            $route.reload();
        }

        vm.students = [{
            id: 101,
            name: "Siva Cheerla",
            city: "Rajahmundry",
            state: "AP"
        }, {
            id: 102,
            name: "Pedda Reddy",
            city: "Rajahmundry",
            state: "AP"
        }];
    })
    .controller("studentDetailsController", function ($scope, $routeParams) {
        var id = $routeParams.id;
        if (id == 101) {
            $scope.student = {
                id: 101,
                name: "Siva Cheerla",
                city: "Rajahmundry",
                state: "AP"
            };
        } else if (id == 102) {
            $scope.student = {
                id: 102,
                name: "Pedda Reddy",
                city: "Rajahmundry",
                state: "AP"
            };
        }
    })
    .controller("studentsSearchController", function ($http, $routeParams) {
        var vm = this;

        if ($routeParams.name) {
            vm.students = [{
                id: 101,
                name: "Siva Cheerla",
                city: "Rajahmundry",
                state: "AP"
            }, {
                id: 102,
                name: "Pedda Reddy",
                city: "Rajahmundry",
                state: "AP"
            }];
        } else {
            vm.students = [{
                id: 101,
                name: "Siva Cheerla",
                city: "Rajahmundry",
                state: "AP"
            }, {
                id: 102,
                name: "Pedda Reddy",
                city: "Rajahmundry",
                state: "AP"
            }];
        }
    })
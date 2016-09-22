Iris
    .config(($routeProvider) => {
        $routeProvider
            .when('/', {
                controller: 'ChartsCtrl',
                templateUrl: 'dashboard/partials/charts.html'
            })
            .when('/charts', {
                controller: 'ChartsCtrl',
                templateUrl: 'dashboard/partials/charts.html'
            })
            .when('/calendar', {
                controller: 'CalendarCtrl',
                templateUrl: 'dashboard/partials/calendar.html'
            })
    })

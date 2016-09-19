Iris
    .config(($routeProvider) => {
        $routeProvider
            .when('/', {
                controller: 'ChartsCtrl',
                templateUrl: 'dashboard/partials/charts.html'
            })
    })

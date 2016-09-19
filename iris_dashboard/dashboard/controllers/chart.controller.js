Iris
    .controller('ChartsCtrl', [
        '$scope',
        '$http',
        '$timeout',
        'RootFactory',
    function($scope, $http, $timeout, RootFactory){
        $scope.title = "Charts";
        // $scope.moistureDates = null;
        // $scope.temperatureDates = null;
        // $scope.lightDates = null;

        RootFactory.getApiRoot()
            .then(
            root => {
                $http.get(`${root.moisture}`)
                    .then(res => {
                        console.log("moisture res: ", res.data );
                        $scope.moisture = res.data
                        $scope.moistureDates = getLabels(res.data)
                        console.log("moistureDates", $scope.moistureDates)
                });
                $http.get(`${root.temperature}`)
                    .then(res => {
                        console.log("temperature res: ", res.data );
                        $scope.temperature = res.data
                        $scope.temperatureDates = getLabels(res.data)
                    });
                $http.get(`${root.light}`)
                    .then(res => {
                        console.log("light res: ", res.data );
                        $scope.light = res.data
                        $scope.lightDates = getLabels(res.data)
                    });
            $timeout();
          },
          err => console.log('error', err)
          ).then(
            $timeout //forces scope apply to DOM - reapply everything
          );

        function stringToDate(s)  {
            s = s.split(/[-:TZ]/);
            return new Date(s[0], s[1]-1, s[2], s[3], s[4], s[5]).toLocaleDateString();
        }

        function getLabels(sensorEvents) {
            sensorDate = []
            console.log("sensor Events", sensorEvents)
            sensorEvents.forEach((item) => {
                sensorDate.push(stringToDate(item.published_date))
            })
            return sensorDate;
        }

        let ctx = document.getElementById("myChart");

        var data = {
            labels: $scope.moistureDates,
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        };

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            // options: options,
        });


        // let ctxs = document.getElementById("myCharts");
        //
        // var datas = {
        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
        //     datasets: [
        //         {
        //             label: "My First dataset",
        //             fill: false,
        //             lineTension: 0.1,
        //             backgroundColor: "rgba(75,192,192,0.4)",
        //             borderColor: "rgba(75,192,192,1)",
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: "rgba(75,192,192,1)",
        //             pointBackgroundColor: "#fff",
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //             pointHoverBorderColor: "rgba(220,220,220,1)",
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: [65, 59, 80, 81, 56, 55, 40],
        //             spanGaps: false,
        //         }
        //     ]
        // };
        //
        // var myLineCharts = new Chart(ctxs, {
        //     type: 'line',
        //     data: datas,
        //     // options: options,
        // });

    }]);


// example light sensor response
// [{"id":1,"device_id":"270023001847353236343033","event_type":"Light","published_date":"2016-09-15T14:26:53.891000Z","light_value":"3773"},{"id":2,"device_id":"270023001847353236343033","event_type":"Light","published_date":"2016-09-15T14:26:53.891000Z","light_value":"3773"}]

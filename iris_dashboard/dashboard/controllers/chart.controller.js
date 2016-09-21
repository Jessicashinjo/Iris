Iris
    .controller('ChartsCtrl', [
        '$scope',
        '$http',
        '$timeout',
        'RootFactory',
    function($scope, $http, $timeout, RootFactory){
        $scope.title = "Charts";

        RootFactory.getApiRoot()
            .then(
            root => {
                $http.get(`${root.moisture}`)
                    .then(res => {
                        // console.log("moisture res: ", res.data );
                        $scope.moisture = res.data;
                        $scope.moistureDates = getLabels(res.data);
                        $scope.moistureValues = getMoistureValues(res.data);
                        moistureChart();
                        // console.log("moistureDates", $scope.moistureDates);
                        // console.log("moistureValues", $scope.moistureValues);
                });
                $http.get(`${root.temperature}`)
                    .then(res => {
                        // console.log("temperature res: ", res.data );
                        $scope.temperature = res.data
                        $scope.temperatureDates = getLabels(res.data)
                        $scope.temperatureValues = getTemperatureValues(res.data);
                        temperatureChart();
                    });
                $http.get(`${root.light}`)
                    .then(res => {
                        // console.log("light res: ", res.data );
                        $scope.light = res.data
                        $scope.lightDates = getLabels(res.data)
                        $scope.lightValues = getLightValues(res.data);
                        lightChart();
                        // console.log("light values", $scope.lightValues)
                    });
            $timeout();
          },
          err => console.log('error', err)
          ).then(
            $timeout //forces scope apply to DOM - reapply everything
          );

        // Takes a full date with YY/MM/DD T HH/MM/SS Z and converts it to
        // MM/DD/YY format
        function stringToDate(s)  {
            s = s.split(/[-:TZ]/);
            return new Date(s[0], s[1]-1, s[2], s[3], s[4], s[5]).toLocaleDateString();
        }

        // Takes the date for each sensor event, checks to see if it's in array
        // if not the date is pushed to the array and then returns the array
        function getLabels(sensorEvents) {
            sensorDate = []
            console.log("sensor Events", sensorEvents)
            sensorEvents.forEach((item) => {
                // if (sensorDate.find(() => item) === undefined){
                    sensorDate.push(stringToDate(item.published_date))
                // }
            })
            return sensorDate;
        }

        function getMoistureValues(sensorEvents) {
            sensorValues = []
            sensorEvents.forEach((item) => {
                sensorValues.push(item.moisture_value)
            })
            return sensorValues
        }
        function getTemperatureValues(sensorEvents) {
            sensorValues = []
            sensorEvents.forEach((item) => {
                sensorValues.push(item.temperature_value)
            })
            return sensorValues
        }
        function getLightValues(sensorEvents) {
            sensorValues = []
            sensorEvents.forEach((item) => {
                sensorValues.push(item.light_value)
            })
            return sensorValues
        }

        // Displays a chart documenting Moisture values/day using ChartJS
        function moistureChart() {
            var ctx = document.getElementById("moistureChart");
            var data = {
                // Unique dates for sensor events
                labels: $scope.moistureDates,
                datasets: [
                    {
                        label: "Moisture Value",
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
                        pointRadius: 3,
                        pointStyle: 'circle',
                        pointHitRadius: 10,
                        data: $scope.moistureValues,
                        spanGaps: false,
                    }
                ]
            };


            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                // options: options,
            });
        }

        function temperatureChart() {
            var ctx = document.getElementById("temperatureChart");
            var data = {
                // Unique dates for sensor events
                labels: $scope.temperatureDates,
                datasets: [
                    {
                        label: "Temperature Value",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(79, 224, 189, 0.4)",
                        borderColor: "rgba(34, 210, 88, 1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(34, 210, 88, 1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(34, 210, 88, 1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointStyle: 'circle',
                        pointHitRadius: 10,
                        data: $scope.temperatureValues,
                        spanGaps: false
                    }
                ]
            };


            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                // options: options,
            });
        }
        function lightChart() {
            var ctx = document.getElementById("lightChart");
            var data = {
                // Unique dates for sensor events
                labels: $scope.lightDates,
                datasets: [
                    {
                        label: "Light Value",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(249, 131, 9, 0.78)",
                        borderColor: "rgba(249, 131, 9, 1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(249, 131, 9, 1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(249, 131, 9, 1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointStyle: 'circle',
                        pointHitRadius: 10,
                        data: $scope.lightValues,
                        spanGaps: false,
                    }
                ]
            };


            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                // options: options,
            });
        }




    }]);


// example light sensor response
// [{"id":1,"device_id":"270023001847353236343033","event_type":"Light","published_date":"2016-09-15T14:26:53.891000Z","light_value":"3773"},{"id":2,"device_id":"270023001847353236343033","event_type":"Light","published_date":"2016-09-15T14:26:53.891000Z","light_value":"3773"}]

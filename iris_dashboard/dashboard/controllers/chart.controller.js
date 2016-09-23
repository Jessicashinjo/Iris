Iris
    .controller('ChartsCtrl', [
        '$scope',
        '$http',
        '$timeout',
        'RootFactory',
    function($scope, $http, $timeout, RootFactory){
        $scope.title = "Sensor Data";

        RootFactory.getApiRoot()
            .then(
            // root is an object with each sensor url & notes as a key
            root => {
                $http.get(`${root.moisture}`)
                    .then(res => {
                        $scope.moisture = res.data;
                        // populates the labels for the moisture chart
                        $scope.moistureDates = getLabels(res.data);
                        // populates chart with moisture value readings
                        $scope.moistureValues = getMoistureValues(res.data);
                        // creates moisture chart
                        moistureChart();
                });
                $http.get(`${root.temperature}`)
                    .then(res => {
                        $scope.temperature = res.data
                        // populates the labels for the temperature chart
                        $scope.temperatureDates = getLabels(res.data)
                        // populates chart with temperature value readings
                        $scope.temperatureValues = getTemperatureValues(res.data);
                        // creates temperature chart
                        temperatureChart();
                    });
                $http.get(`${root.light}`)
                    .then(res => {
                        $scope.light = res.data
                        // populates the labels for the light chart
                        $scope.lightDates = getLabels(res.data)
                        // populates chart with light value readings
                        $scope.lightValues = getLightValues(res.data);
                        // creates light chart
                        lightChart();
                    });
            $timeout();
          },
          err => console.log('error', err)
          )

        // Takes a full date with YY/MM/DD T HH/MM/SS Z and converts it to
        // MM/DD/YY format
        function stringToDate(date_string)  {
            let ds = date_string.split(/[-:TZ]/);
            return new Date(ds[0], ds[1]-1, ds[2],
                            ds[3], ds[4], ds[5])
                            .toLocaleDateString();
        }

        // Takes the date for each sensor event and puts it into an array
        function getLabels(sensorEvents) {
            sensorDate = []
            sensorEvents.forEach((item) => {
                sensorDate.push(stringToDate(item.published_date))
            })
            return sensorDate;
        }

        // Gets values from sensor and puts it into an array to be populated
        // as chart values
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
            let ctx = document.getElementById("moistureChart");
            let data = {
                // Dates for sensor events
                labels: $scope.moistureDates,
                // All of the information needed to produce 1 line for the chart
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

            // displays chart canvas
            let myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
            });
        }

        // Displays a chart documenting Temperature values/day using ChartJS
        function temperatureChart() {
            let ctx = document.getElementById("temperatureChart");
            let data = {
                // dates for sensor events
                labels: $scope.temperatureDates,
                // All of the information needed to produce 1 line for the chart
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

            // displays chart canvas
            let myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
            });
        }

        // Displays a chart documenting Light values/day using ChartJS
        function lightChart() {
            let ctx = document.getElementById("lightChart");
            let data = {
                // dates for sensor events
                labels: $scope.lightDates,
                // All of the information needed to produce 1 line for the chart
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

            // displays chart canvas
            let myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
            });
        }




    }]);

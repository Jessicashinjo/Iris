Iris
    .factory('RootFactory', ($http, $timeout, irisAPIUrl) => {
        let httpGet = $http.get(irisAPIUrl);
        return {
            getApiRoot: () => {
                return httpGet.then(res => res.data)
            }
        }
    })

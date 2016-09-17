iris
    .factory('RootFactory', ($http) => {
        let apiRoot = null;
        return {
            getApiRoot: () => {
                if(apiRoot !== null){
                    return $timeout().then(() => apiRoot);
                } else {
                return $http.get(`${irisAPIUrl}`)
                    .then((res) => {
                        // console.log(res.data)
                        apiRoot = res.data;
                        return apiRoot;
                })
            }
        }
    }}

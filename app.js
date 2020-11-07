console.log('App loaded');
const countryList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Botswana", "Brazil", "Bulgaria", "Burundi", "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Nicaragua", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru", "Poland", "Portugal", "Qatar", "Romania", "Rwanda", "Senegal", "Serbia", "Seychelles", "Singapore", "Slovakia", "Slovenia", "Somalia", "Spain", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tunisia", "Turkey", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Yemen", "Zambia", "Zimbabwe",
];

var app = angular.module('myApp', []);
app.controller('myCtrl', async function($scope, $http) {
    $scope.tableData = [];
    $scope.chartRecoveredData = [];
    await $http.get('https://covid19.mathdro.id/api/recovered').then(function(response) {
        $scope.chartRecoveredData = response.data;
        $scope.chartRecoveredData.splice(0, 1)
        $scope.chartRecoveredData.length = 10;
        console.log('$scope.chartRecoveredData: ', $scope.chartRecoveredData);
    }, function(error) {
        console.error('Error in fetching data: ', error)
    });



    //bar chart
    var ctx = document.getElementById("barChart");
    if (ctx) {
        ctx.height = 200;
        var myChart = new Chart(ctx, {
            type: 'bar',
            defaultFontFamily: 'Poppins',
            data: {
                labels: $scope.chartRecoveredData.map(element => { return element.combinedKey }),
                datasets: [{
                        label: "Recovered",
                        data: $scope.chartRecoveredData.map(element => { return element.recovered }),
                        borderColor: "rgba(0, 123, 255, 0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(0, 123, 255, 0.5)",
                        fontFamily: "Poppins"
                    },
                    {
                        label: "Deaths",
                        data: $scope.chartRecoveredData.map(element => { return element.deaths }),
                        borderColor: "rgba(0,0,0,0.09)",
                        borderWidth: "0",
                        backgroundColor: "rgba(0,0,0,0.07)",
                        fontFamily: "Poppins"
                    }
                ]
            },
            options: {
                legend: {
                    position: 'top',
                    labels: {
                        fontFamily: 'Poppins'
                    }

                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontFamily: "Poppins"

                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "Poppins"
                        }
                    }]
                }
            }
        });
    }

    for (var i = 0, length1 = countryList.length; i < length1; i++) {
        await $http.get('https://covid19.mathdro.id/api/countries/' + countryList[i]).then(function(response) {
            // console.log('response', response);
            $scope.tableData.push({
                name: countryList[i],
                confirmed: response.data.confirmed.value,
                deaths: response.data.deaths.value,
                recovered: response.data.recovered.value,
                lastUpdate: response.data.lastUpdate
            });
        }, function(error) {
            console.error('Error in fetching data: ', error)
        })
    }


});
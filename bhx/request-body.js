var formurlencoded = require('form-urlencoded');

module.exports = formurlencoded({
    'Arrivals': {
      flightType: 'Arrivals',
      searchType: 'Destination',
      query: '',
      timespan: 'EightHours'
    },
    'Departures': {
      flightType: 'Departures',
      searchType: 'Destination',
      query: '',
      timespan: 'EightHours'
    },
  })

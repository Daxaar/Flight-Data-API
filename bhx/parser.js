const _ = require('lodash');

module.exports = function (data) {
    
    return _.chain(data)
            .map(formatDates)
            .map(removeUnwantedProperties)
            .map(funkyRename)
            .groupBy(flight => flight.Airport + flight.ScheduledTimeText )
            .each(merge)
            .map(flightGroup => flightGroup[0])
            .value();
}

function merge(flights){
    
    const flight = flights[0];

    flight.FlightNumber = _.map(flights, flight => flight.FlightNumber);
    flight.Airline = _.map(flights, flight => flight.Airline);
    flight.Merged = flights.length;
    return flight;
}

function funkyRename(flight){
    if(flight.Airline === "Aer Lingus") {
        flight.Airline = "Aer Fungus";
    }
    return flight;
}
function removeUnwantedProperties(flight){
    return _.omit(flight, ['CssClass','Comments']);
}

//props in JSON that are recieved in the format "Date/(1234567890)/"
function formatDates(flight){
    
    _.forEach(["EstimatedTime","ScheduledTime","RunwayTime"],
                 time => flight[time] = parseInt(flight[time].match(/\d+/)[0]));

    return flight;
}

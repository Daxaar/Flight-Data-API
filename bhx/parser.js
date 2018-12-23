const _ = require('lodash');

module.exports = function (data, include) {

    if(include === "arrivals") {
        delete data["departures"];
    } else if( include === "departures" ) {
        delete data["arrivals"];
    } else {
        throw "Invalid inclusion property passed to parser";
    }

    data[include] =
        _.chain(data[include])
            .map(formatDates)
            .map(removeUnwantedProperties)
            .map(funkyRename)
            .groupBy(flight => flight.Airport + flight.ScheduledTimeText )
            .each(merge)
            .map(flightGroup => flightGroup[0])
            .value();

    return data;
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
    return _.omit(flight, ['CssClass','Comments','BizTweetUrl','BizMessengerUrl']);
}

//Format .NET serialiser Date/(nnn)/ formatted values - Date/(1234567890)/ becomes 1234567890
function formatDates(flight){

    _.forEach(["EstimatedTime","ScheduledTime","RunwayTime"],
                  time => flight[time] = parseInt(flight[time].match(/\d+/)[0]));

    return flight;
}

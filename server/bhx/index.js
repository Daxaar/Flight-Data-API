var request = require('request');
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');
const parse = require('./parser');

var cacheEnabled = false;

var options = {
    uri: 'https://www.birminghamairport.co.uk/Api/FidApi/GetFlights',
    body: require('../bhx/request-body'),
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'
    }
};

const filePath = path.join(process.cwd(), 'cache', 'data.json');
const getSaveFilePath = () => path.join(process.cwd(), 'store', `${new Date().getTime().toString()}.json`);

function readFromCache(alwaysUseCache) {

    if (!cacheEnabled && !alwaysUseCache) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Unable to read file from cache');
            } else {
                resolve(parseCachedFile(data));
            }
        });
    });
}

function parseCachedFile(data) {

    if (data) {
        try {
            data = JSON.parse(data);
            data.source = 'disk';
            return data;
        } catch (error) {
            throw 'Unable to parse JSON received from server ' + error;
        }
    }
}

function getDataFromServer() {

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) { reject('Error in getDataFromServer: ' + error); }
            try {
                var data = JSON.parse(body);
                data.source = 'server';
                if (data.success) {
                    jsonfile.writeFile(filePath, data);
                    jsonfile.writeFile(getSaveFilePath(), data);
                    resolve(data);
                }
            }
            catch (error) {
                reject('Error loading data from server ' + error);
            }
        });
    });
}

function load(alwaysUseCache) {
    return readFromCache(alwaysUseCache)
        .then(data => data || getDataFromServer())
        .then(data => {
            return {
                source: data.source,
                arrivals: data.data.arrivals,
                departures: data.data.departures
            };
        });
}

module.exports = {

    getDepartures: function (alwaysUseCache) {
        return load(alwaysUseCache)
            .then(data => parse(data, 'departures'));
    },

    getArrivals: function (alwaysUseCache) {
        return load(alwaysUseCache)
            .then(data => parse(data, 'arrivals'));
    }

};

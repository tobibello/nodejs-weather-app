const https = require('https');
const http = require('http');
const cityList = require('./city.list.json');
const convertKelvinToCelsius = tempInKelvin => tempInKelvin - 273.15;
const getCityDetailsById = id => cityList.find(city => city.id == id);
const getCityDetailsByName = name => cityList.find(city => city.name.toLowerCase() === name.toLowerCase());
const getCitiesDetails = query => cityList.filter(city => city.name.toLowerCase().includes(query.toLowerCase()));
const getTemperatureInCelsius = cityId => {
  return new Promise((resolve, reject) => {
    http.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=c9e609b530cd52fc386581d1758c15bf`, (res) => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        // consume response data to free up memory
        reject(error);
        res.resume();
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        let parsedData;
        try {
          parsedData = JSON.parse(rawData);
        } catch (e) {
          reject(e);
        }
        resolve(convertKelvinToCelsius(parsedData.main.temp));
      });
    }).on('error', (e) => {
      reject(e);
    });
  });

}
module.exports.getCitiesDetails = getCitiesDetails;
module.exports.getCityDetailsByName = getCityDetailsByName;
module.exports.getCityDetailsById = getCityDetailsById;
module.exports.getTemperatureInCelsius = getTemperatureInCelsius;

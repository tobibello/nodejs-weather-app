const weather = require('./weather');
const print = (name, temp) => console.log(`Current temperature in ${name} is ${Math.round(temp)}C`);

const input = process.argv.slice(2).join(' ');
let city;
if (!isNaN(input)) {
  city = weather.getCityDetailsById(input);
} else {
  city = weather.getCityDetailsByName(input);
}
if (city) {
  weather.getTemperatureInCelsius(city.id).then((temp) => {
    print(city.name, temp);
  }).catch((error) => {
    console.log(error.message);
  });
} else {
  console.log(`${input} is not a valid input.`)
}

// const printObjectProps = (obj, level = 0) => {
//   let message = '';
//   for (let prop in obj) {
//     if (typeof obj[prop] !== 'object') {
//       for (let i = 0; i < level; i++)
//         message += '\t';
//       message += `${prop} : ${Array.isArray(obj[prop]) ? obj[prop].join(', ') : obj[prop]}\n`;
//     } else {
//       message += `${prop} :\n`;
//       message += printObjectProps(obj[prop], ++level);
//     }
//   }
//   return message;
// }

// const search = query => {
//   let city = weather.getCityDetailsByName(query);
//   let message = '';
//   if (city) {
//     console.log(printObjectProps(city));
//   } else {
//     let cities = weather.getCitiesDetails(query);
//     if (cities.length < 1) {
//       console.log('No Result Found...');
//     } else {
//       message = 'Do you mean:\n';
//       cities.forEach((element, i) => {
//         message += `${i + 1}. ${element.name}`;
//       }, this);
//     }
//   }
//   console.log(message);
// }
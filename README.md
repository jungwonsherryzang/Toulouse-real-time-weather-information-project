# Toulouse-real-time-weather-information-project

This project is presenting the real-time weather map of Toulouse city.

I put the weather information based on the bus stop on Toulouse.

## RESOURCES
Use Mapbox for getting API https://www.mapbox.com/ 

Use Toulouse Metropole website for fetching Toulouse Transportation information https://data.toulouse-metropole.fr/pages/accueilv3/

### USAGE
Fetching data from the website by API using Javascrip programming language
```  javascript


fetch('https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=stations-meteo-en-place&rows=54')
.then(response => response.json()) //return a JSON object of the result
.then(processData)
.catch(err => console.error(err));

```

For the pop-up information about the weather, I represented Humidity, Rain and Temperature information!
``` javascript
var popupContent = "<b>" + 
                self.target.station_name + "</b><br/>" +
                "Humidity: "    + record.fields.humidite + "<br/>" +
                "Rain: "        + record.fields.pluie + "<br/>" +
                "Temperature: " + record.fields.temperature_en_degre_c + "<br/>";
```



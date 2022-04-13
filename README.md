# Toulouse-real-time-weather-information-project

Weather is the most important daily information. It could change so easily that we need to get the fastest real-time information. 
This project is presenting the real-time weather map of Toulouse city based on the bus station on Toulouse city.
The bus stations that are listed in the station list file, it should show the real-time humidity, rain and temperature.


## RESOURCES
Use Mapbox for attaining Token: https://www.mapbox.com/ 
Leaflet API References: https://leafletjs.com/SlavaUkraini/reference.html

Use Toulouse Metropole website for fetching Toulouse Transportation information: https://data.toulouse-metropole.fr/pages/accueilv3/

### USAGE
Fetching data from the website by API using Javascrip programming language
```  javascript


fetch('https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=stations-meteo-en-place&rows=54')
  .then(response 
    => response.json()) //return a JSON object of the result
  .then(processData)
  .catch(err 
    => console.error(err));

```

For the pop-up information about the weather, I represented Humidity, Rain and Temperature information!
``` javascript
var popupContent = "<b>" + 
                self.target.station_name + "</b><br/>" +
                "Humidity: "    + record.fields.humidite + "<br/>" +
                "Rain: "        + record.fields.pluie + "<br/>" +
                "Temperature: " + record.fields.temperature_en_degre_c + "<br/>";
```

#### OUTCOME
<img width="811" alt="weathermap_outcome" src="https://user-images.githubusercontent.com/91277856/163258115-86d002e0-77ee-4cf4-a4c2-f5ddb3839a1a.png">

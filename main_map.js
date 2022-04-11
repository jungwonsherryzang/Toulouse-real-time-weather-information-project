var thermometerIcon = L.icon({
    iconUrl: './thermometer.png',
    iconSize:     [38, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var mymap = L.map('mapid').setView([43.565642, 1.480891], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { //
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1Ijoic2hlcnJ5emFuZyIsImEiOiJjbDF1M2FlMmgxN2RyM2pxcTBkbXhheHk4In0.hEmhm8--khHLUqszV-0dFg'
}).addTo(mymap);



fetch('https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=stations-meteo-en-place&rows=54')
.then(response => 
    response.json()) //return a JSON object of the result
.then(processData)
.catch(err => 
    console.error(err));

var baseUrl = "https://data.toulouse-metropole.fr/api/records/1.0/search/?rows=1&sort=record_timestamp&dataset=" //real-time

function onMarkerClick(self) {
    if (!datasets_from_ids[self.target.station_id]) { //target이 선언되는 곳에서 event 발생시킬수있다
        var popupContent = "<b>" + self.target.station_name + "</b><br/>" + "No data available"; 
        self.target.bindPopup(popupContent).openPopup(); //pop up 띄울때사용
    } else {
        fetch(baseUrl + datasets_from_ids[self.target.station_id]) 
        .then(response => 
            response.json()) //return a JSON object of the result
        .then((data) => {
            var record = data.records[0];
            var popupContent = "<b>" + 
                self.target.station_name + "</b><br/>" +
                "Humidity: "    + record.fields.humidite + "<br/>" +
                "Rain: "        + record.fields.pluie + "<br/>" +
                "Temperature: " + record.fields.temperature_en_degre_c + "<br/>";
            self.target.bindPopup(popupContent).openPopup();
        })
        .catch(err => 
            console.error(err));
    }
}

function processData(data){
    var markers = [];

    for(var i = 0; i < data.records.length; i++) {
        var marker = L.marker([data.records[i].fields.latitude, data.records[i].fields.longitude],
                                { icon: thermometerIcon }).addTo(mymap);
        markers.push(marker); //add to arrays
        marker.station_id   = data.records[i].fields.id_numero;
        marker.station_name = data.records[i].fields.id_nom;
        marker.on('click', onMarkerClick);
    }
    L.control.layers([],{'Weather Stations': L.layerGroup(markers).addTo(mymap)}).addTo(mymap);
}

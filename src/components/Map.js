import React, { Component } from "react";
import APICall from "../commonUtils/APICall";
import * as myConstClass from "../commonUtils/Constants";
import DirectionsComponent from "../components/DirectionsComponent";

var directionsRenderer = null;
var directionsService = null;
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directionsInHTMLFormat: [],
    };
    this.getDataFromDirectionsAPI = this.getDataFromDirectionsAPI.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.directionsInHTMLFormat.length !==
      nextState.directionsInHTMLFormat.length
    );
  }

  getDataFromDirectionsAPI() {
    // We should already have access to window.google obj over here as we're setting in LandingPage.js file.
    var uriParams = [
      {
        key: "origin",
        value: this.props.source,
      },
      {
        key: "destination",
        value: this.props.destination,
      },
      {
        key: "key",
        value: myConstClass.GOOGLE_MAPS_API_KEY,
      },
    ];

    var response = APICall(myConstClass.DIRECTIONS_GOOGLE_MAPS_JSON, uriParams);

    response.then((resp) => {
      var startLat = resp.data.routes[0].legs[0].start_location.lat;
      var startLong = resp.data.routes[0].legs[0].start_location.lng;
      var endLat = resp.data.routes[0].legs[0].end_location.lat;
      var endLong = resp.data.routes[0].legs[0].end_location.lng;

      this.weatherForUniqueCities(resp.data.routes[0].legs[0].steps);

      this.setState({
        directionsInHTMLFormat: this.htmlDirections(
          resp.data.routes[0].legs[0].steps,
          this.props.dateTimeObjectToUnix
        ),
      });
      this.initMap(startLat, startLong, endLat, endLong);
    });
  }


  weatherForUniqueCities(stepsArray) {
    let uniqueCities = [];
    let boxDetails = [];
    var currentTime = this.props.dateTimeObjectToUnix;
    var itemsProcessed = 0;

    stepsArray.forEach((element) => {
      var uriParams = {
        lat: element.end_location.lat,
        lon: element.end_location.lng,
      };

      // Fetch weather data from your backend
      fetch(
        `http://localhost:5000/weather?lat=${uriParams.lat}&lon=${uriParams.lon}`
      )
        .then((response) => response.json())
        .then((respFromWeather) => {
          itemsProcessed++;

          if (
            !!respFromWeather &&
            !!respFromWeather.city &&
            !uniqueCities.includes(respFromWeather.city.name)
          ) {
            uniqueCities.push(respFromWeather.city.name);

            currentTime = currentTime + element.duration.value; // This is from google maps for each leg in seconds

            for (var j = 0; j < respFromWeather.list.length; j++) {
              var ele = respFromWeather.list[j];

              if (currentTime < ele.dt) {
                boxDetails.push({
                  cityLat: respFromWeather.city.coord.lat,
                  cityLong: respFromWeather.city.coord.lon,
                  city: respFromWeather.city.name,
                  conditions: ele.weather[0].description,

                  // 300K × 9/5 - 459.67 = 80.33 °F
                  temperature: `${Math.round(
                    ele.main.temp
                    //((ele.main.temp - 273.15) * 9) / 5 + 32
                  )}°c`,

                  weatherIcon: `https://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`,
                });
                break;
              }
            }
          }

          if (itemsProcessed === stepsArray.length) {
            this.setMarkers(window.map, boxDetails);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    });
  }

  setMarkers(map, details) {
    for (var h = 0; h < details.length; h++) {
      var forecastChoice = new window.google.maps.LatLng(
        details[h].cityLat,
        details[h].cityLong
      );
      new window.google.maps.Marker({
        position: forecastChoice,
        map: map,
        // icon: details[h].weatherIcon,
        icon: {
          url: details[h].weatherIcon, // URL of the weather icon (from OpenWeatherMap API)
          size: new window.google.maps.Size(40, 40), // Size of the icon (width x height)
          scaledSize: new window.google.maps.Size(40, 40), // Scaled size to make the icon appear smaller or larger
        },
        label: {
          color: "#00aaff",
          fontWeight: "bold",
          fontSize: "14px",
          text: details[h].temperature,
        },
        size: (20, 20),
      });
    }
  }

  htmlDirections(stepsArray, dateTimeObjectToUnix) {
    let arrayToReturn = [];
    stepsArray.forEach((element) => {
      dateTimeObjectToUnix += element.duration.value;
      arrayToReturn.push({
        unixTimeStamp: dateTimeObjectToUnix,
        direction: element.html_instructions,
      });
    });

    return arrayToReturn;
  }

  initMap(sourceLat, sourceLong, destLat, destLong) {
    var pointA = new window.google.maps.LatLng(sourceLat, sourceLong);
    var pointB = new window.google.maps.LatLng(destLat, destLong);

    window.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.myOptions
    );

    // One needs to nullify directionsRenderer, as it would NOT AUTOMATICALLY clear previous routes from the map.
    if (directionsRenderer != null) {
      directionsRenderer.setMap(null);
      directionsRenderer = null;
    }

    // Instantiate a directions service.
    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(window.map);

    // get route from A to B
    this.calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      pointA,
      pointB
    );
  }

  calculateAndDisplayRoute(
    directionsService,
    directionsRenderer,
    pointA,
    pointB
  ) {
    directionsService.route(
      {
        origin: pointA,
        destination: pointB,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      function (response, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  render() {
    let { directionsInHTMLFormat } = this.state;

    return (
      <div>
        <div style={{ width: "100%", height: "700px" }} id={this.props.id}>
          {this.getDataFromDirectionsAPI()}
        </div>
        {directionsInHTMLFormat.length > 0 ? (
          <DirectionsComponent
            directionsInHTMLFormat={directionsInHTMLFormat}
          />
        ) : null}
      </div>
    );
  }
}

export default Map;

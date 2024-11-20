// import React, { Component } from "react";

// import Header from "../commonUtils/Header";
// import Map from "../components/Map";
// import * as myConstClass from "../commonUtils/Constants";

// class LandingPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       clientsPosition: { lat: 37.0902, lng: 95.7129 },  // Setting default to load at the center of USA.
//       usersDestionationLocation: null,
//       usersOriginLocation: null,
//       dateTimeObjectToUnix: null
//     };
//     this.buttonClick  = this.buttonClick.bind(this);
//     this.onScriptLoad = this.onScriptLoad.bind(this);
//   }

//   onScriptLoad() {

//     var options = {
//       center: this.state.clientsPosition,
//       zoom: 8,
//     }
//     // Map should be assigned to a window object, as one can't access the map object directly..
//     // HACK: https://stackoverflow.com/questions/10253265/get-google-maps-map-instance-from-a-htmlelement
//     // const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
//     window.Map = new window.google.maps.Map( document.getElementById( myConstClass.GOOGLE_MAPS_ID ), options );
//     // Map is loaded now. It can be accessed via window.google
//   }

//   componentDidMount() {
//     this.clientCoordinates();

//     if (!window.google) {
//       var scriptEle = document.createElement("script");
//       scriptEle.type = "text/javascript";
//       scriptEle.src = `${myConstClass.GOOGLE_MAPS_JS}?key=${myConstClass.GOOGLE_MAPS_API_KEY}`;
//       scriptEle.async = true;
//       var x = document.getElementsByTagName("script")[0];
//       x.parentNode.insertBefore(scriptEle, x);
//       //We cannot access google.maps until it'scriptEle finished loading, so adding EventListener.
//       scriptEle.addEventListener("load", (e) => {
//         this.onScriptLoad();
//       });
//     } else {
//       this.onScriptLoad();
//     }

//   }

//   clientCoordinates() {
//     let clientsPosition = this.state.clientsPosition;

//     if (navigator.geolocation) {
//         // HACK: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//         navigator.geolocation.getCurrentPosition((position) => {
//             clientsPosition = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             };
//             this.setState({ clientsPosition });
//         });
//     }
//   }

//   buttonClick(){
//     let usersOriginLocation = document.getElementById("usersOriginLocation").value;
//     let usersDestionationLocation = document.getElementById("usersDestionationLocation").value;
//     let journeyStartTime = document.getElementById("journeyStartTime").value;
//     let journeyStartDate = document.getElementById('journeyStartDate').options[document.getElementById('journeyStartDate').selectedIndex].text;

//     if( !usersDestionationLocation && !usersOriginLocation && !!journeyStartTime && !!journeyStartDate )
//       return;

//     var dateTimeObjectToUnix = new Date(`${journeyStartDate}T${journeyStartTime}`).getTime()/1000;

//     // NOTE: SetState is an ASYNC function.
//     this.setState( { usersOriginLocation, usersDestionationLocation, dateTimeObjectToUnix });
//   }

//   loadTimeOptions(){
//     var today = new Date();
//     var htmlOptionArr = [];

//     var formatedDate = today.toISOString().substr(0,10);
//     // Will push today's date first..
//     htmlOptionArr.push(
//       <option value={formatedDate}>{formatedDate}</option>
//     );

//     for ( var i = 1; i < 3; i++ ){
//       today.setDate(today.getDate() + 1);
//       formatedDate = today.toISOString().substr(0,10);

//       htmlOptionArr.push(
//         <option value={formatedDate}>{formatedDate}</option>
//       );
//     }
//     return htmlOptionArr;
//   }

//   render() {
//     return (
//       <div>
//         <Header title="Journey-weather" />
//         <form className="form-inline container justify-content-center">
//             <input
//                 type="text"
//                 className="form-control col-xl-2 ml-2 mr-2"  // Using Bootstrap's util for spacing.
//                 id="usersOriginLocation"
//                 placeholder="Origin"
//             />

//             <input
//                 type="text"
//                 className="form-control col-xl-2 ml-2 mr-2"
//                 id="usersDestionationLocation"
//                 placeholder="Destination"
//             />
//             <select id="journeyStartDate" className="form-control col-xl-2 ml-2 mr-2">

//               {this.loadTimeOptions()}
//             </select>
//             <input id = "journeyStartTime" className="form-control col-xl-2 ml-2 mr-2" type="time" step = "1800" required/>

//             <button
//                 type="button"
//                 className="btn btn-success col-xl-1 ml-2 mr-2"
//                 onClick={ this.buttonClick }
//                 id="search-button"
//             >
//                 Let's go
//             </button>

//         </form>

//         <br/>

//         { !!this.state.usersOriginLocation &&
//         !!this.state.usersDestionationLocation && !!this.state.dateTimeObjectToUnix ? (
//           <Map
//             id= {myConstClass.GOOGLE_MAPS_ID}
//             source = {this.state.usersOriginLocation}
//             destination = { this.state.usersDestionationLocation }
//             dateTimeObjectToUnix = {this.state.dateTimeObjectToUnix }
//           />
//         ) : null}

//       </div>
//     );
//   }
// }

// export default LandingPage;

// import React, { Component } from "react";
// import Header from "../commonUtils/Header.js";
// import Map from "../components/Map.js";
// import * as myConstClass from "../commonUtils/Constants.js";

// class LandingPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       clientsPosition: { lat: 37.0902, lng: 95.7129 },  // Setting default to load at the center of USA.
//       usersDestionationLocation: null,
//       usersOriginLocation: null,
//       dateTimeObjectToUnix: null,
//       mapLoaded: false
//     };
//     this.buttonClick = this.buttonClick.bind(this);
//     this.onScriptLoad = this.onScriptLoad.bind(this);
//     this.mapRef = React.createRef();
//   }

//   onScriptLoad() {
//     var options = {
//       center: this.state.clientsPosition,
//       zoom: 8,
//     };
//     // Map should be assigned to a window object, as one can't access the map object directly..
//     // HACK: https://stackoverflow.com/questions/10253265/get-google-maps-map-instance-from-a-htmlelement
//     // const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
//     if (this.mapRef.current) {
//       window.map = new window.google.maps.Map(this.mapRef.current, options);
//     }
//     //document.getElementById(myConstClass.GOOGLE_MAPS_ID)
//     // Map is loaded now. It can be accessed via window.google
//   }

//   componentDidMount() {
//     this.clientCoordinates();

//     if (!window.google) {
//       var scriptEle = document.createElement("script");
//       scriptEle.type = "text/javascript";
//       scriptEle.src = `${myConstClass.GOOGLE_MAPS_JS}?key=${myConstClass.GOOGLE_MAPS_API_KEY}`;
//       scriptEle.async = true;
//       scriptEle.defer = true;
//       var x = document.getElementsByTagName("script")[0];
//       x.parentNode.insertBefore(scriptEle, x);
//       //We cannot access google.maps until scriptEle finished loading, so adding EventListener.
//       scriptEle.addEventListener("load", (e) => {
//         this.onScriptLoad();
//         this.setState({ mapLoaded: true });
//       });
//     } else {
//       this.onScriptLoad();
//       this.setState({ mapLoaded: true });
//     }
//   }

//   clientCoordinates() {
//     let clientsPosition = this.state.clientsPosition;

//     if (navigator.geolocation) {
//       // HACK: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//       navigator.geolocation.getCurrentPosition((position) => {
//         clientsPosition = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         this.setState({ clientsPosition });
//       });
//     }
//   }
//   buttonClick() {
//     let usersOriginLocation = document.getElementById("usersOriginLocation").value;
//     let usersDestionationLocation = document.getElementById("usersDestionationLocation").value;
//     let journeyStartTime = document.getElementById("journeyStartTime").value;
//     let journeyStartDate = document.getElementById("journeyStartDate").options[document.getElementById("journeyStartDate").selectedIndex].text;

//     if (!usersDestionationLocation && !usersOriginLocation && !!journeyStartTime && !!journeyStartDate)
//       return;

//     var dateTimeObjectToUnix = new Date(`${journeyStartDate}T${journeyStartTime}`).getTime() / 1000;

//     this.setState({ usersOriginLocation, usersDestionationLocation, dateTimeObjectToUnix }, () => {
//       fetch(`http://localhost:5000/directions?origin=${usersOriginLocation}&destination=${usersDestionationLocation}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(data => {
//           console.log(data);
//           this.setState({ directionsData: data });
//         })
//         .catch(error => {
//           console.error('Error:', error);
//           alert('Failed to fetch directions. Please check your server and network connection.');
//         });
//     });
//   }

//   // buttonClick() {
//   //   let usersOriginLocation = document.getElementById("usersOriginLocation").value;
//   //   let usersDestionationLocation = document.getElementById("usersDestionationLocation").value;
//   //   let journeyStartTime = document.getElementById("journeyStartTime").value;
//   //   let journeyStartDate = document.getElementById('journeyStartDate').options[document.getElementById('journeyStartDate').selectedIndex].text;

//   //   if (!usersDestionationLocation && !usersOriginLocation && !!journeyStartTime && !!journeyStartDate)
//   //     return;

//   //   var dateTimeObjectToUnix = new Date(`${journeyStartDate}T${journeyStartTime}`).getTime() / 1000;

//   //   // NOTE: SetState is an ASYNC function.
//   //   this.setState({ usersOriginLocation, usersDestionationLocation, dateTimeObjectToUnix }, () => {
//   //     // Make the fetch call to your server endpoint after setting the state
//   //     fetch(`http://localhost:5000/directions?origin=${usersOriginLocation}&destination=${usersDestionationLocation}`)
//   //       .then(response => response.json())
//   //       .then(data => {
//   //         console.log(data);
//   //         this.setState({ directionsData: data }); // You can use the directionsData state to update the map or perform other actions }) .catch(error => console.error('Error:', error));
//   //       });
//   //   }
//   // )
//   // }

//   loadTimeOptions() {
//     var today = new Date();
//     var htmlOptionArr = [];

//     var formatedDate = today.toISOString().substring(0, 10);
//     // Will push today's date first..
//     htmlOptionArr.push(
//       <option key={formatedDate} value={formatedDate}>{formatedDate}</option>
//     );

//     for (var i = 1; i < 3; i++) {
//       today.setDate(today.getDate() + 1);
//       formatedDate = today.toISOString().substring(0, 10);

//       htmlOptionArr.push(
//         <option key={formatedDate} value={formatedDate}>{formatedDate}</option>
//       );
//     }
//     return htmlOptionArr;
//   }

//   render() {
//     return (
//       <div>
//         <Header title="Journey-weather" />
//         <form className="form-inline container justify-content-center">
//           <input
//             type="text"
//             className="form-control col-xl-2 ml-2 mr-2"
//             id="usersOriginLocation"
//             placeholder="Origin"
//           />

//           <input
//             type="text"
//             className="form-control col-xl-2 ml-2 mr-2"
//             id="usersDestionationLocation"
//             placeholder="Destination"
//           />
//           <select id="journeyStartDate" className="form-control col-xl-2 ml-2 mr-2" aria-label="Journey Start Date">
//             {this.loadTimeOptions()}
//           </select>
//           <input id="journeyStartTime" className="form-control col-xl-2 ml-2 mr-2" type="time" step="1800"  aria-label="Journey Start Time"required />

//           <button
//             type="button"
//             className="btn btn-success col-xl-1 ml-2 mr-2"
//             onClick={this.buttonClick}
//             id="search-button"
//           >
//             Let's go
//           </button>

//         </form>

//         <br />
//         <div
//           id={myConstClass.GOOGLE_MAPS_ID}
//           ref = {this.mapRef}
//           style={{ height: "400px", width: "100%" }} >

//           </div>

//         {this.state.mapLoaded && !!this.state.usersOriginLocation &&
//           !!this.state.usersDestionationLocation && !!this.state.dateTimeObjectToUnix ? (
//           <Map
//             id={myConstClass.GOOGLE_MAPS_ID}
//             source={this.state.usersOriginLocation}
//             destination={this.state.usersDestionationLocation}
//             dateTimeObjectToUnix={this.state.dateTimeObjectToUnix}
//           />
//         ) : null}

//       </div>
//     );
//   }
// }

// export default LandingPage;

// import React, { Component } from "react";

// import Header from "../commonUtils/Header";
// import Map from "../components/Map";
// import * as myConstClass from "../commonUtils/Constants";

// class LandingPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       clientsPosition: { lat: 37.0902, lng: 95.7129 },  // Setting default to load at the center of USA.
//       usersDestionationLocation: null,
//       usersOriginLocation: null,
//       dateTimeObjectToUnix: null
//     };
//     this.buttonClick  = this.buttonClick.bind(this);
//     this.onScriptLoad = this.onScriptLoad.bind(this);
//   }

//   onScriptLoad() {

//     var options = {
//       center: this.state.clientsPosition,
//       zoom: 8,
//     }
//     // Map should be assigned to a window object, as one can't access the map object directly..
//     // HACK: https://stackoverflow.com/questions/10253265/get-google-maps-map-instance-from-a-htmlelement
//     // const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
//     window.Map = new window.google.maps.Map( document.getElementById( myConstClass.GOOGLE_MAPS_ID ), options );
//     // Map is loaded now. It can be accessed via window.google
//   }

//   componentDidMount() {
//     this.clientCoordinates();

//     if (!window.google) {
//       var scriptEle = document.createElement("script");
//       scriptEle.type = "text/javascript";
//       scriptEle.src = ${myConstClass.GOOGLE_MAPS_JS}?key=${myConstClass.GOOGLE_MAPS_API_KEY};
//       scriptEle.async = true;
//       var x = document.getElementsByTagName("script")[0];
//       x.parentNode.insertBefore(scriptEle, x);
//       //We cannot access google.maps until it'scriptEle finished loading, so adding EventListener.
//       scriptEle.addEventListener("load", (e) => {
//         this.onScriptLoad();
//       });
//     } else {
//       this.onScriptLoad();
//     }

//   }

//   clientCoordinates() {
//     let clientsPosition = this.state.clientsPosition;

//     if (navigator.geolocation) {
//         // HACK: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//         navigator.geolocation.getCurrentPosition((position) => {
//             clientsPosition = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             };
//             this.setState({ clientsPosition });
//         });
//     }
//   }

//   buttonClick(){
//     let usersOriginLocation = document.getElementById("usersOriginLocation").value;
//     let usersDestionationLocation = document.getElementById("usersDestionationLocation").value;
//     let journeyStartTime = document.getElementById("journeyStartTime").value;
//     let journeyStartDate = document.getElementById('journeyStartDate').options[document.getElementById('journeyStartDate').selectedIndex].text;

//     if( !usersDestionationLocation && !usersOriginLocation && !!journeyStartTime && !!journeyStartDate )
//       return;

//     var dateTimeObjectToUnix = new Date(${journeyStartDate}T${journeyStartTime}).getTime()/1000;

//     // NOTE: SetState is an ASYNC function.
//     this.setState( { usersOriginLocation, usersDestionationLocation, dateTimeObjectToUnix });
//   }

//   loadTimeOptions(){
//     var today = new Date();
//     var htmlOptionArr = [];

//     var formatedDate = today.toISOString().substr(0,10);
//     // Will push today's date first..
//     htmlOptionArr.push(
//       <option value={formatedDate}>{formatedDate}</option>
//     );

//     for ( var i = 1; i < 3; i++ ){
//       today.setDate(today.getDate() + 1);
//       formatedDate = today.toISOString().substr(0,10);

//       htmlOptionArr.push(
//         <option value={formatedDate}>{formatedDate}</option>
//       );
//     }
//     return htmlOptionArr;
//   }

//   render() {
//     return (
//       <div>
//         <Header title="Journey-weather" />
//         <form className="form-inline container justify-content-center">
//             <input
//                 type="text"
//                 className="form-control col-xl-2 ml-2 mr-2"  // Using Bootstrap's util for spacing.
//                 id="usersOriginLocation"
//                 placeholder="Origin"
//             />

//             <input
//                 type="text"
//                 className="form-control col-xl-2 ml-2 mr-2"
//                 id="usersDestionationLocation"
//                 placeholder="Destination"
//             />
//             <select id="journeyStartDate" className="form-control col-xl-2 ml-2 mr-2">

//               {this.loadTimeOptions()}
//             </select>
//             <input id = "journeyStartTime" className="form-control col-xl-2 ml-2 mr-2" type="time" step = "1800" required/>

//             <button
//                 type="button"
//                 className="btn btn-success col-xl-1 ml-2 mr-2"
//                 onClick={ this.buttonClick }
//                 id="search-button"
//             >
//                 Let's go
//             </button>

//         </form>

//         <br/>

//         { !!this.state.usersOriginLocation &&
//         !!this.state.usersDestionationLocation && !!this.state.dateTimeObjectToUnix ? (
//           <Map
//             id= {myConstClass.GOOGLE_MAPS_ID}
//             source = {this.state.usersOriginLocation}
//             destination = { this.state.usersDestionationLocation }
//             dateTimeObjectToUnix = {this.state.dateTimeObjectToUnix }
//           />
//         ) : null}

//       </div>
//     );
//   }
// }

// export default LandingPage;

import React, { Component } from "react";
import Header from "../commonUtils/Header.js";
import Map from "../components/Map.js";
import * as myConstClass from "../commonUtils/Constants.js";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientsPosition: { lat: 19.0760, lng:  72.8777 }, // Setting default to load at the center of USA.
      usersDestionationLocation: null,
      usersOriginLocation: null,
      dateTimeObjectToUnix: null,
      mapLoaded: false,
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.onScriptLoad = this.onScriptLoad.bind(this);
    this.mapRef = React.createRef();
  }

  onScriptLoad() {
    var options = {
      center: this.state.clientsPosition,
      zoom: 8,
    };
    // Map should be assigned to a window object, as one can't access the map object directly..
    // HACK: https://stackoverflow.com/questions/10253265/get-google-maps-map-instance-from-a-htmlelement
    // const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
    if (this.mapRef.current) {
      window.map = new window.google.maps.Map(this.mapRef.current, options);
    }
    //document.getElementById(myConstClass.GOOGLE_MAPS_ID)
    // Map is loaded now. It can be accessed via window.google
  }

  componentDidMount() {
    this.clientCoordinates();

    if (!window.google) {
      var scriptEle = document.createElement("script");
      scriptEle.type = "text/javascript";
      scriptEle.src = `${myConstClass.GOOGLE_MAPS_JS}?key=${myConstClass.GOOGLE_MAPS_API_KEY}`;
      scriptEle.async = true;
      scriptEle.defer = true;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(scriptEle, x);
      //We cannot access google.maps until scriptEle finished loading, so adding EventListener.
      scriptEle.addEventListener("load", (e) => {
        this.onScriptLoad();
        this.setState({ mapLoaded: true });
      });
    } else {
      this.onScriptLoad();
      this.setState({ mapLoaded: true });
    }
  }

  clientCoordinates() {
    let clientsPosition = this.state.clientsPosition;

    if (navigator.geolocation) {
      // HACK: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
      navigator.geolocation.getCurrentPosition((position) => {
        clientsPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({ clientsPosition });
      });
    }
  }
  buttonClick() {
    let usersOriginLocation = document.getElementById(
      "usersOriginLocation"
    ).value;
    let usersDestionationLocation = document.getElementById(
      "usersDestionationLocation"
    ).value;
    let journeyStartTime = document.getElementById("journeyStartTime").value;
    let journeyStartDate =
      document.getElementById("journeyStartDate").options[
        document.getElementById("journeyStartDate").selectedIndex
      ].text;

    if (
      !usersDestionationLocation &&
      !usersOriginLocation &&
      !!journeyStartTime &&
      !!journeyStartDate
    )
      return;

    var dateTimeObjectToUnix =
      new Date(`${journeyStartDate}T${journeyStartTime}`).getTime() / 1000;

    this.setState(
      { usersOriginLocation, usersDestionationLocation, dateTimeObjectToUnix },
      () => {
        fetch(
          `http://localhost:5000/directions?origin=${usersOriginLocation}&destination=${usersDestionationLocation}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.setState({ directionsData: data });
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "Failed to fetch directions. Please check your server and network connection."
            );
          });
      }
    );
  }

  // buttonClick() {
  //   let usersOriginLocation = document.getElementById("usersOriginLocation").value;
  //   let usersDestionationLocation = document.getElementById("usersDestionationLocation").value;
  //   let journeyStartTime = document.getElementById("journeyStartTime").value;
  //   let journeyStartDate = document.getElementById('journeyStartDate').options[document.getElementById('journeyStartDate').selectedIndex].text;

  //   if (!usersDestionationLocation && !usersOriginLocation && !!journeyStartTime && !!journeyStartDate)
  //     return;

  //   var dateTimeObjectToUnix = new Date(${journeyStartDate}T${journeyStartTime}).getTime() / 1000;

  //   // NOTE: SetState is an ASYNC function.
  //   this.setState({ usersOriginLocation, usersDestionationLocation, dateTimeObjectToUnix }, () => {
  //     // Make the fetch call to your server endpoint after setting the state
  //     fetch(http://localhost:5000/directions?origin=${usersOriginLocation}&destination=${usersDestionationLocation})
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //         this.setState({ directionsData: data }); // You can use the directionsData state to update the map or perform other actions }) .catch(error => console.error('Error:', error));
  //       });
  //   }
  // )
  // }

  loadTimeOptions() {
    var today = new Date();
    var htmlOptionArr = [];

    var formatedDate = today.toISOString().substring(0, 10);
    // Will push today's date first..
    htmlOptionArr.push(
      <option key={formatedDate} value={formatedDate}>
        {formatedDate}
      </option>
    );

    for (var i = 1; i < 3; i++) {
      today.setDate(today.getDate() + 1);
      formatedDate = today.toISOString().substring(0, 10);

      htmlOptionArr.push(
        <option key={formatedDate} value={formatedDate}>
          {formatedDate}
        </option>
      );
    }
    return htmlOptionArr;
  }

  render() {
    return (
      <div>
        <Header title="Journey-weather" />
        <form className="form-inline container justify-content-center">
          <input
            type="text"
            className="form-control col-xl-2 ml-2 mr-2"
            id="usersOriginLocation"
            placeholder="Origin"
          />

          <input
            type="text"
            className="form-control col-xl-2 ml-2 mr-2"
            id="usersDestionationLocation"
            placeholder="Destination"
          />
          <select
            id="journeyStartDate"
            className="form-control col-xl-2 ml-2 mr-2"
            aria-label="Journey Start Date"
          >
            {this.loadTimeOptions()}
          </select>
          <input
            id="journeyStartTime"
            className="form-control col-xl-2 ml-2 mr-2"
            type="time"
            step="1800"
            aria-label="Journey Start Time"
            required
          />

          <button
            type="button"
            className="btn btn-success col-xl-1 ml-2 mr-2"
            onClick={this.buttonClick}
            id="search-button"
          >
            Let's go
          </button>
        </form>

        
        <div
          id={myConstClass.GOOGLE_MAPS_ID}
          ref={this.mapRef}
          style={{ height: "600px", width: "100%" }}
        ></div>

        {this.state.mapLoaded &&
        !!this.state.usersOriginLocation &&
        !!this.state.usersDestionationLocation &&
        !!this.state.dateTimeObjectToUnix ? (
          <Map
            id={myConstClass.GOOGLE_MAPS_ID}
            source={this.state.usersOriginLocation}
            destination={this.state.usersDestionationLocation}
            dateTimeObjectToUnix={this.state.dateTimeObjectToUnix}
          />
        ) : null}
      </div>
    );
  }
}

export default LandingPage;

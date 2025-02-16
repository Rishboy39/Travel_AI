// import React, { useState, useEffect } from "react";

// const SpeedTrackerPage: React.FC = () => {
//   const [speed, setSpeed] = useState<string>("0");
//   const [overSpeed, setOverSpeed] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // We'll store these in refs so they persist across re-renders without causing a rerender
//   const previousPosition = React.useRef<{ latitude: number; longitude: number } | null>(null);
//   const previousTime = React.useRef<number | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const currentTime = position.timestamp;

//         if (previousPosition.current && previousTime.current) {
//           const distance = getDistance(previousPosition.current, { latitude, longitude });
//           const timeElapsed = (currentTime - previousTime.current) / 1000; // ms to sec
//           const calculatedSpeed = distance / timeElapsed; // m/s
//           const speedMph = calculatedSpeed * 2.237; // Convert m/s to mph

//           // Update state with 2 decimal places
//           setSpeed(speedMph.toFixed(2));

//           if (speedMph > 25) {
//             setOverSpeed(true);
//             sendSpeedToBackend(speedMph);
//           } else {
//             setOverSpeed(false);
//           }
//         }

//         previousPosition.current = { latitude, longitude };
//         previousTime.current = currentTime;
//       },
//       (err) => {
//         setError(`ERROR(${err.code}): ${err.message}`);
//       },
//       { enableHighAccuracy: true, maximumAge: 0 }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   // Calculate distance (in meters) between two sets of lat/lon
//   const getDistance = (
//     pos1: { latitude: number; longitude: number },
//     pos2: { latitude: number; longitude: number }
//   ): number => {
//     const R = 6371e3; // Earth’s radius in meters
//     const φ1 = (pos1.latitude * Math.PI) / 180;
//     const φ2 = (pos2.latitude * Math.PI) / 180;
//     const Δφ = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//     const Δλ = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // in meters
//   };

//   // Example POST request to send speed to your backend
//   const sendSpeedToBackend = (speedValue: number) => {
//     fetch("/api/speed", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ speed: speedValue }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Server Response:", data))
//       .catch((err) => console.error("Error sending speed data:", err));
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Speed Tracker Page</h1>
//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <>
//           <h2>Current Speed: {speed} mph</h2>
//           {overSpeed && <h3 style={{ color: "red" }}>⚠️ Over Speed Limit! Slow Down! ⚠️</h3>}
//         </>
//       )}
//     </div>
//   );
// };

// export default SpeedTrackerPage;
// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const SpeedTrackerPage: React.FC = () => {
//   const [speed, setSpeed] = useState<string>("0");
//   const [overSpeed, setOverSpeed] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

//   const previousPosition = useRef<{ latitude: number; longitude: number } | null>(null);
//   const previousTime = useRef<number | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const currentTime = position.timestamp;

//         setPosition({ lat: latitude, lng: longitude }); // Update map position

//         if (previousPosition.current && previousTime.current) {
//           const distance = getDistance(previousPosition.current, { latitude, longitude });
//           const timeElapsed = (currentTime - previousTime.current) / 1000; // ms to sec
//           const calculatedSpeed = distance / timeElapsed; // m/s
//           const speedMph = calculatedSpeed * 2.237; // Convert m/s to mph

//           setSpeed(speedMph.toFixed(2));

//           if (speedMph > 25) {
//             setOverSpeed(true);
//             sendSpeedToBackend(speedMph);
//           } else {
//             setOverSpeed(false);
//           }
//         }

//         previousPosition.current = { latitude, longitude };
//         previousTime.current = currentTime;
//       },
//       (err) => {
//         setError(`ERROR(${err.code}): ${err.message}`);
//       },
//       { enableHighAccuracy: true, maximumAge: 0 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // Calculate distance between two latitude/longitude points in meters
//   const getDistance = (
//     pos1: { latitude: number; longitude: number },
//     pos2: { latitude: number; longitude: number }
//   ): number => {
//     const R = 6371e3;
//     const φ1 = (pos1.latitude * Math.PI) / 180;
//     const φ2 = (pos2.latitude * Math.PI) / 180;
//     const Δφ = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//     const Δλ = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // Send speed to backend if needed
//   const sendSpeedToBackend = (speedValue: number) => {
//     fetch("/api/speed", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ speed: speedValue }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Server Response:", data))
//       .catch((err) => console.error("Error sending speed data:", err));
//   };

//   // Fix Leaflet marker icon issue
//   delete (L.Icon.Default.prototype as any)._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//     iconUrl: require("leaflet/dist/images/marker-icon.png"),
//     shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//   });

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Speed Tracker Page</h1>
//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <>
//           <h2>Current Speed: {speed} mph</h2>
//           {overSpeed && <h3 style={{ color: "red" }}>⚠️ Over Speed Limit! Slow Down! ⚠️</h3>}
//           <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
//             <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               <Marker position={[position.lat, position.lng]}>
//                 <Popup>Your current location</Popup>
//               </Marker>
//             </MapContainer>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SpeedTrackerPage;


    //     import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
    
    // const MapComponent = () => {
    //   const mapStyles = {
    //     height: '400px',
    //     width: '100%'
    //   };
    
    //   const defaultCenter = {
    //     lat: 40.7128, 
    //     lng: -74.0060 
    //   };
    
    //   return (
    //     <LoadScript googleMapsApiKey="YOUR_API_KEY">
    //       <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
    //         <Marker position={defaultCenter} />
    //       </GoogleMap>
    //     </LoadScript>
    //   );
    // };
    
    // export default MapComponent;

//     import React, { useState, useEffect, useRef } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const SpeedTrackerPage: React.FC = () => {
//   const [speed, setSpeed] = useState("0");
//   const [overSpeed, setOverSpeed] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [position, setPosition] = useState<{ lat: number; lng: number }>({
//     lat: 40.7128,
//     lng: -74.0060,
//   }); // Default: NYC

//   const previousPosition = useRef<{ lat: number; lng: number } | null>(null);
//   const previousTime = useRef<number | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const currentTime = pos.timestamp;

//         // Update position for the map
//         setPosition({ lat: latitude, lng: longitude });

//         // Calculate speed based on position changes
//         if (previousPosition.current && previousTime.current) {
//           const distance = getDistance(previousPosition.current, { lat: latitude, lng: longitude });
//           const timeElapsed = (currentTime - previousTime.current) / 1000; // ms to sec
//           const calculatedSpeed = distance / timeElapsed; // m/s
//           const speedMph = calculatedSpeed * 2.237; // m/s to mph

//           setSpeed(speedMph.toFixed(2));

//           // Speed check: Alert if > 25 mph
//           if (speedMph > 25) {
//             setOverSpeed(true);
//             sendSpeedToBackend(speedMph);
//           } else {
//             setOverSpeed(false);
//           }
//         }

//         // Update refs for the next calculation
//         previousPosition.current = { lat: latitude, lng: longitude };
//         previousTime.current = currentTime;
//       },
//       (err) => setError(`Geolocation Error: ${err.message}`),
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // Calculate distance between two lat/lng points in meters
//   const getDistance = (
//     pos1: { lat: number; lng: number },
//     pos2: { lat: number; lng: number }
//   ): number => {
//     const R = 6371e3; // Earth radius in meters
//     const φ1 = (pos1.lat * Math.PI) / 180;
//     const φ2 = (pos2.lat * Math.PI) / 180;
//     const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
//     const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) ** 2 +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   // Send speed to backend (optional)
//   const sendSpeedToBackend = (speedValue: number) => {
//     fetch("/api/speed", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ speed: speedValue }),
//     })
//       .then((res) => res.json())
//       .then((data) => console.log("Server Response:", data))
//       .catch((err) => console.error("Error sending speed:", err));
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>🚗 Speed Tracker with Google Maps</h1>
//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <>
//           <h2>Current Speed: {speed} mph</h2>
//           {overSpeed && (
//             <h3 style={{ color: "red" }}>⚠️ Over Speed Limit! Slow Down! ⚠️</h3>
//           )}
//           <div style={{ margin: "20px 0" }}>
//             <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
//               <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
//                 <Marker position={position} />
//               </GoogleMap>
//             </LoadScript>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SpeedTrackerPage;
// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const SpeedTrackerPage: React.FC = () => {
//   const [speed, setSpeed] = useState("0");
//   const [overSpeed, setOverSpeed] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [position, setPosition] = useState<{ lat: number; lng: number }>({
//     lat: 51.505,
//     lng: -0.09,
//   }); // Default: London

//   const previousPosition = useRef<{ lat: number; lng: number } | null>(null);
//   const previousTime = useRef<number | null>(null);

//   // Fix Leaflet marker icon issue with React/Webpack
//   delete (L.Icon.Default.prototype as any)._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//     iconUrl: require("leaflet/dist/images/marker-icon.png"),
//     shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//   });

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const currentTime = pos.timestamp;

//         // Update map position
//         setPosition({ lat: latitude, lng: longitude });

//         // Calculate speed if previous position is available
//         if (previousPosition.current && previousTime.current) {
//           const distance = getDistance(previousPosition.current, { lat: latitude, lng: longitude });
//           const timeElapsed = (currentTime - previousTime.current) / 1000; // ms to s
//           const calculatedSpeed = distance / timeElapsed; // m/s
//           const speedMph = calculatedSpeed * 2.237; // Convert m/s to mph

//           setSpeed(speedMph.toFixed(2));

//           // Check if over speed limit (25 mph)
//           if (speedMph > 25) {
//             setOverSpeed(true);
//           } else {
//             setOverSpeed(false);
//           }
//         }

//         // Update refs
//         previousPosition.current = { lat: latitude, lng: longitude };
//         previousTime.current = currentTime;
//       },
//       (err) => {
//         setError(`Geolocation Error: ${err.message}`);
//       },
//       { enableHighAccuracy: true, maximumAge: 0 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // Calculate distance between two points (in meters) using Haversine formula
//   const getDistance = (
//     pos1: { lat: number; lng: number },
//     pos2: { lat: number; lng: number }
//   ): number => {
//     const R = 6371e3; // Earth's radius in meters
//     const φ1 = (pos1.lat * Math.PI) / 180;
//     const φ2 = (pos2.lat * Math.PI) / 180;
//     const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
//     const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) ** 2 +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   return (
//     <div className="text-center p-6">
//       <h1 className="text-3xl font-bold mb-4 animate-bounce">🚗 Speed Tracker with OpenStreetMap</h1>
//       {error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <>
//           <h2 className="text-xl mb-3">Current Speed: <span className="font-bold">{speed} mph</span></h2>
//           {overSpeed && (
//             <h3 className="text-red-600 text-2xl font-semibold animate-pulse">
//               ⚠️ Over Speed Limit! Slow Down! ⚠️
//             </h3>
//           )}
//           <div className="my-5">
//             <MapContainer center={[position.lat, position.lng]} zoom={13} style={containerStyle}>
//               <TileLayer
//                 url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               <Marker position={[position.lat, position.lng]}>
//                 <Popup>
//                   📍 Current Location<br />
//                   Speed: {speed} mph
//                 </Popup>
//               </Marker>
//             </MapContainer>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SpeedTrackerPage;
// import React, { useState, useEffect } from "react";

// declare global {
//     interface Window {
//         google: any;
//     }
// }

// const SpeedTrackerWithMap: React.FC = () => {
//     const [speed, setSpeed] = useState<number>(0);
//     const [overSpeed, setOverSpeed] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     let previousPosition: { latitude: number; longitude: number } | null = null;
//     let previousTime: number | null = null;

//     useEffect(() => {
//         if (!navigator.geolocation) {
//             setError("Geolocation is not supported by your browser.");
//             return;
//         }

//         const watchId = navigator.geolocation.watchPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 const currentTime = position.timestamp;

//                 if (previousPosition && previousTime) {
//                     const distance = getDistance(previousPosition, { latitude, longitude });
//                     const timeElapsed = (currentTime - previousTime) / 1000; // ms to sec
//                     const calculatedSpeed = distance / timeElapsed; // m/s
//                     const speedMph = calculatedSpeed * 2.237; // Convert to mph

//                     setSpeed(parseFloat(speedMph.toFixed(2)));

//                     if (speedMph > 25) {
//                         setOverSpeed(true);
//                         sendSpeedToBackend(speedMph);
//                     } else {
//                         setOverSpeed(false);
//                     }
//                 }

//                 previousPosition = { latitude, longitude };
//                 previousTime = currentTime;

//                 if (window.google && window.google.maps) {
//                     const map = new window.google.maps.Map(document.getElementById("map"), {
//                         center: { lat: latitude, lng: longitude },
//                         zoom: 15,
//                     });

//                     new window.google.maps.Marker({
//                         position: { lat: latitude, lng: longitude },
//                         map: map,
//                         title: "Current Location",
//                     });
//                 }
//             },
//             (err) => setError(`ERROR(${err.code}): ${err.message}`),
//             { enableHighAccuracy: true, maximumAge: 0 }
//         );

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     const getDistance = (pos1: { latitude: number; longitude: number }, pos2: { latitude: number; longitude: number }): number => {
//         const R = 6371e3; // Earth radius in meters
//         const φ1 = (pos1.latitude * Math.PI) / 180;
//         const φ2 = (pos2.latitude * Math.PI) / 180;
//         const Δφ = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//         const Δλ = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

//         const a =
//             Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         return R * c; // Distance in meters
//     };

//     const sendSpeedToBackend = (speed: number) => {
//         fetch("/api/speed", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ speed }),
//         })
//             .then((response) => response.json())
//             .then((data) => console.log("Server Response:", data))
//             .catch((error) => console.error("Error sending speed data:", error));
//     };

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h1>Speed Tracker with Map</h1>
//             {error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//             ) : (
//                 <>
//                     <h2>Current Speed: {speed} mph</h2>
//                     {overSpeed && <h3 style={{ color: "red" }}>⚠️ Over Speed Limit! Slow Down! ⚠️</h3>}
//                 </>
//             )}
//             <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
//         </div>
//     );
// };

// export default SpeedTrackerWithMap;
// import React, { useState, useEffect } from "react";

// declare global {
//     interface Window {
//         google: any;
//     }
// }

// interface Position {
//     latitude: number;
//     longitude: number;
// }

// const SpeedTrackerWithMap: React.FC = () => {
//     const [speed, setSpeed] = useState<number>(0);
//     const [overSpeed, setOverSpeed] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     let previousPosition: Position | null = null;
//     let previousTime: number | null = null;

//     useEffect(() => {
//         if (!navigator.geolocation) {
//             setError("Geolocation is not supported by your browser.");
//             return;
//         }

//         const watchId = navigator.geolocation.watchPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 const currentTime = position.timestamp;

//                 if (previousPosition && previousTime) {
//                     const distance = getDistance(previousPosition, { latitude, longitude });
//                     const timeElapsed = (currentTime - previousTime) / 1000; // ms to sec
//                     const calculatedSpeed = distance / timeElapsed; // m/s
//                     const speedMph = calculatedSpeed * 2.237; // Convert to mph

//                     setSpeed(parseFloat(speedMph.toFixed(2)));

//                     if (speedMph > 25) {
//                         setOverSpeed(true);
//                         sendSpeedToBackend(speedMph);
//                     } else {
//                         setOverSpeed(false);
//                     }
//                 }

//                 previousPosition = { latitude, longitude };
//                 previousTime = currentTime;

//                 const mapElement = document.getElementById("map") as HTMLElement;
//                 mapElement.innerHTML = `<div>Latitude: ${latitude}, Longitude: ${longitude}</div>`;
//             },
//             (err) => setError(`ERROR(${err.code}): ${err.message}`),
//             { enableHighAccuracy: true, maximumAge: 0 }
//         );

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     const getDistance = (pos1: Position, pos2: Position): number => {
//         const R = 6371e3; // Earth radius in meters
//         const φ1 = (pos1.latitude * Math.PI) / 180;
//         const φ2 = (pos2.latitude * Math.PI) / 180;
//         const Δφ = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//         const Δλ = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

//         const a =
//             Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         return R * c; // Distance in meters
//     };

//     const sendSpeedToBackend = (speed: number) => {
//         fetch("/api/speed", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ speed }),
//         })
//             .then((response) => response.json())
//             .then((data) => console.log("Server Response:", data))
//             .catch((error) => console.error("Error sending speed data:", error));
//     };

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h1>Speed Tracker with Map</h1>
//             {error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//             ) : (
//                 <>
//                     <h2>Current Speed: {speed} mph</h2>
//                     {overSpeed && <h3 style={{ color: "red" }}>⚠️ Over Speed Limit! Slow Down! ⚠️</h3>}
//                 </>
//             )}
//             <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px", border: "1px solid black" }}></div>
//         </div>
//     );
// };

// export default SpeedTrackerWithMap;

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// import React, { useEffect } from "react";
// export default function SpeedTrackerPage() {

// declare global {
//     interface Window {
//         google: any;
//     }
// }

// const MapComponent: React.FC = () => {
//     useEffect(() => {
//         let map: any;

//         const initMap = async () => {
//             const { Map } = await window.google.maps.importLibrary("maps");

//             map = new Map(document.getElementById("map") as HTMLElement, {
//                 center: { lat: -34.397, lng: 150.644 },
//                 zoom: 8,
//             });
//         };

//         initMap();
//     }, []);

//     return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
// };

// export default MapComponent;
// }

// import React, { useEffect, useState } from "react";

// declare global {
//     interface Window {
//         google: any;
//     }
// }

// const SpeedTrackerPage: React.FC = () => {
//     const [speed, setSpeed] = useState<number>(0);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         let map: any;

//         const initMap = async () => {
//             const { Map } = await window.google.maps.importLibrary("maps");

//             map = new Map(document.getElementById("map") as HTMLElement, {
//                 center: { lat: -34.397, lng: 150.644 },
//                 zoom: 8,
//             });
//         };

//         initMap();

//         if (!navigator.geolocation) {
//             setError("Geolocation is not supported by your browser.");
//             return;
//         }

//         const watchId = navigator.geolocation.watchPosition(
//             (position) => {
//                 const speedMph = position.coords.speed ? position.coords.speed * 2.237 : 0;
//                 setSpeed(parseFloat(speedMph.toFixed(2)));
//             },
//             (err) => setError(`ERROR(${err.code}): ${err.message}`),
//             { enableHighAccuracy: true, maximumAge: 0 }
//         );

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h1>Speed Tracker Page</h1>
//             {error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//             ) : (
//                 <h2>Current Speed: {speed} mph</h2>
//             )}
//             <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
//         </div>
//     );
// };

// export default SpeedTrackerPage;

// App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SpeedTrackerPage from './SpeedTrackerPage';
// import NotFound from './NotFound';

// const App: React.FC = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<div>Home Page</div>} />
//                 <Route path="/SpeedTrackerPage" element={<SpeedTrackerPage />} />
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;

// import React, { useEffect, useState } from "react";

// declare global {
//     interface Window {
//         google: any;
//     }
// }

// const SpeedTrackerPage: React.FC = () => {
//     const [speed, setSpeed] = useState<number>(0);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // Load Google Maps API dynamically
//         const loadGoogleMaps = () => {
//             if (!window.google) {
//                 const script = document.createElement('script');
//                 script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VITE_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
//                 script.async = true;
//                 script.defer = true;
//                 script.onload = initMap;
//                 script.onerror = () => setError("Failed to load Google Maps API");
//                 document.head.appendChild(script);
//             } else {
//                 initMap();
//             }
//         };

//         // Initialize the map
//         const initMap = () => {
//             if (window.google && window.google.maps) {
//                 new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
//                     center: { lat: -34.397, lng: 150.644 },
//                     zoom: 8,
//                 });
//             } else {
//                 setError("Google Maps API is not available.");
//             }
//         };

//         loadGoogleMaps();

//         if (!navigator.geolocation) {
//             setError("Geolocation is not supported by your browser.");
//             return;
//         }

//         const watchId = navigator.geolocation.watchPosition(
//             (position) => {
//                 const speedMph = position.coords.speed ? position.coords.speed * 2.237 : 0;
//                 setSpeed(parseFloat(speedMph.toFixed(2)));
//             },
//             (err) => setError(`ERROR(${err.code}): ${err.message}`),
//             { enableHighAccuracy: true, maximumAge: 0 }
//         );

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h1>Speed Tracker Page</h1>
//             {error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//             ) : (
//                 <h2>Current Speed: {speed} mph</h2>
//             )}
//             <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
//         </div>
//     );
// };

// export default SpeedTrackerPage;


import React, { useEffect, useState } from "react";

declare global {
    interface Window {
        google: any;
    }
}

const SpeedTrackerPage: React.FC = () => {
    const [speed, setSpeed] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (document.getElementById("map")) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = () => initMap();
                script.onerror = () => setError("Failed to load Google Maps API.");
                document.head.appendChild(script);
            }
        };

        const initMap = () => {
            const mapElement = document.getElementById("map");
            if (mapElement && window.google && window.google.maps) {
                new window.google.maps.Map(mapElement as HTMLElement, {
                    center: { lat: 47.6740, lng: -122.1215 },
                    zoom: 8,
                });
            } else {
                setError("Map container not found or Google Maps API unavailable.");
            }
        };

        loadGoogleMaps();

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const speedMph = position.coords.speed ? position.coords.speed * 2.237 : 0;
                setSpeed(parseFloat(speedMph.toFixed(2)));
            },
            (err) => setError(`ERROR(${err.code}): ${err.message}`),
            { enableHighAccuracy: true, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Speed Tracker Page</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <h2>Current Speed: {speed} mph</h2>
            )}
            <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px", border: "2px solid black" }}></div>
        </div>
    );
};

export default SpeedTrackerPage;


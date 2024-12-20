import dotenv from "dotenv"
dotenv.config()
export const GOOGLE_MAPS_API_KEY =process.env.GOOGLE_MAPS_API_KEY ;
export const OPEN_WEATHER_MAP_API_KEY =process.env.OPEN_WEATHER_MAP_API_KEY  ;

// This is to load google maps in the app...
export const GOOGLE_MAPS_JS = "https://maps.googleapis.com/maps/api/js";

// cors-anywhere is a NodeJS reverse proxy which adds CORS headers to the proxied request. This is to get start and end location coordinates
export const DIRECTIONS_GOOGLE_MAPS_JSON =
  "https://maps.googleapis.com/maps/api/directions/json";

export const GOOGLE_MAPS_ID = "googleMap";

export const OPEN_WEATHER_MAP_API_URI =
  "https://api.openweathermap.org/data/2.5/forecast";

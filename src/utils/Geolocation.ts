import HaversineGeolocation from "haversine-geolocation";
import * as types from "../types";

export async function getCurrentPostion() {
  const data = await HaversineGeolocation.isGeolocationAvailable();
  const currentPoint = {
    latitude: data.coords.latitude,
    longitude: data.coords.longitude,
    accuracy: data.coords.accuracy,
  };

  return currentPoint;
}

export async function getClosestPosition(
  currentPosition: types.Coordonates,
  locationPoints: Array<types.Coordonates>
) {
  return HaversineGeolocation.getClosestPosition(
    currentPosition,
    locationPoints,
    "km"
  );
}

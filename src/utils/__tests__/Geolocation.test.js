import { getClosestPosition } from "../Geolocation";

describe("Closest position", () => {
  const locationPoints = [
    {
      country: "Singapore",
      latitude: 1.285194,
      longitude: 103.8522982,
    },
    {
      country: "England",
      latitude: 51.5049375,
      longitude: -0.0964509,
    },
  ];
  it("should return location in Singapore", async () => {
    const currentPosition = {
      latitude: 1.285194,
      longitude: 103.8522982,
      accuracy: 60,
    };

    const output = {
      country: "Singapore",
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      haversine: {
        distance: 0,
        measurement: "km",
        accuracy: currentPosition.accuracy,
      },
    };
    expect(await getClosestPosition(currentPosition, locationPoints)).toEqual(
      output
    );
  });
  it("should return location in England", async () => {
    const currentPosition = {
      latitude: 51.5049375,
      longitude: -0.0964509,
      accuracy: 60,
    };

    const output = {
      country: "England",
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      haversine: {
        distance: 0,
        measurement: "km",
        accuracy: currentPosition.accuracy,
      },
    };
    expect(await getClosestPosition(currentPosition, locationPoints)).toEqual(
      output
    );
  });
});

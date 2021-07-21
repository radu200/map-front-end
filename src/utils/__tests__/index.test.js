import { getParamsTaxi } from "../index";

describe("Taxi Params", () => {
  it("should work with given params", async () => {
    const params = {
      count: 2,
      latitude: 51.5049375,
      longitude: -0.0964509,
    };

    expect(
      getParamsTaxi(params.latitude, params.longitude, params.count)
    ).toEqual(params);
  });
});

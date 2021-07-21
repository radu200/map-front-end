export function getParamsTaxi(
  latitude: number,
  longitude: number,
  count: number
) {
  const params = {
    latitude,
    longitude,
    count,
  };
  return params;
}

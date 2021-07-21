interface count {
  count: number;
}

interface taxiLocation extends Coordonates {
  bearing: number;
}

export interface Coordonates {
  latitude: number;
  longitude: number;
}
export type taxiApiParams = Coordonates & count;

export interface Taxi {
  driver_id: string;
  location: taxiLocation;
}

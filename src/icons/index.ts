
import L from 'leaflet';
import TaxiLogo from '../assets/taxi.png'

export const IconTaxi = new L.Icon({
  iconUrl: TaxiLogo,
  iconSize: new L.Point(50,50),
  className: 'leaflet-div-icon-taxi'
});

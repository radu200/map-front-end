import { useState, useEffect, useCallback } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { getTaxisLocation } from '../api/Taxi';
import OfficeData from '../api/Office';
import { Taxi, Coordonates, taxiApiParams } from '../types'
import Slider from '../components/Slider';
import Button from '../components/Button';
import { getParamsTaxi } from '../utils/'
import { getClosestPosition, getCurrentPostion } from '../utils/Geolocation'
import { IconTaxi } from "../icons"
import * as Enums from '../enums';


interface State {
  officeLocation: Coordonates
  taxiCount: number,
  taxis: Array<Taxi>,
  error: string | null
}

const defaultTaxisCount = 5;
const deafultLocation = { latitude: 33.6456583, longitude: -86.6836001 };

export default function TaxiMap() {
  const [state, setState] = useState<State>({
    officeLocation: deafultLocation,
    taxiCount: defaultTaxisCount,
    taxis: [],
    error: null,
  })

  async function getClosesOffice() {
    const currentPosition = await getCurrentPostion()
    const points = OfficeData.map((d) => d.location);
    const data = await getClosestPosition(currentPosition, points)
    return data;
  }

  const fetchTaxiLocation = async (params: taxiApiParams) => {
    try {
      const response = await getTaxisLocation(params);
      if (response.status === 200) {
        const { data } = response;
        setState((state) => ({ ...state, taxis: data.drivers }))
      }

    } catch (error) {
      setState((state) => ({ ...state, error: error.response }))
    }
  }


  useEffect(() => {
    async function init() {
      const coord = await getClosesOffice()
      setState((state) => ({ ...state, officeLocation: { latitude: coord.latitude, longitude: coord.longitude } }))
    }
    init()
  }, [])


  useEffect(() => {
    const params = getParamsTaxi(
      state.officeLocation.latitude,
      state.officeLocation.longitude,
      state.taxiCount)

    const timerInterval = setInterval(() => {
      fetchTaxiLocation(params)
    }, 8000);

    const timerTimeout = setTimeout(() => {
      fetchTaxiLocation(params)
    }, 300);

    return () => {
      clearInterval(timerInterval)
      clearTimeout(timerTimeout)
    };

  }, [state.taxiCount, state.officeLocation])


  const getSliderCount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value)
    setState((state) => ({ ...state, taxiCount: count }))
  }, [])

  const getOffice = useCallback((location: Coordonates) => {
    setState((state) => ({ ...state, officeLocation: location }))
  }, [])

  const { officeLocation, taxis, taxiCount, error } = state;

  return (
    <div>
      <Map center={[officeLocation.latitude, officeLocation.longitude]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[officeLocation.latitude, officeLocation.longitude]}>
          <Popup>
            My location
          </Popup>
        </Marker>
        {taxis.map(d => (
          <Marker icon={IconTaxi} key={d.driver_id} position={[d.location.latitude, d.location.longitude]}>
            <Popup>
              Taxi
            </Popup>
          </Marker>
        ))}
      </Map>
      <div className="container" >
        <div>
          <h4>Choose cars number</h4>
          <Slider onChange={getSliderCount} min={Enums.Slider.min} max={Enums.Slider.max} currentValue={state.taxiCount} />
          {taxiCount}
        </div>
        <div>
          <h4>Choose Office</h4>
          {OfficeData.map(d => (
            <Button key={d.id} onClick={() => getOffice(d.location)} title={d.country} />
          ))}
        </div>
        <p className="error">{error}</p>
      </div>
    </div>
  );
}



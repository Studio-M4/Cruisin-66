import axios from 'axios';

const toSortableStops = (stops) => {
  return stops.reduce((obj, stop) => {
    obj[stop.id] = stop;
    return obj;
  }, {});
}

const sortStopsByOrder = (stops) => stops.sort((stopA, stopB) => {
  return stopA.Itineraries[0].ItineraryStops.order - stopB.Itineraries[0].ItineraryStops.order;
});

const getStopsIdsOrder = (stops) => stops.map((stop) => stop.id);

const updateStopsOrder = (stopsIdsByOrder, itineraryId) => {
  console.log('ITINERARY_ID: ', itineraryId);
  const url = 'http://localhost:3000/itinerarystops/order';
  axios.put(url, {stopsIdsByOrder, itineraryId})
       .then((res) => console.log(res.data))
       .catch((err) => console.log(err));
};

export { toSortableStops, getStopsIdsOrder, updateStopsOrder, sortStopsByOrder};
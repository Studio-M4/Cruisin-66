import axios from 'axios';

const toSortableStops = (stops) => {
  return stops.reduce((obj, stop) => {
    obj[stop.id] = stop;
    return obj;
  }, {});
}

const getStopsOrder = (stops) => stops.map((stop) => stop.id);

const updateStopsOrder = (idsByOrder) => {
  const url = 'http://localhost:3000/stops/order';
  axios.put(url, {idsByOrder})
       .then((res) => console.log(res.data))
       .catch((err) => console.log(err));
};

export { toSortableStops, getStopsOrder, updateStopsOrder };
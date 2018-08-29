const toSortableStops = (stops) => {
  return stops.reduce((obj, stop) => {
    obj[stop.id] = stop;
    return obj;
  }, {});
}

const getStopsOrder = (stops) => stops.map((stop) => stop.id);

export { toSortableStops, getStopsOrder };
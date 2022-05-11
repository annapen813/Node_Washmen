

export async function getRangeKms(lat1, lon1, lat2, lon2) 
{
  const R = 6371; // km

  //Degree to Radians
  const distLat = (lat2-lat1) * Math.PI / 180;
  const distLon = (lon2-lon1) * Math.PI / 180;
  const latitude1 = lat1 * Math.PI / 180;
  const latitude2 = lat2 * Math.PI / 180;

  //Calculating the Distance 
  const a = Math.sin(distLat/2) * Math.sin(distLat/2) +
          Math.sin(distLon/2) * Math.sin(distLon/2) * Math.cos(latitude1) * Math.cos(latitude2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c;
  return d;
}

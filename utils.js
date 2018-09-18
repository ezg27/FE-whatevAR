
export const latLongToMerc = (lat, long) => {
    var lon_rad = (long / 180.0 * Math.PI)
    var lat_rad = (lat / 180.0 * Math.PI)
    var sm_a = 6378137.0
    var xmeters  = sm_a * lon_rad
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
    return ({x:xmeters, y:ymeters});
 }

 export const transformPointToAR = (deviceLat, deviceLong, businessLat, businessLong) => {
  var objPoint = latLongToMerc(businessLat, businessLong);
  var devicePoint = latLongToMerc(deviceLat, deviceLong);
  var objFinalPosZ = objPoint.y - devicePoint.y;
  var objFinalPosX = objPoint.x - devicePoint.x;
  return ({x:objFinalPosX, z:-objFinalPosZ});
}
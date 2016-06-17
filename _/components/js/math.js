function distance_to_point(x1,y1,x2,y2)
{
  if(x1 < x2)
  {
    var x = x2-x1;
  }
  else
  {
    var x = x1-x2;
  }
  if(y1 < y2)
  {
    var y = y2-y1;
  }
  else
  {
    var y = y1-y2;
  }
  var dis = y / x;
  dis = x + dis;
  return dis;
}
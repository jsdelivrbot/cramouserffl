export const getNested = (obj:any, path:any, def?:any) => {
  var i, len;

  for(i = 0,path = path.split('.'), len = path.length; i < len; i++){
      if(!obj || typeof obj !== 'object') return def;
      obj = obj[path[i]];
  }

  if(obj === undefined) return def;
  return obj;
}
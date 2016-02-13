const ORIGIN = 'http://localhost:5000';
const METHODS = { get:  'GET', post: 'POST' };
const ROUTES = {
  'clients'       : { method: METHODS.get,  url: `${ORIGIN}/clients`      },
  'invoices'      : { method: METHODS.get,  url: `${ORIGIN}/invoices`     },
  'createClient'  : { method: METHODS.post, url: `${ORIGIN}/clients/new`  },
  'createInvoice' : { method: METHODS.post, url: `${ORIGIN}/invoices/new` },
}

const querySerializer = (obj, prefix) => {
  let str = [];
  for(let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
               querySerializer(v, k) :
               encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

const injectToUrl = (route, query) => {
  let newRoute = Object.assign({}, route);
  newRoute.url = newRoute.url.replace(/\/:.[^\/]+/, (str) => {
    str = str.replace(/\/:/, '');
    let result = `/${query[str]}`;
    delete query[str];
    return result;
  });
  return [ newRoute, query ];
}

export default function request ( routeName, query ) {
  let route = ROUTES[routeName];
  let conf = { type: route.method, dataType: 'JSON' };

  conf.method = route.method;

  [ route, query ] = injectToUrl(route, query);

  if (conf.method === METHODS.get ) {
    conf.url = `${route.url}?${querySerializer(query)}`
  } else if (conf.method === METHODS.post ) {
    conf.url = route.url;
    conf.data = query;
  } else {
    throw new Error(`Not a valid method! ${conf.method}`);
  }

  return $.ajax(conf).then( (data, textStatus, jqXHR) => data );
}

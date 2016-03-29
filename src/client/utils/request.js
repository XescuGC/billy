const ORIGIN = 'http://localhost:5000';
const ROUTES = {
  'clients'           : { method: 'GET',    url: `${ORIGIN}/clients`      },
  'config'            : { method: 'GET',    url: `${ORIGIN}/config`       },
  'invoices'          : { method: 'GET',    url: `${ORIGIN}/invoices`     },
  'createClient'      : { method: 'POST',   url: `${ORIGIN}/clients/new`  },
  'createInvoice'     : { method: 'POST',   url: `${ORIGIN}/invoices/new` },
  'updateInvoice'     : { method: 'POST',   url: `${ORIGIN}/invoices/:id` },
  'updateConfig'      : { method: 'POST',   url: `${ORIGIN}/config`       },
  'deleteInvoice'     : { method: 'DELETE', url: `${ORIGIN}/invoices/:id` },
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

  if (conf.method === 'GET' ) {
    conf.url = `${route.url}?${querySerializer(query)}`
  } else if (conf.method === 'POST' ) {
    conf.url = route.url;
    conf.data = query;
  } else {
    conf.url = route.url;
  }

  return $.ajax(conf).then( (data, textStatus, jqXHR) => data );
}

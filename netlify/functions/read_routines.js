const faunadb = require('faunadb');

const q = faunadb.query;
const { Map, Paginate, Documents, Collection, Get, Lambda } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

exports.handler = async (event, context) => {
  // set cors here
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    }
  }

  try {
    const res = await client.query(Map(
      Paginate(Documents(Collection('routines'))),
      Lambda(x => Get(x))
    ))
    .then(o => {
      return o.data.map(mapO => {
        return {
          ...mapO.data,
          id: mapO.ref.id
        }
      });
    });
    
    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res)
    }
  } catch (err) {

    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
}
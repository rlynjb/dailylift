const faunadb = require('faunadb');

const q = faunadb.query;
const { Update, Collection, Ref } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

// utils
const getId = (path) => {
  return path.match(/\/(\d*)/g)[3].replace('/', '');
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
    const data = JSON.parse(event.body);
    const id = getId(event.path); // revise this to retrieve id

    const res = await client.query(Update(
      Ref(Collection('workouts'), id),
      { data }
    ))
    .then(o => {
      return {
        ...o.data,
        id: o.ref.id
      }
    });

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res)
    };
  } catch (err) {

    return {
      statusCode: 400,
      body: JSON.stringify(res)
    };
  }
}
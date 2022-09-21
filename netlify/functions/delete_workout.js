const faunadb = require('faunadb');

const q = faunadb.query;
const { Delete, Collection } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
}

exports.handler = async (event, context) => {
  try {
    const id = event.path; // revise this to retrieve id
    console.log('KIRBY', id);

    const res = client.query(Delete(
      Collection(`workouts/${id}`)
    ));

    // set cors here
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
      }
    }

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
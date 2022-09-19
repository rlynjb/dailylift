const faunadb = require('faunadb');

const q = faunadb.query;
const { Get, Ref } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

exports.handler = async (event, context, callback) => {
  try {
    const id = event.path;
    console.log('ID KIRBY', id);

    const res = await client.query(Get(Ref(`workouts/${id}`)));

    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
}
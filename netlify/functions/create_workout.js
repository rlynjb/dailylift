/**
 * complete tutorial
 * CRUD with FaunaDB, Netlify, Nuxt
 * https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-and-faunadb/#3-create-a-function
 * https://davidparks.dev/blog/building-a-like-counter-with-faunadb-and-nuxt/
 */

const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

exports.handler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body);
    const res = await client.query(q.Create(q.Collection("workouts"), { data: data }));

    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
  } catch (err) {

    return {
      statusCode: 400,
      body: JSON.stringify(res)
    };
  }
};
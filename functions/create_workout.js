/**
 * complete tutorial
 * CRUD with FaunaDB, Netlify, Nuxt
 * https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-and-faunadb/#3-create-a-function
 * https://davidparks.dev/blog/building-a-like-counter-with-faunadb-and-nuxt/
 */

import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

// export our lambda function as named "handler" export
exports.handler = (event, context, callback) => {
  // parse the string body into a useable JS object
  const data = JSON.parse(event.body);
  console.log("Function `create_workout` invoked", data);

  const workoutItem = {
    data
  };

  // construct the fauna query
  return client.query( q.Create(q.Ref("dailylift-db/workouts"), workoutItem) )
    .then((res) => {
      console.log("SUCCESS create_workout: ", res)

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch((err) => {
      console.log("ERROR create_workout: ", err)

      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(err)
      });
    });
};
import faunadb from 'faunadb';

const client = new faunadb.Client({
  secret: process.env.DB_KEY,
  scheme: 'http',
  domain: '192.168.178.45',
  port: '3000'
});

const q = faunadb.query;

export { client, q };
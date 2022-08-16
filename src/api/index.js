import { client, q } from './db';

export const getData = client
  .query( /* query */ )
  .then(response => {
    console.log('response.data:')
    console.log(response.data)
  })
  .catch(e => {
    console.error( 'Error: ', e.message )
  })
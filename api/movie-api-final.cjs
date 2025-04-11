const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { title, page, id } = JSON.parse(event.body);
  const { OMDB_API_KEY } = process.env;

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify( data )
  };
};
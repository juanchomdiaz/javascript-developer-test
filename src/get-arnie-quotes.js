const { httpGet } = require("./mock-http-interface");

/**
 * An async function that fetches Arnie quotes from the provided URLs.
 *
 * @description
 *  - It uses Promise.all to fetch all quotes simultaneously and returns an array of objects.
 *  - Each object in the returned array has a single key-value pair:
 *    - If the HTTP request is successful (status code 200), the key is "Arnie Quote" and the value is the quote message.
 *    - If the HTTP request fails (any status code other than 200), the key is "FAILURE" and the value is the error message.
 *
 * @async
 * @param {string[]} urls - an array of URLs to fetch quotes from.
 * @returns {Promise<Array<{ 'Arnie Quote': string } | { 'FAILURE': string }>>}
 */
const getArnieQuotes = async (urls) => {
  return Promise.all(
    urls.map(async (url) => {
      const { status, body } = await httpGet(url);
      const { message } = JSON.parse(body);
      const key = status === 200 ? "Arnie Quote" : "FAILURE";
      return { [key]: message };
    }),
  );
};

module.exports = {
  getArnieQuotes,
};

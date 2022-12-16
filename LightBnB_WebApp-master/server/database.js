const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = (email) => {
  const value = [`${email}`];
  const noHaxQuery = `
    SELECT * 
    FROM users 
    WHERE email = $1
    `;
  return pool
    .query(noHaxQuery, value)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  const value = [`${id}`];
  const noHaxQuery = `
  SELECT * 
    FROM users 
    WHERE id = $1
    `;
  return pool
    .query(noHaxQuery, value)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = (user) => {
  const value = [`${user.name}`, `${user.email}`, `${user.password}`];
  const noHaxQuery = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
    `;
  return pool
    .query(noHaxQuery, value)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = (guest_id, limit = 10) => {
  const values = [`${guest_id}`, limit];
  const noHaxQuery = `
    SELECT reservations.id, properties.title, cost_per_night, start_date, AVG(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY start_date
    FETCH FIRST $2 ROWS ONLY;
    `;
  return pool
    .query(noHaxQuery, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const values = [limit];  
  let noHaxQuery = `    
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  if (options.city) {
    values.push(`%${options.city}%`);
    noHaxQuery += `WHERE city LIKE $${values.length} `;
  };

  if (options.owner_id) {
    values.push(`${options.owner_id}`);
    noHaxQuery += `AND owner_id = $${values.length} `;
  };

  if (options.minimum_price_per_night) {
    values.push(`${options.minimum_price_per_night}`);
    noHaxQuery += `AND cost_per_night >= $${values.length} `;
  };

  if (options.maximum_price_per_night) {
    values.push(100 * `${options.maximum_price_per_night}`);
    noHaxQuery += `AND cost_per_night <= $${values.length} `;
  };
  
  noHaxQuery += `GROUP BY properties.id `;
  if (options.minimum_rating) {
      values.push(`${options.minimum_rating}`);
      noHaxQuery += `HAVING AVG(property_reviews.rating) >= $${values.length}`;
    };

    noHaxQuery +=`
    ORDER BY cost_per_night
    FETCH FIRST $1 ROWS ONLY;
    `;
  console.log(noHaxQuery, values);
  return pool
  .query(noHaxQuery, values)
  .then((result) => {
    return result.rows;
    })
  .catch((err) => {
    console.log(err.message);
  });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;

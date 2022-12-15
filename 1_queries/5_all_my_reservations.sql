SELECT reservations.id, properties.title, cost_per_night, start_date, AVG(property_reviews.rating) AS average_rating
FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY start_date
FETCH FIRST 10 ROWS ONLY;
SELECT properties.id, title, cost_per_night, AVG(property_reviews.rating) as average_rating
FROM properties
LEFT JOIN property_reviews ON property_id = properties.id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
FETCH FIRST 10 ROWS ONLY;
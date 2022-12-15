-- LEFT join to include all cities on report to include those with no reservations as this could be an alert to not add more locations in that city
SELECT city, COUNT(reservations) as total_reservations
FROM properties
LEFT JOIN  reservations ON property_id = properties.id
GROUP BY city
ORDER BY total_reservations DESC;
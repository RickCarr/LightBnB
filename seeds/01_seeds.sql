INSERT INTO users (name, email, password) 
  VALUES
  ('Delete Me Sr.', 'Dee@lete.me', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Delete Me', 'D@lete.me', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Delete Me Jr.', 'D@1337.me', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES
  (1, 'house1', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61, 6, 4, 8, 'Canada', '1234 N. South St.', 'Metropolis', 'BC', 'h0h0h0'),
  (2, 'house2', 'description', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 852.61, 6, 6, 7, 'Canada', '1234 S. North St.', 'Metropolis', 'SK', 'h0h0h0'),
  (3, 'house3', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 460.61, 0, 5, 6, 'Canada', '1234 A. West St.', 'Metropolis', 'QC', 'h0h0h0');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES
  ('2018-09-11', '2018-09-26', 2, 3),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-14', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES
  (3, 2, 1, 3, 'messages'),
  (2, 2, 2, 4, 'messages'),
  (3, 1, 3, 4, 'messages');
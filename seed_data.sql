
-- Insert seed data
-- Note: Make sure the image URLs are valid or use placeholders. 
-- Since local imports won't work in SQL, we use placeholders or public URLS. 
-- For a real app, you would upload images to storage first and use their public URLs.

INSERT INTO properties (
  id,
  name,
  slug,
  type,
  location,
  address,
  price,
  "priceLabel",
  "shortDescription",
  "fullDescription",
  "isFeatured",
  features,
  images,
  amenities,
  coordinates
) VALUES 
(
  'e6c2e399-c854-4b57-b286-90f6e6d1d491',
  'Skyline Penthouse',
  'skyline-penthouse',
  'Apartment',
  'Manhattan, New York',
  '432 Park Avenue, Floor 78, New York, NY 10022',
  12500000,
  '$12,500,000',
  'Breathtaking penthouse with panoramic city views and world-class amenities.',
  'Experience the pinnacle of luxury living in this extraordinary penthouse perched atop one of Manhattan''s most prestigious addresses. Floor-to-ceiling windows frame spectacular 360-degree views of Central Park and the iconic city skyline. The residence features an open-concept living area with 14-foot ceilings, a chef''s kitchen with premium Gaggenau appliances, and a private terrace perfect for entertaining. The master suite offers a spa-like bathroom with heated floors and a soaking tub overlooking the city. Building amenities include 24-hour concierge, private dining room, fitness center, and direct access to a Michelin-starred restaurant.',
  true,
  '{"area": 4200, "bedrooms": 4, "bathrooms": 5, "parking": 2}',
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'],
  ARRAY['24/7 Concierge', 'Private Elevator', 'Wine Cellar', 'Smart Home System', 'Central Air', 'Private Terrace', 'Fitness Center Access', 'Valet Parking'],
  '{"lat": 40.7614, "lng": -73.9718}'
),
(
  'f7d3f488-e965-4c68-a397-a1f7f7d2e502',
  'Villa Serenità',
  'villa-serenita',
  'Villa',
  'Marbella, Spain',
  'Urbanización Sierra Blanca, 29602 Marbella, Spain',
  8900000,
  '€8,900,000',
  'Mediterranean masterpiece with lush gardens, pool, and stunning mountain views.',
  'Nestled in the prestigious Sierra Blanca neighborhood, Villa Serenità represents the finest in Mediterranean living. This exceptional property spans over 8,000 square feet of meticulously designed living space, surrounded by mature landscaped gardens and featuring an infinity pool that seems to merge with the horizon. The villa showcases traditional Spanish architecture with contemporary interiors, including hand-painted tiles, exposed wooden beams, and marble flooring throughout. The gourmet kitchen opens to an outdoor dining area perfect for al fresco entertaining. A private guest house and staff quarters complete this remarkable estate.',
  true,
  '{"area": 8500, "bedrooms": 6, "bathrooms": 7, "parking": 4}',
  ARRAY['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80'],
  ARRAY['Infinity Pool', 'Guest House', 'Wine Cellar', 'Home Theater', 'Gym', 'Sauna', 'Landscaped Gardens', 'Security System'],
  '{"lat": 36.5089, "lng": -4.8867}'
),
(
  'a8e4c5b9-1234-4c56-b789-0123456789ab',
  'Oceanfront Paradise',
  'oceanfront-paradise',
  'Villa',
  'Maldives',
  'North Malé Atoll, Republic of Maldives',
  15800000,
  '$15,800,000',
  'Private island villa with direct ocean access and unparalleled tropical luxury.',
  'Discover your own private paradise in this extraordinary oceanfront villa in the Maldives. Set on a pristine white sand beach with crystal-clear turquoise waters, this architectural marvel seamlessly blends indoor and outdoor living. The open-plan design features retractable glass walls that open to expansive decks and a private infinity pool overlooking the Indian Ocean. Wake to stunning sunrises from the master bedroom, positioned to capture the most spectacular views. The property includes a private dock, water sports equipment, and dedicated butler service. This is more than a home—it''s a lifestyle reserved for the most discerning buyers.',
  true,
  '{"area": 5800, "bedrooms": 5, "bathrooms": 6, "parking": 0}',
  ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80'],
  ARRAY['Private Beach', 'Infinity Pool', 'Private Dock', 'Water Sports', 'Butler Service', 'Outdoor Kitchen', 'Spa Room', 'Helipad Access'],
  '{"lat": 4.1755, "lng": 73.5093}'
);

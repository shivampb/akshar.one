import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export type PropertyType = "Apartment" | "Villa" | "Plot" | "Commercial";

export interface Property {
  id: string;
  name: string;
  slug: string;
  type: PropertyType;
  location: string;
  address: string;
  price: number;
  priceLabel: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  features: {
    area: number;
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
  amenities: string[];
  isFeatured: boolean;
  country?: string;
  state?: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const properties: Property[] = [
  {
    id: "1",
    name: "Skyline Penthouse",
    slug: "skyline-penthouse",
    type: "Apartment",
    location: "Manhattan, New York",
    address: "432 Park Avenue, Floor 78, New York, NY 10022",
    price: 12500000,
    priceLabel: "₹12,500,000",
    shortDescription: "Breathtaking penthouse with panoramic city views and world-class amenities.",
    fullDescription: "Experience the pinnacle of luxury living in this extraordinary penthouse perched atop one of Manhattan's most prestigious addresses. Floor-to-ceiling windows frame spectacular 360-degree views of Central Park and the iconic city skyline. The residence features an open-concept living area with 14-foot ceilings, a chef's kitchen with premium Gaggenau appliances, and a private terrace perfect for entertaining. The master suite offers a spa-like bathroom with heated floors and a soaking tub overlooking the city. Building amenities include 24-hour concierge, private dining room, fitness center, and direct access to a Michelin-starred restaurant.",
    images: [property1, property1, property1],
    features: {
      area: 4200,
      bedrooms: 4,
      bathrooms: 5,
      parking: 2,
    },
    amenities: [
      "24/7 Concierge",
      "Private Elevator",
      "Wine Cellar",
      "Smart Home System",
      "Central Air",
      "Private Terrace",
      "Fitness Center Access",
      "Valet Parking",
    ],
    isFeatured: true,
    coordinates: {
      lat: 40.7614,
      lng: -73.9718,
    },
  },
  {
    id: "2",
    name: "Villa Serenità",
    slug: "villa-serenita",
    type: "Villa",
    location: "Marbella, Spain",
    address: "Urbanización Sierra Blanca, 29602 Marbella, Spain",
    price: 8900000,
    priceLabel: "€8,900,000",
    shortDescription: "Mediterranean masterpiece with lush gardens, pool, and stunning mountain views.",
    fullDescription: "Nestled in the prestigious Sierra Blanca neighborhood, Villa Serenità represents the finest in Mediterranean living. This exceptional property spans over 8,000 square feet of meticulously designed living space, surrounded by mature landscaped gardens and featuring an infinity pool that seems to merge with the horizon. The villa showcases traditional Spanish architecture with contemporary interiors, including hand-painted tiles, exposed wooden beams, and marble flooring throughout. The gourmet kitchen opens to an outdoor dining area perfect for al fresco entertaining. A private guest house and staff quarters complete this remarkable estate.",
    images: [property2, property2, property2],
    features: {
      area: 8500,
      bedrooms: 6,
      bathrooms: 7,
      parking: 4,
    },
    amenities: [
      "Infinity Pool",
      "Guest House",
      "Wine Cellar",
      "Home Theater",
      "Gym",
      "Sauna",
      "Landscaped Gardens",
      "Security System",
    ],
    isFeatured: true,
    coordinates: {
      lat: 36.5089,
      lng: -4.8867,
    },
  },
  {
    id: "3",
    name: "Oceanfront Paradise",
    slug: "oceanfront-paradise",
    type: "Villa",
    location: "Maldives",
    address: "North Malé Atoll, Republic of Maldives",
    price: 15800000,
    priceLabel: "₹15,800,000",
    shortDescription: "Private island villa with direct ocean access and unparalleled tropical luxury.",
    fullDescription: "Discover your own private paradise in this extraordinary oceanfront villa in the Maldives. Set on a pristine white sand beach with crystal-clear turquoise waters, this architectural marvel seamlessly blends indoor and outdoor living. The open-plan design features retractable glass walls that open to expansive decks and a private infinity pool overlooking the Indian Ocean. Wake to stunning sunrises from the master bedroom, positioned to capture the most spectacular views. The property includes a private dock, water sports equipment, and dedicated butler service. This is more than a home—it's a lifestyle reserved for the most discerning buyers.",
    images: [property3, property3, property3],
    features: {
      area: 5800,
      bedrooms: 5,
      bathrooms: 6,
      parking: 0,
    },
    amenities: [
      "Private Beach",
      "Infinity Pool",
      "Private Dock",
      "Water Sports",
      "Butler Service",
      "Outdoor Kitchen",
      "Spa Room",
      "Helipad Access",
    ],
    isFeatured: true,
    coordinates: {
      lat: 4.1755,
      lng: 73.5093,
    },
  },
  {
    id: "4",
    name: "Alpine Retreat",
    slug: "alpine-retreat",
    type: "Villa",
    location: "Aspen, Colorado",
    address: "1234 Mountain View Road, Aspen, CO 81611",
    price: 22000000,
    priceLabel: "₹22,000,000",
    shortDescription: "Ski-in/ski-out mountain estate with breathtaking alpine views and luxury amenities.",
    fullDescription: "Embrace the ultimate mountain lifestyle in this spectacular ski-in/ski-out estate in Aspen's most coveted neighborhood. This architectural masterpiece combines rustic elegance with modern sophistication, featuring reclaimed timber beams, floor-to-ceiling stone fireplaces, and walls of glass that frame panoramic views of the surrounding peaks. The great room soars to dramatic heights, while the gourmet kitchen is equipped for entertaining on any scale. After a day on the slopes, retreat to the private spa complete with sauna, steam room, and heated outdoor pool. A separate guest wing ensures privacy for visitors, and the three-car heated garage accommodates all your mountain toys.",
    images: [property4, property4, property4],
    features: {
      area: 11000,
      bedrooms: 7,
      bathrooms: 9,
      parking: 3,
    },
    amenities: [
      "Ski-in/Ski-out",
      "Heated Pool",
      "Spa & Sauna",
      "Home Theater",
      "Wine Cellar",
      "Game Room",
      "Heated Driveway",
      "Smart Home",
    ],
    isFeatured: false,
    coordinates: {
      lat: 39.1911,
      lng: -106.8175,
    },
  },
  {
    id: "5",
    name: "SoHo Industrial Loft",
    slug: "soho-industrial-loft",
    type: "Apartment",
    location: "SoHo, New York",
    address: "155 Wooster Street, New York, NY 10012",
    price: 6750000,
    priceLabel: "₹6,750,000",
    shortDescription: "Iconic loft space with soaring ceilings, exposed brick, and designer finishes.",
    fullDescription: "Live in a piece of New York history with this extraordinary SoHo loft, originally built in the late 1800s and meticulously renovated to the highest standards. The 4,500 square foot residence showcases original cast-iron columns, exposed brick walls, and 16-foot ceilings that flood the space with natural light. The open floor plan provides endless possibilities for living and entertaining, while the chef's kitchen features top-of-the-line appliances and custom cabinetry. The master suite occupies its own wing, offering a private sanctuary in the heart of the city. Located on a prime cobblestone street, you're steps from world-class dining, galleries, and boutiques.",
    images: [property5, property5, property5],
    features: {
      area: 4500,
      bedrooms: 3,
      bathrooms: 3,
      parking: 1,
    },
    amenities: [
      "Original Details",
      "Private Keyed Elevator",
      "Central Air",
      "In-Unit Laundry",
      "Storage",
      "Pet Friendly",
      "Doorman Building",
      "Roof Access",
    ],
    isFeatured: false,
    coordinates: {
      lat: 40.7246,
      lng: -74.0019,
    },
  },
  {
    id: "6",
    name: "Château de Lumière",
    slug: "chateau-de-lumiere",
    type: "Villa",
    location: "Bordeaux, France",
    address: "Route des Châteaux, 33250 Pauillac, France",
    price: 18500000,
    priceLabel: "€18,500,000",
    shortDescription: "Historic French estate with private vineyard and exceptional wine-making facilities.",
    fullDescription: "Step into a world of timeless elegance at Château de Lumière, a magnificent 18th-century estate in the heart of Bordeaux's most prestigious wine region. This remarkable property combines Old World grandeur with contemporary comfort across 15,000 square feet of living space. The main residence features formal reception rooms, a grand library, and a chef's kitchen with professional-grade equipment. The property includes 25 acres of producing vineyard, a state-of-the-art winery, and an underground cellar housing over 5,000 bottles. A renovated carriage house provides additional guest accommodations, while manicured French gardens and ancient oak trees create a setting of unparalleled beauty.",
    images: [property6, property6, property6],
    features: {
      area: 15000,
      bedrooms: 10,
      bathrooms: 12,
      parking: 6,
    },
    amenities: [
      "Private Vineyard",
      "Wine Cellar",
      "Guest House",
      "Pool & Tennis",
      "Formal Gardens",
      "Chapel",
      "Staff Quarters",
      "Helipad",
    ],
    isFeatured: true,
    coordinates: {
      lat: 45.1987,
      lng: -0.7501,
    },
  },
];

export const getPropertyBySlug = (slug: string): Property | undefined => {
  return properties.find((p) => p.slug === slug);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter((p) => p.isFeatured);
};

export const getPropertyTypes = (): PropertyType[] => {
  return ["Apartment", "Villa", "Plot", "Commercial"];
};

export const getLocations = (): string[] => {
  return [...new Set(properties.map((p) => p.location))];
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

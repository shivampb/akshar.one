export interface Blog {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    author: string;
}

export const blogs: Blog[] = [
    {
        id: 1,
        title: "Luxury Living: The Future of Residential Spaces",
        excerpt: "Discover how modern architecture is reshaping luxury residential developments with sustainable design and smart home technology.",
        category: "Trends",
        date: "Feb 5, 2026",
        image: "/src/assets/property-1.jpg",
        author: "Sarah Johnson"
    },
    {
        id: 2,
        title: "Investment Opportunities in Premium Real Estate",
        excerpt: "Expert insights on the best locations and property types for long-term real estate investment in 2026.",
        category: "Investment",
        date: "Feb 3, 2026",
        image: "/src/assets/property-2.jpg",
        author: "Michael Chen"
    },
    {
        id: 3,
        title: "Sustainable Architecture in Modern Homes",
        excerpt: "How eco-friendly design principles are being integrated into luxury residential projects.",
        category: "Sustainability",
        date: "Jan 28, 2026",
        image: "/src/assets/property-3.jpg",
        author: "Emma Davis"
    },
    {
        id: 4,
        title: "Smart Home Technology: The New Standard",
        excerpt: "Exploring the latest innovations in home automation and how they're enhancing modern living.",
        category: "Technology",
        date: "Jan 25, 2026",
        image: "/src/assets/property-4.jpg",
        author: "David Martinez"
    },
    {
        id: 5,
        title: "Urban vs Suburban: Where to Invest Now",
        excerpt: "A comprehensive analysis of market trends and future predictions for different property locations.",
        category: "Market Analysis",
        date: "Jan 20, 2026",
        image: "/src/assets/property-5.jpg",
        author: "Lisa Anderson"
    },
    {
        id: 6,
        title: "The Art of Interior Design in Luxury Homes",
        excerpt: "Timeless design principles that create stunning interiors in high-end properties.",
        category: "Design",
        date: "Jan 15, 2026",
        image: "/src/assets/property-6.jpg",
        author: "Robert Taylor"
    }
];

import { Metadata } from 'next';
import About from "@/components/pages/About";

export const metadata: Metadata = {
    title: "About Us | Akshar One Luxury Real Estate",
    description: "Learn about Akshar One's legacy in luxury real estate. Over 15 years of excellence in connecting discerning buyers with extraordinary properties.",
    keywords: "about akshar one, luxury real estate company, real estate agents, property consultants, our story",
    openGraph: {
        title: "About Us | Akshar One Luxury Real Estate",
        description: "Learn about Akshar One's legacy in luxury real estate. Over 15 years of excellence in connecting discerning buyers with extraordinary properties.",
    },
};

export default function AboutPage() {
    return <About />;
}

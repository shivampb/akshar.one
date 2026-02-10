import { Metadata } from 'next';
import Contact from "@/components/pages/Contact";

export const metadata: Metadata = {
    title: "Contact Us | Akshar One Luxury Real Estate",
    description: "Get in touch with Akshar One for your luxury real estate needs. Whether buying or selling, our team is ready to assist you. Contact us today.",
    keywords: "contact akshar one, luxury real estate contact, real estate inquiry, buy luxury home, sell luxury property",
    openGraph: {
        title: "Contact Us | Akshar One Luxury Real Estate",
        description: "Get in touch with Akshar One for your luxury real estate needs. Whether buying or selling, our team is ready to assist you. Contact us today.",
    },
};

export default function ContactPage() {
    return <Contact />;
}

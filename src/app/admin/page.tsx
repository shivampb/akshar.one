import { Metadata } from 'next';
import Admin from "@/components/pages/Admin";

export const metadata: Metadata = {
    title: "Admin Dashboard | Akshar One",
    description: "Secure admin dashboard for managing properties and blog posts.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminPage() {
    return <Admin />;
}

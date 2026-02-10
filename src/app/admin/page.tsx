import { Metadata } from 'next';
import AdminDashboard from "../../components/admin/AdminDashboard";

export const metadata: Metadata = {
    title: "Admin Dashboard | Akshar One",
    description: "Secure admin dashboard for managing properties and blog posts.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminPage() {
    return <AdminDashboard />;
}

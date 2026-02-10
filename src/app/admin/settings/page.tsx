import { Metadata } from 'next';
import AdminSettings from "@/components/admin/AdminSettings";

export const metadata: Metadata = {
    title: "Settings | Admin",
    description: "Admin settings and configuration",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SettingsPage() {
    return <AdminSettings />;
}

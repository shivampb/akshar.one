import { Metadata } from 'next';
import PropertiesManagement from "../../../components/admin/PropertiesManagement";

export const metadata: Metadata = {
    title: "Manage Properties | Admin",
    description: "Manage your property listings",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PropertiesPage() {
    return <PropertiesManagement />;
}

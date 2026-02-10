import { Metadata } from 'next';
import PropertiesManagement from "@/components/admin/PropertiesManagement";

export const metadata: Metadata = {
    title: "Add Property | Admin",
    robots: { index: false, follow: false },
};

export default function AddPropertyPage() {
    return <PropertiesManagement />;
}

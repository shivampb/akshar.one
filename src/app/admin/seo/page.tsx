import { Metadata } from 'next';
import { PageSeoManagement } from "../../../components/admin/PageSeoManagement";
import { AdminLayout } from "../../../components/admin/AdminLayout";

export const metadata: Metadata = {
    title: "Page SEO Management | Admin",
    description: "Manage meta details for your website pages",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SeoPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Page SEO</h2>
                    <p className="text-gray-600 mt-1">
                        Manage meta titles and descriptions for focus pages
                    </p>
                </div>
                <PageSeoManagement />
            </div>
        </AdminLayout>
    );
}

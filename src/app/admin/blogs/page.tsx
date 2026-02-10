import { Metadata } from 'next';
import BlogsManagement from "../../../components/admin/BlogsManagement";

export const metadata: Metadata = {
    title: "Manage Blogs | Admin",
    description: "Manage your blog posts",
    robots: {
        index: false,
        follow: false,
    },
};

export default function BlogsPage() {
    return <BlogsManagement />;
}

import { Metadata } from 'next';
import BlogsManagement from "@/components/admin/BlogsManagement";

export const metadata: Metadata = {
    title: "Edit Blog | Admin",
    robots: { index: false, follow: false },
};

export default function EditBlogPage() {
    return <BlogsManagement />;
}

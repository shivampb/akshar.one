import { Metadata } from 'next';
import BlogsManagement from "@/components/admin/BlogsManagement";

export const metadata: Metadata = {
    title: "New Post | Admin",
    robots: { index: false, follow: false },
};

export default function AddBlogPage() {
    return <BlogsManagement />;
}

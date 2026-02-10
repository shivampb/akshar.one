"use client";

import { Blog } from "@/data/blogs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface BlogManagerProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: number) => void;
}

export const BlogManager = ({ blogs, onEdit, onDelete }: BlogManagerProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>
                    Manage your blog posts, edit content, and handle publications.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No blogs found. Create your first post!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                blogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell className="font-medium max-w-[300px] truncate" title={blog.title}>
                                            {blog.title}
                                        </TableCell>
                                        <TableCell>{blog.category}</TableCell>
                                        <TableCell>{blog.author}</TableCell>
                                        <TableCell className="whitespace-nowrap">{blog.date}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/blogs/${blog.category.toLowerCase().replace(/ /g, '-')}/${blog.slug || blog.id}`}
                                                    target="_blank"
                                                >
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">View</span>
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onEdit(blog)}
                                                    className="h-8 w-8"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                                                    onClick={() => onDelete(blog.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

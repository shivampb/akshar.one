import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Blog } from "@/data/blogs";

interface BlogCardProps {
    blog: Blog;
    index: number;
}

export const BlogCard = ({ blog, index }: BlogCardProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer h-full"
        >
            <Link to={`/blogs/${blog.category.toLowerCase().replace(/ /g, '-')}/${blog.slug || blog.id}`} className="block h-full">
                <div className="modular-card overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 bg-gold text-white text-xs font-medium uppercase tracking-wider rounded-full">
                                {blog.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                <span>{blog.author}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-medium mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                            {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                            {blog.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

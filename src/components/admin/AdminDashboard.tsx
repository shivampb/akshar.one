"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, Eye, TrendingUp, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Stats {
  totalProperties: number;
  totalBlogs: number;
  recentViews: number;
  activeListings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    totalBlogs: 0,
    recentViews: 0,
    activeListings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch properties count
        const { count: propertiesCount } = await supabase
          .from("properties")
          .select("*", { count: "exact", head: true });

        // Fetch blogs count
        const { count: blogsCount } = await supabase
          .from("blogs")
          .select("*", { count: "exact", head: true });

        setStats({
          totalProperties: propertiesCount || 0,
          totalBlogs: blogsCount || 0,
          recentViews: 1234, // Placeholder - you can add analytics later
          activeListings: propertiesCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Recent Views",
      value: stats.recentViews,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Listings",
      value: stats.activeListings,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your real
            estate business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card
              key={stat.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Manage Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Add, edit, or remove property listings from your portfolio.
                </p>
                <a
                  href="/admin/properties"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Go to Properties →
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                  Manage Blogs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Create and manage blog posts to engage your audience.
                </p>
                <a
                  href="/admin/blogs"
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Go to Blogs →
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Manage Page SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Optimize titles and descriptions for search engines.
                </p>
                <a
                  href="/admin/seo"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  Go to SEO Settings →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Bell, Shield } from "lucide-react";

export default function AdminSettings() {
    return (
        <AdminLayout>
            <div className="space-y-6 max-w-4xl">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profile Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="admin-name">Admin Name</Label>
                            <Input id="admin-name" defaultValue="Admin" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="admin-email">Email</Label>
                            <Input
                                id="admin-email"
                                type="email"
                                defaultValue="admin@aksharone.com"
                                className="mt-2"
                            />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" className="mt-2" />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Update Password
                        </Button>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-gray-600">
                                        Receive updates about new inquiries
                                    </p>
                                </div>
                                <input type="checkbox" defaultChecked className="toggle" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Property Updates</p>
                                    <p className="text-sm text-gray-600">
                                        Get notified when properties need attention
                                    </p>
                                </div>
                                <input type="checkbox" defaultChecked className="toggle" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* System Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            System Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Version:</span>
                                <span className="font-medium">1.0.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Last Login:</span>
                                <span className="font-medium">Today at 11:30 AM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Database Status:</span>
                                <span className="font-medium text-green-600">Connected</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

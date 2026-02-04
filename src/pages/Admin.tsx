import { useState } from "react";
import { Property, properties as initialProperties, PropertyType } from "@/data/properties";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const propertySchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["Apartment", "Villa", "Plot", "Commercial"] as const),
    location: z.string().min(1, "Location is required"),
    address: z.string().min(1, "Address is required"),
    price: z.number().min(0, "Price must be positive"),
    shortDescription: z.string().min(1, "Short description is required"),
    fullDescription: z.string().min(1, "Full description is required"),
    isFeatured: z.boolean().default(false),
    features: z.object({
        area: z.number().min(0),
        bedrooms: z.number().min(0),
        bathrooms: z.number().min(0),
        parking: z.number().min(0),
    }),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            type: "Apartment",
            isFeatured: false,
            features: { area: 0, bedrooms: 0, bathrooms: 0, parking: 0 },
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin123") {
            setIsAuthenticated(true);
            toast.success("Logged in successfully");
        } else {
            toast.error("Invalid credentials");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
    };

    const onSubmit = (data: PropertyFormValues) => {
        if (editingProperty) {
            // Update existing
            const updatedProperty: Property = {
                ...editingProperty,
                name: data.name,
                type: data.type,
                location: data.location,
                address: data.address,
                price: data.price,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                isFeatured: data.isFeatured,
                features: {
                    area: data.features.area,
                    bedrooms: data.features.bedrooms,
                    bathrooms: data.features.bathrooms,
                    parking: data.features.parking,
                },
                slug: data.name.toLowerCase().replace(/ /g, "-"),
                priceLabel: `$${data.price.toLocaleString()}`,
            };

            setProperties(
                properties.map((p) =>
                    p.id === editingProperty.id ? updatedProperty : p
                )
            );
            toast.success("Property updated");
        } else {
            // Add new
            const newProperty: Property = {
                id: Math.random().toString(36).substr(2, 9),
                name: data.name,
                type: data.type,
                location: data.location,
                address: data.address,
                price: data.price,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                isFeatured: data.isFeatured,
                features: {
                    area: data.features.area,
                    bedrooms: data.features.bedrooms,
                    bathrooms: data.features.bathrooms,
                    parking: data.features.parking,
                },
                slug: data.name.toLowerCase().replace(/ /g, "-"),
                priceLabel: `$${data.price.toLocaleString()}`,
                images: [],
                coordinates: { lat: 0, lng: 0 },
                amenities: [],
            };
            setProperties([...properties, newProperty]);
            toast.success("Property added");
        }
        setIsDialogOpen(false);
        setEditingProperty(null);
        form.reset();
    };

    const startEdit = (property: Property) => {
        setEditingProperty(property);
        form.reset({
            name: property.name,
            type: property.type,
            location: property.location,
            address: property.address,
            price: property.price,
            shortDescription: property.shortDescription,
            fullDescription: property.fullDescription,
            isFeatured: property.isFeatured,
            features: property.features,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter((p) => p.id !== id));
            toast.success("Property deleted");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 pt-24 min-h-[calc(100vh-80px)]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
                        <p className="text-muted-foreground mt-1">Manage your property listings and details.</p>
                    </div>
                    <div className="flex gap-4">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => { setEditingProperty(null); form.reset(); }} className="gap-2">
                                    <Plus className="h-4 w-4" /> Add Property
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingProperty ? "Edit Property" : "Add Property"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Property Name</Label>
                                            <Input id="name" {...form.register("name")} />
                                            {form.formState.errors.name && (
                                                <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Type</Label>
                                            <Select
                                                onValueChange={(value) => form.setValue("type", value as PropertyType)}
                                                defaultValue={editingProperty?.type || "Apartment"}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                                    <SelectItem value="Villa">Villa</SelectItem>
                                                    <SelectItem value="Plot">Plot</SelectItem>
                                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                {...form.register("price", { valueAsNumber: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input id="location" {...form.register("location")} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Full Address</Label>
                                        <Input id="address" {...form.register("address")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="shortDescription">Short Description</Label>
                                        <Input id="shortDescription" {...form.register("shortDescription")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="fullDescription">Full Description</Label>
                                        <Textarea id="fullDescription" {...form.register("fullDescription")} className="min-h-[100px]" />
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="area">Area (sq ft)</Label>
                                            <Input
                                                id="area"
                                                type="number"
                                                {...form.register("features.area", { valueAsNumber: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bedrooms">Bedrooms</Label>
                                            <Input
                                                id="bedrooms"
                                                type="number"
                                                {...form.register("features.bedrooms", { valueAsNumber: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bathrooms">Bathrooms</Label>
                                            <Input
                                                id="bathrooms"
                                                type="number"
                                                {...form.register("features.bathrooms", { valueAsNumber: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="parking">Parking</Label>
                                            <Input
                                                id="parking"
                                                type="number"
                                                {...form.register("features.parking", { valueAsNumber: true })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 bg-secondary/20 p-4 rounded-md">
                                        <Checkbox
                                            id="isFeatured"
                                            checked={form.watch("isFeatured")}
                                            onCheckedChange={(checked) => form.setValue("isFeatured", checked as boolean)}
                                        />
                                        <Label htmlFor="isFeatured" className="cursor-pointer">Mark as Featured</Label>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        {editingProperty ? "Update Property" : "Create Property"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Properties</CardTitle>
                        <CardDescription>
                            A list of all properties currently in the system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Property Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {properties.map((property) => (
                                        <TableRow key={property.id}>
                                            <TableCell className="font-medium whitespace-nowrap">{property.name}</TableCell>
                                            <TableCell>{property.type}</TableCell>
                                            <TableCell>{property.location}</TableCell>
                                            <TableCell className="whitespace-nowrap">{property.priceLabel}</TableCell>
                                            <TableCell>
                                                <Badge variant={property.isFeatured ? "default" : "secondary"}>
                                                    {property.isFeatured ? "Featured" : "Standard"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => startEdit(property)}
                                                        className="h-8 w-8"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:text-destructive/90"
                                                        onClick={() => handleDelete(property.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default Admin;

import { Property } from "@/data/properties";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface PropertyListProps {
    properties: Property[];
    onEdit: (property: Property) => void;
    onDelete: (id: string) => void;
}

export const PropertyList = ({ properties, onEdit, onDelete }: PropertyListProps) => {
    return (
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
                                                onClick={() => onEdit(property)}
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive/90"
                                                onClick={() => onDelete(property.id)}
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
    );
};

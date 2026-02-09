import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const SeoSection = () => {
    const { register } = useFormContext();

    return (
        <div className="space-y-4 border rounded-lg p-4 bg-muted/20">
            <h3 className="font-semibold text-lg">SEO Settings</h3>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                        id="meta_title"
                        placeholder="SEO Title (defaults to property name)"
                        {...register("meta_title")}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                        id="meta_description"
                        placeholder="SEO Description (defaults to short description)"
                        className="h-20"
                        {...register("meta_description")}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                        id="keywords"
                        placeholder="Comma separated keywords (e.g. luxury, villa, sea view)"
                        {...register("keywords")}
                    />
                </div>
            </div>
        </div>
    );
};

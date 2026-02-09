import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "./schema";

export const FAQSection = () => {
    const { register, control, formState: { errors } } = useFormContext<PropertyFormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "faqs",
    });

    return (
        <div className="space-y-4 rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ question: "", answer: "" })}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add FAQ
                </Button>
            </div>

            {fields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                    No FAQs added yet. Click "Add FAQ" to get started.
                </p>
            )}

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid gap-4 p-4 border rounded-md relative group">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="space-y-2">
                            <Label>Question {index + 1}</Label>
                            <Input
                                {...register(`faqs.${index}.question` as const)}
                                placeholder="e.g. What is the possession date?"
                            />
                            {errors.faqs?.[index]?.question && (
                                <p className="text-sm text-destructive">{errors.faqs[index]?.question?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Answer</Label>
                            <Textarea
                                {...register(`faqs.${index}.answer` as const)}
                                placeholder="Enter the answer..."
                                className="min-h-[80px]"
                            />
                            {errors.faqs?.[index]?.answer && (
                                <p className="text-sm text-destructive">{errors.faqs[index]?.answer?.message}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

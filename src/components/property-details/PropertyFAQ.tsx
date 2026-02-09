import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface PropertyFAQProps {
    faqs?: {
        question: string;
        answer: string;
    }[];
}

export const PropertyFAQ = ({ faqs }: PropertyFAQProps) => {
    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif font-semibold text-foreground">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-lg hover:no-underline hover:text-primary transition-colors">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

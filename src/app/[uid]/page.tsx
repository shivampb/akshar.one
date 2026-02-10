import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID("page", uid).catch(() => null);

    if (!page) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Main Image */}
            {page.data.main_image?.url && (
                <div className="relative w-full h-[400px] mb-8 overflow-hidden rounded-xl">
                    <PrismicNextImage
                        field={page.data.main_image}
                        className="object-cover w-full h-full"
                        fill
                    />
                </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                <PrismicRichText field={page.data.title} />
            </h1>

            {/* Content Field (if present) */}
            <div className="prose prose-lg max-w-none mb-12">
                <PrismicRichText field={page.data.content} />
            </div>

            {/* Slices (if any) */}
            <SliceZone slices={page.data.slices} components={components} />
        </div>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID("page", uid).catch(() => null);

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: page.data.meta_title || "Akshar One",
        description: page.data.meta_description,
        openGraph: {
            title: page.data.meta_title || undefined,
            description: page.data.meta_description || undefined,
            images: [
                {
                    url: page.data.meta_image.url || "",
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("page");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}

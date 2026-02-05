// One-time script to update all property price labels from $ to ₹
// Run this script once to update existing properties in the database

import { supabase } from './src/lib/supabase';

async function updatePriceLabels() {
    console.log('Fetching all properties...');

    // Fetch all properties
    const { data: properties, error: fetchError } = await supabase
        .from('properties')
        .select('*');

    if (fetchError) {
        console.error('Error fetching properties:', fetchError);
        return;
    }

    if (!properties || properties.length === 0) {
        console.log('No properties found in database.');
        return;
    }

    console.log(`Found ${properties.length} properties. Updating...`);

    // Update each property's priceLabel
    for (const property of properties) {
        // Replace $ with ₹ in the priceLabel
        const updatedPriceLabel = property.priceLabel?.replace(/\$/g, '₹') || `₹${property.price.toLocaleString()}`;

        const { error: updateError } = await supabase
            .from('properties')
            .update({ priceLabel: updatedPriceLabel })
            .eq('id', property.id);

        if (updateError) {
            console.error(`Error updating property ${property.id}:`, updateError);
        } else {
            console.log(`✓ Updated ${property.name}: ${property.priceLabel} → ${updatedPriceLabel}`);
        }
    }

    console.log('Done! All properties updated.');
    process.exit(0);
}

updatePriceLabels();

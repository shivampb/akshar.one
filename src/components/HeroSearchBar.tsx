import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSearchBar = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");

    const handleSearch = () => {
        // Build query parameters
        const params = new URLSearchParams();

        if (location) params.append("location", location);
        if (propertyType) params.append("type", propertyType);

        // Navigate to properties page with filters
        const queryString = params.toString();
        navigate(`/properties${queryString ? `?${queryString}` : ""}`);
    };

    return (
        <div className="bg-white rounded-3xl md:rounded-full shadow-2xl p-1.5 flex flex-col md:flex-row items-stretch md:items-center gap-1.5 max-w-3xl w-full mx-auto">
            {/* Location */}
            <div className="flex-1 px-4 py-2 md:py-1">
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5 uppercase tracking-wide">Location</label>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 focus:outline-none cursor-pointer font-medium"
                >
                    <option value="">Select Location</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="pune">Pune</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="gurugram">Gurugram</option>
                    <option value="hyderabad">Hyderabad</option>
                </select>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* Type */}
            <div className="flex-1 px-4 py-2 md:py-1">
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5 uppercase tracking-wide">Type</label>
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 focus:outline-none cursor-pointer font-medium"
                >
                    <option value="">Select Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="agricultural">Agricultural</option>
                </select>
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="btn-luxury-blue text-white px-8 py-3 md:py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
                Search
            </button>
        </div>
    );
};


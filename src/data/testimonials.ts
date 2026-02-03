export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    role: "Investment Banker",
    quote: "The attention to detail and personalized service exceeded all my expectations. They found me the perfect Manhattan penthouse that I didn't even know existed on the market.",
  },
  {
    id: "2",
    name: "Marcus & Elena Rodriguez",
    role: "Business Owners",
    quote: "We've purchased three properties through this team, and each experience has been exceptional. Their knowledge of luxury real estate is unmatched.",
  },
  {
    id: "3",
    name: "Jonathan Whitmore",
    role: "Tech Executive",
    quote: "From the initial consultation to closing, the process was seamless. They understood exactly what I was looking for and delivered beyond my expectations.",
  },
];

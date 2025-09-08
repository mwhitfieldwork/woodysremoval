// Mock data for Woody's Removal Service
// This file contains sample data used throughout the application

export const mockServices = [
  {
    id: 1,
    name: "Mattress Removal",
    description: "Professional mattress and box spring removal with eco-friendly disposal",
    basePrice: 89,
    category: "residential",
    features: [
      "Single or multiple mattresses",
      "Box spring removal included",
      "Eco-friendly recycling",
      "Same-day service available"
    ],
    image: "https://images.unsplash.com/photo-1647376036543-f9f543601a1d"
  },
  {
    id: 2,
    name: "Furniture Removal",
    description: "Complete furniture haul away from any room in your home or office",
    basePrice: 149,
    category: "residential",
    features: [
      "Single items or full rooms",
      "Heavy lifting included",
      "Donation coordination",
      "Professional team"
    ],
    image: "https://images.unsplash.com/photo-1729628371767-7a833756b8b5"
  },
  {
    id: 3,
    name: "Property Cleanout",
    description: "Full-service cleanout for homes, offices, and commercial properties",
    basePrice: 299,
    category: "commercial",
    features: [
      "Complete property clearing",
      "Estate cleanout services",
      "Commercial cleanouts",
      "Custom scheduling"
    ],
    image: "https://images.unsplash.com/photo-1602867693052-7ebe29e43353"
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Austin, TX",
    rating: 5,
    service: "Mattress Removal",
    date: "2024-01-15",
    text: "Woody's team was absolutely fantastic! They arrived right on time and removed my old mattress and box spring with no hassle. Professional, courteous, and reasonably priced. I'll definitely use them again!",
    verified: true
  },
  {
    id: 2,
    name: "Mike Chen",
    location: "Denver, CO",
    rating: 5,
    service: "Furniture Removal",
    date: "2024-01-10",
    text: "Outstanding service from start to finish. The booking process was simple, and the crew was efficient and respectful of my home. They even swept up after themselves. Highly recommend!",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    rating: 5,
    service: "Property Cleanout",
    date: "2024-01-08",
    text: "Moving out of my apartment was stressful until I found Woody's. They handled all the unwanted furniture and items I couldn't take with me. Fair pricing and excellent customer service!",
    verified: true
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Seattle, WA",
    rating: 5,
    service: "Appliance Removal",
    date: "2024-01-05",
    text: "Had an old refrigerator and washer that needed to go. Woody's team made it look easy! They were careful not to damage my floors and disposed of everything responsibly. Great experience!",
    verified: true
  }
];

export const mockServiceAreas = {
  local: [
    "Austin, TX",
    "Houston, TX",
    "Dallas, TX",
    "San Antonio, TX",
    "Denver, CO",
    "Colorado Springs, CO",
    "Miami, FL",
    "Orlando, FL",
    "Tampa, FL",
    "Seattle, WA",
    "Portland, OR",
    "Phoenix, AZ",
    "Las Vegas, NV",
    "Los Angeles, CA",
    "San Diego, CA",
    "San Francisco, CA",
    "Chicago, IL",
    "Milwaukee, WI",
    "Indianapolis, IN",
    "Nashville, TN",
    "Atlanta, GA",
    "Charlotte, NC",
    "Raleigh, NC",
    "Virginia Beach, VA",
    "Washington, DC",
    "Baltimore, MD",
    "Philadelphia, PA",
    "Pittsburgh, PA",
    "New York, NY",
    "Boston, MA"
  ],
  states: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ]
};

export const mockFAQs = [
  {
    id: 1,
    category: "General",
    question: "How quickly can you pick up my items?",
    answer: "We offer same-day service in most local metro areas and typically schedule pickups within 2-3 days for nationwide service. Emergency and urgent removals can often be accommodated within hours."
  },
  {
    id: 2,
    category: "Pricing",
    question: "Do you provide upfront pricing?",
    answer: "Absolutely! We believe in transparent pricing with no hidden fees. You'll receive an upfront quote based on the items you need removed, and that's exactly what you'll pay."
  },
  {
    id: 3,
    category: "Services",
    question: "What items can you remove?",
    answer: "We handle mattresses, furniture, appliances, electronics, construction debris, yard waste, and most household or office items. We cannot remove hazardous materials like paint, chemicals, or asbestos."
  },
  {
    id: 4,
    category: "Coverage",
    question: "What areas do you serve?",
    answer: "We provide service in 50+ metro areas with same-day availability, plus nationwide coverage with 2-3 day scheduling through our trusted partner network."
  },
  {
    id: 5,
    category: "Insurance",
    question: "Are you licensed and insured?",
    answer: "Yes, we're fully licensed, bonded, and insured. Our team members are background-checked and trained to handle your items safely and professionally."
  },
  {
    id: 6,
    category: "Environment",
    question: "Do you recycle or donate items?",
    answer: "We're committed to responsible disposal. Items in good condition are donated to local charities, and we recycle materials whenever possible to minimize landfill waste."
  }
];

export const mockCompanyStats = {
  itemsRemoved: "250,000+",
  happyCustomers: "15,000+",
  citiesServed: "50+",
  statesServed: "50",
  averageRating: "4.9",
  reviewCount: "3,200+",
  yearsInBusiness: "8",
  teamMembers: "150+"
};

export const mockContactInfo = {
  phone: "(844) 239-7711",
  email: "info@woodysremoval.com",
  hours: "8 AM - 8 PM, 7 days a week",
  emergencyPhone: "(844) 239-7711",
  businessAddress: "1234 Removal Ave, Service City, ST 12345",
  mailingAddress: "PO Box 5678, Service City, ST 12345"
};
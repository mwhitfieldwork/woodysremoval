import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import thumbsImg from '../images/woodylarge_cropped.png';
import junktruck from '../images/junkremovaltruck.jpg';
import { Link } from "react-router-dom";
import { 
  Truck, 
  Clock, 
  Shield, 
  DollarSign, 
  Star, 
  Phone, 
  CheckCircle,
  CheckSquare,
  Recycle,
  Home as HomeIcon,
  Building
} from "lucide-react";

const Home = () => {
  const services_scroll = [
    {
      title: "Mattress Removal",
      description: "Professional mattress and box spring removal with eco-friendly disposal.",
      icon: <HomeIcon className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1647376036543-f9f543601a1d"
    },
    {
      title: "Furniture Removal",
      description: "Complete furniture haul away from any room in your home or office.",
      icon: <Building className="h-8 w-8" />,
      image: junktruck
    },
    {
      title: "Junk Removal",
      description: "Full-service junk removal for residential and commercial properties.",
      icon: <Truck className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1602867693052-7ebe29e43353"
    }
  ];

  const services = [
    { category: 'Mattress & Bed', items: ['Mattress Removal', 'Box Spring Removal'] },
    { category: 'Trash & Debris', items: ['Cardboard Hauling', 'Old Pallet Removal'] },
    { category: 'Electronics', items: ['Television Disposal', 'Stereo System Removal'] },
    { category: 'Patio & Outdoor', items: ['Old Grill Removal', 'Wood Stove Hauling'] },
    { category: 'Office & Business', items: ['Office Desk Removal', 'Cubicle Breakdown'] },
    { category: 'Heavy & Bulky', items: ['Piano Removal', 'Pool Table Hauling'] },
    { category: 'Tools & Equipment', items: ['Toolbox Disposal', 'Ladder Removal'] },
    { category: 'Large Furniture', items: ['Couch Removal', 'Recliner Hauling'] },
    { category: 'Exercise Equipment', items: ['Treadmill Disposal', 'Elliptical Removal'] },
    { category: 'Appliances', items: ['Refrigerator Removal', 'Washer/Dryer Hauling'] },
    { category: 'Household Junk', items: ['Baby Gear Disposal', 'Wall Decor Removal'] },
    { category: 'Sporting Goods', items: ['Basketball Goal Removal', 'Golf Club Hauling'] },
    { category: 'Bagged & Boxed', items: ['Linen Disposal', 'Book Hauling'] },
  ];
  
  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Same Day Service",
      description: "Fast, reliable pickup available 7 days a week"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fully Insured",
      description: "Licensed, bonded, and insured for your protection"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Upfront Pricing",
      description: "No hidden fees, transparent pricing guaranteed"
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Eco-Friendly",
      description: "We recycle and donate items whenever possible"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Woody's team was professional and efficient. They removed my old mattress and furniture in no time!",
      service: "Mattress Removal"
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Excellent service! They arrived on time and cleaned up everything perfectly. Highly recommend!",
      service: "Junk Removal"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "Great pricing and friendly staff. Made my move so much easier by handling all the unwanted items.",
      service: "Property Cleanout"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-blue-50 py-0 emrald-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2">
                  Professional Removal Service
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Fast & Reliable
                  <span className="text-emerald-600 block">Junk Removal</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  From mattresses to furniture, we handle all your removal needs. 
                  Professional, insured, and eco-friendly service you can trust.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/order">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-120 shadow-lg"
                  >
                    Get Free Quote
                  </Button>
                </Link>
                {/*<Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  (844) 239-7711
                </Button>*/}
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <strong>4.9/5</strong> from 500+ happy customers
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10  hidden lg:block">
                <img src={thumbsImg} alt="Woody Logo" className=" w-full h-auto transform hover:scale-105 transition-transform duration-300 woody-thumbs"/>
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-emerald-100 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Woody's Removal Service?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make junk removal simple and stress-free with professional service you can count on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center p-6 hover:shadow-lg transition-shadow duration-200 border-0 shadow-md"
              >
                <CardContent className="space-y-4">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      { /* Servvice Scroll Section */}
      <section id="service-overview" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional removal services for homes and businesses across the nation.
              </p>
          </div> 
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services_scroll.map((service, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="bg-white text-emerald-600 rounded-full p-3">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link to="/order">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </section>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional removal services for homes and businesses across the nation.
            </p>
          </div>

            <section
              style={{
                padding: '2rem',
                backgroundColor: '#f0f0f0',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  marginBottom: '2rem',
                  fontWeight: 'bold',
                  color: '#222',
                  borderBottom: '2px solid #4CAF50',
                  paddingBottom: '0.5rem',
                  textAlign: 'center',
                }}
              >
                Full List of Services
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {services.map(({ category, items }) => (
                  <div
                    key={category}
                    style={{
                      backgroundColor: '#fff',
                      padding: '1rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        marginBottom: '0.75rem',
                        color: '#4CAF50',
                      }}
                    >
                      {category}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {items.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '1.75rem',
                              height: '1.75rem',
                              borderRadius: '0.5rem',
                              backgroundColor: 'rgb(209 250 229)',
                              color: 'rgb(5 150 105)',
                              marginRight: '0.5rem',
                              flexShrink: 0,
                            }}
                          >
                            <CheckSquare size={16} strokeWidth={2} />
                          </span>
                          <span style={{ lineHeight: '1.5' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>


        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-emerald-600">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to Clear Out Your Space?
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Get your free quote today and let our professional team handle all the heavy lifting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Get Free Quote
                </Button>
              </Link>
              {/*<Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (844) 239-7711
              </Button>*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
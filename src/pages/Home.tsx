import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, Award, Sparkles, Heart, Clock } from 'lucide-react';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';


const Home: React.FC = () => {

  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 7);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F5F5DC] via-[#FFF8E1] to-[#FFFBF0] pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Spice Particles */}
          <div className="absolute top-32 right-20 w-1 h-1 bg-[#204C13] rounded-full animate-bounce opacity-40" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-30" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}></div>
          
          {/* Hyderabadi Pattern Background */}
          <div className="w-full h-full bg-repeat opacity-10" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D13F4A' fill-opacity='0.08'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-16c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm0 2c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zm0 4c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}>
          </div>
          
          {/* Decorative Charminar-inspired Elements */}
          <div className="absolute top-10 right-10 opacity-20">
            <div className="w-16 h-16 border-2 border-[#D13F4A] rounded-lg transform rotate-45 animate-pulse"></div>
          </div>
          <div className="absolute bottom-20 left-20 opacity-15">
            <div className="w-12 h-12 border border-[#204C13] rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          </div>
        </div>
        
        <div className="page-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Animated Badge */}
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-[#D13F4A] mr-2 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Authentic Since 1985</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                <span className="inline-block animate-fade-in-up">
                  <span className="bg-gradient-to-r from-[#D13F4A] via-[#B8363F] to-[#204C13] bg-clip-text text-transparent">
                    Authentic Hyderabad Flavors,
                  </span>
                  <span className="text-gray-800">
                    Fresh & Crispy
                  </span>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              Vamifoods brings you the authentic taste of Hyderabad with a delightful range of crispy snacks, traditional sweets, homemade pickles, and aromatic spice powders — all crafted with love and delivered fresh to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '1s'}}>
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center border-2 border-[#204C13] text-[#204C13] hover:bg-[#204C13] hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Our Story
                  <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-right" style={{animationDelay: '0.5s'}}>
              <img
                src="/hero-image.png"
                alt="Traditional Hyderabadi Snacks"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 hover:scale-105 transform transition-transform"
              />
              
              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#D13F4A] p-3 rounded-full animate-pulse">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Authentic Taste</p>
                    <p className="text-sm text-gray-600">Flavors of Hyderabad</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-60"></div>
              
              {/* Traditional Pattern Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-[#D13F4A]/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#D13F4A]/5 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#204C13]/5 to-transparent rounded-full blur-xl"></div>
        </div>
        
        <div className="page-container">
          <div className="text-center mb-12">
            {/* Traditional Decorative Element */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-0.5 bg-[#D13F4A]"></div>
              <div className="mx-4 w-3 h-3 bg-[#D13F4A] rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-[#D13F4A]"></div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              Explore Our Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Discover our wide range of authentic Hyderabadi products, 
              each category crafted with traditional recipes and premium ingredients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/shop/${category.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up hover:scale-105 transform"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hyderabadi Pattern Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute top-4 right-4 w-8 h-8 border border-white/30 rounded-lg transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-0.5 bg-[#D13F4A] mr-2"></div>
                      <Sparkles className="w-4 h-4 text-[#D13F4A]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D13F4A] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm group-hover:text-gray-100 transition-colors">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50 relative">
        {/* Food-themed Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-20" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-500 rounded-full animate-ping opacity-30" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-25" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="page-container">
          <div className="text-center mb-12">
            {/* Traditional Decorative Element */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 border-2 border-[#D13F4A] rounded-full flex items-center justify-center animate-spin" style={{animationDuration: '8s'}}>
                <div className="w-2 h-2 bg-[#D13F4A] rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
                              Bestselling Products
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Our customers' favorite picks - tried, tested, and loved!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <Link
              to="/shop"
              className="group inline-flex items-center bg-[#D13F4A] hover:bg-[#B8363F] text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
                                View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Hyderabadi Heritage Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 border border-[#D13F4A]/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 border border-[#204C13]/10 rounded-lg transform rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#D13F4A]/5 to-[#204C13]/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="page-container">
          <div className="text-center mb-12">
            {/* Heritage Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-[#D13F4A]/10 to-[#204C13]/10 px-6 py-2 rounded-full mb-6 animate-fade-in">
              <Clock className="w-4 h-4 text-[#D13F4A] mr-2" />
              <span className="text-sm font-medium text-gray-700">Heritage & Quality Since 1985</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              Why Choose Vamifoods?
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              We're committed to bringing you the best of Hyderabadi cuisine
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="bg-[#D13F4A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 hover:shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#D13F4A] transition-colors">
                Authentic Recipes
              </h3>
              <p className="text-gray-600">
                Traditional family recipes passed down through generations
              </p>
            </div>
            
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-[#204C13] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 hover:shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#204C13] transition-colors">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only the finest ingredients sourced from trusted suppliers
              </p>
            </div>
            
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="bg-[#D13F4A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 hover:shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#D13F4A] transition-colors">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and safe delivery to your doorstep across India
              </p>
            </div>
            
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="bg-[#204C13] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 hover:shadow-lg">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#204C13] transition-colors">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Dedicated customer support to help you anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="section-padding bg-gray-50 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-1 h-1 bg-[#D13F4A] rounded-full animate-ping opacity-40" style={{animationDelay: '0s'}}></div>
            <div className="absolute bottom-20 right-1/4 w-1.5 h-1.5 bg-[#204C13] rounded-full animate-ping opacity-30" style={{animationDelay: '3s'}}></div>
          </div>
          
          <div className="page-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6 animate-bounce">
                <Sparkles className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700">Fresh Arrivals</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
                New Arrivals
              </h2>
              <p className="text-xl text-gray-600 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Fresh additions to our authentic collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {newProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in-up"
                  style={{animationDelay: `${0.1 * index}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#D13F4A]/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#204C13]/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="page-container relative">
          <div className="text-center mb-16">
            {/* Creative Decorative Element */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg animate-fade-in">
              <div className="w-4 h-4 bg-[#D13F4A] rounded-full animate-ping mr-3"></div>
              <span className="text-sm font-bold text-gray-700">Customer Love</span>
              <div className="w-4 h-4 bg-[#D13F4A] rounded-full animate-ping ml-3" style={{animationDelay: '1s'}}></div>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-[#D13F4A] via-[#B8363F] to-[#204C13] bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up max-w-2xl mx-auto" style={{animationDelay: '0.2s'}}>
              Real stories from food lovers who discovered the authentic taste of Hyderabad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Testimonial 1 - Creative Design */}
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D13F4A] to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 border border-orange-100">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#D13F4A] to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/twSGnJwq/Screenshot-3.png" 
                    alt="Priya Sharma" 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 border-4 border-orange-200"
                  />
                  <div className="mb-6">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic text-sm">
                      "The authentic taste of Hyderabad in every bite! These snacks remind me of my grandmother's cooking. Absolutely love the quality and freshness."
                    </p>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">Priya Sharma</h4>
                  <p className="text-sm text-gray-500 mt-1">Customer Since Last 3 Months</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Creative Design */}
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#204C13] to-green-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 border border-green-100">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#204C13] to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/8WFJ06f/Screenshot-4.png" 
                    alt="Sakshi Patel" 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 border-4 border-green-200"
                  />
                  <div className="mb-6">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic text-sm">
                      "Best traditional snacks I've ever tasted! The packaging is excellent and the flavors are exactly like the authentic Hyderabadi street food."
                    </p>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">Sakshi Patel</h4>
                  <p className="text-sm text-gray-500 mt-1">Customer Since Last 2 Months</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Creative Design */}
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 border border-blue-100">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/RTPJ4byt/Screenshot-5.png" 
                    alt="Deepak Kumar" 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 border-4 border-blue-200"
                  />
                  <div className="mb-6">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic text-sm">
                      "Amazing quality and authentic recipes! My kids love these snacks and I feel good about giving them traditional, healthy food. Highly recommended!"
                    </p>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">Deepak Kumar</h4>
                  <p className="text-sm text-gray-500 mt-1">Customer Since Last 5 Months</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 - Creative Design */}
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 border border-purple-100">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/x8DMFR0X/Screenshot-6.png" 
                    alt="Vikram Singh" 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 border-4 border-purple-200"
                  />
                  <div className="mb-6">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic text-sm">
                      "Perfect blend of tradition and taste! The snacks are crispy, fresh, and bring back childhood memories. Great service and fast delivery too!"
                    </p>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">Vikram Singh</h4>
                  <p className="text-sm text-gray-500 mt-1">Customer Since Last 7 Months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-[#204C13] text-white relative overflow-hidden">
        {/* Hyderabadi Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M50 50m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0'/%3E%3Cpath d='M50 30v40M30 50h40'/%3E%3C/g%3E%3C/svg%3E")`
               }}>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        
        <div className="page-container">
          <div className="text-center relative">
            {/* Decorative Element */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-0.5 bg-white/30"></div>
              <div className="mx-4 w-4 h-4 bg-white/50 rounded-full animate-pulse"></div>
              <div className="w-16 h-0.5 bg-white/30"></div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
              Stay Connected
            </h2>
            <p className="text-xl mb-8 opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Get the latest updates on new products, offers, and recipes
            </p>
            
            <div className="max-w-md mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <form className="flex gap-2 group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 focus:scale-105"
                />
                <button
                  type="submit"
                  className="bg-[#D13F4A] hover:bg-[#B8363F] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
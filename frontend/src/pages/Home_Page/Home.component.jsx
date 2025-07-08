import React, { useState, useRef, useEffect } from "react";
import Event from "../../components/Event_Card/Event.jsx";
import axios from "axios";
import { curve } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button.jsx";
import { BackgroundCircles } from "../../components/design/Hero.jsx";
import useGet from "../../customhooks/useGet.jsx";
import { Calendar, Sparkles, Users, ArrowRight, Star } from "lucide-react";

function Home() {
  const token = localStorage.getItem("authToken");
  const {
    data: publicEvents,
    loading,
    error,
  } = useGet("events/public/events", null);
  const parallaxRef = useRef(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API;

  function handleDelete(e) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#0f0829] to-[#130b3b]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Section
        className="pt-[12rem] -mt-[5.25rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        {/* Hero Section */}
        <div className="container relative" ref={parallaxRef}>
          {/* Hero Background Image */}
          <div className="absolute inset-0 opacity-20 -z-10">
            <img 
              src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920" 
              alt="Campus events background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520]/80 via-[#0f0829]/60 to-[#130b3b]" />
          </div>

          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem] mt-20">
            {/* Floating badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-200 font-medium">Discover Amazing Events</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Explore the{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                NITW Events
              </span>
              <br />
              <span className="inline-block relative text-4xl md:text-6xl mt-4">
                Public Events
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 opacity-60"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto mb-12 leading-relaxed">
              In order to view all the events, you must register. If you don't
              have an account, please register to unlock the full experience.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-12 text-purple-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm">Active Events</div>
              </div>
              <div className="w-px h-16 bg-purple-500/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5000+</div>
                <div className="text-sm">Students</div>
              </div>
              <div className="w-px h-16 bg-purple-500/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm">Clubs</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative inline-block">
              <Button 
                href={token ? "/viewevents" : "/login"} 
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-lg"
              >
                <span className="flex items-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity"></div>
            </div>
          </div>
          
          <BackgroundCircles />
        </div>

        {/* Events Section */}
        <div className="container relative z-2">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
              <Calendar className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-200 text-sm font-medium">Featured Events</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Happening <span className="text-purple-400">Right Now</span>
            </h2>
            
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Join these amazing events and be part of the vibrant NITW community
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-300/20 animate-pulse"></div>
              </div>
              <p className="text-purple-200 mt-6 text-lg">Loading amazing events...</p>
              
              {/* Loading animation dots */}
              <div className="flex items-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Something went wrong</h3>
              <p className="text-red-400 text-lg mb-6">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : (
            /* Events Grid */
            <>
              {publicEvents && publicEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                  {publicEvents.map((event) => (
                    <div key={event.id} className="transform transition-all duration-500 hover:scale-[1.02]">
                      <Event
                        id={event.id}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        time={event.time}
                        venue={event.venue}
                        image={`data:image/jpeg;base64,${event.image}`}
                        club={event.club}
                        delete={(e) => handleDelete}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* No Events State */
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No Events Available</h3>
                  <p className="text-purple-200 text-lg max-w-md mx-auto mb-8">
                    There are no public events at the moment. Check back soon for exciting updates!
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-purple-300 text-sm">
                    <Star className="w-4 h-4 mr-2" />
                    Stay tuned for amazing events
                  </div>
                </div>
              )}

              {/* Call to Action Footer */}
              {publicEvents && publicEvents.length > 0 && (
                <div className="text-center py-16 border-t border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Want to see more events?
                  </h3>
                  <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
                    Register now to access all events, join clubs, and be part of the amazing NITW community.
                  </p>
                  <Button 
                    href={token ? "/viewevents" : "/login"}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    <span className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {token ? "View All Events" : "Join Community"}
                    </span>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Section>
    </div>
  );
}

export default Home;
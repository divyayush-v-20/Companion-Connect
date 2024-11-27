import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pets = [
    {
        image: "https://i.pinimg.com/564x/4b/c1/54/4bc154386719a9091b17d73845942d5a.jpg",
        breed: "Pitbull",
        name: "Nella"
    },
    {
        image: "https://cdn.shopify.com/s/files/1/0568/0450/7691/files/OneWorldCats.com_GermanRex-1_22d0d64f-cb0e-405b-aa46-5fb81202d43a_600x600.jpg?v=1715780498",
        breed: "German Rex",
        name: "Dizzy"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7uER2d5vHrSIJ6gYGrInG3KPOM-y0HbZ0cg&s",
        breed: "Indie",
        name: "Max"
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      <nav className="bg-orange-500 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl font-bold text-white">CompanionConnect</h1>
          <button
            className="md:hidden text-white"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul className={`md:flex space-x-8 hidden md:block`}>
            {["hero", "about", "featured", "testimonials", "contact"].map(
              (section) => (
                <li key={section}>
                  <ScrollLink
                    to={section}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-white hover:text-orange-200"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </ScrollLink>
                </li>
              )
            )}
            <li className="cursor-pointer text-white hover:text-orange-200"><Link to = "/login">Login</Link></li>
          </ul>
        </div>
        {isNavOpen && (
          <ul className="md:hidden bg-orange-500 shadow-md">
            {["hero", "about", "featured", "testimonials", "contact"].map(
              (section) => (
                <li key={section} className="border-b border-orange-300">
                  <ScrollLink
                    to={section}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsNavOpen(false)}
                    className="block text-center py-2 text-white hover:text-orange-200"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </ScrollLink>
                </li>
              )
            )}
          </ul>
        )}
      </nav>

      <section
        id="hero"
        className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-16 px-4 md:px-12 mt-16"
      >
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Find Your Perfect Pet</h1>
          <p className="mt-4 text-lg md:text-xl">Adopt, rescue, and make a difference today.</p>
          <ScrollLink
            to="featured"
            smooth={true}
            duration={500}
            className="mt-6 px-6 py-3 bg-white text-orange-500 rounded-md shadow-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Browse Pets
          </ScrollLink>
        </div>
      </section>

      <section id="about" className="py-16 px-4 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500">Why Adopt?</h2>
            <p className="mt-4 text-gray-600">Give pets a new home and gain a loving companion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Save Lives", text: "Provide a second chance to loving pets." },
              { title: "Spread Happiness", text: "Pets bring joy and companionship." },
              { title: "Support Shelters", text: "Help animals in need by adopting." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-orange-100 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-orange-500">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500">Featured Pets</h2>
            <p className="mt-4 text-gray-600">Find your new furry friend from our featured list.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pets.map((pet, i) => (
              <div key={i} className="w-60 h-60 bg-white m-10 rounded-lg shadow-md">
                <img
                  src={pet.image}
                  alt={`Pet ${pet.name}`}
                  className="w-auto h-full object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-orange-500">
                  {pet.name}
                </h3>
                <p className="mt-2 text-gray-600">{pet.breed}</p>
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition">
                  Adopt Me
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 px-4 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500">Happy Tails</h2>
            <p className="mt-4 text-gray-600">Stories of joy and love from our adopters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((testimonial) => (
              <div key={testimonial} className="bg-orange-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-600">
                  &quot;We adopted Bella, and our family couldn&apos;t be happier. She&apos;s brought so much love!&quot;
                </p>
                <h3 className="mt-4 text-xl font-semibold text-orange-500">- Adopter {testimonial}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 md:px-12 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-lg">Have questions? We’re here to help you adopt.</p>
          <button className="mt-6 px-6 py-3 bg-white text-orange-500 rounded-md shadow-lg hover:bg-gray-100 transition">
            Contact Us
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>© 2024 PetAdopt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

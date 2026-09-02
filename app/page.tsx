"use client";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import SearchBar from "./components/home/SearchBar";
import Stats from "./components/home/Stats";
import Features from "./components/home/Features";

export default function Home() {

  return (
    <main className="relative min-h-screen overflow-hidden background-grid">

      <div className="red-glow" />

      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-28 px-6 pt-40 pb-24">

        <Hero />

        <SearchBar />

        <Stats />

        <Features />

      </div>

    </main>
  );
}
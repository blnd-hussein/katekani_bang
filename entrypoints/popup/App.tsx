import Header from "@/components/header/Header";
import PrayersSection from "@/components/prayers/PrayersSection";

import background_a from "/background_a.jpg";
import "./App.css";

function App() {
  return (
    <main className="h-150 w-120 relative overflow-hidden">
      {/* Background wallpaper */}
      <img
        src={background_a}
        alt="background"
        className="absolute inset-0 w-full h-full -z-2 object-cover"
      />

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 w-full h-full -z-1 bg-black/40"></div>

      {/* Next prayer calculations */}
      <Header />

      {/* Prayer Times */}
      <PrayersSection />

      {/* Settings, Etc.. */}
      <footer className="flex justify-center items-center bg-base-100/70 backdrop-blur-xs w-2/3 mx-auto p-1.5 rounded-xl"></footer>
    </main>
  );
}

export default App;

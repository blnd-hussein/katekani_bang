import Header from "@/components/header/Header";
import PrayersSection from "@/components/prayers/PrayersSection";
import Footer from "@/components/footer/Footer";

import background_a from "/background_a.jpg";
import "./App.css";

function App() {
  return (
    <main className="h-150 w-120 relative overflow-hidden text-neutral-content">
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
      <Footer />
    </main>
  );
}

export default App;

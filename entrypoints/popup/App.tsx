import { useStorage } from "@/hooks/useStorage";
import Header from "@/components/header/Header";
import PrayersSection from "@/components/prayers/PrayersSection";
import Footer from "@/components/footer/Footer";

import SettingsModal from "@/components/modals/SettingsModal";

import "./App.css";
import background_a from "@/assets/backgrounds/background_a.webp";
import background_b from "@/assets/backgrounds/background_b.webp";
import background_c from "@/assets/backgrounds/background_c.webp";
import background_d from "@/assets/backgrounds/background_d.webp";
import background_e from "@/assets/backgrounds/background_e.webp";
import DhikrModal from "@/components/modals/DhikrModal";
import CompassModal from "@/components/modals/CompassModal";

const backgrounds: Record<string, string> = {
  a: background_a,
  b: background_b,
  c: background_c,
  d: background_d,
  e: background_e,
};

function App() {
  const [backgroundIndex] = useStorage("local:bgIndex", "a");
  const currentBg = backgrounds[backgroundIndex] || background_a;

  return (
    <main className="h-150 w-120 relative overflow-hidden text-neutral-content">
      {/* Background wallpaper */}
      <img
        src={currentBg}
        alt="background_wallpaper"
        className="absolute inset-0 w-full h-full -z-2 object-cover"
      />

      <SettingsModal id="settings" />
      <DhikrModal id="dhikr" />
      <CompassModal id="compass" />

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

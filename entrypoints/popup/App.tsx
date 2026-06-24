import { useStorage } from "@/hooks/useStorage";
import { BACKGROUNDS } from "@/lib/consts";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import DhikrModal from "@/components/modals/DhikrModal";
import CompassModal from "@/components/modals/CompassModal";
import SettingsModal from "@/components/modals/SettingsModal";
import PrayersSection from "@/components/prayers/PrayersSection";

import "./App.css";
import background_a from "@/assets/backgrounds/background_a.webp";

function App() {
  const [backgroundIndex] = useStorage("local:bgIndex", "a");
  const currentBg = BACKGROUNDS.find((bg) => bg.id === backgroundIndex);

  return (
    <main className="h-150 w-120 relative overflow-hidden text-neutral-content">
      {/* Background wallpaper */}
      <img
        src={currentBg?.src ?? background_a}
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

type PRAYER_TIMES_TYPE = {
  [key: string]: {
    label: string;
    message: string;
  };
};

export const PRAYER_TIMES: PRAYER_TIMES_TYPE = {
  Fajr: {
    label: "بانگی بەیانی",
    message: "ئێستا کاتی بانگی بەیانییە",
  },
  Sunrise: {
    label: "خۆرهەڵاتن",
    message: "",
  },
  Dhuhr: {
    label: "بانگی نیوەڕۆ",
    message: "ئێستا کاتی بانگی نیوەڕۆیە",
  },
  Asr: {
    label: "بانگی عەسر",
    message: "ئێستا کاتی بانگی عەسرە",
  },
  Maghrib: {
    label: "بانگی شێوان",
    message: "ئێستا کاتی بانگی شێوانە",
  },
  Isha: {
    label: "بانگی خەوتنان",
    message: "ئێستا کاتی بانگی خەوتنانە",
  },
};

export const BACKGROUNDS: {
  id: string;
  src: string;
}[] = [
  {
    id: "a",
    src: "https://ik.imagekit.io/oouq13ico/prayer_times/background_a.webp",
  },
  {
    id: "b",
    src: "https://ik.imagekit.io/oouq13ico/prayer_times/background_b.webp",
  },
  {
    id: "c",
    src: "https://ik.imagekit.io/oouq13ico/prayer_times/background_c.webp",
  },
  {
    id: "d",
    src: "https://ik.imagekit.io/oouq13ico/prayer_times/background_d.webp",
  },
  {
    id: "e",
    src: "https://ik.imagekit.io/oouq13ico/prayer_times/background_e.webp",
  },
  {
    id: "f",
    src: "https://ik.imagekit.io/oouq13ico/prayer_times/background_f.webp",
  },
];

import { Cog, Compass } from "lucide-react";

function Footer() {
  const openModal = (id: "compass" | "dhikr" | "settings") => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <footer className="flex justify-center items-center bg-base-100/30 w-2/3 mx-auto backdrop-blur-xs gap-5 -mt-3 rounded-tr-full rounded-bl-full p-1">
      <button
        className="cursor-pointer hover:scale-102"
        onClick={() => openModal("compass")}
      >
        <Compass
          size={46}
          strokeWidth="1"
          className="text-neutral-content/90"
        />
      </button>

      <button
        className="btn btn-outline backdrop-blur-xs h-full rounded-full py-4"
        onClick={() => openModal("dhikr")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          id="_x32_"
          viewBox="0 0 512 512"
          className="h-12 w-12 fill-neutral-content/90"
        >
          <path d="M205 486q23 17 51 26 28-8 51-26-27-9-51-25-24 16-51 25M58 382q3 29 17 55 26 14 55 17-14-24-19-53-29-5-53-19M382 454q29-3 55-17 14-26 17-55-24 14-53 19-5 29-19 53M197 399q-22 6-46 6 8 26 23 48 27-5 51-18-16-16-28-36M287 435q24 14 51 18 15-22 23-48-24 0-46-6-12 20-28 36M234 385q9 14 20 25l2 2 2-2q11-11 20-25l-22-13zM174 338q-13-2-25-6-3 15-4 31l1 3 3 1q16-1 31-4-4-12-6-25M338 338q-2 13-6 25l34 3 1-3q-1-15-4-31-12 4-25 6M399 315q6 22 6 46 26-8 48-23-5-27-18-51-16 16-36 28M107 361q0-24 6-46-20-12-36-28-13 24-18 51 22 15 48 23M214 356l17-9-9-10h-14zM281 347l17 9 6-19h-14zM0 256q9 28 26 51 9-27 25-51-16-24-25-51-17 23-26 51M486 205q-9 27-25 51 16 24 25 51 17-23 26-51-8-28-26-51M156 298l19 6v-14l-10-9zM337 304l18-6-8-17-10 9zM301 211q-22-11-45-18-23 7-45 18-11 22-18 45 7 23 18 45 22 11 45 18 23-7 45-18 11-22 18-45-7-23-18-45M372 256l13 22q14-8 25-20l2-2-2-2q-11-12-25-20zM102 254l-2 2 2 2q11 12 25 20l13-22-13-22q-14 9-25 20M356 214l-19-6v14l10 9zM175 208l-19 6 9 17 10-9zM405 151q0 24-6 46 20 12 36 28 14-24 18-51-22-15-48-23M107 151q-26 8-48 23 4 27 18 51 17-16 36-28-6-22-6-46M363 145q-15 1-31 4 4 12 6 25 13 2 25 6l3-34zM174 174q2-13 6-25l-34-3-1 3q1 15 4 31 12-4 25-6M298 156l-17 9 9 10h14zM231 165l-17-9-6 19h14zM278 127l-22-27-2 2q-12 11-20 25l22 13zM130 58q-29 3-55 17-14 26-17 55 24-14 53-19 5-29 19-53M382 58q14 24 19 53 29 5 53 19-3-29-17-55-26-14-55-17M315 113q22-6 46-6-8-26-23-48-27 4-51 18 16 17 28 36M225 77q-24-13-51-18-15 22-23 48 24 0 46 6 12-20 28-36M307 26Q284 9 256 0q-28 9-51 26 27 9 51 25 24-16 51-25" />
        </svg>
      </button>

      <button
        className="cursor-pointer hover:scale-102"
        onClick={() => openModal("settings")}
      >
        <Cog size={46} strokeWidth="1" className="text-neutral-content/90" />
      </button>
    </footer>
  );
}

export default Footer;

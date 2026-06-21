import { HardHat, MousePointer2Off, Pickaxe, Toolbox, X } from "lucide-react";

function CompassModal({ id }: { id: string }) {
  return (
    <dialog id={id} className="modal">
      <div
        className="modal-box h-full w-full rounded-none bg-neutral-content text-neutral"
        dir="rtl"
      >
        <form method="dialog">
          <button className="cursor-pointer hover:bg-base-100/10 hover:scale-101 p-1.5 rounded-full absolute left-3 top-5 transition-all">
            <X />
          </button>
        </form>

        <section className="flex flex-col gap-2 justify-center items-center h-full">
          <Pickaxe size={32} />
          <h1>لە ئێستادا بەردەست نییە</h1>
        </section>
      </div>
    </dialog>
  );
}

export default CompassModal;

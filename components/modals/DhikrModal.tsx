import { X } from "lucide-react";

function DhikrModal({ id }: { id: string }) {
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
      </div>
    </dialog>
  );
}

export default DhikrModal;

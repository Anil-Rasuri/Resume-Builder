import type { ReactNode } from "react";

interface ItemCardProps {
  title: string;
  onRemove: () => void;
  children: ReactNode;
}

export default function ItemCard({ title, onRemove, children }: ItemCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="truncate text-sm font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}
interface AddItemButtonProps {
  label: string;
  onClick: () => void;
}

export default function AddItemButton({ label, onClick }: AddItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
    >
      + {label}
    </button>
  );
}
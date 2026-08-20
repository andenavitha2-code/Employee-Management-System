export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
}

export default function Toast({ toasts }: { toasts: ToastMessage[] }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium text-white ${
            t.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}

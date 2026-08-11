export default function LoadingAdminSite() {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-rose-100 border-t-rose-500 animate-spin rounded-full" />
        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
          Cargando...
        </span>
      </div>
    </div>
  );
}

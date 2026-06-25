export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-1.5 flex items-center gap-1 text-red-500 font-medium text-[12px] leading-none animate-in fade-in slide-in-from-top-1">
      <span className="h-1 w-1 rounded-full bg-red-500" /> {children}
    </div>
  );
}

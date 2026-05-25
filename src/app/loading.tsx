export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-paper-50">
      <div className="relative h-10 w-10">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-lime/60" />
        <span className="absolute inset-2 rounded-full bg-accent-lime" />
      </div>
    </div>
  );
}

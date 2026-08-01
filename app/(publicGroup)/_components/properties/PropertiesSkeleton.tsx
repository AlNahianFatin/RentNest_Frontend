export function PropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-100 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
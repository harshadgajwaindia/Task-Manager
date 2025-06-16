export default function TasksSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-28 shadow rounded bg-neutral-100 animate-pulse"></div>
      ))}
    </div>
  );
}

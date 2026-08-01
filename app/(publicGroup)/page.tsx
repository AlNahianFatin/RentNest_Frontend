export default async function HomePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-primary">
        Welcome to Rent Nest!
      </h1>

      <h2 className="mt-4 max-w-2xl text-xl text-muted-foreground md:text-2xl">
        Your safest route to happiness.
      </h2>
    </div>
  );
}
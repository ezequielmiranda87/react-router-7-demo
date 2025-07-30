export function Home() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to React Router 7 Starter
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          A modern starter template built with React Router 7 (Data Router mode) and ShadCN UI.
          This project demonstrates lazy loading, loaders, and a clean component architecture.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://reactrouter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Learn React Router 7
          </a>
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground"
          >
            Explore ShadCN UI <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
} 
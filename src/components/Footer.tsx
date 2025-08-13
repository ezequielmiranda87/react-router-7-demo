export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © 2024 React Router 7 Starter. Built with React Router 7 and ShadCN UI.
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  )
} 
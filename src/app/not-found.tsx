import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-light">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Страница не найдена</p>
        <Link href="/" className="text-primary hover:text-primary/80 font-heading font-semibold">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

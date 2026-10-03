import "./globals.css";

export const metadata = {
  title: "Arte Confeitaria | Doçura que Conquista",
  description: "Bolos, doces, tortas e encomendas especiais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

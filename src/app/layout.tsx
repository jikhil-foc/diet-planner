import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ClientTheme from "@/components/ClientTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ClientTheme>{children}</ClientTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

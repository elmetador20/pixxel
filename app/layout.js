

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner";
import FloatingShapes from "@/components/floating-shapes";
import Header from "@/components/header";
import { ClerkProvider} from '@clerk/nextjs'
import { shadesOfPurple } from "@clerk/themes";
import { ConvexClientProvider } from "./ConvexClientProvider";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "PIXXEL",
  description: "AI PHOTO Editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
          <ClerkProvider
            appearance={{
              baseTheme: shadesOfPurple,
            }}>
            <Header />
            <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
              <FloatingShapes />
              <Toaster richColors />
              {children}
            </main>
          </ClerkProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

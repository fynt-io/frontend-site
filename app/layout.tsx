import "./style/globals.scss";
import "./style/bren-icons/css/animation.css";
import "./style/bren-icons/css/bren-codes.css";
import "./style/bren-icons/css/bren-embedded.css";
import "./style/bren-icons/css/bren-ie7-codes.css";
import "./style/bren-icons/css/bren-ie7.css";
import "./style/bren-icons/css/bren.css";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import { switchThemeDuration } from "./constants";
import "./style/stripe-style.css";


const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Bren",
  description: "Bren - Be ready, embrace the new",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {

  return (
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={`${openSans.className} bg-cloudy-blue/20 text-black dark:text-white dark:bg-[#3f3f3f] ${switchThemeDuration}`}
        >
          <title>Bren</title>
          <meta name="description" content="Bren - Be ready, embrace the new" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" href="/favicon.svg" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          {/* <ClarityScript /> */}

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div
              id="mensagens"
              className="fixed z-[10] top-4 !w-full [ overscroll-behavior: none]"
            ></div> 
            <main>{children}</main>
            
          </ThemeProvider>
        </body>
      </html>
  );
}

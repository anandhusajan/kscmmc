import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { Toaster } from '@/components/ui/toaster';
import { JsonLd } from '@/components/shared/json-ld';
import { NewsTicker } from '@/components/shared/news-ticker';

// Poppins Font - All Variants
const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KSCMMC - KERALA STATE COIR MACHINERY MANUFACTURING COMPANY LTD.',
    template: '%s | KSCMMC',
  },
  description: 'Leading manufacturer of coir processing machinery. Explore our products, tenders, and career opportunities at KSCMMC.',
  metadataBase: new URL('https://coirconnect.firebaseapp.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: 'KSCMMC - Kerala State Coir Machinery Manufacturing Company Ltd.',
    description: 'Innovative coir machinery solutions from Kerala, India.',
    url: 'https://coirconnect.firebaseapp.com',
    siteName: 'KSCMMC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KSCMMC - Kerala State Coir Machinery Manufacturing Company Ltd.',
    description: 'Leading manufacturer of coir processing machinery.',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kerala State Coir Machinery Manufacturing Company Limited (KSCMMC)",
  "url": "https://coirconnect.firebaseapp.com",
  "logo": "https://coirconnect.firebaseapp.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-477-224-3486",
    "contactType": "customer service"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <JsonLd data={organizationSchema} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('gesturestart', function (e) {
                e.preventDefault();
              });
              document.addEventListener('gesturechange', function (e) {
                e.preventDefault();
              });
              document.addEventListener('gestureend', function (e) {
                e.preventDefault();
              });
              document.addEventListener('touchstart', function (e) {
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              }, { passive: false });
              document.addEventListener('touchmove', function (e) {
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              }, { passive: false });
              let lastTouchEnd = 0;
              document.addEventListener('touchend', function (e) {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                  e.preventDefault();
                }
                lastTouchEnd = now;
              }, { passive: false });
            `,
          }}
        />
      </head>
      <body className="font-poppins bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <NewsTicker />
            <main className="flex-grow pb-16 lg:pb-0 -mt-1">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

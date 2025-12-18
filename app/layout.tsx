import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { cookies } from 'next/headers';
import { Footer } from '@/components/Footer';
import FluidBackground from '@/components/FluidBackground';
export const metadata: Metadata = {
  title: 'K-Beauty Pass | Hospital Partners',
  description: '글로벌 환자 유치, K-Beauty Pass와 함께하세요. 성공적인 병원 마케팅의 시작.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'K-Beauty Pass | Hospital Partners',
    description: '글로벌 환자 유치, K-Beauty Pass와 함께하세요. 입점비 0원, 마케팅 지원 혜택까지!',
    url: 'https://partners.k-beautypass.com',
    siteName: 'K-Beauty Pass Partners',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'K-Beauty Pass Partners',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-slate-50 text-slate-800 overflow-x-hidden selection:bg-brand-lightblue selection:text-brand-blue">
        <FluidBackground />
        <Navbar isLoggedIn={!!(await cookies()).get('partner_user_id')?.value} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

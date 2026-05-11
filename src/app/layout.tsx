import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Claude Learning — Claude Codeを学ぶ',
  description: 'AIエンジニアリングとClaude Codeを基礎から実践まで体系的に学べる学習プラットフォーム',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

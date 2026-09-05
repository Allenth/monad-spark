import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'MonadSpark | 标书与合同签署', description: '将标书和合同关联到同一份签署记录，核验文件版本与双方确认。', robots: {index:false,follow:false} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body>{children}</body></html>; }

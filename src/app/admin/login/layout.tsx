import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Admin Login | Akshar One",
    robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

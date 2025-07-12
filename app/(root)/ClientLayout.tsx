"use client"
import SplashScreen from '@/components/shared/SplashScreen';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SplashScreen /> 
      {children}
    </>
  );
}
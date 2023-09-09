import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from 'next/app'
import {NextUIProvider} from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  return <ClerkProvider>
     <NextUIProvider>
    <Component {...pageProps} /> 
    </NextUIProvider>
    </ClerkProvider>
}

"use client";

import QuotesProvider from "@/store/quotes-provider";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <QuotesProvider>{children}</QuotesProvider>
    </NextUIProvider>
  );
}
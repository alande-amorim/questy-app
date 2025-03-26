import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { questyQueryClient } from "./query-client";

interface QuestyQueryProviderProps {
  children: ReactNode;
}

export function QuestyQueryProvider({ children }: QuestyQueryProviderProps) {
  return (
    <QueryClientProvider client={questyQueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

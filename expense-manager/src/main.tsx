// import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostHogProvider } from "posthog-js/react";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import LoadingComponent from "./components/shared/Loading-component.tsx";
import { Toaster } from "./components/ui/sonner";
import i18n from "./i18n.ts";
import "./index.css";
import { AuthProvider } from "./providers/auth-provider.tsx";
import { ErrorProvider } from "./providers/error-provider.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";

i18n.on("languageChanged", (locale: string) => {
  let lang = locale.substring(0, 2);
  let dir = i18n.dir(locale);

  const allowedLangs = ["en", "ar"];
  if (!allowedLangs.includes(lang)) {
    lang = "en";
    dir = "ltr";
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 1000 * 15,
      refetchOnReconnect: true,
      refetchIntervalInBackground: false,
    },
  },
});

const posthogOptions = {
  api_host: process.env.VITE_PUBLIC_POSTHOG_HOST,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PostHogProvider
    apiKey={process.env.VITE_PUBLIC_POSTHOG_KEY!}
    options={posthogOptions}
  >
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <ErrorProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingComponent />}>
              <App />
              <Toaster />
            </Suspense>
          </QueryClientProvider>
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  </PostHogProvider>
);

import { NextIntlProvider, IntlError, IntlErrorCode } from "next-intl";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextIntlProvider
        onError={onError}
        getMessageFallback={getMessageFallback}
        messages={pageProps.messages}
      >
        <Component {...pageProps} />
      </NextIntlProvider>
    </SessionProvider>
  );
}

function onError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    console.error(error);
  } else {
    // reportIntlError(error);
  }
}

function getMessageFallback({
  namespace,
  key,
  error,
}: {
  namespace?: string;
  key: string;
  error: IntlError;
}) {
  const path = [namespace, key].filter((part) => part != null).join(".");

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated\n${path} ยังไม่ได้รับการแปล`;
  } else {
    return `${path} has an error`;
  }
}

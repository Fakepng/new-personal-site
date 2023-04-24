import { useTranslations } from "next-intl";
import deepmerge from "deepmerge";
import pick from "lodash/pick";

import i18n from "@/libs/language/i18n";

import type { Context } from "@/types/staticProps";
import Head from "next/head";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      {t("title")}
    </main>
  );
}

export async function getStaticProps({ locale }: Context) {
  const namespace = ["Index"];

  const messages = await i18n({ locale, namespace });

  return { props: { messages } };
}

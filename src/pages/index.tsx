import { useTranslations } from "next-intl";
import deepmerge from "deepmerge";
import pick from "lodash/pick";

import i18n from "@/utils/i18n";

export default function Home() {
  const t = useTranslations("Index");

  return <main>{t("title")}</main>;
}

type Context = {
  locale: string;
};

export async function getStaticProps({ locale }: Context) {
  const namespace = ["Index"];

  const messages = await i18n({ locale, namespace });

  return { props: { messages } };
}

import { useTranslations } from "next-intl";

import { getSortedBlogsDataTH, getSortedBlogsDataEN } from "@/libs/blogs";
import i18n from "@/libs/language/i18n";

import type { Blog as BlogPost } from "@/types/blog";
import type { Context } from "@/types/staticProps";
import Link from "next/link";
import Head from "next/head";

export default function Blogs({ allBlogsData }: { allBlogsData: BlogPost[] }) {
  const t = useTranslations("Blog");

  return (
    <div>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      <section>
        <h2>{t("title")}</h2>
        <ul>
          {allBlogsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/blog/${id}`}>
                {title}
                <br />
                {id}
                <br />
                {date}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export async function getStaticProps({ locale }: Context) {
  const allBlogsDataTH = getSortedBlogsDataTH();
  const allBlogsDataEN = getSortedBlogsDataEN();

  const namespace = ["Blog"];
  const messages = await i18n({ locale, namespace });

  return {
    props: {
      allBlogsData: locale === "en" ? allBlogsDataEN : allBlogsDataTH,
      messages,
    },
    revalidate: 10,
  };
}

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import {
  getSortedBlogsDataTH,
  getPostDataTH,
  getSortedBlogsDataEN,
  getPostDataEN,
} from "@/libs/blogs";
import i18n from "@/libs/language/i18n";

import type { Blog as BlogPost } from "@/types/blog";
import type { Context } from "@/types/staticProps";
import Head from "next/head";
import Link from "next/link";

export default function Blog({
  blogData,
}: {
  blogData: BlogPost & { contentHtml: string };
}) {
  return (
    <section className="prose prose-xl dark:prose-invert">
      <Head>
        <title>{blogData.title}</title>
        <meta name="description" content={blogData.title} />
      </Head>
      <h2>{blogData.title}</h2>
      <article>
        <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
        <p>
          <Link href={"/blog"}>Go Back</Link>
        </p>
      </article>
    </section>
  );
}

export async function getStaticProps({
  locale,
  params,
}: Context & { params: { blogId: string } }) {
  const allBlogsDataTH = getSortedBlogsDataTH();
  const allBlogsDataEN = getSortedBlogsDataEN();

  const THBlogsIds = allBlogsDataTH.map((blog) => blog.id);
  const ENBlogsIds = allBlogsDataEN.map((blog) => blog.id);

  const allBlogIds = [...THBlogsIds, ...ENBlogsIds];
  if (!allBlogIds.includes(params.blogId)) {
    return { notFound: true };
  }

  const namespace = ["Blog"];
  const messages = await i18n({ locale, namespace });

  const blogData =
    locale === "th"
      ? await getPostDataTH(params.blogId)
      : await getPostDataEN(params.blogId);

  return {
    props: {
      blogData,
      messages,
    },
  };
}

export async function getStaticPaths() {
  const allBlogsDataTH = getSortedBlogsDataTH();
  const allBlogsDataEN = getSortedBlogsDataEN();

  const THBlogsIds = allBlogsDataTH.map((blog) => ({
    params: { blogId: blog.id },
    locale: "th",
  }));
  const ENBlogsIds = allBlogsDataEN.map((blog) => ({
    params: { blogId: blog.id },
    locale: "en",
  }));

  const allBlogIds = [...THBlogsIds, ...ENBlogsIds];

  return {
    paths: allBlogIds,
    fallback: "blocking",
  };
}

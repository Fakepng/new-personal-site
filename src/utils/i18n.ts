import deepmerge from "deepmerge";
import pick from "lodash/pick";

export default async function i18n({
  locale,
  namespace,
}: {
  locale: string;
  namespace: string[];
}) {
  const userMessages = (await import(`@/locales/${locale}.json`)).default;
  const defaultMessages = (await import("@/locales/th.json")).default;

  const messages = deepmerge(defaultMessages, userMessages);

  const filteredMessages = pick(messages, namespace);

  return namespace.length === 0 ? messages : filteredMessages;
}

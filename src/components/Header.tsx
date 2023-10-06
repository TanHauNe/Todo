import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import { getDictionary } from "../../lib/dictionary";
import { Locale } from "../../i18n.config";

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  return (
    <header className="py-6">
      <nav className="container flex items-center justify-between">
        <ul className="flex gap-x-8">
          <li>
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </li>
          <li>
            <Link href={`/${lang}/login`}>{navigation.about}</Link>
          </li>
        </ul>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}

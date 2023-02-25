import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function LangSwitcher() {
  const [active, setActive] = useState("en");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const usa = (
    <Image src="/usa.svg" width={24} height={24} alt="United States" />
  );
  const georgia = (
    <Image src="/georgia.png" width={24} height={24} alt="Georgia" />
  );

  const handleChangeLang = (locale: string) => {
    setActive(locale);
    setShowMenu(false);
    router.push(router.asPath, undefined, { locale });
  };

  return (
    <div className="relative z-30 p-2 rounded bg-slate-50">
      <div
        className="flex items-center justify-center space-x-1 cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {active === "en" ? usa : georgia}
        {!showMenu ? <IoIosArrowDown size={20} /> : <IoIosArrowUp size={20} />}
      </div>
      {showMenu && (
        <div
          className={`${
            active === "ka" ? "flex-col" : "flex-col-reverse"
          } absolute flex items-center justify-center w-full py-8 -translate-x-1/2 border rounded gap-y-4 bg-slate-50 -bottom-32 left-1/2`}
        >
          {router.locales &&
            router.locales.map((locale) => (
              <Image
                key={locale}
                src={`${locale === "en" ? "/usa.svg" : "/georgia.png"}`}
                alt="United States"
                className="cursor-pointer"
                width={40}
                height={40}
                onClick={() => handleChangeLang(locale)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function LangSwitcher() {
  const [active, setActive] = useState("en");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const langSwitcherRef = useRef<HTMLDivElement>(null);

  const handleChangeLang = (locale: string) => {
    setActive(locale);
    setShowMenu(false);
    router.push(router.asPath, undefined, { locale });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langSwitcherRef.current && !langSwitcherRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langSwitcherRef]);

  return (
    <>
        <div ref={langSwitcherRef} className="relative z-30 p-2 rounded bg-slate-50">
          <div
            className="flex items-center justify-center space-x-1 cursor-pointer"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {active === "en" ? <span className="fi fi-us"></span> : <span className="fi fi-ge"></span>}
            {!showMenu ? (
              <IoIosArrowDown size={20} />
            ) : (
              <IoIosArrowUp size={20} />
            )}
          </div>
          {showMenu && (
            <div
              className={`${
                active === "ka" ? "flex-col" : "flex-col-reverse"
              } absolute flex items-center justify-center w-full py-4 -translate-x-1/2 border rounded gap-y-4 bg-slate-50 -bottom-[105px] left-1/2`}
            >
              {router.locales &&
                router.locales.map((locale) => (
                  <span
                    key={locale}
                    className={`fi ${locale === 'en' ? 'fi-us' : 'fi-ge'} cursor-pointer w-full h-7 `}
                    onClick={() => handleChangeLang(locale)}
                  >
                    </span>
                ))}
            </div>
          )}
        </div>
    </>
  );
}

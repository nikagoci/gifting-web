import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {IoIosArrowUp} from 'react-icons/io'

export default function LangSwitcher() {
  const [active, setActive] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const usa = (
    <Image src="/usa.svg" width={24} height={24} alt="United States" />
  );
  const georgia = (
    <Image src="/georgia.png" width={24} height={24} alt="Georgia" />
  );

  const handleChangeLang = (current: number) => {
    setActive(current);
    setShowMenu(false);
    console.log("show should be false");
  };

  return (
    <div
      className="relative p-2 rounded bg-slate-50"
      
    >
      <div className="flex items-center justify-center space-x-1 cursor-pointer" onClick={() => setShowMenu((prev) => !prev)}>
        {active === 0 ? usa : georgia}
        {!showMenu ? <IoIosArrowDown size={20} /> :<IoIosArrowUp size={20} />}
        
      </div>
      {showMenu && (
        <div
          className={`${
            active === 1 ? "flex-col" : "flex-col-reverse"
          } absolute flex items-center justify-center w-full py-8 -translate-x-1/2 border rounded gap-y-4 bg-slate-50 -bottom-32 left-1/2`}
        >
          <Image
            src="/usa.svg"
            alt="United States"
            className="cursor-pointer"
            width={40}
            height={40}
            onClick={() => handleChangeLang(0)}
          />
          <Image
            src="/georgia.png"
            className="cursor-pointer"
            width={40}
            height={40}
            alt="Georgia"
            onClick={() => handleChangeLang(1)}
          />
        </div>
      )}
    </div>
  );
}

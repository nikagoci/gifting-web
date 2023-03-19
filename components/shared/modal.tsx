/* This example requires Tailwind CSS v2.0+ */
import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalButtons from "./modal-buttons";
import { ProductInterface } from "@/utils/interfaces";

export enum themeEnum {
  "green",
  "red",
}

interface Props {
  id: string | String[];
  header: string;
  description: string;
  option1: string;
  option2: string;
  icon: ReactNode;
  theme: themeEnum;
  setAllProduct?: Dispatch<SetStateAction<ProductInterface[]>>;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  id,
  header,
  description,
  option1,
  option2,
  icon,
  theme,
  setAllProduct,
  setShowModal
}: Props) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const handleModalClose = () => {
    setOpen(false)
    if(setShowModal){
      setShowModal(false)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleModalClose}
        >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div
                  className={`flex items-center justify-center w-12 h-12 mx-auto ${
                    theme == themeEnum.green ? "bg-green-100" : "bg-rose-100"
                  } rounded-full`}
                >
                  {icon}
                </div>
                <div className="text-center mt-7 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {header}
                  </Dialog.Title>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
              <ModalButtons
                theme={theme}
                id={id}
                setOpen={setOpen}
                cancelButtonRef={cancelButtonRef}
                option1={option1}
                option2={option2}
                setAllProduct={setAllProduct}
                setShowModal={setShowModal}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

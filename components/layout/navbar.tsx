import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import Button from "../shared/ui/button";
import { signOut, useSession } from "next-auth/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log({
    session,
    status,
  });

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  const userName = session && session.user && session.user.email && session.user.email.split('@')[0];

  const active = "border-indigo-500 text-gray-900";
  const notActive =
    "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  const activeMobile = "bg-indigo-50 border-indigo-500 text-indigo-700";
  const notActiveMobile =
    "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700";

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open, close }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-8 lg:hidden"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                    onClick={() => close()}
                  />
                  <img
                    className="hidden w-auto h-8 lg:block"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                    onClick={() => close()}
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href="/"
                    className={`
                    inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      router.pathname === "/" ? active : notActive
                    }
                    `}
                  >
                    Home
                  </Link>
                  <Link
                    href="/#about"
                    scroll={false}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent cursor-pointer hover:border-gray-300 hover:text-gray-700"
                  >
                    About
                  </Link>
                  <Link
                    href="/products/?page=1"
                    className={`
                    inline-flex items-center px-1 pt-1 text-sm font-medium  border-b-2 ${
                      router.pathname === "/products" ? active : notActive
                    }
                    `}
                  >
                    Products
                  </Link>
                </div>
              </div>

              {status === "unauthenticated" && (
                <div className="hidden sm:ml-6 sm:flex sm:items-center gap-x-4">
                  <Button href="/signup">Sing Up</Button>
                  <Button full href="/login">
                    Log In
                  </Button>
                </div>
              )}

              {status === "authenticated" && (
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="/user.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/post/add-product"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Add Product
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 cursor-pointer text-sm text-gray-700"
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}

              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Link
                onClick={() => close()}
                href="/"
                className={`
                    inline-flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                      router.pathname === "/" ? activeMobile : notActiveMobile
                    }
                    `}
              >
                Home
              </Link>
              <Link
                onClick={() => close()}
                href="/#about"
                scroll={false}
                className="inline-flex items-center px-4 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent cursor-pointer hover:border-gray-300 hover:text-gray-700"
              >
                About
              </Link>
              <Link
                onClick={() => close()}
                href="/products/?page=1"
                className={`
                    inline-flex items-center px-4 py-3 text-sm font-medium  border-b-2 ${
                      router.pathname === "/products"
                        ? activeMobile
                        : notActiveMobile
                    }
                    `}
              >
                Products
              </Link>
              {status === "unauthenticated" && (
                <div className="flex px-4 pt-4 gap-x-4">
                  <Button
                    padding="py-2 px-4 text-sm"
                    href="/signup"
                    onClick={() => close()}
                  >
                    Sing Up
                  </Button>
                  <Button
                    padding="py-2 px-6 text-sm"
                    full
                    href="/login"
                    onClick={() => close()}
                  >
                    Log In
                  </Button>
                </div>
              )}
              {status === 'authenticated' && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/user.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{userName}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/post/add-product"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Add Product
                  </Link>
                  <div
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-base font-medium text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* There Should Be Mob Nav if User Is Register 1) */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

{
  /* 1) Mobile Nav if User Is Regiser  */
}
{
  /* <div className="pt-4 pb-3 border-t border-gray-200">
<div className="flex items-center px-4">
<div className="flex-shrink-0">
  <img
    className="w-10 h-10 rounded-full"
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    alt=""
  />
</div>
<div className="ml-3">
  <div className="text-base font-medium text-gray-800">Tom Cook</div>
  <div className="text-sm font-medium text-gray-500">tom@example.com</div>
</div>
<button
  type="button"
  className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  <span className="sr-only">View notifications</span>
  <BellIcon className="w-6 h-6" aria-hidden="true" />
</button>
</div>
<div className="mt-3 space-y-1">
<a
  href="#"
  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
>
  Your Profile
</a>
<a
  href="#"
  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
>
  Settings
</a>
<a
  href="#"
  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
>
  Sign out
</a>
</div>
</div> */
}

{
  /* 2) Profile Dropdown if User is Registered */
}

{
  /* <div className="hidden sm:ml-6 sm:flex sm:items-center">
                 <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                </div> */
}

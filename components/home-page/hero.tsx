import Button from "../shared/ui/button";

export default function Hero() {
  return (
        <header className="flex flex-col items-center justify-center h-full full-height gap-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Make people happy</span>{' '}
              <span className="block text-indigo-600 xl:inline">With Presents</span>
            </h1>
            <p className="max-w-md mx-auto mt-3 text-base text-center sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              XXXX is a company based in georgia. Our main goal is to help people who can't help themselves. We hope there are many people who thinks like us.
            </p>
            <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Button full href='/products' padding="py-3 px-12">See Products</Button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Button href='/' padding="py-3 px-12">Add Products</Button>
              </div>
            </div>
        </header>
  )
}

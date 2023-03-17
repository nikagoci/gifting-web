
/* This example requires Tailwind CSS v2.0+ */
import {AiOutlineTwitter} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'
import { useTranslation } from 'next-i18next'

const navigation = [
  {
    name: 'Facebook',
    href: 'facebook.com',
    icon: BsFacebook
  },
  {
    name: 'Instagram',
    href: 'instagram.com',
    icon: AiOutlineInstagram
  },
  {
    name: 'Twitter',
    href: 'twitter.com',
    icon: AiOutlineTwitter
  },
  {
    name: 'GitHub',
    href: 'github.com',
    icon: AiFillGithub

  },
  {
    name: 'Youtube',
    href: 'youtube.com',
    icon: AiFillYoutube
  },
]

export default function FooterPage() {
  const {t} = useTranslation('common');

  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon size={25} />
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-400">&copy; {t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

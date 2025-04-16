import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SuperDuperAI</h3>
            <p className="text-gray-400">
              Create stunning videos, avatars, and content with AI-powered tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/video-generator" className="text-gray-400 hover:text-white">
                  AI Video Generator
                </Link>
              </li>
              <li>
                <Link href="/avatar-creator" className="text-gray-400 hover:text-white">
                  Avatar Creator
                </Link>
              </li>
              <li>
                <Link href="/content-tools" className="text-gray-400 hover:text-white">
                  Content Tools
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-400 hover:text-white">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-white"
                >
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            {t('copyright')}
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white"
            >
              {t('links.privacy')}
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white"
            >
              {t('links.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
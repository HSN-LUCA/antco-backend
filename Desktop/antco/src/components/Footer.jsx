
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Footer = ({ language }) => {
  const { content } = useContent();
  const links = content.header[language].nav;

  const scrollToSection = (index) => {
    const sections = ['hero', 'about', 'services', 'companies', 'quality', 'contact'];
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">ANTCO</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">{content.footer[language].aboutText}</p>
          </div>

          <div>
            <span className="text-lg font-bold mb-4 block border-b-2 border-orange-500 pb-2 inline-block">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </span>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <button onClick={() => scrollToSection(index)} className="text-gray-300 hover:text-orange-400">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-lg font-bold mb-4 block border-b-2 border-orange-500 pb-2 inline-block">
              {language === 'ar' ? 'معلومات الاتصال' : 'Contact Info'}
            </span>
            <div className="space-y-3 text-gray-300">
               <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-orange-400" /> {content.contact[language].address}</div>
               <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-orange-400" /> {content.contact.en.phone}</div>
               <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-orange-400" /> {content.contact.en.email}</div>
            </div>
          </div>

          <div>
            <span className="text-lg font-bold mb-4 block border-b-2 border-orange-500 pb-2 inline-block">
               {language === 'ar' ? 'تابعنا' : 'Follow Us'}
            </span>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          {content.footer[language].rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

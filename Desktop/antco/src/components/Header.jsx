
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/context/ContentContext';

const Header = ({ language, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useContent();

  const scrollToSection = (index) => {
    const sections = ['hero', 'about', 'services', 'companies', 'quality', 'contact'];
    if (index >= 0 && index < sections.length) {
      const element = document.getElementById(sections[index]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex flex-col items-start">
               <img 
                 src={content.header.logo}
                 alt="Official Logo" 
                 className="h-16 w-auto object-contain"
               />
               <span className="text-[10px] text-gray-600 font-medium mt-1">
                 {content.header[language].subsidiary}
               </span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {content.header[language].nav.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium text-sm lg:text-base"
              >
                {item}
              </button>
            ))}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              <Globe className="w-4 h-4 mr-2" />
              {content.header[language].langBtn}
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-orange-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
          >
            {content.header[language].nav.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className="block w-full text-left py-3 text-gray-700 hover:text-orange-500 transition-colors border-b border-gray-50 last:border-0"
              >
                {item}
              </button>
            ))}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="w-full mt-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <Globe className="w-4 h-4 mr-2" />
              {content.header[language].langBtn}
            </Button>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;

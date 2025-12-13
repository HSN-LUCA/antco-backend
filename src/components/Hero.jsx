
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Hero = ({ language }) => {
  const { content } = useContent();
  
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={content.hero.bgImage}
          alt="Fleet"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80"></div>
      </motion.div>

      <div className="container mx-auto px-4 z-10 text-center text-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-yellow-100 to-red-500 bg-clip-text text-transparent drop-shadow-2xl leading-tight py-2"
            >
              {content.hero[language].title}
            </motion.h1>
            
            <motion.div className="inline-block">
              <p className="text-xl md:text-3xl font-medium mb-12 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 max-w-4xl mx-auto">
                {content.hero[language].subtitle}
              </p>
            </motion.div>

            <motion.div>
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-10 py-8 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(234,88,12,0.5)] border-2 border-orange-400/50"
              >
                {content.hero[language].cta}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer hidden md:block"
          onClick={scrollToAbout}
        >
          <ChevronDown className="w-12 h-12 animate-bounce text-orange-400 drop-shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

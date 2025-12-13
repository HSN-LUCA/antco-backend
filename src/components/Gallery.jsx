
import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ language }) => {
  const content = {
    ar: {
      title: 'معرض الصور',
      subtitle: 'لمحة عن أعمالنا'
    },
    en: {
      title: 'Gallery',
      subtitle: 'A Glimpse of Our Work'
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600">{content[language].subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Heavy excavator at construction site"
             src="https://images.unsplash.com/photo-1694306695560-2ac11d9ec304" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Construction crane lifting materials"
             src="https://images.unsplash.com/photo-1625990699662-35bbb7241a16" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Bulldozer moving earth"
             src="https://images.unsplash.com/photo-1691642388893-550fd9db9851" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Dump truck at construction site"
             src="https://images.unsplash.com/photo-1651408244457-e990ee7247d2" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Road construction with paver"
             src="https://images.unsplash.com/photo-1693331098369-691cc1cffa3f" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Construction workers with equipment"
             src="https://images.unsplash.com/photo-1599119926041-375a808df339" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Concrete mixer truck"
             src="https://images.unsplash.com/photo-1517826583757-f1957a0a1e99" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Loader moving materials"
             src="https://images.unsplash.com/photo-1629807473015-41699c4471b5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64 group"
          >
            <img 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              alt="Building construction progress"
             src="https://images.unsplash.com/photo-1552705906-b71478b161c6" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

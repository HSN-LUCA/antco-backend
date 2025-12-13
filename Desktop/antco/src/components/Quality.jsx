
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Quality = ({ language }) => {
  const { content } = useContent();
  const sectionContent = content.quality[language];
  const certificates = sectionContent.certificates || [];

  return (
    <section id="quality" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 rounded-full bg-red-100 text-red-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {sectionContent.title}
          </h2>
          <p className="text-xl text-gray-600">
            {sectionContent.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
            >
              {/* Year */}
              <div className="text-gray-500 font-medium mb-6">
                {cert.year}
              </div>

              {/* Certificate Image Circle */}
              <div className="w-32 h-32 rounded-full bg-gray-50 mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover p-2"
                />
              </div>

              {/* Category (Black Text) */}
              <h4 className="text-gray-800 font-bold mb-2 text-lg">
                {cert.category}
              </h4>

              {/* Title (Red Text) */}
              <h3 className="text-red-600 font-bold text-xl mb-4">
                {cert.title}
              </h3>

              {/* Description (Grey Text) */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quality;

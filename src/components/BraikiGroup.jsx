
import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';

const BraikiGroup = ({ language }) => {
  const { content } = useContent();
  const sectionContent = content.companies[language];
  const companies = sectionContent.items || [];

  return (
    <section id="companies" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full opacity-60 -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full opacity-60 -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
             {language === 'ar' ? 'الشركة الأم' : 'Parent Company'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {sectionContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {sectionContent.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden bg-gray-200 relative">
                <img 
                  src={company.image} 
                  alt={company.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {company.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {company.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BraikiGroup;

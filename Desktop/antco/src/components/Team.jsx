
import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';

const Team = ({ language }) => {
  const { content } = useContent();
  const sectionContent = content.team[language];

  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Main Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 relative inline-block">
            {sectionContent.mainTitle}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-full transform translate-y-2"></span>
          </h2>
        </motion.div>

        <div className="space-y-20">
          
          {/* Block 1: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
                {sectionContent.block1.title}
                <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-red-500 rounded-full"></span>
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mt-4 text-justify">
                {sectionContent.block1.description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                 <img 
                    src={sectionContent.block1.image} 
                    alt={sectionContent.block1.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </motion.div>
          </div>

          {/* Block 2: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                 <img 
                    src={sectionContent.block2.image} 
                    alt={sectionContent.block2.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                 />
               </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
                {sectionContent.block2.title}
                <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-red-500 rounded-full"></span>
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mt-4 text-justify">
                {sectionContent.block2.description}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;


import React from 'react';
import { motion } from 'framer-motion';
import { History, Truck, Users, ShieldCheck } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const About = ({ language }) => {
  const { content } = useContent();

  const stats = [
    { icon: History, value: '1982', label: language === 'ar' ? 'سنة التأسيس' : 'Established' },
    { icon: Truck, value: '500+', label: language === 'ar' ? 'معدة وشاحنة' : 'Fleet Size' },
    { icon: Users, value: '300+', label: language === 'ar' ? 'موظف محترف' : 'Professional Staff' },
    { icon: ShieldCheck, value: '100%', label: language === 'ar' ? 'التزام بالسلامة' : 'Safety Commitment' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {content.about[language].title}
          </h2>
          <p className="text-xl text-gray-600 mb-6 font-medium">{content.about[language].subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
             <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-orange-500 pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-4">
              {content.about[language].description}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.about[language].reputation}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
               <img 
                 src={content.about.en.image || content.about.ar.image}
                 alt="About Us" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center group border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 rounded-full flex items-center justify-center transition-all duration-300">
                  <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;

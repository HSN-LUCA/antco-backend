
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Hammer, Settings, Building2, Wrench, HardHat, Droplet } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Services = ({ language }) => {
  const { content } = useContent();

  const servicesList = content?.services?.[language]?.services || [];
  const sectionTitle = content?.services?.[language]?.title || 'Services';
  const sectionSubtitle = content?.services?.[language]?.subtitle || '';

  const serviceData = servicesList.map(service => {
    let IconComponent;
    switch (service.icon) {
      case 'Truck': IconComponent = Truck; break;
      case 'Hammer': IconComponent = Hammer; break;
      case 'Settings': IconComponent = Settings; break;
      case 'Building2': IconComponent = Building2; break;
      case 'Wrench': IconComponent = Wrench; break;
      case 'HardHat': IconComponent = HardHat; break;
      case 'Droplet': IconComponent = Droplet; break;
      default: IconComponent = Truck; // Default icon
    }
    return { ...service, Icon: IconComponent };
  });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600">{sectionSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => {
            const Icon = service.Icon;
            const descriptionPoints = Array.isArray(service.description) 
              ? service.description 
              : [service.description];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col"
              >
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-orange-200">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <div className="flex-grow">
                  <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
                    {descriptionPoints.map((item, idx) => (
                      <li key={idx} className="marker:text-orange-500">{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

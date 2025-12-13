
import React from 'react';
import { motion } from 'framer-motion';

const Projects = ({ language }) => {
  const content = {
    ar: {
      title: 'مشاريعنا',
      subtitle: 'نفخر بإنجازاتنا',
      projects: [
        {
          title: 'مشروع البنية التحتية',
          description: 'تطوير شامل للبنية التحتية في دبي',
          category: 'بنية تحتية'
        },
        {
          title: 'المجمع السكني',
          description: 'بناء مجمع سكني متكامل في أبوظبي',
          category: 'مباني سكنية'
        },
        {
          title: 'المنطقة الصناعية',
          description: 'تطوير منطقة صناعية حديثة',
          category: 'صناعي'
        },
        {
          title: 'الطرق والجسور',
          description: 'إنشاء شبكة طرق وجسور متطورة',
          category: 'بنية تحتية'
        }
      ]
    },
    en: {
      title: 'Our Projects',
      subtitle: 'We Take Pride in Our Achievements',
      projects: [
        {
          title: 'Infrastructure Project',
          description: 'Comprehensive infrastructure development in Dubai',
          category: 'Infrastructure'
        },
        {
          title: 'Residential Complex',
          description: 'Building an integrated residential complex in Abu Dhabi',
          category: 'Residential'
        },
        {
          title: 'Industrial Zone',
          description: 'Development of a modern industrial zone',
          category: 'Industrial'
        },
        {
          title: 'Roads & Bridges',
          description: 'Construction of advanced road and bridge network',
          category: 'Infrastructure'
        }
      ]
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content[language].projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  alt={project.title}
                 src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-sm font-semibold mb-3">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-200">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

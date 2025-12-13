
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useContent } from '@/context/ContentContext';

const Contact = ({ language }) => {
  const { toast } = useToast();
  const { content } = useContent();

  const infoItems = [
    { icon: MapPin, label: language === 'ar' ? 'العنوان' : 'Address', value: content.contact[language].address },
    { icon: Phone, label: language === 'ar' ? 'الهاتف' : 'Phone', value: content.contact[language].phone || content.contact.en.phone },
    { icon: Mail, label: language === 'ar' ? 'البريد الإلكتروني' : 'Email', value: content.contact[language].email || content.contact.en.email },
    { icon: Clock, label: language === 'ar' ? 'ساعات العمل' : 'Working Hours', value: language === 'ar' ? 'الأحد - الخميس: 8 صباحاً - 6 مساءً' : 'Sunday - Thursday: 8 AM - 6 PM' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {content.contact[language].title}
          </h2>
          <p className="text-xl text-gray-600">{content.contact[language].subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {infoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">{item.label}</div>
                      <div className="text-gray-600">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" className="w-full px-4 py-3 border rounded-lg" placeholder={language === 'ar' ? 'الاسم' : 'Name'} required />
              <input type="email" className="w-full px-4 py-3 border rounded-lg" placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'} required />
              <input type="tel" className="w-full px-4 py-3 border rounded-lg" placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone'} required />
              <textarea rows="4" className="w-full px-4 py-3 border rounded-lg" placeholder={language === 'ar' ? 'الرسالة' : 'Message'} required></textarea>
              <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-6">
                {language === 'ar' ? 'إرسال' : 'Send'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

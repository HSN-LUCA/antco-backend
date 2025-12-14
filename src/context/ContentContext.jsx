
import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveContent, loadContent } from '@/lib/api';

const ContentContext = createContext();

const initialContent = {
  header: {
    ar: {
      nav: ['الرئيسية', 'من نحن', 'خدماتنا', 'الشركات', 'الجودة', 'اتصل بنا'],
      langBtn: 'English',
      subsidiary: 'نحن شركة تابعة لمجموعة البريكي'
    },
    en: {
      nav: ['Home', 'About', 'Services', 'Companies', 'Quality', 'Contact'],
      langBtn: 'العربية',
      subsidiary: 'We are a subsidiary company of Al Braiki Group'
    },
    logo: "https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/528ff288f9245604b44e1908c5703e77.png"
  },
  hero: {
    ar: {
      title: 'شركة العين الوطنية للنقل',
      subtitle: 'أسطول من المعدات الحديثة بقدرات عالية في مجالات النقل',
      cta: 'اكتشف المزيد'
    },
    en: {
      title: 'Al Ain National Transport Company',
      subtitle: 'A fleet of modern equipment with high capabilities in transportation fields',
      cta: 'Discover More'
    },
    bgImage: "https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/154a062f06a2420f3d62f0b121bc23c8.png"
  },
  about: {
    ar: {
      title: 'حول شركة العين الوطنية للنقل',
      subtitle: 'تاريخ عريق ومستقبل واعد',
      description: 'تأسست شركة العين الوطنية للنقل في عام 1982، وهي إحدى الشركات الرائدة التابعة لمجموعة البريكي. على مدار أكثر من 40 عاماً، بنينا سمعة قوية في مجال النقل والخدمات اللوجستية في دولة الإمارات العربية المتحدة.',
      reputation: 'تتمتع شركتنا بسمعة طيبة مبنية على الثقة والمصداقية والالتزام بأعلى معايير الجودة والسلامة. نملك أسطولاً ضخماً من المعدات الحديثة والشاحنات المجهزة لتلبية كافة احتياجات عملائنا.',
      image: "https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/154a062f06a2420f3d62f0b121bc23c8.png"
    },
    en: {
      title: 'About Al Ain National Transport',
      subtitle: 'A Rich History and Promising Future',
      description: 'Established in 1982, Al Ain National Transport Company is a leading subsidiary of Al Braiki Group. For over 40 years, we have built a strong reputation in the transportation and logistics sector within the United Arab Emirates.',
      reputation: 'Our company enjoys a solid reputation built on trust, credibility, and commitment to the highest standards of quality and safety. We own a massive fleet of modern equipment and trucks equipped to meet all our clients\' needs.',
      image: "https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/154a062f06a2420f3d62f0b121bc23c8.png"
    }
  },
  services: {
    ar: {
      title: 'خدماتنا',
      subtitle: 'حلول شاملة لمشاريعك',
      services: [
        {
          icon: 'Truck',
          title: 'تأجير المعدات الثقيلة',
          description: ['نوفر مجموعة واسعة من المعدات الثقيلة للإيجار بأسعار تنافسية تلبي كافة احتياجات مشاريعكم.']
        },
        {
          icon: 'Hammer',
          title: 'خدمات البناء',
          description: ['خدمات بناء متكاملة من التخطيط الأولي إلى التنفيذ والتسليم النهائي بجودة عالية.']
        },
        {
          icon: 'Settings',
          title: 'الصيانة والإصلاح',
          description: ['نقدم خدمات صيانة دورية وإصلاحات متخصصة لجميع أنواع المعدات لضمان استمرارية العمل.']
        },
        {
          icon: 'Building2',
          title: 'إدارة المشاريع',
          description: ['إدارة احترافية للمشاريع الإنشائية الكبرى مع التركيز على الجدول الزمني والميزانية.']
        },
        {
          icon: 'Wrench',
          title: 'قطع الغيار',
          description: ['توفير قطع غيار أصلية ومعتمدة لجميع أنواع المعدات الثقيلة والشاحنات.']
        },
        {
          icon: 'HardHat',
          title: 'استشارات هندسية',
          description: ['استشارات فنية وهندسية متخصصة لمساعدتكم في اتخاذ القرارات الصائبة لمشاريعكم.']
        },
        {
          icon: 'Droplet',
          title: 'مواد بترولية',
          description: [
            'نقل مواد الأسفلت',
            'نقل الديزل',
            'نقل الزيوت'
          ]
        }
      ]
    },
    en: {
      title: 'Our Services',
      subtitle: 'Comprehensive Solutions for Your Projects',
      services: [
        {
          icon: 'Truck',
          title: 'Heavy Equipment Rental',
          description: ['We provide a wide range of heavy equipment for rent at competitive prices to meet all your project needs.']
        },
        {
          icon: 'Hammer',
          title: 'Construction Services',
          description: ['Complete construction services from initial planning to execution and final delivery with high quality.']
        },
        {
          icon: 'Settings',
          title: 'Maintenance & Repair',
          description: ['We offer regular maintenance and specialized repairs for all equipment types to ensure continuity.']
        },
        {
          icon: 'Building2',
          title: 'Project Management',
          description: ['Professional management of major construction projects with a focus on timeline and budget.']
        },
        {
          icon: 'Wrench',
          title: 'Spare Parts',
          description: ['Supply of genuine and certified spare parts for all types of heavy equipment and trucks.']
        },
        {
          icon: 'HardHat',
          title: 'Engineering Consulting',
          description: ['Specialized technical and engineering consultations to help you make the right decisions for your projects.']
        },
        {
          icon: 'Droplet',
          title: 'Petroleum Materials',
          description: [
            'Transportation of Asphalt Materials',
            'Transportation of Diesel',
            'Transportation of Oils'
          ]
        }
      ]
    }
  },
  companies: {
    ar: {
      title: 'مجموعة البريكي',
      subtitle: 'شركاؤنا في النجاح',
      description: 'نحن جزء فخور من مجموعة البريكي الاستثمارية، والتي تضم نخبة من الشركات الرائدة في مختلف القطاعات.',
      items: [
        {
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
          title: "شركة العين للخرسانة الجاهزة",
          description: "بدأت في العين عام 1978 كشركة لتصنيع الخرسانة الجاهزة. لدينا مصانع ومعدات متطورة تكنولوجياً وفريق عمل ذو خبرة عالية وكفاءة."
        },
        {
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
          title: "شركة البريكي للمقاولات العامة",
          description: "شركة رائدة في مجال المقاولات والإنشاءات، تقدم حلولاً هندسية متكاملة لمشاريع البنية التحتية والمباني التجارية والسكنية."
        },
        {
          image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866",
          title: "مصنع البريكي للطابوق",
          description: "مصنع متطور لإنتاج كافة أنواع الطابوق ومواد البناء وفق أعلى المواصفات والمقاييس العالمية."
        },
        {
          image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
          title: "البريكي للإنشاءات",
          description: "تخصص في المشاريع الإنشائية الكبيرة والمعقدة، مع الالتزام التام بمعايير السلامة والجودة والجدول الزمني."
        },
        {
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          title: "البريكي للضيافة",
          description: "تقديم خدمات ضيافة متميزة وإدارة فنادق ومنتجعات سياحية بمستوى عالمي من الرفاهية والخدمة."
        },
        {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          title: "البريكي للاستثمار",
          description: "الذراع الاستثماري للمجموعة، يركز على تنويع المحفظة الاستثمارية في قطاعات واعدة داخل وخارج الدولة."
        }
      ]
    },
    en: {
      title: 'Al Braiki Group',
      subtitle: 'Our Partners in Success',
      description: 'We are a proud part of Al Braiki Investment Group, which includes a selection of leading companies in various sectors.',
      items: [
        {
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
          title: "Al Ain Ready Mix Co",
          description: "It has started in Al Ain in 1978 as concrete ready mix manufacturing company. We are having technologically advanced plants and equipments and we have the backup of highly experienced staff."
        },
        {
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
          title: "Al Braiki General Contracting",
          description: "A leading company in contracting and construction, providing integrated engineering solutions for infrastructure, commercial, and residential building projects."
        },
        {
          image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866",
          title: "Al Braiki Block Factory",
          description: "An advanced factory for producing all types of blocks and building materials according to the highest international standards and specifications."
        },
        {
          image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
          title: "Al Braiki Construction",
          description: "Specializing in large and complex construction projects, with full commitment to safety standards, quality, and project timelines."
        },
        {
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          title: "Al Braiki Hospitality",
          description: "Providing exceptional hospitality services and managing hotels and tourist resorts with a world-class level of luxury and service."
        },
        {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          title: "Al Braiki Investment",
          description: "The investment arm of the group, focusing on diversifying the investment portfolio in promising sectors inside and outside the country."
        }
      ]
    }
  },
  mission: {
    ar: {
      mainTitle: 'المهمة والرؤية',
      block1: {
        title: 'المهام والرؤى',
        description: 'نسعى دائماً لتجاوز توقعات عملائنا في الجودة والتسليم والخدمة الشاملة من خلال الفهم الكامل لاحتياجات عملائنا وضمان قدرتنا على تلبية متطلبات الأعمال. نتبع برنامج تحسين مستمر نحو التميز الشامل من خلال المزيد من الاستثمار في الموظفين والمصانع والآلات مع تنفيذ استراتيجيات وإجراءات تقلل من التأثيرات على البيئة.',
        image: 'https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/e854fad488f8ef872a70e5ec7b77d69e.png'
      },
      block2: {
        title: 'من الإمارات إلى العالم',
        description: 'عندما يتعلق الأمر بالنقل البري، فإن شركتنا هي المصدر الأفضل لمتطلباتك اللوجستية. نمتلك أسطولاً كبيراً ومتنامياً من معدات النقل الثقيل الحديثة والآمنة والتي تتم صيانتها جيداً. سمعتنا هي أعظم أصولنا التي تدفعنا للأمام من خلال الاستثمار المستمر في منطقة أعمال متغيرة باستمرار. سيساعدك فريق خبرائنا في اختيار النوع والحجم المناسب للمعدات المستخدمة للنقل الآمن لشحنتك مما يساعدك على توفير الوقت والمال. نحن نعتني بشحنة عملائنا وكأنها شحنتنا الخاصة من خلال ضمان السلامة والتسليم في الوقت المحدد.',
        image: 'https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/a8a403dfae539fdc6bb75d9e6cc8a842.png'
      }
    },
    en: {
      mainTitle: 'Mission & Vision',
      block1: {
        title: 'Tasks and visions',
        description: 'We always strive to exceed our customers expectations in Workmanship, delivery time and overall service by fully understanding the needs of our customers and ensuring our ability to meet business requirements. Follow our continuous improvement programme towards total excellence by the further investment in personnel, plant and machinery whilst also implementing strategies and procedures that reduce impacts upon the environment.',
        image: 'https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/e854fad488f8ef872a70e5ec7b77d69e.png'
      },
      block2: {
        title: 'From UAE to all world',
        description: 'When it comes to land transportation, AT is the best source of contact for your logistics requirements. – AT has a large and growing fleet of modern, safe and well maintained heavy hauling equipments. – Our reputation is our greatest asset which drives us forward by on-going investment in an ever-changing business region. – Our expert team will help you to select the proper type and size of equipment to be used for the safe transportation of your cargo that will help you save time and money. – We take care of our customer’s cargo like it is our own by ensuring the safety and on-time pick up and delivery.',
        image: 'https://horizons-cdn.hostinger.com/12ac5b18-f9da-493f-b677-c46f601102df/a8a403dfae539fdc6bb75d9e6cc8a842.png'
      }
    }
  },
  team: {
    ar: {
      mainTitle: 'فريق العمل',
      block1: {
        title: 'فريق متكامل',
        description: 'نفتخر في شركة العين الوطنية للنقل بامتلاكنا فريق عمل متكامل يضم نخبة من المهندسين والفنيين والسائقين المحترفين ذوي الخبرة العالية.',
        image: "https://images.unsplash.com/photo-1574689049597-7e6df3e2b024"
      },
      block2: {
        title: 'سائقون ومشغلون محترفون',
        description: 'يمتلك سائقونا ومشغلونا خبرة واسعة في التعامل مع الطرق الوعرة والشحنات الثقيلة، مما يضمن وصول بضائعكم بأمان وفي الوقت المحدد.',
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd"
      }
    },
    en: {
      mainTitle: 'Our Team',
      block1: {
        title: 'A Complete Team',
        description: 'At Al Ain National Transport Company, we pride ourselves on having a complete team comprising elite engineers, technicians, and professional drivers with high expertise.',
        image: "https://images.unsplash.com/photo-1574689049597-7e6df3e2b024"
      },
      block2: {
        title: 'Expert Drivers & Operators',
        description: 'Our drivers and operators have extensive experience in handling rough terrain and heavy cargo, ensuring your goods arrive safely and on time.',
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd"
      }
    }
  },
  quality: {
    ar: {
      title: 'الجودة والسلامة',
      subtitle: 'أولويتنا القصوى في كل مشروع',
      certificates: [
        {
          year: 'عام 2015',
          image: 'https://placehold.co/150x150/e2e8f0/ef4444?text=OHSAS',
          category: 'الصحة والسلامة المهنية',
          title: 'OHSAS 18001',
          description: 'نظام إدارة الصحة والسلامة المهنية'
        },
        {
          year: 'عام 2015',
          image: 'https://placehold.co/150x150/e2e8f0/ef4444?text=ISO+14001',
          category: 'الإدارة البيئية',
          title: 'ISO 14001',
          description: 'نظام الإدارة البيئية'
        },
        {
          year: 'عام 2007',
          image: 'https://placehold.co/150x150/e2e8f0/ef4444?text=ISO+9001',
          category: 'إدارة الجودة',
          title: 'ISO 9001',
          description: 'نظام إدارة الجودة'
        }
      ]
    },
    en: {
      title: 'Quality & Safety',
      subtitle: 'Our Top Priority in Every Project',
      certificates: [
        {
          year: 'Year 2015',
          image: 'https://placehold.co/150x150/e2e8f0/ef4444?text=OHSAS',
          category: 'Occupational Health & Safety',
          title: 'OHSAS 18001',
          description: 'Occupational Health & Safety Management System'
        },
        {
          year: 'Year 2015',
          image: 'https://placehold.co/150x150/e2e8f0/ef4444?text=ISO+14001',
          category: 'Environmental Management',
          title: 'ISO 14001',
          description: 'Environmental Management System'
        },
        {
          year: 'Year 2007',
          image: 'https://placehold.co/150x150/e2e8f0/ef4444?text=ISO+9001',
          category: 'Quality Assurance',
          title: 'ISO 9001',
          description: 'Quality Management System'
        }
      ]
    }
  },
  contact: {
    ar: {
      title: 'اتصل بنا',
      subtitle: 'نحن هنا لخدمتك',
      email: 'info@antco.ae',
      phone: '+971 4 123 4567',
      address: 'دبي، الإمارات العربية المتحدة'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We Are Here to Serve You',
      email: 'info@antco.ae',
      phone: '+971 4 123 4567',
      address: 'Dubai, United Arab Emirates'
    }
  },
  footer: {
    ar: {
      aboutText: 'شركة أنتكو هي شركة رائدة في مجال المعدات الثقيلة والبناء في الإمارات العربية المتحدة.',
      rights: '© 2024 أنتكو. جميع الحقوق محفوظة.'
    },
    en: {
      aboutText: 'Antco is a leading heavy equipment and construction company in the United Arab Emirates.',
      rights: '© 2024 Antco. All rights reserved.'
    }
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(initialContent);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Load content from API on mount and poll for updates
  useEffect(() => {
    const loadInitialContent = async () => {
      try {
        console.log('Loading content from API...');
        const apiContent = await loadContent();
        if (apiContent) {
          console.log('Loaded from API successfully');
          setContent(apiContent);
          localStorage.setItem('siteContent', JSON.stringify(apiContent));
          return;
        }
      } catch (err) {
        console.error("API load failed:", err);
      }

      console.log('Falling back to localStorage');
      // Fallback to localStorage
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          const mergedContent = { ...initialContent, ...parsed };

          if (!mergedContent.quality?.en?.certificates) {
            mergedContent.quality = initialContent.quality;
          }
          if (!mergedContent.mission?.en?.block1) {
            mergedContent.mission = initialContent.mission;
          }
          if (!mergedContent.team?.en?.block1) {
            mergedContent.team = initialContent.team;
          }

          setContent(mergedContent);
        } catch (e) {
          console.error("Failed to parse site content", e);
          setContent(initialContent);
        }
      }
    };

    loadInitialContent();

    // Poll for updates every 30 seconds (less frequent to avoid constant saves)
    const interval = setInterval(async () => {
      try {
        const apiContent = await loadContent();
        if (apiContent) {
          setContent(apiContent);
          localStorage.setItem('siteContent', JSON.stringify(apiContent));
        }
      } catch (err) {
        // Silent error for polling
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    // Also save to API
    saveContent(content).catch(err => console.error("API save failed:", err));
  }, [content]);

  const updateContent = (section, newContent) => {
    setContent(prev => ({
      ...prev,
      [section]: newContent
    }));
  };
  
  // New function to replace all content atomically
  const replaceAllContent = (newFullContent) => {
    setContent(newFullContent);
  };

  const login = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, replaceAllContent, isAdmin, login, logout }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);

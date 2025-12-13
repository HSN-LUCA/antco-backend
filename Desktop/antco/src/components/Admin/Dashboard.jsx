
import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Save, LayoutDashboard, Globe, PlusCircle, Trash2, ChevronDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { content, updateContent, replaceAllContent, logout, isAdmin } = useContent();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('hero');
  const [localContent, setLocalContent] = useState(content);
  const [expandedService, setExpandedService] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [expandedCertificate, setExpandedCertificate] = useState(null);

  // Redirect if not admin
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    // Save all changes atomically using replaceAllContent
    replaceAllContent(localContent);
    
    toast({
      title: "Changes Saved",
      description: "Website content has been updated successfully.",
    });
  };

  const updateField = (section, lang, field, value) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lang]: {
          ...prev[section][lang],
          [field]: value
        }
      }
    }));
  };

  const updateRootField = (section, field, value) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Service Handlers
  const handleServiceChange = (lang, index, field, value) => {
    const updatedServices = [...localContent.services[lang].services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setLocalContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [lang]: {
          ...prev.services[lang],
          services: updatedServices
        }
      }
    }));
  };

  const handleServiceListItemChange = (lang, serviceIndex, itemIndex, value) => {
    const updatedServices = [...localContent.services[lang].services];
    let currentDescription = updatedServices[serviceIndex].description;
    if (!Array.isArray(currentDescription)) {
      currentDescription = [currentDescription];
    }
    const updatedDescription = [...currentDescription];
    updatedDescription[itemIndex] = value;
    updatedServices[serviceIndex] = { ...updatedServices[serviceIndex], description: updatedDescription };
    setLocalContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [lang]: {
          ...prev.services[lang],
          services: updatedServices
        }
      }
    }));
  };

  const addService = (lang) => {
    const newService = {
      icon: 'Truck',
      title: `New Service ${localContent.services[lang].services.length + 1}`,
      description: ['New service point 1']
    };
    setLocalContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [lang]: {
          ...prev.services[lang],
          services: [...prev.services[lang].services, newService]
        }
      }
    }));
  };

  const removeService = (lang, indexToRemove) => {
    setLocalContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [lang]: {
          ...prev.services[lang],
          services: prev.services[lang].services.filter((_, index) => index !== indexToRemove)
        }
      }
    }));
  };

  const addServiceListItem = (lang, serviceIndex) => {
    const updatedServices = [...localContent.services[lang].services];
    const currentDescription = updatedServices[serviceIndex].description;
    const updatedDescription = Array.isArray(currentDescription) ? [...currentDescription, 'New List Item'] : [currentDescription, 'New List Item'];
    updatedServices[serviceIndex] = { ...updatedServices[serviceIndex], description: updatedDescription };
    setLocalContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [lang]: {
          ...prev.services[lang],
          services: updatedServices
        }
      }
    }));
  };

  const removeServiceListItem = (lang, serviceIndex, itemIndexToRemove) => {
    const updatedServices = [...localContent.services[lang].services];
    let currentDescription = updatedServices[serviceIndex].description;
    if (!Array.isArray(currentDescription)) {
      currentDescription = [currentDescription];
    }
    let updatedDescription;
    if (currentDescription.length > 1) {
        updatedDescription = currentDescription.filter((_, index) => index !== itemIndexToRemove);
    } else {
        updatedDescription = [''];
    }
    updatedServices[serviceIndex] = { ...updatedServices[serviceIndex], description: updatedDescription };
    setLocalContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [lang]: {
          ...prev.services[lang],
          services: updatedServices
        }
      }
    }));
  };

  // Company Handlers
  const handleCompanyChange = (lang, index, field, value) => {
    const updatedItems = [...localContent.companies[lang].items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setLocalContent(prev => ({
      ...prev,
      companies: {
        ...prev.companies,
        [lang]: {
          ...prev.companies[lang],
          items: updatedItems
        }
      }
    }));
  };

  const addCompany = (lang) => {
    const newCompany = {
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
      title: `New Company`,
      description: "Company description..."
    };
    setLocalContent(prev => ({
      ...prev,
      companies: {
        ...prev.companies,
        [lang]: {
          ...prev.companies[lang],
          items: [...prev.companies[lang].items, newCompany]
        }
      }
    }));
  };

  const removeCompany = (lang, indexToRemove) => {
     setLocalContent(prev => ({
      ...prev,
      companies: {
        ...prev.companies,
        [lang]: {
          ...prev.companies[lang],
          items: prev.companies[lang].items.filter((_, index) => index !== indexToRemove)
        }
      }
    }));
  };

  // Certificate Handlers
  const handleCertificateChange = (lang, index, field, value) => {
    const updatedItems = [...localContent.quality[lang].certificates];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setLocalContent(prev => ({
      ...prev,
      quality: {
        ...prev.quality,
        [lang]: {
          ...prev.quality[lang],
          certificates: updatedItems
        }
      }
    }));
  };

  const addCertificate = (lang) => {
    const newCert = {
      year: "Year 2024",
      image: "https://placehold.co/150x150",
      category: "Category",
      title: "Certificate Title",
      description: "Description text..."
    };
    setLocalContent(prev => ({
      ...prev,
      quality: {
        ...prev.quality,
        [lang]: {
          ...prev.quality[lang],
          certificates: [...(prev.quality[lang].certificates || []), newCert]
        }
      }
    }));
  };

  const removeCertificate = (lang, indexToRemove) => {
    setLocalContent(prev => ({
      ...prev,
      quality: {
        ...prev.quality,
        [lang]: {
          ...prev.quality[lang],
          certificates: prev.quality[lang].certificates.filter((_, index) => index !== indexToRemove)
        }
      }
    }));
  };

  // Mission Handlers
  const updateMissionField = (lang, field, value) => {
      setLocalContent(prev => ({
          ...prev,
          mission: {
              ...prev.mission,
              [lang]: {
                  ...prev.mission[lang],
                  [field]: value
              }
          }
      }));
  };

  const updateMissionBlock = (lang, block, field, value) => {
      setLocalContent(prev => ({
          ...prev,
          mission: {
              ...prev.mission,
              [lang]: {
                  ...prev.mission[lang],
                  [block]: {
                      ...prev.mission[lang][block],
                      [field]: value
                  }
              }
          }
      }));
  };
  
  // Team Handlers
  const updateTeamField = (lang, field, value) => {
      setLocalContent(prev => ({
          ...prev,
          team: {
              ...prev.team,
              [lang]: {
                  ...prev.team[lang],
                  [field]: value
              }
          }
      }));
  };

  const updateTeamBlock = (lang, block, field, value) => {
      setLocalContent(prev => ({
          ...prev,
          team: {
              ...prev.team,
              [lang]: {
                  ...prev.team[lang],
                  [block]: {
                      ...prev.team[lang][block],
                      [field]: value
                  }
              }
          }
      }));
  };


  const toggleServiceExpand = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };
  
  const toggleCompanyExpand = (id) => {
    setExpandedCompany(expandedCompany === id ? null : id);
  };
  
  const toggleCertificateExpand = (id) => {
    setExpandedCertificate(expandedCertificate === id ? null : id);
  };


  const renderSectionEditor = () => {
    switch(activeSection) {
      case 'hero':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600">English</h4>
                <input 
                  className="w-full p-2 border rounded" 
                  value={localContent.hero.en.title} 
                  onChange={(e) => updateField('hero', 'en', 'title', e.target.value)}
                  placeholder="Title EN"
                />
                <textarea 
                  className="w-full p-2 border rounded h-24" 
                  value={localContent.hero.en.subtitle} 
                  onChange={(e) => updateField('hero', 'en', 'subtitle', e.target.value)}
                  placeholder="Subtitle EN"
                />
                <input 
                  className="w-full p-2 border rounded" 
                  value={localContent.hero.en.cta} 
                  onChange={(e) => updateField('hero', 'en', 'cta', e.target.value)}
                  placeholder="Button Text EN"
                />
              </div>
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600">Arabic</h4>
                <input 
                  className="w-full p-2 border rounded" 
                  value={localContent.hero.ar.title} 
                  onChange={(e) => updateField('hero', 'ar', 'title', e.target.value)}
                  placeholder="العنوان"
                />
                <textarea 
                  className="w-full p-2 border rounded h-24" 
                  value={localContent.hero.ar.subtitle} 
                  onChange={(e) => updateField('hero', 'ar', 'subtitle', e.target.value)}
                  placeholder="النص الفرعي"
                />
                <input 
                  className="w-full p-2 border rounded" 
                  value={localContent.hero.ar.cta} 
                  onChange={(e) => updateField('hero', 'ar', 'cta', e.target.value)}
                  placeholder="نص الزر"
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Background Image URL</h4>
              <input 
                className="w-full p-2 border rounded" 
                value={localContent.hero.bgImage} 
                onChange={(e) => updateRootField('hero', 'bgImage', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="space-y-6">
             <h3 className="text-xl font-bold border-b pb-2">About Section</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                 <h4 className="font-semibold text-orange-600">English</h4>
                 <input className="w-full p-2 border rounded" value={localContent.about.en.title} onChange={(e) => updateField('about', 'en', 'title', e.target.value)} />
                 <input className="w-full p-2 border rounded" value={localContent.about.en.subtitle} onChange={(e) => updateField('about', 'en', 'subtitle', e.target.value)} />
                 <textarea className="w-full p-2 border rounded h-32" value={localContent.about.en.description} onChange={(e) => updateField('about', 'en', 'description', e.target.value)} />
                 <textarea className="w-full p-2 border rounded h-24" value={localContent.about.en.reputation} onChange={(e) => updateField('about', 'en', 'reputation', e.target.value)} />
               </div>
               <div className="space-y-4" dir="rtl">
                 <h4 className="font-semibold text-orange-600">Arabic</h4>
                 <input className="w-full p-2 border rounded" value={localContent.about.ar.title} onChange={(e) => updateField('about', 'ar', 'title', e.target.value)} />
                 <input className="w-full p-2 border rounded" value={localContent.about.ar.subtitle} onChange={(e) => updateField('about', 'ar', 'subtitle', e.target.value)} />
                 <textarea className="w-full p-2 border rounded h-32" value={localContent.about.ar.description} onChange={(e) => updateField('about', 'ar', 'description', e.target.value)} />
                 <textarea className="w-full p-2 border rounded h-24" value={localContent.about.ar.reputation} onChange={(e) => updateField('about', 'ar', 'reputation', e.target.value)} />
               </div>
             </div>
             <div>
              <h4 className="font-semibold mb-2">Section Image URL</h4>
              <input 
                className="w-full p-2 border rounded" 
                value={localContent.about.en.image} 
                onChange={(e) => {
                    updateField('about', 'en', 'image', e.target.value);
                    updateField('about', 'ar', 'image', e.target.value);
                }}
              />
            </div>
          </div>
        );

      case 'services':
        const iconOptions = ['Truck', 'Hammer', 'Settings', 'Building2', 'Wrench', 'HardHat', 'Droplet'];
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Services Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Services */}
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600 sticky top-0 bg-white py-2 z-10 border-b">English Services</h4>
                {localContent.services.en.services.map((service, serviceIndex) => {
                  const descList = Array.isArray(service.description) ? service.description : [service.description];

                  return (
                    <div key={serviceIndex} className="border rounded bg-white shadow-sm overflow-hidden">
                      <div 
                        className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleServiceExpand(`en-${serviceIndex}`)}
                      >
                        <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                          <span className="font-bold text-orange-600">#{serviceIndex + 1}</span> {service.title || 'Untitled Service'}
                        </span>
                        <ChevronDown size={16} className={`transform transition-transform ${expandedService === `en-${serviceIndex}` ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {expandedService === `en-${serviceIndex}` && (
                        <div className="p-4 space-y-4 border-t bg-white">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Icon</label>
                            <select
                              className="w-full p-2 border rounded mt-1"
                              value={service.icon}
                              onChange={(e) => handleServiceChange('en', serviceIndex, 'icon', e.target.value)}
                            >
                              {iconOptions.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                            <input
                              className="w-full p-2 border rounded mt-1"
                              value={service.title}
                              onChange={(e) => handleServiceChange('en', serviceIndex, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Description List</label>
                            <div className="space-y-2 mt-1">
                              {descList.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center gap-2">
                                  <input
                                    className="w-full p-2 border rounded text-sm"
                                    value={item}
                                    onChange={(e) => handleServiceListItemChange('en', serviceIndex, itemIndex, e.target.value)}
                                  />
                                  <Button 
                                    variant="ghost" 
                                    className="h-9 w-9 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
                                    onClick={() => removeServiceListItem('en', serviceIndex, itemIndex)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              ))}
                              <Button variant="outline" size="sm" onClick={() => addServiceListItem('en', serviceIndex)} className="w-full mt-2 border-dashed">
                                <PlusCircle size={16} className="mr-2" /> Add List Item
                              </Button>
                            </div>
                          </div>
                          <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => removeService('en', serviceIndex)}>
                            <Trash2 size={16} className="mr-2" /> Remove Service
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
                <Button onClick={() => addService('en')} className="w-full">
                  <PlusCircle size={16} className="mr-2" /> Add English Service
                </Button>
              </div>

              {/* Arabic Services */}
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600 sticky top-0 bg-white py-2 z-10 border-b">الخدمات العربية</h4>
                {localContent.services.ar.services.map((service, serviceIndex) => {
                  const descList = Array.isArray(service.description) ? service.description : [service.description];

                  return (
                   <div key={serviceIndex} className="border rounded bg-white shadow-sm overflow-hidden">
                   <div 
                     className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                     onClick={() => toggleServiceExpand(`ar-${serviceIndex}`)}
                   >
                     <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                        <span className="font-bold text-orange-600">#{serviceIndex + 1}</span> {service.title || 'خدمة بدون عنوان'}
                     </span>
                     <ChevronDown size={16} className={`transform transition-transform ${expandedService === `ar-${serviceIndex}` ? 'rotate-180' : ''}`} />
                   </div>
                   
                   {expandedService === `ar-${serviceIndex}` && (
                     <div className="p-4 space-y-4 border-t bg-white">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">الأيقونة</label>
                          <select
                            className="w-full p-2 border rounded mt-1"
                            value={service.icon}
                            onChange={(e) => handleServiceChange('ar', serviceIndex, 'icon', e.target.value)}
                          >
                            {iconOptions.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">العنوان</label>
                          <input
                            className="w-full p-2 border rounded mt-1"
                            value={service.title}
                            onChange={(e) => handleServiceChange('ar', serviceIndex, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">نقاط الوصف</label>
                          <div className="space-y-2 mt-1">
                            {descList.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center gap-2">
                                <input
                                  className="w-full p-2 border rounded text-sm"
                                  value={item}
                                  onChange={(e) => handleServiceListItemChange('ar', serviceIndex, itemIndex, e.target.value)}
                                />
                                <Button 
                                  variant="ghost" 
                                  className="h-9 w-9 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => removeServiceListItem('ar', serviceIndex, itemIndex)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => addServiceListItem('ar', serviceIndex)} className="w-full mt-2 border-dashed">
                              <PlusCircle size={16} className="ml-2" /> إضافة بند
                            </Button>
                          </div>
                        </div>
                        <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => removeService('ar', serviceIndex)}>
                          <Trash2 size={16} className="ml-2" /> إزالة الخدمة
                        </Button>
                      </div>
                    )}
                  </div>
                  );
                })}
                <Button onClick={() => addService('ar')} className="w-full">
                  <PlusCircle size={16} className="ml-2" /> إضافة خدمة عربية
                </Button>
              </div>
            </div>
          </div>
        );

      case 'companies':
        const arItems = localContent.companies.ar.items || [];
        const enItems = localContent.companies.en.items || [];
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Companies Section</h3>
            
            {/* Header Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600">English Header</h4>
                <input className="w-full p-2 border rounded" value={localContent.companies.en.title} onChange={(e) => updateField('companies', 'en', 'title', e.target.value)} placeholder="Title" />
                <input className="w-full p-2 border rounded" value={localContent.companies.en.subtitle} onChange={(e) => updateField('companies', 'en', 'subtitle', e.target.value)} placeholder="Subtitle" />
                <textarea className="w-full p-2 border rounded h-20" value={localContent.companies.en.description} onChange={(e) => updateField('companies', 'en', 'description', e.target.value)} placeholder="Description" />
              </div>
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600">Arabic Header</h4>
                <input className="w-full p-2 border rounded" value={localContent.companies.ar.title} onChange={(e) => updateField('companies', 'ar', 'title', e.target.value)} placeholder="العنوان" />
                <input className="w-full p-2 border rounded" value={localContent.companies.ar.subtitle} onChange={(e) => updateField('companies', 'ar', 'subtitle', e.target.value)} placeholder="العنوان الفرعي" />
                <textarea className="w-full p-2 border rounded h-20" value={localContent.companies.ar.description} onChange={(e) => updateField('companies', 'ar', 'description', e.target.value)} placeholder="الوصف" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Companies List */}
              <div className="space-y-4">
                 <h4 className="font-semibold text-orange-600 sticky top-0 bg-white py-2 z-10 border-b">English Company Cards</h4>
                 {enItems.map((item, index) => (
                    <div key={index} className="border rounded bg-white shadow-sm overflow-hidden">
                      <div 
                        className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleCompanyExpand(`en-${index}`)}
                      >
                        <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                           <span className="font-bold text-orange-600">#{index + 1}</span> {item.title || 'Untitled Company'}
                        </span>
                        <ChevronDown size={16} className={`transform transition-transform ${expandedCompany === `en-${index}` ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {expandedCompany === `en-${index}` && (
                        <div className="p-4 space-y-4 border-t bg-white">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Image URL</label>
                            <input 
                              className="w-full p-2 border rounded mt-1" 
                              value={item.image} 
                              onChange={(e) => handleCompanyChange('en', index, 'image', e.target.value)}
                            />
                            {item.image && <img src={item.image} alt="Preview" className="h-16 w-auto mt-2 rounded border" />}
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                            <input 
                              className="w-full p-2 border rounded mt-1" 
                              value={item.title} 
                              onChange={(e) => handleCompanyChange('en', index, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                            <textarea 
                              className="w-full p-2 border rounded mt-1 h-24" 
                              value={item.description} 
                              onChange={(e) => handleCompanyChange('en', index, 'description', e.target.value)}
                            />
                          </div>
                          <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => removeCompany('en', index)}>
                             <Trash2 size={16} className="mr-2" /> Remove
                          </Button>
                        </div>
                      )}
                    </div>
                 ))}
                 <Button onClick={() => addCompany('en')} className="w-full">
                    <PlusCircle size={16} className="mr-2" /> Add English Company
                 </Button>
              </div>

              {/* Arabic Companies List */}
              <div className="space-y-4" dir="rtl">
                 <h4 className="font-semibold text-orange-600 sticky top-0 bg-white py-2 z-10 border-b">بطاقات الشركات العربية</h4>
                 {arItems.map((item, index) => (
                    <div key={index} className="border rounded bg-white shadow-sm overflow-hidden">
                      <div 
                        className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleCompanyExpand(`ar-${index}`)}
                      >
                        <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                           <span className="font-bold text-orange-600">#{index + 1}</span> {item.title || 'شركة بدون عنوان'}
                        </span>
                        <ChevronDown size={16} className={`transform transition-transform ${expandedCompany === `ar-${index}` ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {expandedCompany === `ar-${index}` && (
                        <div className="p-4 space-y-4 border-t bg-white">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">رابط الصورة</label>
                            <input 
                              className="w-full p-2 border rounded mt-1" 
                              value={item.image} 
                              onChange={(e) => handleCompanyChange('ar', index, 'image', e.target.value)}
                            />
                            {item.image && <img src={item.image} alt="Preview" className="h-16 w-auto mt-2 rounded border" />}
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">العنوان</label>
                            <input 
                              className="w-full p-2 border rounded mt-1" 
                              value={item.title} 
                              onChange={(e) => handleCompanyChange('ar', index, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">الوصف</label>
                            <textarea 
                              className="w-full p-2 border rounded mt-1 h-24" 
                              value={item.description} 
                              onChange={(e) => handleCompanyChange('ar', index, 'description', e.target.value)}
                            />
                          </div>
                          <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => removeCompany('ar', index)}>
                             <Trash2 size={16} className="ml-2" /> إزالة
                          </Button>
                        </div>
                      )}
                    </div>
                 ))}
                 <Button onClick={() => addCompany('ar')} className="w-full">
                    <PlusCircle size={16} className="ml-2" /> إضافة شركة عربية
                 </Button>
              </div>
            </div>
          </div>
        );

      case 'mission':
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-bold border-b pb-2">Mission & Vision</h3>

             {/* Main Title Section */}
             <div className="pb-4 border-b bg-gray-50 p-4 rounded">
                <h4 className="text-lg font-bold mb-4 text-gray-800">Section Main Title</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold block mb-1">English Main Title</label>
                        <input className="w-full p-2 border rounded" value={localContent.mission.en.mainTitle} onChange={(e) => updateMissionField('en', 'mainTitle', e.target.value)} placeholder="Main Title (EN)" />
                    </div>
                    <div dir="rtl">
                        <label className="text-sm font-semibold block mb-1">العنوان الرئيسي</label>
                        <input className="w-full p-2 border rounded" value={localContent.mission.ar.mainTitle} onChange={(e) => updateMissionField('ar', 'mainTitle', e.target.value)} placeholder="العنوان الرئيسي" />
                    </div>
                </div>
             </div>
             
             {/* Block 1 */}
             <div className="border p-4 rounded bg-white shadow-sm">
                <h4 className="font-bold mb-4 text-orange-600 border-b pb-2">Block 1: Tasks and Visions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-600 uppercase">English Content</label>
                        <input className="w-full p-2 border rounded" value={localContent.mission.en.block1.title} onChange={(e) => updateMissionBlock('en', 'block1', 'title', e.target.value)} placeholder="Title" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.mission.en.block1.description} onChange={(e) => updateMissionBlock('en', 'block1', 'description', e.target.value)} placeholder="Description" />
                        <label className="text-xs font-semibold text-gray-500">Image URL</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.mission.en.block1.image} onChange={(e) => updateMissionBlock('en', 'block1', 'image', e.target.value)} placeholder="Image URL" />
                        {localContent.mission.en.block1.image && <img src={localContent.mission.en.block1.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                    <div className="space-y-3" dir="rtl">
                        <label className="text-sm font-semibold text-gray-600 uppercase">المحتوى العربي</label>
                        <input className="w-full p-2 border rounded" value={localContent.mission.ar.block1.title} onChange={(e) => updateMissionBlock('ar', 'block1', 'title', e.target.value)} placeholder="العنوان" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.mission.ar.block1.description} onChange={(e) => updateMissionBlock('ar', 'block1', 'description', e.target.value)} placeholder="الوصف" />
                        <label className="text-xs font-semibold text-gray-500">رابط الصورة</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.mission.ar.block1.image} onChange={(e) => updateMissionBlock('ar', 'block1', 'image', e.target.value)} placeholder="رابط الصورة" />
                         {localContent.mission.ar.block1.image && <img src={localContent.mission.ar.block1.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                </div>
             </div>

             {/* Block 2 */}
             <div className="border p-4 rounded bg-white shadow-sm">
                <h4 className="font-bold mb-4 text-orange-600 border-b pb-2">Block 2: From UAE to World</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-600 uppercase">English Content</label>
                        <input className="w-full p-2 border rounded" value={localContent.mission.en.block2.title} onChange={(e) => updateMissionBlock('en', 'block2', 'title', e.target.value)} placeholder="Title" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.mission.en.block2.description} onChange={(e) => updateMissionBlock('en', 'block2', 'description', e.target.value)} placeholder="Description" />
                        <label className="text-xs font-semibold text-gray-500">Image URL</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.mission.en.block2.image} onChange={(e) => updateMissionBlock('en', 'block2', 'image', e.target.value)} placeholder="Image URL" />
                         {localContent.mission.en.block2.image && <img src={localContent.mission.en.block2.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                    <div className="space-y-3" dir="rtl">
                        <label className="text-sm font-semibold text-gray-600 uppercase">المحتوى العربي</label>
                        <input className="w-full p-2 border rounded" value={localContent.mission.ar.block2.title} onChange={(e) => updateMissionBlock('ar', 'block2', 'title', e.target.value)} placeholder="العنوان" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.mission.ar.block2.description} onChange={(e) => updateMissionBlock('ar', 'block2', 'description', e.target.value)} placeholder="الوصف" />
                        <label className="text-xs font-semibold text-gray-500">رابط الصورة</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.mission.ar.block2.image} onChange={(e) => updateMissionBlock('ar', 'block2', 'image', e.target.value)} placeholder="رابط الصورة" />
                         {localContent.mission.ar.block2.image && <img src={localContent.mission.ar.block2.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                </div>
             </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-bold border-b pb-2">Team Section</h3>

             {/* Main Title Section */}
             <div className="pb-4 border-b bg-gray-50 p-4 rounded">
                <h4 className="text-lg font-bold mb-4 text-gray-800">Section Main Title</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold block mb-1">English Main Title</label>
                        <input className="w-full p-2 border rounded" value={localContent.team.en.mainTitle} onChange={(e) => updateTeamField('en', 'mainTitle', e.target.value)} placeholder="Main Title (EN)" />
                    </div>
                    <div dir="rtl">
                        <label className="text-sm font-semibold block mb-1">العنوان الرئيسي</label>
                        <input className="w-full p-2 border rounded" value={localContent.team.ar.mainTitle} onChange={(e) => updateTeamField('ar', 'mainTitle', e.target.value)} placeholder="العنوان الرئيسي" />
                    </div>
                </div>
             </div>
             
             {/* Block 1 */}
             <div className="border p-4 rounded bg-white shadow-sm">
                <h4 className="font-bold mb-4 text-orange-600 border-b pb-2">Block 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-600 uppercase">English Content</label>
                        <input className="w-full p-2 border rounded" value={localContent.team.en.block1.title} onChange={(e) => updateTeamBlock('en', 'block1', 'title', e.target.value)} placeholder="Title" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.team.en.block1.description} onChange={(e) => updateTeamBlock('en', 'block1', 'description', e.target.value)} placeholder="Description" />
                        <label className="text-xs font-semibold text-gray-500">Image URL</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.team.en.block1.image} onChange={(e) => updateTeamBlock('en', 'block1', 'image', e.target.value)} placeholder="Image URL" />
                        {localContent.team.en.block1.image && <img src={localContent.team.en.block1.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                    <div className="space-y-3" dir="rtl">
                        <label className="text-sm font-semibold text-gray-600 uppercase">المحتوى العربي</label>
                        <input className="w-full p-2 border rounded" value={localContent.team.ar.block1.title} onChange={(e) => updateTeamBlock('ar', 'block1', 'title', e.target.value)} placeholder="العنوان" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.team.ar.block1.description} onChange={(e) => updateTeamBlock('ar', 'block1', 'description', e.target.value)} placeholder="الوصف" />
                        <label className="text-xs font-semibold text-gray-500">رابط الصورة</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.team.ar.block1.image} onChange={(e) => updateTeamBlock('ar', 'block1', 'image', e.target.value)} placeholder="رابط الصورة" />
                         {localContent.team.ar.block1.image && <img src={localContent.team.ar.block1.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                </div>
             </div>

             {/* Block 2 */}
             <div className="border p-4 rounded bg-white shadow-sm">
                <h4 className="font-bold mb-4 text-orange-600 border-b pb-2">Block 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-600 uppercase">English Content</label>
                        <input className="w-full p-2 border rounded" value={localContent.team.en.block2.title} onChange={(e) => updateTeamBlock('en', 'block2', 'title', e.target.value)} placeholder="Title" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.team.en.block2.description} onChange={(e) => updateTeamBlock('en', 'block2', 'description', e.target.value)} placeholder="Description" />
                        <label className="text-xs font-semibold text-gray-500">Image URL</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.team.en.block2.image} onChange={(e) => updateTeamBlock('en', 'block2', 'image', e.target.value)} placeholder="Image URL" />
                         {localContent.team.en.block2.image && <img src={localContent.team.en.block2.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                    <div className="space-y-3" dir="rtl">
                        <label className="text-sm font-semibold text-gray-600 uppercase">المحتوى العربي</label>
                        <input className="w-full p-2 border rounded" value={localContent.team.ar.block2.title} onChange={(e) => updateTeamBlock('ar', 'block2', 'title', e.target.value)} placeholder="العنوان" />
                        <textarea className="w-full p-2 border rounded h-32" value={localContent.team.ar.block2.description} onChange={(e) => updateTeamBlock('ar', 'block2', 'description', e.target.value)} placeholder="الوصف" />
                        <label className="text-xs font-semibold text-gray-500">رابط الصورة</label>
                        <input className="w-full p-2 border rounded bg-gray-50" value={localContent.team.ar.block2.image} onChange={(e) => updateTeamBlock('ar', 'block2', 'image', e.target.value)} placeholder="رابط الصورة" />
                         {localContent.team.ar.block2.image && <img src={localContent.team.ar.block2.image} alt="Preview" className="h-20 w-auto rounded border" />}
                    </div>
                </div>
             </div>
          </div>
        );

      case 'quality':
        const arCerts = localContent.quality.ar.certificates || [];
        const enCerts = localContent.quality.en.certificates || [];
        
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Quality & Safety Section</h3>
            
            {/* Main Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600">English Header</h4>
                <input className="w-full p-2 border rounded" value={localContent.quality.en.title} onChange={(e) => updateField('quality', 'en', 'title', e.target.value)} placeholder="Title" />
                <input className="w-full p-2 border rounded" value={localContent.quality.en.subtitle} onChange={(e) => updateField('quality', 'en', 'subtitle', e.target.value)} placeholder="Subtitle" />
              </div>
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600">Arabic Header</h4>
                <input className="w-full p-2 border rounded" value={localContent.quality.ar.title} onChange={(e) => updateField('quality', 'ar', 'title', e.target.value)} placeholder="العنوان" />
                <input className="w-full p-2 border rounded" value={localContent.quality.ar.subtitle} onChange={(e) => updateField('quality', 'ar', 'subtitle', e.target.value)} placeholder="العنوان الفرعي" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Certificates */}
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600 sticky top-0 bg-white py-2 z-10 border-b">English Certificates</h4>
                {enCerts.map((cert, index) => (
                  <div key={index} className="border rounded bg-white shadow-sm overflow-hidden">
                    <div 
                      className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleCertificateExpand(`en-${index}`)}
                    >
                      <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                        <span className="font-bold text-orange-600">#{index + 1}</span> {cert.title || 'Untitled'}
                      </span>
                      <ChevronDown size={16} className={`transform transition-transform ${expandedCertificate === `en-${index}` ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {expandedCertificate === `en-${index}` && (
                      <div className="p-4 space-y-4 border-t bg-white">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Year</label>
                            <input className="w-full p-2 border rounded mt-1" value={cert.year} onChange={(e) => handleCertificateChange('en', index, 'year', e.target.value)} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                            <input className="w-full p-2 border rounded mt-1" value={cert.category} onChange={(e) => handleCertificateChange('en', index, 'category', e.target.value)} />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Image URL</label>
                          <input className="w-full p-2 border rounded mt-1" value={cert.image} onChange={(e) => handleCertificateChange('en', index, 'image', e.target.value)} />
                          {cert.image && <img src={cert.image} alt="Preview" className="h-16 w-16 mt-2 rounded-full border object-cover" />}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                          <input className="w-full p-2 border rounded mt-1" value={cert.title} onChange={(e) => handleCertificateChange('en', index, 'title', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                          <textarea className="w-full p-2 border rounded mt-1 h-20" value={cert.description} onChange={(e) => handleCertificateChange('en', index, 'description', e.target.value)} />
                        </div>
                        <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => removeCertificate('en', index)}>
                          <Trash2 size={16} className="mr-2" /> Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <Button onClick={() => addCertificate('en')} className="w-full">
                  <PlusCircle size={16} className="mr-2" /> Add Certificate
                </Button>
              </div>

              {/* Arabic Certificates */}
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600 sticky top-0 bg-white py-2 z-10 border-b">الشهادات العربية</h4>
                {arCerts.map((cert, index) => (
                  <div key={index} className="border rounded bg-white shadow-sm overflow-hidden">
                    <div 
                      className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleCertificateExpand(`ar-${index}`)}
                    >
                      <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
                        <span className="font-bold text-orange-600">#{index + 1}</span> {cert.title || 'بدون عنوان'}
                      </span>
                      <ChevronDown size={16} className={`transform transition-transform ${expandedCertificate === `ar-${index}` ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {expandedCertificate === `ar-${index}` && (
                      <div className="p-4 space-y-4 border-t bg-white">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">السنة</label>
                            <input className="w-full p-2 border rounded mt-1" value={cert.year} onChange={(e) => handleCertificateChange('ar', index, 'year', e.target.value)} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">التصنيف</label>
                            <input className="w-full p-2 border rounded mt-1" value={cert.category} onChange={(e) => handleCertificateChange('ar', index, 'category', e.target.value)} />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">رابط الصورة</label>
                          <input className="w-full p-2 border rounded mt-1" value={cert.image} onChange={(e) => handleCertificateChange('ar', index, 'image', e.target.value)} />
                          {cert.image && <img src={cert.image} alt="Preview" className="h-16 w-16 mt-2 rounded-full border object-cover" />}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">العنوان</label>
                          <input className="w-full p-2 border rounded mt-1" value={cert.title} onChange={(e) => handleCertificateChange('ar', index, 'title', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">الوصف</label>
                          <textarea className="w-full p-2 border rounded mt-1 h-20" value={cert.description} onChange={(e) => handleCertificateChange('ar', index, 'description', e.target.value)} />
                        </div>
                        <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => removeCertificate('ar', index)}>
                          <Trash2 size={16} className="ml-2" /> إزالة
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <Button onClick={() => addCertificate('ar')} className="w-full">
                  <PlusCircle size={16} className="ml-2" /> إضافة شهادة
                </Button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
           <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Contact Info</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                 <h4 className="font-semibold text-orange-600">English</h4>
                 <input className="w-full p-2 border rounded" value={localContent.contact.en.title} onChange={(e) => updateField('contact', 'en', 'title', e.target.value)} />
                 <input className="w-full p-2 border rounded" value={localContent.contact.en.subtitle} onChange={(e) => updateField('contact', 'en', 'subtitle', e.target.value)} />
                 <input className="w-full p-2 border rounded" value={localContent.contact.en.address} onChange={(e) => updateField('contact', 'en', 'address', e.target.value)} />
               </div>
               <div className="space-y-4" dir="rtl">
                 <h4 className="font-semibold text-orange-600">Arabic</h4>
                 <input className="w-full p-2 border rounded" value={localContent.contact.ar.title} onChange={(e) => updateField('contact', 'ar', 'title', e.target.value)} />
                 <input className="w-full p-2 border rounded" value={localContent.contact.ar.subtitle} onChange={(e) => updateField('contact', 'ar', 'subtitle', e.target.value)} />
                 <input className="w-full p-2 border rounded" value={localContent.contact.ar.address} onChange={(e) => updateField('contact', 'ar', 'address', e.target.value)} />
               </div>
             </div>
             <div className="mt-4 border-t pt-4">
               <h4 className="font-semibold mb-2">Shared Contact Info</h4>
               <div className="grid grid-cols-2 gap-4">
                 <input className="w-full p-2 border rounded" placeholder="Email" value={localContent.contact.en.email} onChange={(e) => {
                   updateField('contact', 'en', 'email', e.target.value);
                   updateField('contact', 'ar', 'email', e.target.value);
                 }} />
                 <input className="w-full p-2 border rounded" placeholder="Phone" value={localContent.contact.en.phone} onChange={(e) => {
                   updateField('contact', 'en', 'phone', e.target.value);
                   updateField('contact', 'ar', 'phone', e.target.value);
                 }} />
               </div>
             </div>
          </div>
        );

      case 'header':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Header Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600">English</h4>
                <input className="w-full p-2 border rounded" value={localContent.header.en.subsidiary} onChange={(e) => updateField('header', 'en', 'subsidiary', e.target.value)} />
                <input className="w-full p-2 border rounded" value={localContent.header.en.langBtn} onChange={(e) => updateField('header', 'en', 'langBtn', e.target.value)} />
                <h5 className="font-semibold mt-4">Navigation Items (English)</h5>
                {localContent.header.en.nav.map((item, index) => (
                  <input key={index} className="w-full p-2 border rounded mb-1" value={item} onChange={(e) => {
                    const newNav = [...localContent.header.en.nav];
                    newNav[index] = e.target.value;
                    setLocalContent(prev => ({
                      ...prev,
                      header: {
                        ...prev.header,
                        en: { ...prev.header.en, nav: newNav }
                      }
                    }));
                  }} />
                ))}
              </div>
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600">Arabic</h4>
                <input className="w-full p-2 border rounded" value={localContent.header.ar.subsidiary} onChange={(e) => updateField('header', 'ar', 'subsidiary', e.target.value)} />
                <input className="w-full p-2 border rounded" value={localContent.header.ar.langBtn} onChange={(e) => updateField('header', 'ar', 'langBtn', e.target.value)} />
                 <h5 className="font-semibold mt-4">عناصر التنقل (العربية)</h5>
                {localContent.header.ar.nav.map((item, index) => (
                  <input key={index} className="w-full p-2 border rounded mb-1" value={item} onChange={(e) => {
                    const newNav = [...localContent.header.ar.nav];
                    newNav[index] = e.target.value;
                    setLocalContent(prev => ({
                      ...prev,
                      header: {
                        ...prev.header,
                        ar: { ...prev.header.ar, nav: newNav }
                      }
                    }));
                  }} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Logo URL</h4>
              <input 
                className="w-full p-2 border rounded" 
                value={localContent.header.logo} 
                onChange={(e) => updateRootField('header', 'logo', e.target.value)}
              />
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Footer Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600">English</h4>
                <textarea className="w-full p-2 border rounded h-24" value={localContent.footer.en.aboutText} onChange={(e) => updateField('footer', 'en', 'aboutText', e.target.value)} />
                <input className="w-full p-2 border rounded" value={localContent.footer.en.rights} onChange={(e) => updateField('footer', 'en', 'rights', e.target.value)} />
              </div>
              <div className="space-y-4" dir="rtl">
                <h4 className="font-semibold text-orange-600">Arabic</h4>
                <textarea className="w-full p-2 border rounded h-24" value={localContent.footer.ar.aboutText} onChange={(e) => updateField('footer', 'ar', 'aboutText', e.target.value)} />
                <input className="w-full p-2 border rounded" value={localContent.footer.ar.rights} onChange={(e) => updateField('footer', 'ar', 'rights', e.target.value)} />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-8 text-center text-gray-500">Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-20">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard size={20} />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {['hero', 'about', 'services', 'companies', 'mission', 'team', 'quality', 'contact', 'header', 'footer'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-4 py-3 rounded-md transition-colors ${activeSection === section ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button variant="outline" className="w-full justify-start text-black bg-white hover:bg-gray-200" onClick={() => window.open('/', '_blank')}>
            <Globe size={16} className="mr-2" /> View Site
          </Button>
          <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[calc(100vh-4rem)]">
          <div className="border-b px-6 py-4 flex justify-between items-center bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeSection} Editor</h1>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save size={16} className="mr-2" /> Save Changes
            </Button>
          </div>
          <div className="p-6">
            {renderSectionEditor()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  UserPlus,
  ExternalLink,
  QrCode,
  MessageCircle,
  Copy,
  Instagram,
  Globe,
  Share2,
  X
} from 'lucide-react';
import QRModal from './QRModal';

const ArchbishopCard = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, size: string, color: string}>>([]);

  useEffect(() => {
    setIsClient(true);
    setCurrentUrl('https://archbishop.ecccindia.org/');
    
    // Generate particles on client side only
    const dustParticles = Array.from({ length: 25 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 'w-1 h-1',
      color: 'bg-amber-300/80'
    }));
    
    const smallParticles = Array.from({ length: 35 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 'w-0.5 h-0.5',
      color: 'bg-yellow-200/60'
    }));
    
    setParticles([...dustParticles, ...smallParticles]);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const cardData = {
    organization: "Ecumenical Catholic Church of Christ (ECCC) – INDIA",
    name: "☦ ☦ MAR ILIOS YOHANAN KURIAKOSE",
    qualifications: "B.A (Phil), ADSE (C S), LL.B (H), M.Sc. (Psy), D.Phil (C C)",
    title: "Metropolitan Archbishop & Apostolic Nuncio of Asia",
    
    indiaOffice: {
      title: "India Office",
      cathedral: "Saint Francis of Assisi Cathedral",
      address: "Calicut, Kerala, India – 673 603",
      phone: "+91 99955 09999",
      email: "nosf.asia@gmail.com"
    },
    
    usaOffice: {
      title: "USA Primate Office",
      cathedral: "Cathedral & Abbey of St. Anthony",
      address: "5247 Sheridan Street, Detroit, MI – 48213, USA",
      phone: "+1 313-279-5561"
    }
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  const addToContacts = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name.replace(/☦/g, '').trim()}
ORG:${cardData.organization}
TITLE:${cardData.title}
EMAIL:${cardData.indiaOffice.email}
TEL;TYPE=WORK:${cardData.indiaOffice.phone}
TEL;TYPE=CELL:${cardData.usaOffice.phone}
ADR;TYPE=WORK:;;${cardData.indiaOffice.cathedral}, ${cardData.indiaOffice.address};;;;
ADR;TYPE=HOME:;;${cardData.usaOffice.cathedral}, ${cardData.usaOffice.address};;;;
NOTE:${cardData.qualifications}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mar_Ilios_Yohanan_Kuriakose.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareViaWhatsApp = () => {
    const message = `Meet ${cardData.name} - ${cardData.title}. View his digital business card: ${currentUrl}`;
    const targetNumber = phoneNumber || '';
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaSMS = () => {
    const message = `Meet ${cardData.name} - ${cardData.title}. View his digital business card: ${currentUrl}`;
    const targetNumber = phoneNumber || '';
    const smsUrl = `sms:${targetNumber}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_blank');
  };

  const shareViaInstagram = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopyMessage('Link copied! Paste it in your Instagram story or bio.');
    setTimeout(() => setCopyMessage(''), 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopyMessage('Link copied to clipboard!');
    setTimeout(() => setCopyMessage(''), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.25, 0.25, 0.75] 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.25, 0.25, 0.75] 
      }
    }
  };

  return (
    <>
      {/* Modern gradient background with dark mode support */}
      <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-sky-50 via-white to-blue-50'
      }`}>
        
        {/* Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full shadow-md transition-all duration-300 border ${
              isDarkMode 
                ? 'bg-white text-black border-gray-300' 
                : 'bg-black text-white border-gray-300'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-800/40 to-blue-800/40' 
                : 'bg-gradient-to-r from-sky-200/40 to-blue-300/40'
            }`}
            animate={{ 
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-800/30 to-purple-800/30' 
                : 'bg-gradient-to-r from-amber-200/30 to-yellow-300/30'
            }`}
            animate={{ 
              x: [0, -150, 0],
              y: [0, 100, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 5
            }}
          />

          {/* Client-side only dust particles */}
          {isClient && particles.map((particle, i) => (
            <motion.div
              key={i}
              className={`absolute ${particle.size} rounded-full ${
                isDarkMode 
                  ? i < 25 ? 'bg-purple-400/80' : 'bg-blue-300/60'
                  : particle.color
              }`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: i < 25 
                  ? [0, -20 - Math.random() * 30, -40 - Math.random() * 30]
                  : [0, -15 - Math.random() * 25],
                x: i < 25 
                  ? [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
                  : [0, Math.random() * 15 - 7.5],
                opacity: [0, 0.8, 0.4, 0],
                scale: [0, 1, i < 25 ? 0.8 : 0.5, 0],
              }}
              transition={{
                duration: i < 25 ? 3 + Math.random() * 2 : 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * (i < 25 ? 3 : 4)
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-1 md:p-3">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-3xl"
          >
            {/* Main Card */}
            <motion.div
              variants={cardVariants}
              className={`backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl border overflow-hidden relative transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-600/50' 
                  : 'bg-white/90 border-sky-200/50'
              }`}
              style={{
                boxShadow: isDarkMode 
                  ? "0 15px 30px -9px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.05), 0 0 20px rgba(139, 92, 246, 0.1)"
                  : "0 15px 30px -9px rgba(56, 189, 248, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.05), 0 0 20px rgba(56, 189, 248, 0.1)"
              }}
              whileHover={{ 
                y: -6,
                boxShadow: isDarkMode 
                  ? "0 22px 40px -9px rgba(139, 92, 246, 0.35), 0 0 0 1px rgba(139, 92, 246, 0.1), 0 0 30px rgba(139, 92, 246, 0.2)"
                  : "0 22px 40px -9px rgba(56, 189, 248, 0.35), 0 0 0 1px rgba(56, 189, 248, 0.1), 0 0 30px rgba(56, 189, 248, 0.2)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Glow overlay */}
              <div className={`absolute inset-0 backdrop-blur-sm rounded-xl md:rounded-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 via-gray-700/60 to-gray-800/80' 
                  : 'bg-gradient-to-br from-sky-50/80 via-white/60 to-blue-50/80'
              }`} />
              
              {/* Header Section */}
              <motion.div 
                className="relative z-10 px-3 md:px-6 pb-3 md:pb-4 pt-3 md:pt-4 text-center"
                variants={itemVariants}
              >
                <motion.h2 
                  className={`text-xs md:text-sm font-medium mb-2 tracking-widest uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-purple-300' : 'text-sky-700'
                  }`}
                  style={{ fontFamily: 'var(--font-source-sans)' }}
                  variants={itemVariants}
                >
                  {cardData.organization}
                </motion.h2>
                
                <motion.h1 
                  className={`text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight transition-colors duration-500 ${
                    isDarkMode ? 'text-purple-100' : 'text-sky-900'
                  }`}
                  style={{ fontFamily: 'var(--font-crimson-text)' }}
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-center gap-4">
                    <Image 
                      src="/logo1.jpeg" 
                      alt="Logo 1" 
                      width={64}
                      height={64}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-lg"
                    />
                    <span className="block md:hidden">†† MAR ILIOS YOHANAN KURIAKOSE ††</span>
                    <span className="hidden md:block">{cardData.name}</span>
                    <Image 
                      src="/logo2.png" 
                      alt="Logo 2" 
                      width={64}
                      height={64}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-lg"
                    />
                  </div>
                </motion.h1>
                
                <motion.p 
                  className={`text-sm md:text-base mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-300' : 'text-sky-700'
                  }`}
                  style={{ fontFamily: 'var(--font-source-sans)' }}
                  variants={itemVariants}
                >
                  {cardData.qualifications}
                </motion.p>
                
                <motion.p 
                  className={`text-base md:text-lg font-semibold transition-colors duration-500 ${
                    isDarkMode ? 'text-yellow-400' : 'text-amber-600'
                  }`}
                  style={{ fontFamily: 'var(--font-crimson-text)' }}
                  variants={itemVariants}
                  animate={{
                    textShadow: isDarkMode 
                      ? [
                          "0 0 6px rgba(251, 191, 36, 0.3)",
                          "0 0 12px rgba(251, 191, 36, 0.5)",
                          "0 0 6px rgba(251, 191, 36, 0.3)"
                        ]
                      : [
                          "0 0 6px rgba(245, 158, 11, 0.3)",
                          "0 0 12px rgba(245, 158, 11, 0.5)",
                          "0 0 6px rgba(245, 158, 11, 0.3)"
                        ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {cardData.title}
                </motion.p>
              </motion.div>

              {/* Action Buttons - All Screens */}
              <motion.div 
                className="relative z-10 px-3 md:px-6 pb-3 md:pb-4"
                variants={itemVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <motion.button
                    onClick={addToContacts}
                    className={`group relative overflow-hidden text-white py-2 px-4 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500'
                    }`}
                    style={{ fontFamily: 'var(--font-source-sans)' }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: isDarkMode 
                        ? "0 12px 16px -4px rgba(139, 92, 246, 0.4)"
                        : "0 12px 16px -4px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add to Contacts
                    </div>
                    <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                  </motion.button>

                  <motion.button
                    onClick={() => setIsQRModalOpen(true)}
                    className={`group relative overflow-hidden text-white py-2 px-4 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
                    }`}
                    style={{ fontFamily: 'var(--font-source-sans)' }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: isDarkMode 
                        ? "0 12px 16px -4px rgba(139, 92, 246, 0.4)"
                        : "0 12px 16px -4px rgba(6, 182, 212, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <QrCode className="w-4 h-4 mr-2" />
                      View QR Code
                    </div>
                    <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                  </motion.button>

                  <motion.button
                    onClick={() => setIsShareModalOpen(true)}
                    className={`group relative overflow-hidden text-white py-2 px-4 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
                    }`}
                    style={{ fontFamily: 'var(--font-source-sans)' }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: isDarkMode 
                        ? "0 12px 16px -4px rgba(16, 185, 129, 0.4)"
                        : "0 12px 16px -4px rgba(34, 197, 94, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share This Card
                    </div>
                    <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Office Information */}
              <motion.div 
                className="relative z-10 px-3 md:px-6 py-3 md:py-4"
                variants={itemVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  
                  {/* India Office */}
                  <motion.div 
                    className={`group backdrop-blur-sm rounded-lg p-3 md:p-4 border transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-gray-700/60 border-gray-600/50 hover:bg-gray-700/80' 
                        : 'bg-sky-50/60 border-sky-200/50 hover:bg-sky-50/80'
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      y: -3,
                      boxShadow: isDarkMode 
                        ? "0 12px 16px -4px rgba(139, 92, 246, 0.15)"
                        : "0 12px 16px -4px rgba(56, 189, 248, 0.15)"
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2 shadow-lg ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                          : 'bg-gradient-to-r from-sky-500 to-blue-600'
                      }`}>
                        <Globe className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <h3 className={`text-base md:text-lg font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-purple-100' : 'text-sky-900'
                      }`} style={{ fontFamily: 'var(--font-crimson-text)' }}>
                        {cardData.indiaOffice.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className={`text-sm md:text-base font-semibold mb-1 transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-200' : 'text-sky-800'
                        }`} style={{ fontFamily: 'var(--font-crimson-text)' }}>
                          {cardData.indiaOffice.cathedral}
                        </p>
                        <p className={`mb-2 text-xs md:text-sm transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-300' : 'text-sky-700'
                        }`} style={{ fontFamily: 'var(--font-source-sans)' }}>{cardData.indiaOffice.address}</p>
                        
                        <motion.button
                          onClick={() => openGoogleMaps(`${cardData.indiaOffice.cathedral}, ${cardData.indiaOffice.address}`)}
                          className={`flex items-center font-medium group/btn transition-colors text-xs ${
                            isDarkMode 
                              ? 'text-purple-400 hover:text-purple-300' 
                              : 'text-sky-600 hover:text-sky-700'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Open in Google Maps
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </motion.button>
                      </div>

                      <motion.div 
                        className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-gray-600/50' 
                            : 'hover:bg-blue-100/50'
                        }`}
                        onClick={() => window.open(`tel:${cardData.indiaOffice.phone}`)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 shadow-md ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600'
                        }`}>
                          <Phone className="w-3 h-3 text-white" />
                        </div>
                        <span className={`font-medium text-xs md:text-sm transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-100' : 'text-sky-900'
                        }`} style={{ fontFamily: 'var(--font-source-sans)' }}>{cardData.indiaOffice.phone}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* USA Office */}
                  <motion.div 
                    className={`group backdrop-blur-sm rounded-lg p-3 md:p-4 border transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-gray-700/60 border-gray-600/50 hover:bg-gray-700/80' 
                        : 'bg-sky-50/60 border-sky-200/50 hover:bg-sky-50/80'
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      y: -3,
                      boxShadow: isDarkMode 
                        ? "0 12px 16px -4px rgba(139, 92, 246, 0.15)"
                        : "0 12px 16px -4px rgba(56, 189, 248, 0.15)"
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2 shadow-lg ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                          : 'bg-gradient-to-r from-sky-500 to-blue-600'
                      }`}>
                        <Globe className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <h3 className={`text-base md:text-lg font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-purple-100' : 'text-sky-900'
                      }`} style={{ fontFamily: 'var(--font-crimson-text)' }}>
                        {cardData.usaOffice.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className={`text-sm md:text-base font-semibold mb-1 transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-200' : 'text-sky-800'
                        }`} style={{ fontFamily: 'var(--font-crimson-text)' }}>
                          {cardData.usaOffice.cathedral}
                        </p>
                        <p className={`mb-2 text-xs md:text-sm transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-300' : 'text-sky-700'
                        }`} style={{ fontFamily: 'var(--font-source-sans)' }}>{cardData.usaOffice.address}</p>
                        
                        <motion.button
                          onClick={() => openGoogleMaps(`${cardData.usaOffice.cathedral}, ${cardData.usaOffice.address}`)}
                          className={`flex items-center font-medium group/btn transition-colors text-xs ${
                            isDarkMode 
                              ? 'text-purple-400 hover:text-purple-300' 
                              : 'text-sky-600 hover:text-sky-700'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Open in Google Maps
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </motion.button>
                      </div>

                      <motion.div 
                        className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-gray-600/50' 
                            : 'hover:bg-blue-100/50'
                        }`}
                        onClick={() => window.open(`tel:${cardData.usaOffice.phone}`)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 shadow-md ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600'
                        }`}>
                          <Phone className="w-3 h-3 text-white" />
                        </div>
                        <span className={`font-medium text-xs md:text-sm transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-100' : 'text-sky-900'
                        }`} style={{ fontFamily: 'var(--font-source-sans)' }}>{cardData.usaOffice.phone}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced QR Modal */}
      {currentUrl && (
        <QRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          url={currentUrl}
        />
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShareModalOpen(false)}
          >
            <motion.div 
              className={`relative rounded-xl p-8 w-full max-w-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} style={{ fontFamily: 'var(--font-crimson-text)' }}>
                  Share This Card
                </h3>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Phone Number Input */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mobile Number (optional for WhatsApp/SMS)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 focus:ring-purple-400 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 focus:ring-sky-400 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Share Buttons Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={shareViaWhatsApp}
                  className="flex flex-col items-center justify-center py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-8 h-8 mb-3" />
                  <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-source-sans)' }}>WhatsApp</span>
                </motion.button>

                <motion.button
                  onClick={shareViaSMS}
                  className="flex flex-col items-center justify-center py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-8 h-8 mb-3" />
                  <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-source-sans)' }}>SMS</span>
                </motion.button>

                <motion.button
                  onClick={shareViaInstagram}
                  className="flex flex-col items-center justify-center py-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-8 h-8 mb-3" />
                  <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-source-sans)' }}>Instagram</span>
                </motion.button>

                <motion.button
                  onClick={copyLink}
                  className="flex flex-col items-center justify-center py-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className="w-8 h-8 mb-3" />
                  <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-source-sans)' }}>Copy Link</span>
                </motion.button>
              </div>

              {/* Copy Message */}
              <AnimatePresence>
                {copyMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mt-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-lg text-center font-medium"
                  >
                    {copyMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArchbishopCard; 
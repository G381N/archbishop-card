'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  UserPlus,
  Share2,
  ExternalLink,
  QrCode,
  MessageCircle,
  Copy,
  Instagram,
  Download,
  Sparkles,
  Globe,
  Star,
  Heart
} from 'lucide-react';
import QRModal from './QRModal';

const ArchbishopCard = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const cardData = {
    organization: "ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA",
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
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" />
      
      {/* Modern gradient background with dark mode support */}
      <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-sky-50 via-white to-blue-50'
      }`}>
        
        {/* Dark Mode Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <motion.button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-yellow-400'
            }`}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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

          {/* Dust particles in sunlight effect */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDarkMode ? 'bg-purple-400/80' : 'bg-amber-300/80'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20 - Math.random() * 30, -40 - Math.random() * 30],
                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                opacity: [0, 0.8, 0.4, 0],
                scale: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3
              }}
            />
          ))}

          {/* Additional smaller dust particles */}
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={`small-${i}`}
              className={`absolute w-0.5 h-0.5 rounded-full ${
                isDarkMode ? 'bg-blue-300/60' : 'bg-yellow-200/60'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15 - Math.random() * 25],
                x: [0, Math.random() * 15 - 7.5],
                opacity: [0, 0.6, 0.3, 0],
                scale: [0, 1, 0.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 4
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-5xl"
          >
            {/* Main Card */}
            <motion.div
              variants={cardVariants}
              className={`backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden relative transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-600/50' 
                  : 'bg-white/90 border-sky-200/50'
              }`}
              style={{
                boxShadow: isDarkMode 
                  ? "0 25px 50px -12px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.05), 0 0 30px rgba(139, 92, 246, 0.1)"
                  : "0 25px 50px -12px rgba(56, 189, 248, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.05), 0 0 30px rgba(56, 189, 248, 0.1)"
              }}
              whileHover={{ 
                y: -10,
                boxShadow: isDarkMode 
                  ? "0 35px 60px -12px rgba(139, 92, 246, 0.35), 0 0 0 1px rgba(139, 92, 246, 0.1), 0 0 50px rgba(139, 92, 246, 0.2)"
                  : "0 35px 60px -12px rgba(56, 189, 248, 0.35), 0 0 0 1px rgba(56, 189, 248, 0.1), 0 0 50px rgba(56, 189, 248, 0.2)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Glow overlay */}
              <div className={`absolute inset-0 backdrop-blur-sm rounded-3xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 via-gray-700/60 to-gray-800/80' 
                  : 'bg-gradient-to-br from-sky-50/80 via-white/60 to-blue-50/80'
              }`} />
              
              {/* Logo Circle Area */}
              <motion.div 
                className="relative z-10 flex justify-center pt-8 mb-4"
                variants={itemVariants}
              >
                <motion.div 
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-purple-500/50' 
                      : 'bg-gradient-to-br from-sky-100 to-blue-100 border-sky-200/50'
                  }`}
                  animate={{
                    boxShadow: isDarkMode 
                      ? [
                          "0 0 20px rgba(139, 92, 246, 0.3)",
                          "0 0 40px rgba(139, 92, 246, 0.5)",
                          "0 0 20px rgba(139, 92, 246, 0.3)"
                        ]
                      : [
                          "0 0 20px rgba(56, 189, 248, 0.3)",
                          "0 0 40px rgba(56, 189, 248, 0.5)",
                          "0 0 20px rgba(56, 189, 248, 0.3)"
                        ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-purple-400' : 'text-sky-600'
                  }`}>LOGO</span>
                </motion.div>
              </motion.div>

              {/* Header Section */}
              <motion.div 
                className="relative z-10 px-6 md:px-12 pb-8 text-center"
                variants={itemVariants}
              >
                <motion.h2 
                  className={`text-sm md:text-base font-medium mb-4 tracking-widest uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-purple-300' : 'text-sky-700'
                  }`}
                  style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                  variants={itemVariants}
                >
                  {cardData.organization}
                </motion.h2>
                
                <motion.h1 
                  className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-colors duration-500 ${
                    isDarkMode ? 'text-purple-100' : 'text-sky-900'
                  }`}
                  style={{ fontFamily: "'Crimson Text', serif" }}
                  variants={itemVariants}
                >
                  {cardData.name}
                </motion.h1>
                
                <motion.p 
                  className={`text-base md:text-lg mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-300' : 'text-sky-700'
                  }`}
                  style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                  variants={itemVariants}
                >
                  {cardData.qualifications}
                </motion.p>
                
                <motion.p 
                  className={`text-xl md:text-2xl font-semibold transition-colors duration-500 ${
                    isDarkMode ? 'text-yellow-400' : 'text-amber-600'
                  }`}
                  style={{ fontFamily: "'Crimson Text', serif" }}
                  variants={itemVariants}
                  animate={{
                    textShadow: isDarkMode 
                      ? [
                          "0 0 10px rgba(251, 191, 36, 0.3)",
                          "0 0 20px rgba(251, 191, 36, 0.5)",
                          "0 0 10px rgba(251, 191, 36, 0.3)"
                        ]
                      : [
                          "0 0 10px rgba(245, 158, 11, 0.3)",
                          "0 0 20px rgba(245, 158, 11, 0.5)",
                          "0 0 10px rgba(245, 158, 11, 0.3)"
                        ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {cardData.title}
                </motion.p>
              </motion.div>

              {/* Office Information */}
              <motion.div 
                className="relative z-10 px-6 md:px-12 py-8"
                variants={itemVariants}
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  
                  {/* India Office */}
                  <motion.div 
                    className={`group backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-gray-700/60 border-gray-600/50 hover:bg-gray-700/80' 
                        : 'bg-sky-50/60 border-sky-200/50 hover:bg-sky-50/80'
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      boxShadow: isDarkMode 
                        ? "0 20px 25px -5px rgba(139, 92, 246, 0.15)"
                        : "0 20px 25px -5px rgba(56, 189, 248, 0.15)"
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                          : 'bg-gradient-to-r from-sky-500 to-blue-600'
                      }`}>
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-purple-100' : 'text-sky-900'
                      }`} style={{ fontFamily: "'Crimson Text', serif" }}>
                        {cardData.indiaOffice.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-200' : 'text-sky-800'
                        }`} style={{ fontFamily: "'Crimson Text', serif" }}>
                          {cardData.indiaOffice.cathedral}
                        </p>
                        <p className={`mb-4 transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-300' : 'text-sky-700'
                        }`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>{cardData.indiaOffice.address}</p>
                        
                        <motion.button
                          onClick={() => openGoogleMaps(`${cardData.indiaOffice.cathedral}, ${cardData.indiaOffice.address}`)}
                          className={`flex items-center font-medium group/btn transition-colors ${
                            isDarkMode 
                              ? 'text-purple-400 hover:text-purple-300' 
                              : 'text-sky-600 hover:text-sky-700'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Open in Google Maps
                          <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </motion.button>
                      </div>

                      <motion.div 
                        className={`flex items-center cursor-pointer p-3 rounded-xl transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-gray-600/50' 
                            : 'hover:bg-sky-100/50'
                        }`}
                        onClick={() => window.open(`tel:${cardData.indiaOffice.phone}`)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600'
                        }`}>
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <span className={`font-medium text-lg transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-100' : 'text-sky-900'
                        }`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>{cardData.indiaOffice.phone}</span>
                      </motion.div>

                      <motion.div 
                        className={`flex items-center cursor-pointer p-3 rounded-xl transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-gray-600/50' 
                            : 'hover:bg-sky-100/50'
                        }`}
                        onClick={() => window.open(`mailto:${cardData.indiaOffice.email}`)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600'
                        }`}>
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <span className={`font-medium text-lg transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-100' : 'text-sky-900'
                        }`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>{cardData.indiaOffice.email}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* USA Office */}
                  <motion.div 
                    className={`group backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-gray-700/60 border-gray-600/50 hover:bg-gray-700/80' 
                        : 'bg-blue-50/60 border-blue-200/50 hover:bg-blue-50/80'
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      boxShadow: isDarkMode 
                        ? "0 20px 25px -5px rgba(139, 92, 246, 0.15)"
                        : "0 20px 25px -5px rgba(59, 130, 246, 0.15)"
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                          : 'bg-gradient-to-r from-sky-500 to-blue-600'
                      }`}>
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-purple-100' : 'text-sky-900'
                      }`} style={{ fontFamily: "'Crimson Text', serif" }}>
                        {cardData.usaOffice.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-200' : 'text-sky-800'
                        }`} style={{ fontFamily: "'Crimson Text', serif" }}>
                          {cardData.usaOffice.cathedral}
                        </p>
                        <p className={`mb-4 transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-300' : 'text-sky-700'
                        }`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>{cardData.usaOffice.address}</p>
                        
                        <motion.button
                          onClick={() => openGoogleMaps(`${cardData.usaOffice.cathedral}, ${cardData.usaOffice.address}`)}
                          className={`flex items-center font-medium group/btn transition-colors ${
                            isDarkMode 
                              ? 'text-purple-400 hover:text-purple-300' 
                              : 'text-sky-600 hover:text-sky-700'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Open in Google Maps
                          <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </motion.button>
                      </div>

                      <motion.div 
                        className={`flex items-center cursor-pointer p-3 rounded-xl transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-gray-600/50' 
                            : 'hover:bg-blue-100/50'
                        }`}
                        onClick={() => window.open(`tel:${cardData.usaOffice.phone}`)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600'
                        }`}>
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <span className={`font-medium text-lg transition-colors duration-500 ${
                          isDarkMode ? 'text-purple-100' : 'text-sky-900'
                        }`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>{cardData.usaOffice.phone}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="relative z-10 px-6 md:px-12 pb-8"
                variants={itemVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.button
                    onClick={addToContacts}
                    className={`group relative overflow-hidden text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500'
                    }`}
                    style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: isDarkMode 
                        ? "0 20px 25px -5px rgba(139, 92, 246, 0.4)"
                        : "0 20px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <UserPlus className="w-6 h-6 mr-3" />
                      Add to Contacts
                    </div>
                    <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                  </motion.button>

                  <motion.button
                    onClick={() => setIsQRModalOpen(true)}
                    className={`group relative overflow-hidden text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
                    }`}
                    style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: isDarkMode 
                        ? "0 20px 25px -5px rgba(139, 92, 246, 0.4)"
                        : "0 20px 25px -5px rgba(6, 182, 212, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <QrCode className="w-6 h-6 mr-3" />
                      View QR Code
                    </div>
                    <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                  </motion.button>
                </div>

                {/* Share Section */}
                <motion.div 
                  className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gray-700/40 border-gray-600/50' 
                      : 'bg-sky-50/40 border-sky-200/50'
                  }`}
                  variants={itemVariants}
                >
                  <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-500 ${
                    isDarkMode ? 'text-purple-100' : 'text-sky-900'
                  }`} style={{ fontFamily: "'Crimson Text', serif" }}>Share This Card</h3>
                  
                  {/* Phone Number Input */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-purple-300' : 'text-sky-700'
                    }`}>
                      Mobile Number (optional for WhatsApp/SMS)
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1234567890"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all backdrop-blur-sm ${
                        isDarkMode 
                          ? 'bg-gray-600/60 border-gray-500/60 focus:ring-purple-400 text-white placeholder-gray-400' 
                          : 'bg-white/60 border-sky-200/60 focus:ring-sky-400 text-sky-900 placeholder-sky-500'
                      }`}
                    />
                  </div>

                  {/* Share Buttons - Original brand colors */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.button
                      onClick={shareViaWhatsApp}
                      className="group flex flex-col items-center justify-center py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle className="w-6 h-6 mb-2 group-hover:animate-bounce-gentle" />
                      <span className="text-sm font-medium" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>WhatsApp</span>
                    </motion.button>

                    <motion.button
                      onClick={shareViaSMS}
                      className="group flex flex-col items-center justify-center py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-6 h-6 mb-2 group-hover:animate-bounce-gentle" />
                      <span className="text-sm font-medium" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>SMS</span>
                    </motion.button>

                    <motion.button
                      onClick={shareViaInstagram}
                      className="group flex flex-col items-center justify-center py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-6 h-6 mb-2 group-hover:animate-bounce-gentle" />
                      <span className="text-sm font-medium" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Instagram</span>
                    </motion.button>

                    <motion.button
                      onClick={copyLink}
                      className="group flex flex-col items-center justify-center py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Copy className="w-6 h-6 mb-2 group-hover:animate-bounce-gentle" />
                      <span className="text-sm font-medium" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Copy Link</span>
                    </motion.button>
                  </div>

                  {/* Copy Message */}
                  <AnimatePresence>
                    {copyMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="mt-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-xl text-center font-medium"
                      >
                        {copyMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
    </>
  );
};

export default ArchbishopCard; 
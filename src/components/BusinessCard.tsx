'use client';

import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  MessageCircle, 
  MessageSquare, 
  Instagram, 
  Copy,
  QrCode
} from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { 
  downloadVCard, 
  copyToClipboard, 
  shareToWhatsApp, 
  shareToSMS,
  isValidPhoneNumber
} from './utils';

const BusinessCard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showQR, setShowQR] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleAddToContacts = () => {
    downloadVCard();
    toast.success('Contact card downloaded!', {
      icon: '†',
      style: {
        background: '#f6af09',
        color: '#2c1810',
      },
    });
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      toast.success('Link copied to clipboard!', {
        icon: '†',
        style: {
          background: '#f6af09',
          color: '#2c1810',
        },
      });
    }
  };

  const handleWhatsAppShare = () => {
    shareToWhatsApp(phoneNumber);
    toast.success('Opening WhatsApp...', {
      icon: '†',
      style: {
        background: '#f6af09',
        color: '#2c1810',
      },
    });
  };

  const handleSMSShare = () => {
    shareToSMS(phoneNumber);
    toast.success('Opening SMS...', {
      icon: '†',
      style: {
        background: '#f6af09',
        color: '#2c1810',
      },
    });
  };

  const handleInstagramShare = () => {
    copyToClipboard(currentUrl);
    toast.success('Link copied! Paste in Instagram', {
      icon: '†',
      style: {
        background: '#f6af09',
        color: '#2c1810',
      },
    });
  };

  const downloadQR = () => {
    // Create a canvas from the SVG QR code
    const svg = document.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL();
        const link = document.createElement('a');
        link.download = 'Archbishop_QR_Code.png';
        link.href = url;
        link.click();
        toast.success('QR Code downloaded!', {
          icon: '†',
          style: {
            background: '#f6af09',
            color: '#2c1810',
          },
        });
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="min-h-screen bg-parchment-100 bg-cross-pattern">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-stained-glass py-12 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="stained-glass-border p-1 rounded-lg inline-block mb-6"
          >
            <div className="bg-parchment-50 px-6 py-3 rounded-lg">
              <h3 className="text-lg font-serif text-sacred-800 tracking-wide">
                ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA
              </h3>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-sacred-900 mb-4 leading-tight"
          >
            <span className="cross-decoration block mb-2">MAR ILIOS YOHANAN</span>
            <span className="text-gold-600 animate-glow">KURIAKOSE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm md:text-base text-sacred-700 mb-4 font-sans tracking-wider"
          >
            B.A (Phil), ADSE (C S), LL.B (H), M.Sc. (Psy), D.Phil (C C)
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl font-serif text-gold-700 mb-8 font-semibold"
          >
            Metropolitan Archbishop & Apostolic Nuncio of Asia
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(246, 175, 9, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToContacts}
            className="bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 holy-glow"
          >
            <Download className="inline-block mr-2" size={20} />
            Add to Contacts
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Information */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* India Office */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gold-200"
          >
            <h3 className="text-xl font-serif text-gold-700 mb-4 font-semibold">India Office</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="text-gold-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <div className="text-sacred-800">
                  <p className="font-medium">Saint Francis of Assisi Cathedral</p>
                  <p>Calicut, Kerala, India – 673 603</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-gold-600 mr-3 flex-shrink-0" size={18} />
                <a href="tel:+919995509999" className="text-sacred-800 hover:text-gold-600 transition-colors">
                  +91 99955 09999
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="text-gold-600 mr-3 flex-shrink-0" size={18} />
                <a href="mailto:nosf.asia@gmail.com" className="text-sacred-800 hover:text-gold-600 transition-colors">
                  nosf.asia@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* USA Office */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gold-200"
          >
            <h3 className="text-xl font-serif text-gold-700 mb-4 font-semibold">USA Primate Office</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="text-gold-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <div className="text-sacred-800">
                  <p className="font-medium">Cathedral & Abbey of St. Anthony</p>
                  <p>5247 Sheridan Street</p>
                  <p>Detroit, MI – 48213, USA</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-gold-600 mr-3 flex-shrink-0" size={18} />
                <a href="tel:+13132795561" className="text-sacred-800 hover:text-gold-600 transition-colors">
                  +1 313-279-5561
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setShowQR(!showQR)}
            className="bg-sacred-600 hover:bg-sacred-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 mb-6"
          >
            <QrCode className="inline-block mr-2" size={20} />
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </button>

          {showQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg inline-block border border-gold-200"
            >
              <QRCodeSVG 
                value={currentUrl} 
                size={200}
                fgColor="#2c1810"
                bgColor="#ffffff"
                level="M"
                includeMargin={true}
              />
              <button
                onClick={downloadQR}
                className="mt-4 text-gold-600 hover:text-gold-700 transition-colors text-sm font-medium"
              >
                Download QR Code
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gold-200"
        >
          <h3 className="text-xl font-serif text-gold-700 mb-6 text-center font-semibold">Share This Card</h3>
          
          {/* Phone Number Input */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-sacred-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gold-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
            {phoneNumber && !isValidPhoneNumber(phoneNumber) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
            )}
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppShare}
              className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
            >
              <MessageCircle className="text-green-600 mb-2" size={24} />
              <span className="text-sm font-medium text-green-700">WhatsApp</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSMSShare}
              className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              <MessageSquare className="text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-blue-700">SMS</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstagramShare}
              className="flex flex-col items-center p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors border border-pink-200"
            >
              <Instagram className="text-pink-600 mb-2" size={24} />
              <span className="text-sm font-medium text-pink-700">Instagram</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              <Copy className="text-gray-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Copy Link</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessCard; 
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, url }) => {
  const downloadQR = () => {
    const svg = document.querySelector('#qr-modal-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        canvas.width = 400;
        canvas.height = 400;
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL();
        const link = document.createElement('a');
        link.download = 'Archbishop_QR_Code.png';
        link.href = url;
        link.click();
        toast.success('QR Code downloaded!', {
          icon: '✠',
          style: {
            background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
            color: '#ffffff',
            borderRadius: '12px',
            fontWeight: '500'
          },
        });
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with heavenly glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1), rgba(0, 0, 0, 0.6))'
            }}
          >
            {/* Floating particles in modal */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-sky-300/40 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 500,
                duration: 0.4 
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full mx-auto relative border border-sky-200/50"
              style={{
                boxShadow: "0 25px 50px -12px rgba(56, 189, 248, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.05), 0 0 30px rgba(56, 189, 248, 0.15)"
              }}
            >
              {/* Heavenly glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white/60 to-blue-50/80 rounded-3xl" />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <motion.h3 
                  className="text-3xl font-display font-bold text-sky-900"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(56, 189, 248, 0.3)",
                      "0 0 20px rgba(56, 189, 248, 0.5)",
                      "0 0 10px rgba(56, 189, 248, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  QR Code
                </motion.h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 rounded-full bg-sky-100/80 hover:bg-sky-200/80 transition-all duration-300 shadow-md"
                >
                  <X size={24} className="text-sky-700" />
                </motion.button>
              </div>

              {/* QR Code */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div 
                  className="bg-white p-8 rounded-2xl shadow-lg border-2 border-sky-200/60 mb-8 relative"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(56, 189, 248, 0.2)",
                      "0 0 40px rgba(56, 189, 248, 0.4)",
                      "0 0 20px rgba(56, 189, 248, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sky-400 rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sky-400 rounded-tr-lg"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sky-400 rounded-bl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sky-400 rounded-br-lg"></div>
                  
                  <QRCodeSVG
                    id="qr-modal-svg"
                    value={url}
                    size={280}
                    fgColor="#0c4a6e"
                    bgColor="#ffffff"
                    level="M"
                    includeMargin={true}
                  />
                </motion.div>

                <motion.p 
                  className="text-base text-sky-700 text-center mb-8 leading-relaxed max-w-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Scan this QR code to share the Archbishop's digital business card instantly
                </motion.p>

                {/* Download Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(56, 189, 248, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadQR}
                  className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 text-lg"
                >
                  <Download size={24} />
                  Download QR Code
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QRModal; 
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-8"
        >
          <Shield className="w-10 h-10 text-red-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Erişim Reddedildi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-8"
        >
          Bu sayfaya erişim için gerekli yetkilere sahip değilsiniz. 
          Lütfen sistem yöneticiniz ile iletişime geçin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <div>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri Dön</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-4 bg-gray-50 rounded-lg"
        >
          <p className="text-sm text-gray-500">
            Hata Kodu: <span className="font-mono">403 - Forbidden</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database, Wifi, WifiOff, AlertCircle } from 'lucide-react';

const SupabaseStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);

        if (error) {
          setIsConnected(false);
          setError(error.message);
        } else {
          setIsConnected(true);
          setError(null);
        }
      } catch (err) {
        setIsConnected(false);
        setError('Failed to connect to Supabase');
      }
    };

    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Database className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Checking connection...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center space-x-2 text-red-600">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm">Database disconnected</span>
        {error && (
          <div className="group relative">
            <AlertCircle className="w-4 h-4 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {error}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-green-600">
      <Wifi className="w-4 h-4" />
      <span className="text-sm">Database connected</span>
    </div>
  );
};

export default SupabaseStatus;
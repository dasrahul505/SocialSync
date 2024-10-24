import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { social } from '../services/api';

interface SocialAccount {
  platform: string;
  connected: boolean;
  username?: string;
  icon: React.ElementType;
  color: string;
}

export function AccountsManager() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      platform: 'YouTube',
      connected: false,
      icon: Youtube,
      color: 'text-red-600',
    },
    {
      platform: 'Facebook',
      connected: false,
      icon: Facebook,
      color: 'text-blue-600',
    },
    {
      platform: 'Instagram',
      connected: false,
      icon: Instagram,
      color: 'text-pink-600',
    },
    {
      platform: 'Twitter',
      connected: false,
      icon: Twitter,
      color: 'text-blue-400',
    },
  ]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const connectedAccounts = await social.getAccounts();
      setAccounts(prev => 
        prev.map(account => {
          const connected = connectedAccounts.find(
            (ca: any) => ca.platform.toLowerCase() === account.platform.toLowerCase()
          );
          return connected
            ? { ...account, connected: true, username: connected.username }
            : account;
        })
      );
    } catch (error) {
      console.error('Failed to load accounts:', error);
    }
  };

  const handleConnect = async (platform: string) => {
    // Redirect to OAuth endpoint
    window.location.href = `http://localhost:5000/api/auth/${platform.toLowerCase()}`;
  };

  const handleDisconnect = async (platform: string) => {
    try {
      await social.disconnect(platform.toLowerCase());
      await loadAccounts();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Connected Accounts</h2>
        
        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.platform}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`${account.color}`}>
                  <account.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{account.platform}</h3>
                  {account.connected && account.username && (
                    <p className="text-sm text-gray-500">{account.username}</p>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => 
                  account.connected 
                    ? handleDisconnect(account.platform)
                    : handleConnect(account.platform)
                }
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  account.connected
                    ? 'text-red-600 hover:text-red-700'
                    : 'text-white bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {account.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
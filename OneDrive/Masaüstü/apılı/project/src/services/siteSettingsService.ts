import { supabase, handleSupabaseError, checkUserRole } from '../lib/supabase';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  adminEmail: string;
  socialMedia: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  contentSettings: {
    articlesPerPage: number;
    enableComments: boolean;
    moderateComments: boolean;
    enableNewsletter: boolean;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  analyticsSettings?: {
    googleAnalyticsId?: string;
    enableAnalytics: boolean;
  };
  securitySettings?: {
    enableTwoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
  };
}

class SiteSettingsService {
  async getSettings(): Promise<SiteSettings> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settings: any = {};
      data?.forEach(setting => {
        settings[setting.key] = setting.value;
      });

      return {
        siteName: settings.site_name || 'Zanist',
        siteDescription: settings.site_description || 'AI-Powered STEM News',
        siteUrl: settings.site_url || 'https://zanist.com',
        contactEmail: settings.contact_email || 'contact@zanist.com',
        adminEmail: settings.admin_email || 'admin@zanist.com',
        socialMedia: settings.social_media || {},
        appearance: settings.appearance || {
          primaryColor: '#dc2626',
          secondaryColor: '#1f2937'
        },
        contentSettings: settings.content_settings || {
          articlesPerPage: 12,
          enableComments: true,
          moderateComments: true,
          enableNewsletter: true
        },
        seoSettings: settings.seo_settings || {
          metaTitle: 'Zanist - AI-Powered STEM News',
          metaDescription: 'Discover the latest scientific research and breakthroughs from leading universities worldwide.',
          metaKeywords: 'science, research, STEM, universities, Nobel prizes, technology'
        },
        analyticsSettings: settings.analytics_settings || {
          enableAnalytics: false
        },
        securitySettings: settings.security_settings || {
          enableTwoFactor: false,
          sessionTimeout: 30,
          maxLoginAttempts: 5
        }
      };
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async updateSettings(updates: Partial<SiteSettings>): Promise<void> {
    try {
      await checkUserRole(['admin']);

      const settingsToUpdate = [];

      if (updates.siteName) {
        settingsToUpdate.push({ key: 'site_name', value: updates.siteName });
      }
      if (updates.siteDescription) {
        settingsToUpdate.push({ key: 'site_description', value: updates.siteDescription });
      }
      if (updates.siteUrl) {
        settingsToUpdate.push({ key: 'site_url', value: updates.siteUrl });
      }
      if (updates.contactEmail) {
        settingsToUpdate.push({ key: 'contact_email', value: updates.contactEmail });
      }
      if (updates.adminEmail) {
        settingsToUpdate.push({ key: 'admin_email', value: updates.adminEmail });
      }
      if (updates.socialMedia) {
        settingsToUpdate.push({ key: 'social_media', value: updates.socialMedia });
      }
      if (updates.appearance) {
        settingsToUpdate.push({ key: 'appearance', value: updates.appearance });
      }
      if (updates.contentSettings) {
        settingsToUpdate.push({ key: 'content_settings', value: updates.contentSettings });
      }
      if (updates.seoSettings) {
        settingsToUpdate.push({ key: 'seo_settings', value: updates.seoSettings });
      }
      if (updates.analyticsSettings) {
        settingsToUpdate.push({ key: 'analytics_settings', value: updates.analyticsSettings });
      }
      if (updates.securitySettings) {
        settingsToUpdate.push({ key: 'security_settings', value: updates.securitySettings });
      }

      // Update each setting
      for (const setting of settingsToUpdate) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            key: setting.key,
            value: setting.value,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async getSetting(key: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error) throw error;
      return data?.value;
    } catch (error) {
      console.error(`Error getting setting ${key}:`, error);
      return null;
    }
  }

  async setSetting(key: string, value: any, description?: string): Promise<void> {
    try {
      await checkUserRole(['admin']);

      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          description,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }
}

export const siteSettingsService = new SiteSettingsService();
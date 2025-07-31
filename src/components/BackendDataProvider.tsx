import React, { createContext, useContext, useEffect, useState } from 'react';
import { articlesService } from '../services/articlesService';
import { categoriesService, Category } from '../services/categoriesService';
import { universitiesService, University } from '../services/universitiesService';
import { professorsService, ProfessorProfile } from '../services/professorsService';
import { Essay } from '../types/Essay';

interface BackendDataContextType {
  articles: Essay[];
  categories: Category[];
  universities: University[];
  professors: ProfessorProfile[];
  loading: boolean;
  error: string | null;
  refetchAll: () => Promise<void>;
}

const BackendDataContext = createContext<BackendDataContextType | undefined>(undefined);

export const useBackendData = () => {
  const context = useContext(BackendDataContext);
  if (context === undefined) {
    throw new Error('useBackendData must be used within a BackendDataProvider');
  }
  return context;
};

export const BackendDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Essay[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [professors, setProfessors] = useState<ProfessorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [articlesData, categoriesData, universitiesData, professorsData] = await Promise.all([
        articlesService.getArticles({ published: true }),
        categoriesService.getCategories(),
        universitiesService.getUniversities(),
        professorsService.getProfessors()
      ]);

      setArticles(articlesData);
      setCategories(categoriesData);
      setUniversities(universitiesData);
      setProfessors(professorsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching backend data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const refetchAll = async () => {
    await fetchAllData();
  };

  const value = {
    articles,
    categories,
    universities,
    professors,
    loading,
    error,
    refetchAll
  };

  return (
    <BackendDataContext.Provider value={value}>
      {children}
    </BackendDataContext.Provider>
  );
};
import { useState, useEffect } from 'react';
import { articlesService, ArticleFilters } from '../services/articlesService';
import { Essay } from '../types/Essay';

export const useArticles = (filters: ArticleFilters = {}) => {
  const [articles, setArticles] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articlesService.getArticles(filters);
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [JSON.stringify(filters)]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articlesService.getArticles(filters);
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  return {
    articles,
    loading,
    error,
    refetch
  };
};

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Essay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articlesService.getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return {
    article,
    loading,
    error
  };
};
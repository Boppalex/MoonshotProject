
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Input } from '@/components/ui/input';
import RecipeCard from './RecipeCard';
import { searchRecipes, getMockRecipes } from '@/services/api';

const RecipeList: React.FC = () => {
  const { recipes, setRecipes } = useApp();
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial recipe load
  useEffect(() => {
    const fetchInitialRecipes = async () => {
      setIsLoading(true);
      try {
        // Call API SPOONACULAR
        const data = await searchRecipes('');
        console.log('API results:', data);
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (recipes.length === 0) {
      fetchInitialRecipes();
    }
  }, [recipes.length, setRecipes]);
  

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
  
    setIsLoading(true);
    try {
      // CAll API SPOONACULAR
      const data = await searchRecipes(searchTerm);
      console.log('Search results:', data);
      setRecipes(data);
    } catch (error) {
      console.error('Failed to search recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-4 pb-20">
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder={t('recipes.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="pr-10"
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>{t('common.loading')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;

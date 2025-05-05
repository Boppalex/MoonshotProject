// RecipeCard.tsx
import React from 'react';
import { Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Recipe } from '@/contexts/AppContext';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { setSelectedRecipe } = useApp();
  const { t } = useLocale();

  const handleClick = async () => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
    const fullData = await res.json();

    const enrichedRecipe = {
      ...recipe,
      ingredients: fullData.extendedIngredients.map((i: any) => ({
        id: i.id,
        name: i.name,
        amount: i.amount,
        unit: i.unit,
      })),
      instructions: fullData.instructions,
    };

    setSelectedRecipe(enrichedRecipe);
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
      onClick={handleClick}
    >
      <div className="h-36 overflow-hidden relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <h3 className="text-white font-semibold truncate">{recipe.title}</h3>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.readyInMinutes} {t('recipes.time')}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {recipe.servings} {t('recipes.servings')}
          </div>
        </div>
        <Button size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
          {t('recipes.viewDetails')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;

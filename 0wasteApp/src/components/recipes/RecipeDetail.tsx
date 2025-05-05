import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, ShoppingCart, Heart, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const RecipeDetail: React.FC = () => {
  const {
    selectedRecipe,
    setSelectedRecipe,
    addToCart,
    pantryItems,
    savedRecipes,
    saveRecipe,
    removeSavedRecipe
  } = useApp();
  const { t } = useLocale();
  const [servings, setServings] = useState(selectedRecipe?.servings || 2);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  if (!selectedRecipe) return null;

  const isSaved = savedRecipes.some(r => r.id === selectedRecipe.id);

  const handleAddToCart = () => {
    const ratio = selectedRecipe.servings ? servings / selectedRecipe.servings : 1;
  
    // On parcourt chaque ingrédient de la recette
    selectedRecipe.ingredients?.forEach(ingredient => {
      // Vérification si l'ingrédient est déjà dans l'inventaire
      const pantryItem = pantryItems.find(item =>
        item.name.toLowerCase() === ingredient.name.toLowerCase() &&
        item.unit.toLowerCase() === ingredient.unit?.toLowerCase()
      );
  
      // Si l'ingrédient existe déjà dans l'inventaire, on ne l'ajoute pas au panier
      if (pantryItem) {
        return; // On saute l'ajout de cet ingrédient au panier
      }
  
      // Si l'ingrédient n'est pas dans l'inventaire, on calcule la quantité nécessaire
      const quantityToAdd = ingredient.amount * ratio;
  
      // On ajoute l'ingrédient au panier si la quantité nécessaire est > 0
      if (quantityToAdd > 0) {
        addToCart({
          name: ingredient.name,
          quantity: quantityToAdd,
          unit: ingredient.unit
        }, selectedRecipe.id);
      }
    });
  
    // Afficher un message de confirmation que l'on a ajouté des éléments au panier
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };
  
  
  

  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedRecipe(selectedRecipe.id);
    } else {
      saveRecipe(selectedRecipe);
    }
  };

  const renderInstructions = () => {
    if (!selectedRecipe.instructions) return null;

    if (selectedRecipe.instructions.includes('<')) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
          className="prose prose-sm dark:prose-invert max-w-none"
        />
      );
    }

    const steps = selectedRecipe.instructions
      .split(/\n|\r|\d+\./)
      .filter(step => step.trim().length > 0);

    return (
      <ol className="space-y-3 list-decimal list-inside">
        {steps.map((step, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {step.trim()}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto animate-fade-in">
      <div className="relative min-h-screen pb-20">
        {/* Header image */}
        <div className="relative h-56 bg-gray-300">
          {selectedRecipe.image && (
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-white bg-black/20 hover:bg-black/30"
            onClick={() => setSelectedRecipe(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/30"
            onClick={handleToggleSave}
          >
            <Heart
              className={cn("h-5 w-5", isSaved && "fill-current text-red-500")}
            />
          </Button>
        </div>

        {/* Content */}
        <div className="relative -mt-8 bg-white dark:bg-gray-900 rounded-t-3xl p-6">
          <h1 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{selectedRecipe.readyInMinutes} {t('recipes.time')}</span>
            </div>

            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-500" />
              <Input
                type="number"
                min="1"
                max="12"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                className="w-16 h-8 text-center"
              />
            </div>
          </div>

          {/* Ingredients */}
          <h2 className="text-xl font-semibold mb-3">{t('pantry.item')}</h2>
          {Array.isArray(selectedRecipe.ingredients) && selectedRecipe.ingredients.length > 0 ? (
            <ul className="mb-6 space-y-2">
              {selectedRecipe.ingredients.map(ingredient => {
                const inPantry = pantryItems.some(item =>
                  item.name.toLowerCase() === ingredient.name.toLowerCase()
                );

                const adjustedAmount = (ingredient.amount * servings / selectedRecipe.servings).toFixed(1);

                return (
                  <li
                    key={ingredient.id}
                    className={cn(
                      "flex justify-between py-2 border-b",
                      inPantry ? "border-green-200" : "border-gray-200"
                    )}
                  >
                    <span className="flex items-center">
                      {inPantry && (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      )}
                      {ingredient.name}
                    </span>
                    <span className="text-gray-500">
                      {adjustedAmount} {ingredient.unit || ''}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 italic mb-6">{t('recipes.noIngredients')}</p>
          )}

          {/* Instructions */}
          <h2 className="text-xl font-semibold mb-3">{t('recipes.instructions')}</h2>
          <div className="mb-8">
            {renderInstructions()}
          </div>

          {/* Add to cart */}
          <div className="fixed bottom-4 left-4 right-4">
            <Button
              className="w-full"
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? (
                <span className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  {t('recipes.addToCart')}
                </span>
              ) : (
                <span className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t('recipes.addToCart')}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

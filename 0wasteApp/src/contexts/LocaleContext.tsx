
import React, { createContext, useState, useContext, useEffect } from 'react';

// Supported languages
export type LocaleType = 'en' | 'fr';

// Translations interface
export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

// Context interface
interface LocaleContextType {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  t: (key: string) => string;
}

// Default context values
const defaultLocaleContext: LocaleContextType = {
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
};

// Create context
export const LocaleContext = createContext<LocaleContextType>(defaultLocaleContext);

// Basic translations
const translations: Translations = {
  // Navigation
  'nav.recipes': { en: 'Recipes', fr: 'Recettes' },
  'nav.pantry': { en: 'Pantry', fr: 'Garde-manger' },
  'nav.cart': { en: 'Cart', fr: 'Panier' },
  'nav.settings': { en: 'Settings', fr: 'Paramètres' },
  
  // Recipe page
  'recipes.title': { en: 'Discover Recipes', fr: 'Découvrir des Recettes' },
  'recipes.search': { en: 'Search recipes', fr: 'Rechercher des recettes' },
  'recipes.servings': { en: 'Servings', fr: 'Portions' },
  'recipes.time': { en: 'min', fr: 'min' },
  'recipes.addToCart': { en: 'Add to Cart', fr: 'Ajouter au Panier' },
  'recipes.viewDetails': { en: 'View Recipe', fr: 'Voir la Recette' },
  
  // Pantry page
  'pantry.title': { en: 'My Pantry', fr: 'Mon Garde-manger' },
  'pantry.add': { en: 'Add Item', fr: 'Ajouter un Article' },
  'pantry.empty': { en: 'Your pantry is empty', fr: 'Votre garde-manger est vide' },
  'pantry.item': { en: 'Item', fr: 'Article' },
  'pantry.quantity': { en: 'Quantity', fr: 'Quantité' },
  'pantry.expiry': { en: 'Expires', fr: 'Expire' },
  'pantry.addNew': { en: 'Add New Item', fr: 'Ajouter un Nouvel Article' },
  'pantry.itemName': { en: 'Item Name', fr: 'Nom de l\'Article' },
  'pantry.enterName': { en: 'Enter item name', fr: 'Entrez le nom de l\'article' },
  'pantry.enterQuantity': { en: 'Enter quantity', fr: 'Entrez la quantité' },
  'pantry.addItem': { en: 'Add Item', fr: 'Ajouter l\'Article' },
  'pantry.cancel': { en: 'Cancel', fr: 'Annuler' },
  
  // Cart page
  'cart.title': { en: 'Shopping Cart', fr: 'Panier d\'Achats' },
  'cart.empty': { en: 'Your cart is empty', fr: 'Votre panier est vide' },
  'cart.clear': { en: 'Clear Cart', fr: 'Vider le Panier' },
  'cart.total': { en: 'Total Items', fr: 'Total des Articles' },
  
  // Chat
  'chat.placeholder': { en: 'Ask about recipes...', fr: 'Demandez des recettes...' },
  'chat.send': { en: 'Send', fr: 'Envoyer' },
  'chat.greeting': { 
    en: 'Hello! I can help you find recipes with ingredients you have.', 
    fr: 'Bonjour! Je peux vous aider à trouver des recettes avec les ingrédients que vous avez.' 
  },
  
  // Settings
  'settings.title': { en: 'Settings', fr: 'Paramètres' },
  'settings.language': { en: 'Language', fr: 'Langue' },
  'settings.english': { en: 'English', fr: 'Anglais' },
  'settings.french': { en: 'French', fr: 'Français' },
  
  // Common
  'common.save': { en: 'Save', fr: 'Enregistrer' },
  'common.cancel': { en: 'Cancel', fr: 'Annuler' },
  'common.delete': { en: 'Delete', fr: 'Supprimer' },
  'common.edit': { en: 'Edit', fr: 'Modifier' },
  'common.loading': { en: 'Loading...', fr: 'Chargement...' },

  // recipes not available
  'recipes.noIngredients': { en: 'No ingredients available.', fr: 'Aucun ingrédient disponible.' },
  'recipes.instructions': { en: 'Instructions', fr: 'Instructions' },

};

// Provider component
export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get stored locale or default to english
  const [locale, setLocale] = useState<LocaleType>(() => {
    const storedLocale = localStorage.getItem('locale');
    return (storedLocale as LocaleType) || 'en';
  });

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][locale];
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook for using the locale context
export const useLocale = () => useContext(LocaleContext);

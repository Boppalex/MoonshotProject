import React, { createContext, useContext, useState, useEffect } from 'react';

// ==== TYPES ====

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  imageUrl?: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  ingredients: RecipeIngredient[];
  saved?: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  recipeId?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface AppContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
  savedRecipes: Recipe[];
  saveRecipe: (recipe: Recipe) => void;
  removeSavedRecipe: (recipeId: number) => void;

  pantryItems: PantryItem[];
  addPantryItem: (item: Omit<PantryItem, 'id'>) => void;
  updatePantryItem: (updatedItem: PantryItem) => void;
  removePantryItem: (itemId: string) => void;

  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>, fromRecipe?: number) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  chatMessages: ChatMessage[];
  addChatMessage: (message: string, isUser: boolean) => void;
  clearChatMessages: () => void;

  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// ==== DEFAULT CONTEXT ====

const defaultAppContext: AppContextType = {
  recipes: [],
  setRecipes: () => {},
  selectedRecipe: null,
  setSelectedRecipe: () => {},
  savedRecipes: [],
  saveRecipe: () => {},
  removeSavedRecipe: () => {},

  pantryItems: [],
  addPantryItem: () => {},
  updatePantryItem: () => {},
  removePantryItem: () => {},

  cartItems: [],
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},

  chatMessages: [],
  addChatMessage: () => {},
  clearChatMessages: () => {},

  activeTab: 'recipes',
  setActiveTab: () => {},
  isChatOpen: false,
  setIsChatOpen: () => {},
};

export const AppContext = createContext<AppContextType>(defaultAppContext);

const generateId = () => Math.random().toString(36).substr(2, 9);

// ==== PROVIDER ====

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    const stored = localStorage.getItem('savedRecipes');
    return stored ? JSON.parse(stored) : [];
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    const stored = localStorage.getItem('pantryItems');
    return stored ? JSON.parse(stored) : [];
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [activeTab, setActiveTab] = useState<string>('recipes');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // ==== LOCAL STORAGE SYNC ====

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [savedRecipes, pantryItems, cartItems]);

  // ==== RECIPE FUNCTIONS ====

  const saveRecipe = (recipe: Recipe) => {
    if (!savedRecipes.some(r => r.id === recipe.id)) {
      setSavedRecipes([...savedRecipes, { ...recipe, saved: true }]);
    }
  };

  const removeSavedRecipe = (recipeId: number) => {
    setSavedRecipes(savedRecipes.filter(r => r.id !== recipeId));
  };

  // ==== PANTRY ====

  const addPantryItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setPantryItems(prev => [...prev, newItem]);
  };

  const updatePantryItem = (updatedItem: PantryItem) => {
    setPantryItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const removePantryItem = (itemId: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== itemId));
  };

  // ==== CART ====

  const addToCart = (item: Omit<CartItem, 'id'>, fromRecipe?: number) => {
    const existingIndex = cartItems.findIndex(
      c => c.name.toLowerCase() === item.name.toLowerCase() && c.unit === item.unit
    );

    if (existingIndex !== -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += item.quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = { ...item, id: generateId(), recipeId: fromRecipe };
      setCartItems(prev => [...prev, newItem]);
    }
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => setCartItems([]);

  // ==== CHAT ====

  const addChatMessage = (text: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      text,
      isUser,
      timestamp: Date.now()
    };
    setChatMessages(prev => [...prev, newMessage]); 
  };

  const clearChatMessages = () => setChatMessages([]);

  // Optionnel : purger vieux messages après 7 jours
  useEffect(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    setChatMessages(prev => prev.filter(m => m.timestamp > oneWeekAgo));
  }, []);

  return (
    <AppContext.Provider
      value={{
        recipes,
        setRecipes,
        selectedRecipe,
        setSelectedRecipe,
        savedRecipes,
        saveRecipe,
        removeSavedRecipe,
        pantryItems,
        addPantryItem,
        updatePantryItem,
        removePantryItem,
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        chatMessages,
        addChatMessage,
        clearChatMessages,
        activeTab,
        setActiveTab,
        isChatOpen,
        setIsChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

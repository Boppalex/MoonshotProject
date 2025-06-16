
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import ChatButton from '@/components/layout/ChatButton';
import ChatPanel from '@/components/chat/ChatPanel';
import RecipeList from '@/components/recipes/RecipeList';
import RecipeDetail from '@/components/recipes/RecipeDetail';
import PantryList from '@/components/pantry/PantryList';
import CartList from '@/components/cart/CartList';
import SettingsPage from '@/components/settings/SettingsPage';

const Index = () => {
  const { activeTab, selectedRecipe } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'recipes':
        return <RecipeList />;
      case 'pantry':
        return <PantryList />;
      case 'cart':
        return <CartList />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <RecipeList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative">
        {renderContent()}
        {selectedRecipe && <RecipeDetail />}
      </main>
      <BottomNavigation />
      <ChatButton />
      <ChatPanel />
    </div>
  );
};

export default Index;

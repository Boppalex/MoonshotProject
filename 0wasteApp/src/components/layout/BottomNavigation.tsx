
import React from 'react';
import { UtensilsCrossed, ShoppingCart, Package, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const { t } = useLocale();

  const navItems = [
    { id: 'recipes', label: t('nav.recipes'), icon: UtensilsCrossed },
    { id: 'pantry', label: t('nav.pantry'), icon: Package },
    { id: 'cart', label: t('nav.cart'), icon: ShoppingCart },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center px-2 z-10">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full rounded-lg transition-colors",
            activeTab === item.id 
              ? "text-primary" 
              : "text-gray-500 hover:text-primary"
          )}
        >
          <item.icon className={cn(
            "h-6 w-6 mb-1",
            activeTab === item.id ? "animate-fade-in" : ""
          )} />
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;

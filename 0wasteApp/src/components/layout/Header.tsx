
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';

const Header: React.FC = () => {
  const { activeTab } = useApp();
  const { t } = useLocale();

  const getTitle = () => {
    switch (activeTab) {
      case 'recipes':
        return t('recipes.title');
      case 'pantry':
        return t('pantry.title');
      case 'cart':
        return t('cart.title');
      case 'settings':
        return t('settings.title');
      default:
        return '0waste';
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">
          {getTitle()}
        </h1>
        <div className="text-sm font-medium text-primary">0waste</div>
      </div>
    </div>
  );
};

export default Header;

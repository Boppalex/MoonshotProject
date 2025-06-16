import React from 'react';
import { Plus, Minus, Trash } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

// Icon path per category 
const categoryIcons: Record<string, string> = {
  Vegetables: '/src/icons/vegetables.svg',
  Fruits: '/src/icons/fruit.svg',
  Meat: '/src/icons/meat.svg',
  Dairy: '/src/icons/dairy.svg',
  Spices: '/src/icons/garlic.svg',
  Bakery: '/src/icons/bakery.svg',
  Beverages: '/src/icons/cola.svg',
  Others: '/src/icons/other.svg',
};

// Define categories and keywords
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Vegetables: [
    'carrot', 'potato', 'onion', 'pepper', 'broccoli', 'spinach', 'lettuce',
    'tomato', 'cucumber', 'zucchini', 'celery', 'cabbage', 'cauliflower',
    'radish', 'asparagus', 'leek', 'turnip', 'beet', 'eggplant', 'artichoke',
    'shallot', 'green bean'
  ],
  Fruits: [
    'apple', 'banana', 'orange', 'berry', 'mango', 'grape', 'lemon', 'lime',
    'pear', 'pineapple', 'peach', 'plum', 'kiwi', 'watermelon', 'melon',
    'apricot', 'cherry', 'fig', 'date', 'pomegranate', 'avocado', 'coconut'
  ],
  Meat: [
    'chicken', 'beef', 'pork', 'turkey', 'lamb', 'bacon', 'sausage',
    'ham', 'minced meat', 'ground beef', 'duck', 'salami'
  ],
  Dairy: [
    'milk', 'cheese', 'butter', 'cream', 'yogurt', 'egg', 'sour cream',
    'mozzarella', 'parmesan', 'feta', 'custard', 'condensed milk'
  ],
  Spices: [
    'salt', 'pepper', 'cinnamon', 'turmeric', 'ginger', 'garlic', 'basil',
    'oregano', 'cumin', 'thyme', 'paprika', 'chili', 'clove', 'nutmeg',
    'rosemary', 'coriander', 'mustard seeds', 'marjoram', 'dill', 'bay leaf'
  ],
  Bakery: [
    'bread', 'flour', 'cake', 'biscuit', 'yeast', 'bagel', 'croissant',
    'bun', 'muffin', 'toast', 'pastry', 'pie', 'brioche', 'crouton'
  ],
  Beverages: [
    'water', 'juice', 'tea', 'coffee', 'wine', 'beer', 'soda',
    'lemonade', 'sparkling water', 'milkshake', 'smoothie'
  ],
};



// Determine item category
function getCategory(name: string): string {
  const lower = name.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return category;
    }
  }
  return 'Others';
}

const CartList: React.FC = () => {
  const { cartItems, updateCartItem, removeFromCart, clearCart } = useApp();
  const { t } = useLocale();

  const handleUpdateQuantity = (id: string, qty: number, delta: number) =>
    updateCartItem(id, Math.max(0.1, qty + delta));

  const handleRemove = (id: string) => removeFromCart(id);

  const handleClear = () => {
    clearCart();
    toast({ title: t('cart.clear'), description: 'Your shopping list has been cleared.' });
  };

  // Group items by category
  const grouped = cartItems.reduce((acc, item) => {
    const cat = getCategory(item.name);
    (acc[cat] ||= []).push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  const categories = Object.keys(CATEGORY_KEYWORDS).concat('Others');

  return (
    <div className="p-4 pb-24 max-w-4xl mx-auto">
      {cartItems.length === 0 ? (
        <div className="text-center py-16 text-gray-500">{t('cart.empty')}</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              {t('cart.total')}: {cartItems.length}
            </h2>
            <Button variant="destructive" size="sm" onClick={handleClear}>
              <Trash className="mr-2 h-4 w-4" />
              {t('cart.clear')}
            </Button>
          </div>

          {categories.map(cat => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;

            return (
              <section key={cat} className="mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-3">{cat}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map(item => (
                    <Card key={item.id} className="overflow-hidden rounded-full shadow-md">
                      <div className="flex items-center justify-center pl-4">
                        <div className="w-20 h-20 flex justify-center items-center bg-orange-100 rounded-l-full">
                          <img
                            src={categoryIcons[cat] || categoryIcons['Others']}
                            alt={cat}
                            className="h-10 w-10 object-contain "
                          />
                        </div>
                        <CardContent className="flex-1 py-2 px-4">
                          <div>
                            <h4 className="text-xl font-semibold capitalize">{item.name}</h4>
                            <p className="text text-gray-500">
                              {item.quantity.toFixed(1)} {item.unit}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, -0.5)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, 0.5)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-red-500"
                              onClick={() => handleRemove(item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CartList;

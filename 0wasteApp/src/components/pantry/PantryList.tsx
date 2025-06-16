
import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PantryItem } from '@/contexts/AppContext';

const PantryList: React.FC = () => {
  const { pantryItems, addPantryItem, updatePantryItem, removePantryItem } = useApp();
  const { t } = useLocale();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'whole',
    expiryDate: ''
  });

  const resetForm = () => {
    setNewItem({
      name: '',
      quantity: 1,
      unit: 'whole',
      expiryDate: ''
    });
    setIsEditMode(false);
    setEditingItem(null);
  };

  const handleOpenDialog = (item?: PantryItem) => {
    if (item) {
      setIsEditMode(true);
      setEditingItem(item);
      setNewItem({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        expiryDate: item.expiryDate || ''
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name.trim()) return;
    
    if (isEditMode && editingItem) {
      updatePantryItem({
        id: editingItem.id,
        name: newItem.name,
        quantity: newItem.quantity,
        unit: newItem.unit,
        expiryDate: newItem.expiryDate || undefined
      });
    } else {
      addPantryItem({
        name: newItem.name,
        quantity: newItem.quantity,
        unit: newItem.unit,
        expiryDate: newItem.expiryDate || undefined
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleRemoveItem = (id: string) => {
    removePantryItem(id);
  };

  const units = [
    'whole', 'g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'oz', 'lb', 'piece', 'slice'
  ];

  return (
    <div className="p-4 pb-20">
      <Button 
        onClick={() => handleOpenDialog()}
        className="w-full mb-6"
      >
        <Plus className="mr-2 h-4 w-4" />
        {t('pantry.add')}
      </Button>

      {pantryItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">{t('pantry.empty')}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {pantryItems.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} {item.unit}
                  {item.expiryDate && ` • ${t('pantry.expiry')}: ${item.expiryDate}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleOpenDialog(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? t('common.edit') : t('pantry.addNew')}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('pantry.itemName')}</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder={t('pantry.enterName')}
                  autoComplete="off"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">{t('pantry.quantity')}</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    step="0.1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) || 0 })}
                    placeholder={t('pantry.enterQuantity')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry">{t('pantry.expiry')} (Optional)</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit">
                {isEditMode ? t('common.save') : t('pantry.addItem')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PantryList;

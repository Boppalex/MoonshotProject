
import React from 'react';
import { Globe } from 'lucide-react';
import { useLocale, LocaleType } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const SettingsPage: React.FC = () => {
  const { locale, setLocale, t } = useLocale();

  const handleLanguageChange = (value: LocaleType) => {
    setLocale(value);
    toast({
      title: t('settings.language'),
      description: value === 'en' ? t('settings.english') : t('settings.french'),
    });
  };

  return (
    <div className="p-4 pb-20">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            {t('settings.language')}
          </CardTitle>
          <CardDescription>
            Select your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            defaultValue={locale}
            onValueChange={(value) => handleLanguageChange(value as LocaleType)}
          >
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="en" id="en" />
              <Label htmlFor="en">{t('settings.english')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fr" id="fr" />
              <Label htmlFor="fr">{t('settings.french')}</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About 0waste</CardTitle>
          <CardDescription>
            A smart meal planning and zero-waste cooking assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            0waste helps you reduce food waste by tracking your pantry, suggesting recipes with ingredients you already have, and creating smart shopping lists.
          </p>
          <p className="text-xs text-gray-400">
            Version 1.0.0
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;

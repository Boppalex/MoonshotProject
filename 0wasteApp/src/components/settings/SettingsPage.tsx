import React, { useState } from 'react';
import { Globe, User, Eye, EyeOff } from 'lucide-react';
import { useLocale, LocaleType } from '@/contexts/LocaleContext';
import { auth } from '@/lib/firebase';
import {
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

const SettingsPage: React.FC = () => {
  const { locale, setLocale, t } = useLocale();
  const user = auth.currentUser;

  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const handleLanguageChange = (value: LocaleType) => {
    setLocale(value);
    toast({
      title: t('settings.language'),
      description: value === 'en' ? t('settings.english') : t('settings.french'),
    });
  };

  const reauthenticate = async () => {
    if (!user || !currentPassword) {
      throw new Error('Current password is required');
    }
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    await reauthenticateWithCredential(user, credential);
  };

  const handleUpdateEmail = async () => {
    try {
      await reauthenticate();
      if (user && email !== user.email) {
        await updateEmail(user, email);
        toast({
          title: 'Email updated',
          description: 'Your email has been successfully changed.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await reauthenticate();
      if (user && newPassword) {
        await updatePassword(user, newPassword);
        toast({
          title: 'Password updated',
          description: 'Your password has been successfully changed.',
        });
        setNewPassword('');
        setCurrentPassword('');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Language Settings */}
      <Card>
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

      {/* User Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your email and password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">New Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
            <Button
              onClick={handleUpdateEmail}
              className="mt-2"
              disabled={email === user?.email || !currentPassword}
            >
              Update Email
            </Button>
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
            />
            <Button
              onClick={handleUpdatePassword}
              className="mt-2"
              disabled={newPassword.length < 6 || !currentPassword}
            >
              Update Password
            </Button>
          </div>

          <div className="flex items-center mt-2">
            <input
              id="showPasswords"
              type="checkbox"
              checked={showPasswords}
              onChange={() => setShowPasswords(!showPasswords)}
              className="mr-2"
            />
            <Label htmlFor="showPasswords">
              Show passwords
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* About */}
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
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;


import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Bell, Volume2, Shield, ArrowRight, Save, Eye, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const StudentSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    name: 'Alex Johnson',
    avatarUrl: 'https://placehold.co/200x200/60A5FA/FFFFFF?text=AJ',
    theme: 'bright',
    soundEffects: true,
    readAloud: true,
    notifications: true,
    autoPlay: false,
    highContrast: false,
    largeText: false
  });

  const handleSettingChange = (setting: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleGoToParentalControls = () => {
    navigate('/student/parental-control');
  };

  const themes = [
    { value: 'bright', label: 'Bright & Colorful' },
    { value: 'ocean', label: 'Ocean Theme' },
    { value: 'forest', label: 'Forest Theme' },
    { value: 'space', label: 'Space Explorer' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="school" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <SettingsIcon className="mr-3 h-8 w-8" />
            My Settings
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Customize your learning experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <User className="mr-2 h-5 w-5" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-lms-blue">
                  <img
                    src={settings.avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Change Picture
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-round">Your Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange('name', e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme" className="font-round">Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange('theme', value)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value} className="font-round">
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-2">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-base font-round mb-2">Sound & Visual Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Volume2 className="h-5 w-5 mr-2 text-lms-green" />
                        <span className="text-sm">Sound Effects</span>
                      </div>
                      <Switch 
                        checked={settings.soundEffects}
                        onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Volume2 className="h-5 w-5 mr-2 text-lms-blue" />
                        <span className="text-sm">Read Aloud</span>
                      </div>
                      <Switch 
                        checked={settings.readAloud}
                        onCheckedChange={(checked) => handleSettingChange('readAloud', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-lms-pink" />
                        <span className="text-sm">Notifications</span>
                      </div>
                      <Switch 
                        checked={settings.notifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-base font-round mb-2">Accessibility</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 mr-2 text-lms-purple" />
                        <span className="text-sm">High Contrast</span>
                      </div>
                      <Switch 
                        checked={settings.highContrast}
                        onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-lms-yellow" />
                        <span className="text-sm">Larger Text</span>
                      </div>
                      <Switch 
                        checked={settings.largeText}
                        onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ArrowRight className="h-5 w-5 mr-2 text-lms-green" />
                        <span className="text-sm">AutoPlay Videos</span>
                      </div>
                      <Switch 
                        checked={settings.autoPlay}
                        onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-4">
                  <div className="bg-lms-yellow/10 border border-lms-yellow/50 rounded-xl p-4 mb-6 flex items-start">
                    <Shield className="h-5 w-5 mr-3 text-lms-yellow mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Parental Controls</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        Parents can set screen time limits, monitor learning progress, and control content access.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-xl border-lms-yellow text-lms-yellow"
                        onClick={handleGoToParentalControls}
                      >
                        <Lock className="h-3.5 w-3.5 mr-2" />
                        Parental Controls
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSaveSettings}
                    className="w-full rounded-xl bg-lms-green hover:bg-lms-green/80"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;

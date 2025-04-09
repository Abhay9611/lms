
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Volume2, Eye, Bell, Sun, Moon, Users, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';

const StudentSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated.",
      variant: "default",
    });
  };

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <div className="relative mb-6">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <SettingsIcon className="mr-3 h-8 w-8" />
            My Settings
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Customize your learning experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Eye className="h-5 w-5 mr-2 text-lms-blue" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bubbly font-medium">Theme</h4>
                    <p className="text-sm text-muted-foreground">Choose a light or dark theme</p>
                  </div>
                  <RadioGroup defaultValue="light" className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light" className="cursor-pointer flex items-center">
                        <Sun className="h-4 w-4 mr-1" />
                        <span>Light</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark" className="cursor-pointer flex items-center">
                        <Moon className="h-4 w-4 mr-1" />
                        <span>Dark</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bubbly font-medium">Font Size</h4>
                      <p className="text-sm text-muted-foreground">Adjust the text size</p>
                    </div>
                    <span className="text-xs font-medium bg-lms-blue/10 px-2 py-1 rounded text-lms-blue">
                      Medium
                    </span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bubbly font-medium">Animations</h4>
                    <p className="text-sm text-muted-foreground">Show animations and effects</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bubbly font-medium">High Contrast</h4>
                    <p className="text-sm text-muted-foreground">For better visibility</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Volume2 className="h-5 w-5 mr-2 text-lms-green" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bubbly font-medium">Music Volume</h4>
                      <p className="text-sm text-muted-foreground">Background music volume</p>
                    </div>
                    <span className="text-xs font-medium bg-lms-green/10 px-2 py-1 rounded text-lms-green">
                      60%
                    </span>
                  </div>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bubbly font-medium">Sound Effects</h4>
                      <p className="text-sm text-muted-foreground">Volume for game sounds</p>
                    </div>
                    <span className="text-xs font-medium bg-lms-green/10 px-2 py-1 rounded text-lms-green">
                      80%
                    </span>
                  </div>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bubbly font-medium">Narration</h4>
                    <p className="text-sm text-muted-foreground">Voice instructions and narration</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bubbly font-medium">Sound Effects</h4>
                    <p className="text-sm text-muted-foreground">Button clicks and game sounds</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-purple/10">
            <CardTitle className="text-xl font-bubbly flex items-center">
              <Bell className="h-5 w-5 mr-2 text-lms-purple" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bubbly font-medium">Learning Reminders</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Daily Learning Reminder</p>
                    <p className="text-sm text-muted-foreground">Remind me to learn every day</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Assignment Notifications</p>
                    <p className="text-sm text-muted-foreground">For new assignments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Achievement Alerts</p>
                    <p className="text-sm text-muted-foreground">When you earn awards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bubbly font-medium">Other Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">New Content Updates</p>
                    <p className="text-sm text-muted-foreground">When new lessons are added</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Weekly Progress Report</p>
                    <p className="text-sm text-muted-foreground">Summary of your progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Special Events</p>
                    <p className="text-sm text-muted-foreground">Holiday activities and events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="rounded-xl">
            Reset to Default
          </Button>
          <Button className="rounded-xl" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;

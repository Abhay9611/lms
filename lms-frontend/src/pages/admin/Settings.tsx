
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Save, User, Lock, Bell, Globe, Palette, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <SettingsIcon className="mr-3 h-8 w-8" />
            System Settings
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Configure and customize the BookWorm Academy platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-xl font-bubbly">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Platform Name</label>
                      <Input defaultValue="BookWorm Academy" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Support Email</label>
                      <Input defaultValue="support@bookwormacademy.com" className="rounded-xl" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-bubbly text-lg">System Preferences</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enable Notifications</div>
                        <div className="text-sm text-muted-foreground">Send email notifications for system events</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Teacher Registration Approval</div>
                        <div className="text-sm text-muted-foreground">Require manual approval for new teacher accounts</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enable Analytics</div>
                        <div className="text-sm text-muted-foreground">Collect and show platform usage analytics</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Maintenance Mode</div>
                        <div className="text-sm text-muted-foreground">Put the platform in maintenance mode</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-primary">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-green/10">
                <CardTitle className="text-xl font-bubbly">Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <div className="w-full h-20 bg-primary rounded-lg mb-2"></div>
                      <p className="text-sm font-bubbly">Primary Theme</p>
                    </div>
                    <div className="p-4 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-lms-blue hover:bg-lms-blue/5 transition-colors">
                      <div className="w-full h-20 bg-lms-blue rounded-lg mb-2"></div>
                      <p className="text-sm font-bubbly">Ocean Theme</p>
                    </div>
                    <div className="p-4 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-lms-green hover:bg-lms-green/5 transition-colors">
                      <div className="w-full h-20 bg-lms-green rounded-lg mb-2"></div>
                      <p className="text-sm font-bubbly">Forest Theme</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-bubbly text-lg">Interface Options</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enable Animations</div>
                        <div className="text-sm text-muted-foreground">Show animated elements on pages</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">High Contrast Mode</div>
                        <div className="text-sm text-muted-foreground">Increase visual contrast for accessibility</div>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Rounded Corners</div>
                        <div className="text-sm text-muted-foreground">Use rounded corners for interface elements</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-lms-green text-white">
                      <Palette className="h-4 w-4 mr-2" />
                      Apply Theme
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-purple/10">
                <CardTitle className="text-xl font-bubbly">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-12 h-12 rounded-full bg-lms-purple/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-lms-purple" />
                      </div>
                      <div>
                        <p className="font-bubbly">Admin Account</p>
                        <p className="text-sm text-muted-foreground">admin@bookwormacademy.com</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <label className="text-sm font-medium">Change Password</label>
                      <Input type="password" placeholder="Current Password" className="rounded-xl mb-2" />
                      <Input type="password" placeholder="New Password" className="rounded-xl mb-2" />
                      <Input type="password" placeholder="Confirm New Password" className="rounded-xl" />
                    </div>
                    
                    <Button className="w-full bg-lms-purple text-white">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-lms-blue/10">
                <CardTitle className="text-xl font-bubbly">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">New User Registrations</div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Content Updates</div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="font-medium">System Alerts</div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Weekly Reports</div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button className="w-full bg-lms-blue text-white">
                    <Bell className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

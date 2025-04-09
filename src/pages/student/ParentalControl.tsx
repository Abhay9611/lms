
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { EyeIcon, LockIcon, Clock, BookOpen, Calendar, Gamepad2, Video, Bell, Shield, ArrowRight } from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/hooks/use-toast';

const StudentParentalControl = () => {
  const { toast } = useToast();
  const [parentalPinEnabled, setParentalPinEnabled] = useState(true);
  const [parentalPin, setParentalPin] = useState('1234');
  const [screenTimeLimit, setScreenTimeLimit] = useState(60); // minutes
  const [dailyScreenTime, setDailyScreenTime] = useState(45); // minutes used today
  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'Mon', minutes: 35 },
    { day: 'Tue', minutes: 50 },
    { day: 'Wed', minutes: 45 },
    { day: 'Thu', minutes: 20 },
    { day: 'Fri', minutes: 60 },
    { day: 'Sat', minutes: 70 },
    { day: 'Sun', minutes: 30 }
  ]);
  
  const [contentSettings, setContentSettings] = useState({
    allowGames: true,
    allowVideos: true,
    dailyNotifications: true,
    weeklyReports: true
  });

  const handleContentSettingChange = (setting: keyof typeof contentSettings) => {
    setContentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() })} is now ${!contentSettings[setting] ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleScreenTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setScreenTimeLimit(value);
    }
  };

  const saveParentalSettings = () => {
    toast({
      title: "Parental Controls Updated",
      description: "Your settings have been successfully saved.",
    });
  };

  const getUsagePercentage = () => {
    return (dailyScreenTime / screenTimeLimit) * 100;
  };

  const usagePercentage = getUsagePercentage();

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="school" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <Shield className="mr-3 h-8 w-8" />
            Parental Controls
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Manage screen time and monitor learning activity
          </p>
          
          <div className="mt-6 p-4 bg-lms-yellow/20 border border-lms-yellow/50 rounded-xl">
            <p className="text-sm flex items-center">
              <LockIcon className="h-5 w-5 mr-2 text-lms-yellow" />
              These settings can only be changed by a parent using the parental PIN.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden lg:col-span-2">
            <CardHeader className="bg-lms-green/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Screen Time Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="screenTimeLimit" className="text-base font-round">Daily Screen Time Limit</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="screenTimeLimit"
                      type="number"
                      value={screenTimeLimit}
                      onChange={handleScreenTimeLimitChange}
                      className="w-24 rounded-xl mr-3"
                      min={0}
                    />
                    <span className="text-muted-foreground">minutes per day</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-round mb-2">Today's Screen Time Usage</h3>
                  <div className="bg-white p-4 rounded-xl border-2 border-muted mb-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{dailyScreenTime} minutes used</span>
                      <span className="text-sm text-muted-foreground">{screenTimeLimit} minutes allowed</span>
                    </div>
                    <Progress 
                      value={usagePercentage > 100 ? 100 : usagePercentage} 
                      className="h-3 rounded-full"
                      color={usagePercentage > 80 ? "bg-lms-red" : usagePercentage > 50 ? "bg-lms-yellow" : "bg-lms-green"}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {screenTimeLimit - dailyScreenTime} minutes remaining today
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-round mb-2">Weekly Activity Overview</h3>
                  <div className="flex items-end h-32 gap-1">
                    {weeklyActivity.map((day, index) => {
                      const heightPercentage = (day.minutes / (screenTimeLimit * 1.2)) * 100; // Scale to make bars visible
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full rounded-t-lg ${
                              day.minutes > screenTimeLimit ? 'bg-lms-red' :
                              day.minutes > screenTimeLimit * 0.8 ? 'bg-lms-yellow' : 'bg-lms-green'
                            }`}
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-xs font-medium mt-1">{day.day}</div>
                          <div className="text-xs text-muted-foreground">{day.minutes}m</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Average: 44 min/day</span>
                    <Button variant="link" size="sm" className="text-xs h-auto p-0">
                      View Detailed Report
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <LockIcon className="mr-2 h-5 w-5" />
                Access Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="parentalPinEnabled" className="text-base font-round">Parental PIN Protection</Label>
                    <p className="text-sm text-muted-foreground">Require PIN to change settings</p>
                  </div>
                  <Switch 
                    id="parentalPinEnabled" 
                    checked={parentalPinEnabled}
                    onCheckedChange={setParentalPinEnabled}
                  />
                </div>
                
                {parentalPinEnabled && (
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="parentalPin" className="text-sm font-round">PIN Code</Label>
                    <Input
                      id="parentalPin"
                      type="password"
                      value={parentalPin}
                      onChange={(e) => setParentalPin(e.target.value)}
                      className="w-full rounded-xl"
                      maxLength={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      4-digit PIN required to access parental controls
                    </p>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-round">Content Access Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gamepad2 className="h-5 w-5 mr-2 text-lms-green" />
                      <span className="text-sm">Allow Games</span>
                    </div>
                    <Switch 
                      checked={contentSettings.allowGames}
                      onCheckedChange={() => handleContentSettingChange('allowGames')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Video className="h-5 w-5 mr-2 text-lms-pink" />
                      <span className="text-sm">Allow Videos</span>
                    </div>
                    <Switch 
                      checked={contentSettings.allowVideos}
                      onCheckedChange={() => handleContentSettingChange('allowVideos')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <h3 className="text-base font-round">Notification Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-lms-blue" />
                      <span className="text-sm">Daily Notifications</span>
                    </div>
                    <Switch 
                      checked={contentSettings.dailyNotifications}
                      onCheckedChange={() => handleContentSettingChange('dailyNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-lms-purple" />
                      <span className="text-sm">Weekly Reports</span>
                    </div>
                    <Switch 
                      checked={contentSettings.weeklyReports}
                      onCheckedChange={() => handleContentSettingChange('weeklyReports')}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={saveParentalSettings}
                  className="w-full rounded-xl bg-lms-blue hover:bg-lms-blue/80"
                >
                  Save Parental Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-lms-purple/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-purple/10">
            <CardTitle className="text-xl font-bubbly flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Learning Activity Report
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Most Used Subject', value: 'English Rhymes', icon: <BookOpen className="h-6 w-6 text-lms-pink" />, color: 'bg-lms-pink/10' },
                  { title: 'Time Spent on Maths', value: '120 minutes', icon: <Clock className="h-6 w-6 text-lms-blue" />, color: 'bg-lms-blue/10' },
                  { title: 'Completed Activities', value: '15 this week', icon: <BookOpen className="h-6 w-6 text-lms-green" />, color: 'bg-lms-green/10' },
                ].map((stat, index) => (
                  <div key={index} className={`p-4 rounded-xl ${stat.color} border border-dashed`}>
                    <div className="flex items-center mb-2">
                      {stat.icon}
                      <h3 className="text-sm font-medium ml-2">{stat.title}</h3>
                    </div>
                    <p className="text-xl font-bubbly font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full rounded-xl">
                View Complete Learning Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentParentalControl;

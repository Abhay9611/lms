
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, ChartBar, Calendar, Lock, Eye, Play, Pause, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { useToast } from '@/components/ui/use-toast';

const ParentalControl = () => {
  const { toast } = useToast();
  const [isLocked, setIsLocked] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');
  
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate the PIN against the stored value
    if (pin === '1234') {
      setIsLocked(false);
      setShowPinInput(false);
      setPin('');
      
      toast({
        title: "Parental controls unlocked",
        description: "You now have access to modify settings",
      });
    } else {
      toast({
        title: "Incorrect PIN",
        description: "Please try again or ask a parent for help",
        variant: "destructive",
      });
    }
  };
  
  const handleLock = () => {
    setIsLocked(true);
    
    toast({
      title: "Parental controls locked",
      description: "Settings are now protected",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Parental control settings have been updated",
    });
  };

  if (isLocked) {
    return (
      <DashboardLayout>
        <div className="relative space-y-6">
          <AnimatedCharacters variant="minimal" density="low" />
          
          <div className="relative mb-6">
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <Shield className="mr-3 h-8 w-8" />
              Parental Controls
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              These settings are managed by your parents or guardians
            </p>
          </div>
          
          <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden max-w-md mx-auto">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Parental Controls Locked
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {showPinInput ? (
                <form onSubmit={handlePinSubmit} className="space-y-4">
                  <div className="text-center">
                    <p className="mb-4">Enter your parental PIN to access these settings</p>
                    <div className="max-w-xs mx-auto">
                      <Label htmlFor="pin">PIN Code</Label>
                      <Input 
                        id="pin"
                        type="password" 
                        placeholder="••••" 
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="text-center text-xl"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="rounded-xl"
                      onClick={() => setShowPinInput(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl">Unlock</Button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                    <Lock className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="mb-4">These settings can only be changed by a parent or guardian.</p>
                    <Button onClick={() => setShowPinInput(true)} className="rounded-xl">
                      Unlock Settings
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative space-y-6">
        <AnimatedCharacters variant="minimal" density="low" />
        
        <div className="relative mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
              <Shield className="mr-3 h-8 w-8" />
              Parental Controls
            </h1>
            <p className="text-lg text-muted-foreground font-round mt-2">
              Manage screen time and content restrictions
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLock}
            className="rounded-xl"
          >
            <Lock className="mr-2 h-4 w-4" />
            Lock Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Clock className="h-5 w-5 mr-2 text-lms-blue" />
                Screen Time Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-bubbly font-medium">Daily Time Limit</h4>
                  <p className="text-sm text-muted-foreground">Maximum usage time per day</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bubbly mr-2">2 hours</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Daily limit</p>
                  <span className="text-sm font-medium">2 hours</span>
                </div>
                <Slider defaultValue={[120]} max={240} step={15} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30min</span>
                  <span>1h</span>
                  <span>2h</span>
                  <span>3h</span>
                  <span>4h</span>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-bubbly font-medium">Scheduled Access Times</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>Weekdays</p>
                    </div>
                    <p className="text-sm">3:00 PM - 7:00 PM</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>Weekends</p>
                    </div>
                    <p className="text-sm">10:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full rounded-xl">
                  Adjust Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly flex items-center">
                <Eye className="h-5 w-5 mr-2 text-lms-pink" />
                Content Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-bubbly font-medium">Age-Appropriate Content</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Show content only for ages 3-5</p>
                    <p className="text-sm text-muted-foreground">Filter advanced content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Educational content only</p>
                    <p className="text-sm text-muted-foreground">Restrict non-educational games</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-bubbly font-medium">Access Controls</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Require PIN for app exit</p>
                    <p className="text-sm text-muted-foreground">Prevent unauthorized exit</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Allow external links</p>
                    <p className="text-sm text-muted-foreground">Open links outside the app</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-4 border-lms-green/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-lms-green/10">
            <CardTitle className="text-xl font-bubbly flex items-center">
              <ChartBar className="h-5 w-5 mr-2 text-lms-green" />
              Activity Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bubbly font-medium">Email Reports</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Weekly activity summary</p>
                    <p className="text-sm text-muted-foreground">Sent every Sunday</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Learning progress reports</p>
                    <p className="text-sm text-muted-foreground">Monthly detailed progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="parent-email">Parent's Email</Label>
                  <Input 
                    id="parent-email"
                    type="email" 
                    placeholder="parent@example.com" 
                    defaultValue="parent@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bubbly font-medium">Usage Statistics</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Time spent this week</p>
                      <p className="text-sm text-muted-foreground">Total screen time</p>
                    </div>
                    <p className="text-xl font-bubbly">5h 24m</p>
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Most used subject</p>
                      <p className="text-sm text-muted-foreground">This week</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bubbly">English Rhymes</p>
                      <p className="text-sm text-muted-foreground">1h 45m</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full rounded-xl">
                    View Detailed Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-muted/30 p-4 rounded-xl flex items-start space-x-4">
          <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Important Note for Parents</p>
            <p className="text-sm text-muted-foreground">
              While these controls can help manage your child's experience, they are not a substitute
              for parental supervision. We recommend regularly engaging with your child about their
              learning progress and online activities.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="rounded-xl">
            Reset to Default
          </Button>
          <Button className="rounded-xl" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentalControl;


import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon, Plus, Search, Edit, Trash2, UserCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { UserRole } from '@/types';

// Mock users data
const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: UserRole.TEACHER,
    school: "Little Learners Preschool",
    status: "active",
    avatar: "/avatars/teacher1.jpg"
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: UserRole.ADMIN,
    school: "BookWorm Admin",
    status: "active",
    avatar: ""
  },
  {
    id: 3,
    name: "Emily Wilson",
    email: "emily.w@example.com",
    role: UserRole.TEACHER,
    school: "FirstSteps Montessori",
    status: "active",
    avatar: "/avatars/teacher2.jpg"
  },
  {
    id: 4,
    name: "Robert Smith",
    email: "robert.s@example.com",
    role: UserRole.PARENT,
    school: "Tiny Tots Academy",
    status: "inactive",
    avatar: ""
  },
  {
    id: 5,
    name: "Lisa Davis",
    email: "lisa.d@example.com",
    role: UserRole.TEACHER,
    school: "BrightStart Kindergarten",
    status: "active",
    avatar: "/avatars/teacher3.jpg"
  }
];

const UsersPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        <AnimatedCharacters variant="space" density="low" />
        
        <div className="mb-6 relative">
          <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
            <UsersIcon className="mr-3 h-8 w-8" />
            Users Management
          </h1>
          <p className="text-lg text-muted-foreground font-round mt-2">
            Manage all users in the BookWorm Academy platform
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-10 rounded-xl border-2"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Button className="rounded-xl bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        
        <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl font-bubbly">All Users</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-muted">
                    <th className="px-4 py-3 text-left font-bubbly text-primary">User</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">Email</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Role</th>
                    <th className="px-4 py-3 text-left font-bubbly text-primary">School</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Status</th>
                    <th className="px-4 py-3 text-center font-bubbly text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8 border-2 border-lms-purple">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-lms-purple/20 text-lms-purple">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-4 text-center">
                        <Badge className={
                          user.role === UserRole.ADMIN ? "bg-lms-purple" :
                          user.role === UserRole.TEACHER ? "bg-lms-blue" :
                          user.role === UserRole.PARENT ? "bg-lms-green" :
                          "bg-lms-yellow"
                        }>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">{user.school}</td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant={user.status === "active" ? "default" : "outline"} 
                          className={user.status === "active" ? "bg-lms-green" : ""}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-blue">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-pink">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-4 border-lms-blue/30 rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="bg-lms-blue/10">
              <CardTitle className="text-xl font-bubbly">User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-blue/30 flex flex-col items-center">
                  <div className="bg-lms-blue/10 p-3 rounded-full mb-2">
                    <UsersIcon className="h-6 w-6 text-lms-blue" />
                  </div>
                  <div className="text-3xl font-bubbly font-bold">{users.length}</div>
                  <div className="text-sm text-muted-foreground">Total Users</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-lms-green/30 flex flex-col items-center">
                  <div className="bg-lms-green/10 p-3 rounded-full mb-2">
                    <UserCircle className="h-6 w-6 text-lms-green" />
                  </div>
                  <div className="text-3xl font-bubbly font-bold">
                    {users.filter(user => user.status === "active").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-bubbly text-lg">Users by Role</h3>
                <div className="space-y-3">
                  {Object.values(UserRole).map(role => {
                    const count = users.filter(user => user.role === role).length;
                    const percentage = (count / users.length) * 100;
                    
                    return (
                      <div key={role} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{role}</span>
                          <span>{count}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={
                              role === UserRole.ADMIN ? "bg-lms-purple h-full" :
                              role === UserRole.TEACHER ? "bg-lms-blue h-full" :
                              role === UserRole.PARENT ? "bg-lms-green h-full" :
                              "bg-lms-yellow h-full"
                            } 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-lms-pink/30 rounded-3xl shadow-lg overflow-hidden md:col-span-2">
            <CardHeader className="bg-lms-pink/10">
              <CardTitle className="text-xl font-bubbly">Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { user: "Michael Brown", action: "added a new school to the system", time: "2 hours ago", role: UserRole.ADMIN },
                  { user: "Sarah Johnson", action: "updated her profile information", time: "Yesterday", role: UserRole.TEACHER },
                  { user: "Emily Wilson", action: "created a new lesson plan", time: "2 days ago", role: UserRole.TEACHER },
                  { user: "Robert Smith", action: "logged in for the first time", time: "3 days ago", role: UserRole.PARENT }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-dashed last:border-0 last:pb-0">
                    <div className={`mt-0.5 p-2 rounded-full ${
                      activity.role === UserRole.ADMIN ? "bg-lms-purple/20 text-lms-purple" :
                      activity.role === UserRole.TEACHER ? "bg-lms-blue/20 text-lms-blue" :
                      activity.role === UserRole.PARENT ? "bg-lms-green/20 text-lms-green" :
                      "bg-lms-yellow/20 text-lms-yellow"
                    }`}>
                      <UserCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        <span className="font-bold">{activity.user}</span> {activity.action}
                      </p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatCard from '@/components/dashboard/StatCard';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Users, BookOpen, BarChart3 } from 'lucide-react';
import axios from 'axios';

interface AdminStats {
  label: string;
  value: number;
}

const AdminDashboard = () => {

  const { user, token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      console.log('Fetching stats with auth state:', { 
        isAuthenticated, 
        hasToken: !!token, 
        userRole: user?.role,
        apiUrl: import.meta.env.VITE_API_URL 
      });

      if (!isAuthenticated || !token) {
        console.log('Not authenticated, skipping fetch');
        setError('Please log in to access this page');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Ensure the token is set in headers for this request
        const headers = {
          Authorization: `Bearer ${token}`
        };
        console.log('Making API requests with headers:', { 
          hasAuthHeader: !!headers.Authorization,
          tokenLength: token.length 
        });

        const schoolsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/schools`, { headers });
        console.log('Schools response:', schoolsResponse.status);
        
        const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`, { headers });
        console.log('Users response:', usersResponse.status);
        
        const booksResponse = await axios.get(`${import.meta.env.VITE_API_URL}/teaching-guides`, { headers });
        console.log('Books response:', booksResponse.status);

        const sortedUsers = usersResponse.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        const schoolsCount = schoolsResponse.data.length;
        const studentsCount = usersResponse.data.filter(user => user.role === 'student').length;
        const teachersCount = usersResponse.data.filter(user => user.role === 'teacher').length;
        const booksCount = booksResponse.data.length;

        setAdminStats([
          { label: 'Schools', value: schoolsCount },
          { label: 'Teachers', value: teachersCount },
          { label: 'Students', value: studentsCount },
          { label: 'Books', value: booksCount }
        ]);

        setRecentActivities(sortedUsers);
      } catch (error: any) {
        console.error('Detailed error info:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });

        if (error.response?.status === 401) {
          setError('Your session has expired. Please log in again.');
          // Optionally trigger logout
          window.location.href = '/login';
        } else {
          setError(error.response?.data?.message || 'Failed to fetch statistics');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user, token, isAuthenticated]);

  if (loading) {
    return <div className="p-8 text-center">Loading data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard stats={adminStats} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Schools"
            value={adminStats[0].value}
            description="2 new this month"
            icon={<School className="h-4 w-4" />}
            trend={{ value: 20, isPositive: true }}
          />
          <StatCard
            title="Teachers"
            value={adminStats[1].value}
            description="14 pending approval"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Students"
            value={adminStats[2].value}
            description="↑ 12% from last month"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Books"
            value={adminStats[3].value}
            description="23 added this month"
            icon={<BookOpen className="h-4 w-4" />}
            trend={{ value: 17, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 relative">
                Content Usage
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.slice(0, 5).map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-border pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">

                      <Users className="h-5 w-5" />

                    </div>
                    <div>
                      <p className="font-medium">

                        {activity.role === 'teacher' ? 'New teacher registered - ' + activity.firstName : 'New student registered - ' + activity.firstName}

                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          const minutes = Math.floor((Date.now() - new Date(activity.createdAt).getTime()) / 60000);
                          if (minutes < 60) {
                            return `${minutes} minutes ago`;
                          }
                          const hours = Math.floor(minutes / 60);
                          if (hours < 24) {
                            return `${hours} hours ago`;
                          }
                          const days = Math.floor(hours / 24);
                          return `${days} days ago`;
                        })()}
                      </p>

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

export default AdminDashboard;

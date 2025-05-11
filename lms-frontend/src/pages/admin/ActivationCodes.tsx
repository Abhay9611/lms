
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon, Plus, Search, Edit, Trash2, UserCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import { UserRole } from '@/types';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface ActivationCode {
    id: number;
    grade: string;
    code: string;
}


const ActivationCodes = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activationCodesList, setActivationCodesList] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [gradesList, setGradesList] = useState([]);


    const handleDelete = (id: number) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/activation-codes/${id}`)
            .then(() => {
                setActivationCodesList(activationCodesList.filter(activationCode => activationCode.id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError(null);
            try {

                const gradesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/grades`)
                setGradesList(gradesResponse.data);


            } catch (error) {
                setError('Failed to fetch grades');
                console.error('Error fetching grades:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [user]);


    useEffect(() => {

        const fetchActivationCodes = async () => {
            try {
                const gradeName = gradesList.find((grade: any) => grade.id === selectedGrade)?.name;
                const activationCodesResponse = await axios.post(`${import.meta.env.VITE_API_URL}/activation-codes`, { grade: gradeName === 'Pre-nursery' ? 'Nursery' : gradeName === 'Play Home' ? 'Play Group' : gradeName, limit: 100 })
                console.log("activationCodesResponse", activationCodesResponse.data);
                const formattedActivationCodes = activationCodesResponse.data.map((activationCodeData: any) => {
                    return {
                        id: activationCodeData.id,
                        grade: activationCodeData.category,
                        code: activationCodeData.code,
                    };
                });
                setActivationCodesList(formattedActivationCodes);
            } catch (error) {
                setError('Failed to fetch activation codes');
                console.error('Error fetching activation codes:', error);
            } finally {
                setLoading(false);
            }
        }
        if (selectedGrade) {
            fetchActivationCodes();
        }
    }, [selectedGrade]);

    if (loading) {
        return <div className="p-8 text-center">Loading data...</div>;
    }
    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }
    return (
        <DashboardLayout>
            <div className="space-y-8 relative">
                <AnimatedCharacters variant="space" density="low" />

                <div className="mb-6 relative">
                    <h1 className="text-4xl font-bubbly font-bold text-primary flex items-center">
                        <UsersIcon className="mr-3 h-8 w-8" />
                        Activation Codes
                    </h1>
                    <p className="text-lg text-muted-foreground font-round mt-2">
                        Manage all activation codes in the BookWorm Academy platform
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="relative w-full max-w-md">
                        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Select Grade" />
                            </SelectTrigger>
                            <SelectContent>
                                {gradesList.map((grade) => (
                                    <SelectItem key={grade.id} value={grade.id}>{grade.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>

                    <div className="flex items-center gap-3">

                    </div>
                </div>

                <Card className="border-4 border-primary/30 rounded-3xl shadow-lg overflow-hidden">
                    <CardHeader className="bg-primary/10">
                        <CardTitle className="text-xl font-bubbly">All Activation Codes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-muted">
                                        <th className="px-4 py-3 text-left font-bubbly text-primary">Grade</th>
                                        <th className="px-4 py-3 text-left font-bubbly text-primary">Activation Code</th>
                                        <th className="px-4 py-3 text-center font-bubbly text-primary">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activationCodesList.map(activationCode => (
                                        <tr key={activationCode.id} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-medium">{activationCode.grade}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">{activationCode.code}</td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center space-x-2">

                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lms-pink" onClick={() => handleDelete(user.id)}>
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


            </div>
        </DashboardLayout>
    );
};

export default ActivationCodes;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, BookImage, FileDown, ExternalLink, Printer } from 'lucide-react';

export interface LearningResource {
  id: string;
  title: string;
  type: 'worksheet' | 'reading' | 'activity' | 'printable';
  description: string;
  url: string;
}

interface LearningMaterialsProps {
  resources: LearningResource[];
  subjectColor: string;
}

const LearningMaterials = ({ resources, subjectColor }: LearningMaterialsProps) => {
  const worksheets = resources.filter(r => r.type === 'worksheet');
  const readings = resources.filter(r => r.type === 'reading');
  const activities = resources.filter(r => r.type === 'activity');
  const printables = resources.filter(r => r.type === 'printable');

  const getIconForType = (type: string) => {
    switch (type) {
      case 'worksheet':
        return <FileText className="h-5 w-5" />;
      case 'reading':
        return <BookOpen className="h-5 w-5" />;
      case 'activity':
        return <BookImage className="h-5 w-5" />;
      case 'printable':
        return <Printer className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const ResourceList = ({ items }: { items: LearningResource[] }) => {
    if (items.length === 0) {
      return <p className="text-muted-foreground text-center py-8">No resources available</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((resource) => (
          <Card key={resource.id} className="border-2 border-dashed hover:border-solid transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`mt-1 p-2 rounded-full ${subjectColor} bg-opacity-20`}>
                  {getIconForType(resource.type)}
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium font-round">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="rounded-xl" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.type === 'printable' || resource.type === 'worksheet' ? (
                          <>
                            <FileDown className="mr-1 h-4 w-4" />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Open
                          </>
                        )}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-4 border-dashed rounded-3xl">
      <CardHeader className={`${subjectColor} bg-opacity-20`}>
        <CardTitle className="text-xl font-bubbly flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Learning Materials
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
            <TabsTrigger value="worksheets" className="text-sm">Worksheets</TabsTrigger>
            <TabsTrigger value="readings" className="text-sm">Readings</TabsTrigger>
            <TabsTrigger value="activities" className="text-sm">Activities</TabsTrigger>
            <TabsTrigger value="printables" className="text-sm">Printables</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ResourceList items={resources} />
          </TabsContent>
          
          <TabsContent value="worksheets">
            <ResourceList items={worksheets} />
          </TabsContent>
          
          <TabsContent value="readings">
            <ResourceList items={readings} />
          </TabsContent>
          
          <TabsContent value="activities">
            <ResourceList items={activities} />
          </TabsContent>
          
          <TabsContent value="printables">
            <ResourceList items={printables} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningMaterials;

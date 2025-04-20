import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Link, Trash } from "lucide-react";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContentModal = ({ isOpen, onClose }: AddContentModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
    topic: "",
    videoId: "",
    materialId: null as File | null,
  });
  const [gradesList, setGradesList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");

  useEffect(() => {
    const fetchGrades = async () => {
      const response = await axios.get("http://localhost:3000/api/grades");
      setGradesList(response.data);
    };
    fetchGrades();
  }, []);

  useEffect(() => {
    if (formData.grade) {
      const fetchSubjects = async () => {
        const response = await axios.get("http://localhost:3000/api/subjects");
        const filteredSubjects = response.data.filter(subject => subject.gradeId === formData.grade);
        setSubjectsList(filteredSubjects);
      };
      fetchSubjects();
    }
  }, [formData.grade]);

  useEffect(() => {
    console.log(topicsList);
    if (formData.subject) {
      const fetchTopics = async () => {
        const response = await axios.get("http://localhost:3000/api/topics");
        const filteredTopics = response.data.filter(topic => topic.subjectId === formData.subject);
        setTopicsList(filteredTopics);
      };
      fetchTopics();
    }
  }, [formData.subject]);

  useEffect(() => {
    if (formData.topic) {
      const fetchContents = async () => {
        const response = await axios.get("http://localhost:3000/api/contents");
        const filteredContents = response.data.filter(content => content.topicId === formData.topic);
        setVideosList(filteredContents);
      };
      fetchContents();

      const fetchMaterials = async () => {
        const response = await axios.get("http://localhost:3000/api/teaching-guides");
        const filteredMaterials = response.data.filter(material => material.topicId === formData.topic);
        setMaterialsList(filteredMaterials);
      };
      fetchMaterials();
    }
  }, [formData.topic]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVideo = async () => {
    if (!newVideoUrl) return;
    try {
      const newVideo = {
        topicId: formData.topic,
        title: `Video ${videosList.length + 1}`,
        videoUrl: YouTubeEmbed({url: newVideoUrl}),
      };

      await axios.post("http://localhost:3000/api/contents", newVideo);
      setVideosList((prev) => [...prev, newVideo]);
      setNewVideoUrl("");
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Failed to add video." });
    }
  };


  type YouTubeEmbedProps = {
    url: string;
  };
  
  const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
    const extractVideoId = (youtubeUrl: string): string | null => {
      const urlObj = new URL(youtubeUrl);
      return urlObj.searchParams.get("v");
    };
  
    const videoId = extractVideoId(url);
  
    if (!videoId) return url;
  
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  
    return embedUrl;
  };

  const handleFileUpload = async (file: File) => {
    const fileFormData = new FormData();
    fileFormData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:3000/api/teaching-guides/upload', fileFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      toast({ title: 'Error', description: 'Failed to upload file.' });
      return null;
    }
  };

  const handleAddMaterial = async () => {
    const materialFile = formData.materialId;
    if (!(materialFile instanceof File)) return;
    try {
      const uploadedMaterial = await handleFileUpload(materialFile);
      if (!uploadedMaterial) return;

      const newMaterial = {
        topicId: formData.topic,
        pdfUrl: uploadedMaterial.file.path.replace(/^uploads\\/, ''),
      };

      await axios.post('http://localhost:3000/api/teaching-guides', newMaterial);
      setMaterialsList((prev) => [...prev, newMaterial]);
      handleChange('materialId', null);
    } catch (error) {
      console.log(error);
      toast({ title: 'Error', description: 'Failed to add material.' });
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/contents/${videoId}`);
      setVideosList((prev) => prev.filter((video) => video.id !== videoId));
      toast({ title: "Success", description: "Video deleted successfully." });
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Failed to delete video." });
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      await axios.delete(`http://localhost:3000/api/teaching-guides/${materialId}`);
      setMaterialsList((prev) => prev.filter((material) => material.id !== materialId));
      toast({ title: "Success", description: "Material deleted successfully." });
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Failed to delete material." });
    }
  };

  const resetFormData = () => {
    setFormData({
      grade: "",
      subject: "",
      topic: "",
      videoId: "",
      materialId: null,
    });
    setNewVideoUrl("");
    setSubjectsList([]);
    setTopicsList([]);
    setVideosList([]);
    setMaterialsList([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); resetFormData(); } }}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-4 border-dashed">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bubbly text-center">
            Add Content
          </DialogTitle>
          <DialogDescription className="text-center">
            Select grade, subject, and topic to add content.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="grade" className="font-round">
              Grade
            </Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => handleChange("grade", value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {gradesList.map((g) => (
                  <SelectItem key={g.id} value={g.id} className="font-round">
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="font-round">
              Subject
            </Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleChange("subject", value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {subjectsList.map((s) => (
                  <SelectItem key={s.id} value={s.id} className="font-round">
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic" className="font-round">
              Topic
            </Label>
            <Select
              value={formData.topic}
              onValueChange={(value) => handleChange("topic", value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {topicsList.map((t) => (
                  <SelectItem key={t.id} value={t.id} className="font-round">
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.grade && formData.subject && formData.topic && (
            <div className="space-y-2">
              <Label htmlFor="video" className="font-round">
                Videos
              </Label>
              <ul className="">
                {videosList.map((v) => (
                  <li key={v.id} className="flex flex-row justify-between items-center py-2">
                    <div className="flex flex-row items-center">
                    <Link className="pr-2" scale={0.3}/>
                    <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {v.title}
                    </a></div>
                    <Trash className="mr-2" scale={0.3} onClick={() => handleDeleteVideo(v.id)} />
                  </li>
                ))}
                <li className="flex justify-between items-center">
                  <Input
                    type="text"
                    placeholder="Enter video URL"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="mr-2"
                  />
                  <Button type="button" className="ml-2" onClick={handleAddVideo}>
                    <span className="icon">+</span>
                  </Button>
                </li>
              </ul>
            </div>
          )}

          {formData.grade && formData.subject && formData.topic && (
            <div className="space-y-2">
              <Label htmlFor="material" className="font-round">
                Materials
              </Label>
              <ul className="">
                {materialsList.map((m) => (
                  <li key={m.id} className="flex justify-between items-center">
                    {m.pdfUrl}
                    <Trash className="mr-2" scale={0.3} onClick={() => handleDeleteMaterial(m.id)} />
                  </li>
                ))}
                <li className="flex justify-between items-center">
                  <Input
                    type="file"
                    onChange={(e) => handleChange('materialId', e.target.files[0])}
                    className="mr-2"
                  />
                  
                  <Button type="button" className="ml-2" onClick={handleAddMaterial}>
                    <span className="icon">+</span>
                  </Button>
                </li>
              </ul>
            </div>
          )}

          
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentModal; 
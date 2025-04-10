
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PhishingReportForm = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report submitted",
        description: "Your phishing report has been submitted for analysis.",
      });
      
      // Reset form
      setSenderEmail('');
      setSubject('');
      setDescription('');
      setFile(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Suspicious Email</CardTitle>
        <CardDescription>
          Submit details about a suspicious email you've received
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senderEmail">Sender's Email</Label>
            <Input
              id="senderEmail"
              placeholder="e.g. suspicious@example.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Urgent: Verify your account"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe why you think this email is suspicious..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="screenshot">Attach Screenshot (optional)</Label>
            <div className="flex items-center">
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Label
                htmlFor="screenshot"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md border-gray-300 hover:border-primary cursor-pointer"
              >
                {file ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="h-6 w-6 mb-1" />
                    <span className="text-sm">Upload Screenshot</span>
                  </div>
                )}
              </Label>
            </div>
          </div>
          
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            <SendHorizontal className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 justify-center">
        Your reports help improve our phishing detection systems
      </CardFooter>
    </Card>
  );
};

export default PhishingReportForm;

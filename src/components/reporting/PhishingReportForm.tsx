
import { useState } from 'react';
import { Cloud, File, Info, Shield, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const PhishingReportForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [suspiciousLink, setSuspiciousLink] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: In a real implementation, add API call to submit the report
      // - Send form data to backend for analysis
      // - Integrate with Google Safe Browsing API or VirusTotal to scan URLs
      // - API keys should be stored securely in env variables on the server
      
      toast({
        title: "Report Submitted",
        description: "Thank you for helping to keep our community safe!",
        variant: "success"
      });
      
      // Clear form
      setFiles([]);
      setSuspiciousLink('');
      setSenderEmail('');
      setDescription('');
    } catch (error) {
      console.error('Report submission error:', error);
      toast({
        title: "Submission Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary-600" />
          Report Suspicious Activity
        </CardTitle>
        <CardDescription>
          Help protect your organization by reporting phishing attempts and security threats
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Suspicious link input */}
          <div className="space-y-2">
            <Label htmlFor="suspicious-link">Suspicious URL (optional)</Label>
            <Input 
              id="suspicious-link" 
              placeholder="https://suspicious-website.com" 
              value={suspiciousLink}
              onChange={(e) => setSuspiciousLink(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              URLs will be scanned using Google Safe Browsing API for security threats
            </p>
          </div>
          
          {/* Sender email input */}
          <div className="space-y-2">
            <Label htmlFor="sender-email">Sender's Email Address (optional)</Label>
            <Input 
              id="sender-email" 
              type="email" 
              placeholder="suspicious@example.com" 
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </div>
          
          {/* Description textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Describe the Suspicious Activity</Label>
            <Textarea 
              id="description" 
              placeholder="What made you suspicious? Provide any relevant details..."
              rows={4}
              className="resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          {/* File upload */}
          <div className="space-y-2">
            <Label>Attach Screenshot or Email (optional)</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF, EML (max 10MB)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf,.eml"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
            </div>
            
            {/* File list */}
            {files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Uploaded Files</p>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                    >
                      <div className="flex items-center">
                        <File className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Info box */}
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200 flex">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p>All reports are kept confidential and will be reviewed by our security team.</p>
              <p className="mt-1">Thank you for helping to maintain our security posture!</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || (description.trim() === '' && !files.length && !suspiciousLink && !senderEmail)}
          >
            {isSubmitting ? (
              <>
                <Cloud className="mr-2 h-4 w-4 animate-spin" />
                Submitting Report...
              </>
            ) : 'Submit Report'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PhishingReportForm;

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';

export function FloatingFeedback() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to API
    alert('Feedback submitted! (Mock)');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 h-12 w-12 p-0"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            Help us improve KN BioStore. Send us your suggestions or report issues.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea id="message" className="col-span-3" required />
          </div>
          <DialogFooter>
            <Button type="submit">Submit Feedback</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

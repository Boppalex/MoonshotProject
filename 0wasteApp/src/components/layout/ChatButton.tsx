
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ChatButton: React.FC = () => {
  const { isChatOpen, setIsChatOpen } = useApp();

  return (
    <Button
      onClick={() => setIsChatOpen(!isChatOpen)}
      className={cn(
        "fixed bottom-20 right-0 rounded-full shadow-lg z-20",
        isChatOpen ? "bg-gray-500" : "bg-primary"
      )}
      size="icon"
    >
      {isChatOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <MessageCircle className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ChatButton;

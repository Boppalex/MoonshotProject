import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchRecipesByIngredients } from '@/services/api';
import { cn } from '@/lib/utils';

const ChatPanel: React.FC = () => {
  const {
    isChatOpen,
    chatMessages,
    addChatMessage,
    setActiveTab,
  } = useApp();
  const { t } = useLocale();

  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-greeting if empty
  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage(t('chat.greeting'), false);
    }
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    const container = chatRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages]);

  // Handle sending message
  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    addChatMessage(trimmed, true);
    setMessage('');

    const input = trimmed.toLowerCase();
    await new Promise(res => setTimeout(res, 100));

    try {
      if (['recipe', 'cook', 'have'].some(word => input.includes(word))) {
        await handleRecipeSearch(input);
      } else if (input.includes('pantry')) {
        addChatMessage(`You can manage your pantry items in the Pantry tab.`, false);
        setActiveTab('pantry');
      } else if (input.includes('cart') || input.includes('shopping')) {
        addChatMessage(`Your shopping list is in the Cart tab.`, false);
        setActiveTab('cart');
      } else {
        await handleRecipeSearch(input);
      }
    } catch (err) {
      console.error('Chat error:', err);
      addChatMessage(`Oops, something went wrong. Please try again.`, false);
    }
  };

  const handleRecipeSearch = async (input: string) => {
    addChatMessage(t('common.loading'), false);
    const results = await searchRecipesByIngredients([input]);

    if (results.length > 0) {
      const titles = results.slice(0, 3).map(r => r.title).join(', ');
      addChatMessage(`Here are some recipes: ${titles}. Check the recipes tab!`, false);
      setActiveTab('recipes');
    } else {
      addChatMessage(`No recipes found for "${input}". Try another ingredient.`, false);
    }
  };

  // Handle key press (Shift+Enter = newline, Enter = send)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {isChatOpen && (
        <div className="fixed inset-0 z-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 pointer-events-none" />
      )}

      <div
        className={cn(
          "fixed bottom-16 left-8 w-5/6 max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10 flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800",
          isChatOpen ? "h-96 opacity-100" : "h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 bg-primary text-white dark:bg-gray-800 font-medium">
          0waste Assistant
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
        >
          {chatMessages.map((chat, idx) => (
            <div
              key={chat.id || idx}
              className={cn("flex", chat.isUser ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                  chat.isUser
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                )}
              >
                {chat.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex">
          <Input
            type="text"
            placeholder={t('chat.placeholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-2"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;

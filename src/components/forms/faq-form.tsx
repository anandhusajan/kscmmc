"use client";

import React, { useState, useTransition } from 'react';
import { answerUserQuery } from '@/ai/flows/answer-user-queries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export function FaqForm() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(async () => {
      setAnswer('');
      try {
        const result = await answerUserQuery({ query });
        setAnswer(result.answer);
      } catch (error) {
        console.error("AI query failed:", error);
        setAnswer('Sorry, I encountered an error while trying to answer your question. Please try again later.');
      }
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about KSCMMC..."
          className="flex-grow"
          disabled={isPending}
        />
        <Button type="submit" disabled={!query.trim() || isPending}>
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2 h-4 w-4" />
          )}
          Ask
        </Button>
      </form>

      {(isPending || answer) && (
        <Card>
          <CardContent className="p-6">
            {isPending ? (
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating answer...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center font-semibold">
                  <FontAwesomeIcon icon={faLightbulb} className="mr-3 h-5 w-5 text-accent" />
                  Answer
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap">
                    {answer}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import AddLayout from "@/components/AddLayout";
import Button from "@/components/Button";
import clsx from "clsx";
import React, { useState } from "react";

const MAX_QUESTION_LENGHT = 1200;

interface Discussion {
  question: string;
}

const AddPoll = () => {
  const [question, setQuestion] = useState("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      question,
    });
  };

  const suggestedDiscussions = [
    {
      question: "What users think about daily meditation?",
    },
    {
      question: "The best way to decompress after work?",
    },
    {
      question:
        "How disappointed would you be if you couldn’t use PublicHQ anymore?",
    },
  ];

  const sidebarSuggestionAction = (suggestion: Discussion) => {
    setQuestion(suggestion.question);
  };
  return (
    <AddLayout
      title="Add Discussion"
      subTitle="Consider starting a discussion on"
      sidebarSuggestions={suggestedDiscussions}
      sidebarSuggestionAction={sidebarSuggestionAction}
    >
      <form
        className="lg:max-w-3xl w-full p-4 rounded-3xl space-y-4 bg-white transition duration-300 focus-within:ring-4 focus-within:ring-green/50"
        onSubmit={(e) => onFormSubmit(e)}
      >
        {/* question */}
        <div className="border-b-2 border-gray/50 focus-within:!border-gray transition-all duration-300 ">
          <textarea
            required
            rows={5}
            maxLength={1200}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What topic of discussion do you want to suggest?"
            className="w-full pl-0 bg-white border-none text-BodyLarge focus:ring-0"
          />
        </div>
        <div className="flex justify-between items-center">
          <p
            className={clsx(
              "text-BodyLarge",
              question.length === MAX_QUESTION_LENGHT
                ? "text-red-500 font-semibold"
                : ""
            )}
          >
            {question.length}/1200 chars
          </p>
          <Button className="!bg-green">Post</Button>
        </div>
      </form>
    </AddLayout>
  );
};

export default AddPoll;

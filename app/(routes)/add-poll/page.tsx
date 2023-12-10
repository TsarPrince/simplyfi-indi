"use client";

import AddLayout from "@/components/AddLayout";
import Button from "@/components/Button";
import React, { useState } from "react";

const MAX_OPTIONS = 12;
const MIN_OPTIONS = 2;

interface Poll {
  question: string;
  options: {
    order: number;
    option: string;
  }[];
}

const AddPoll = () => {
  const [question, setQuestion] = useState(
    "What users think about daily meditation?"
  );
  const [options, setOptions] = useState([
    { order: 1, option: "" },
    { order: 2, option: "" },
  ]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      question,
      options: options.filter((option) => option.option),
    });
  };

  const onOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    // update options state variable
    const newOptions = options.map((option) => {
      return option.order == key + 1
        ? {
            order: key + 1,
            option: e.target.value,
          }
        : option;
    });

    // add new option if last option is filled
    if (key + 1 == options.length) {
      const numOfOptions = options.length;
      if (numOfOptions < MAX_OPTIONS) {
        newOptions.push({ order: numOfOptions + 1, option: "" });
      }
    }
    setOptions(newOptions);
  };

  // remove option if input is empty on blur
  // and there are atleast 2 options (MIN_OPTIONS = 2)
  // and it is not the last option (to add)
  const onOptionsBlur = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    key: number
  ) => {
    if (
      e.target.value === "" &&
      options.length > 2 &&
      key + 1 !== options.length
    ) {
      const newOptions = options.slice(0, key);
      for (let i = key; i < options.length - 1; i++) {
        newOptions.push({
          order: i + 1,
          option: options[i + 1].option,
        });
      }
      setOptions(newOptions);
    }
  };

  const suggestedPolls = [
    {
      question: "What users think about daily meditation?",
      options: [
        { order: 1, option: "Helps with stress" },
        { order: 2, option: "Improves focus" },
        { order: 3, option: "No noticeable effect" },
        { order: 4, option: "Prefer other relaxation methods" },
        { order: 5, option: "" },
      ],
    },
    {
      question: "The best way to decompress after work?",
      options: [
        { order: 1, option: "Physical exercise" },
        { order: 2, option: "Watching TV/movies" },
        { order: 3, option: "Reading" },
        { order: 4, option: "Socializing" },
        { order: 5, option: "" },
      ],
    },
    {
      question:
        "How disappointed would you be if you couldn’t use PublicHQ anymore?",
      options: [
        { order: 1, option: "It's a daily necessity" },
        { order: 2, option: "Slightly inconvenienced" },
        { order: 3, option: "Would find an alternative immediately" },
        { order: 4, option: "Barely affected" },
        { order: 5, option: "" },
      ],
    },
  ];

  const sidebarSuggestionAction = (suggestion: Poll) => {
    setQuestion(suggestion.question);
    setOptions(suggestion.options);
  };
  return (
    <AddLayout
      title="Add Poll"
      subTitle="Consider running a Poll on"
      sidebarSuggestions={suggestedPolls}
      sidebarSuggestionAction={sidebarSuggestionAction}
    >
      <form
        className="lg:max-w-3xl space-y-8 w-full"
        onSubmit={(e) => onFormSubmit(e)}
      >
        {/* question */}
        <div className="border-b-2 border-transparent hover:border-gray/50 focus-within:!border-gray transition-all duration-300">
          <input
            required
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask Question"
            className="w-full bg-lightGray border-none text-TitleMedium focus:ring-0 p-0"
          />
        </div>
        {/* options */}
        <div className="space-y-4 pt-8">
          {options.map((option, key) => (
            <div
              key={key}
              className="flex border-b-2 border-gray/50 focus-within:border-gray transition-all duration-300"
            >
              <p className="text-TitleMedium pr-4">{option.order}.</p>
              <input
                required={key < MIN_OPTIONS}
                type="text"
                className="bg-lightGray border-none w-full text-TitleSmall2 placeholder:opacity-30 focus:ring-0"
                placeholder="+ Add"
                value={option.option}
                onChange={(e) => onOptionsChange(e, key)}
                onBlur={(e) => onOptionsBlur(e, key)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row-reverse">
          <Button className="!bg-green">Publish</Button>
        </div>
      </form>
    </AddLayout>
  );
};

export default AddPoll;

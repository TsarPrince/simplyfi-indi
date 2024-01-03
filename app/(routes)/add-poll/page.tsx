"use client";

import AddLayout from "@/components/AddLayout";
import Button from "@/components/Button";
import { createPoll, createOptions } from "@/queries/poll";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { ToastContentProps, toast } from "react-toastify";
import getUser from "@/utils/getUser";
import { usePathname } from "next/navigation";
import suggestedPolls from "@/constants/suggestedPolls.json";

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
  const pathname = usePathname();

  let poll: Poll = {
    question: "",
    options: [
      { order: 1, option: "" },
      { order: 2, option: "" },
    ],
  };

  // populate content from localstorage
  useEffect(() => {
    const pollCache = localStorage.getItem("poll");
    if (pollCache) {
      const poll = JSON.parse(pollCache);
      setQuestion(poll.question);
      setOptions(poll.options);
    }
  }, []);

  const [question, setQuestion] = useState(poll.question);
  const [options, setOptions] = useState(poll.options);

  // multiple event handlers ahead
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createPollAssignOptions = async () => {
      const user = await getUser(pathname);

      // create poll first
      const { data: poll, error: pollError } = await createPoll({
        title: question,
        user_id: user.id,
      });
      if (pollError) throw pollError;
      if (poll) {
        // assign options to poll
        const { data, error } = await createOptions(
          options
            // remove empty options from state variable
            .filter((option) => option.option !== "")
            .map((option) => ({
              poll_id: poll[0].id,
              title: option.option,
              order: option.order,
            }))
        );
        if (error) throw error;
        setQuestion("");
        setOptions([
          { order: 1, option: "" },
          { order: 2, option: "" },
        ]);
        localStorage.removeItem("poll");
      }
      mutate("getAllPolls");
    };

    toast.promise(createPollAssignOptions, {
      pending: "Creating Poll",
      success: "Your poll is live!",
      error: {
        render({ data }: ToastContentProps<any>) {
          return data.message;
        },
      },
    });
  };

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    localStorage.setItem(
      "poll",
      JSON.stringify({ question: e.target.value, options })
    );
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
    localStorage.setItem(
      "poll",
      JSON.stringify({ question, options: newOptions })
    );
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
      localStorage.setItem(
        "poll",
        JSON.stringify({ question, options: newOptions })
      );
    }
  };

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
            onChange={(e) => onQuestionChange(e)}
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

"use client";

import AddLayout from "@/components/AddLayout";
import Button from "@/components/Button";
import { createMetric } from "@/queries/metric";
import { Database, Enums } from "@/types/database.types";
import convertNumber from "@/utils/convertNumber";
import formatNumber from "@/utils/formatNumber";
import clsx from "clsx";
import React, { useState } from "react";
import { ToastContentProps, toast } from "react-toastify";
import { mutate } from "swr";
import suggestedMetrics from "@/constants/suggestedMetrics.json";
import getUser from "@/utils/getUser";
import { usePathname } from "next/navigation";

interface Metric {
  question: string;
  symbol: "PERCENTAGE" | "DOLLAR" | null;
  value: number;
  description: string;
  created_at: string;
  user_id: string | null;
}
type MetricSymbol = Enums<"symbol"> | null;

const AddMetric = () => {
  const pathname = usePathname();

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(""); // is a number, but string @frontend for formatting
  const [symbol, setSymbol] = useState<MetricSymbol>(null);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const create = async () => {
      const user = await getUser(pathname);
      const { data, error } = await createMetric({
        name: question,
        description,
        value: convertNumber(value),
        symbol: symbol,
        user_id: user.id,
      });
      if (error) throw error;
      mutate("getAllMetrics");
    };

    toast.promise(create, {
      pending: "Adding new Metric",
      success: "Done!",
      error: {
        render({ data }: ToastContentProps<any>) {
          return data.message;
        },
      },
    });
  };

  const sidebarSuggestionAction = (suggestion: Metric) => {
    setQuestion(suggestion.question);
    setDescription(suggestion.description);
    setValue(formatNumber(String(suggestion.value)));
    setSymbol(suggestion.symbol);
  };
  return (
    <AddLayout
      title="Add Metrics"
      subTitle="Consider adding these metrics"
      sidebarSuggestions={suggestedMetrics}
      sidebarSuggestionAction={sidebarSuggestionAction}
    >
      <div className="w-full space-y-[30px]">
        <p className="text-TitleSmall2 opacity-50">Your metrics</p>
        <form
          className="lg:max-w-3xl w-full p-8 rounded-3xl space-y-4 bg-white transition duration-300 focus-within:ring-4 focus-within:ring-green/50"
          onSubmit={(e) => onFormSubmit(e)}
        >
          <div className="space-y-6">
            <div className="flex border-b-2 border-gray/50 focus-within:border-gray transition-all duration-300">
              <input
                required
                type="text"
                className="bg-white pl-0 border-none w-full text-BodyLarge placeholder:opacity-50 focus:ring-0"
                placeholder="Metric Name"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="flex border-b-2 border-gray/50 focus-within:border-gray transition-all duration-300">
              <input
                type="text"
                className="bg-white pl-0 border-none w-full text-BodyLarge placeholder:opacity-50 focus:ring-0"
                placeholder="Why do you care about this metric?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex border-b-2 border-gray/50 focus-within:border-gray transition-all duration-300">
              <input
                type="text"
                className="bg-white pl-0 border-none w-full text-BodyLarge placeholder:opacity-50 focus:ring-0"
                placeholder="Metric Value"
                // remove all non numeric characters
                // add comma to every 3 digits
                value={value}
                onChange={(e) => setValue(formatNumber(e.target.value))}
              />
              <select
                className="border-none"
                value={symbol ?? ""}
                onChange={(e) => setSymbol(e.target.value as MetricSymbol)}
              >
                {[
                  { sign: "", value: null },
                  { sign: "%", value: "PERCENTAGE" },
                  { sign: "$", value: "DOLLAR" },
                ].map((symbol, key) => (
                  <option key={key} value={symbol.value ?? undefined}>
                    {symbol.sign}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            <Button className="!bg-green">Add Metric</Button>
          </div>
        </form>
        <button className="flex items-center space-x-2">
          <p className="text-BodyLarge text-green">Set visibility</p>
          <svg
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9207 6.675C17.0024 2.86438 13.3936 0.5 9.5 0.5C5.60636 0.5 1.99761 2.86438 0.0792829 6.675C0.026991 6.77751 0 6.88815 0 7C0 7.11185 0.026991 7.22249 0.0792829 7.325C1.99761 11.1356 5.60636 13.5 9.5 13.5C13.3936 13.5 17.0024 11.1356 18.9207 7.325C18.973 7.22249 19 7.11185 19 7C19 6.88815 18.973 6.77751 18.9207 6.675ZM9.5 11.875C6.48955 11.875 3.64054 10.0144 1.99761 7C3.64054 3.98563 6.48955 2.125 9.5 2.125C12.5105 2.125 15.3595 3.98563 17.0024 7C15.3595 10.0144 12.5105 11.875 9.5 11.875ZM9.5 3.75C8.74869 3.75 8.01426 3.94061 7.38957 4.29772C6.76488 4.65484 6.27799 5.16242 5.99048 5.75628C5.70297 6.35014 5.62774 7.00361 5.77431 7.63404C5.92089 8.26448 6.28268 8.84358 6.81393 9.2981C7.34518 9.75262 8.02204 10.0622 8.75891 10.1876C9.49579 10.313 10.2596 10.2486 10.9537 10.0026C11.6478 9.75662 12.2411 9.34006 12.6585 8.8056C13.0759 8.27114 13.2987 7.64279 13.2987 7C13.2987 6.13805 12.8985 5.3114 12.1861 4.7019C11.4737 4.09241 10.5075 3.75 9.5 3.75ZM9.5 8.625C9.12435 8.625 8.75713 8.5297 8.44478 8.35114C8.13244 8.17258 7.889 7.91879 7.74524 7.62186C7.60148 7.32493 7.56387 6.9982 7.63716 6.68298C7.71044 6.36776 7.89134 6.07821 8.15697 5.85095C8.42259 5.62369 8.76102 5.46892 9.12946 5.40622C9.49789 5.34352 9.87979 5.3757 10.2268 5.4987C10.5739 5.62169 10.8705 5.82997 11.0792 6.0972C11.2879 6.36443 11.3993 6.67861 11.3993 7C11.3993 7.43098 11.1992 7.8443 10.843 8.14905C10.4868 8.45379 10.0037 8.625 9.5 8.625Z"
              fill="#4EC2C2"
            />
          </svg>
        </button>
      </div>
    </AddLayout>
  );
};

export default AddMetric;

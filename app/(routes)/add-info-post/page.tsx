"use client";

import React, { useRef, useState } from "react";
import Tiptap from "@/components/TipTap";
import AddLayout from "@/components/AddLayout";
import clsx from "clsx";
import Button from "@/components/Button";
import { Content, Editor } from "@tiptap/react";
import NovelEditor from "@/components/global/Editor";

interface InfoPost {
  question: string;
  image: string;
  description: Content;
}

const AddInfoPost = () => {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState<Content>([
    {
      type: "paragraph",
    },
  ]);

  const editorRef = useRef<Editor | null>(null);

  const suggestedPosts = [
    {
      question: "What users think about daily meditation?",
      image:
        "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=512",
      description: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "Daily meditation",
            },
            {
              type: "text",
              text: " has been a topic of interest for many. In this post, we delve into what users actually think about incorporating meditation into their daily routines.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "User Opinions",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Increased Focus and Clarity",
                    },
                  ],
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      attrs: {
                        color: "",
                      },
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "Many users report a significant improvement in their focus and mental clarity since starting daily meditation.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Stress Reduction",
                    },
                  ],
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      attrs: {
                        color: "",
                      },
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "A large number of users have mentioned how meditation helps in reducing stress and anxiety levels.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Improved Sleep Quality",
                    },
                  ],
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      attrs: {
                        color: "",
                      },
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "Several users noted an enhancement in their sleep patterns, attributing it to their meditation practice.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Conclusion",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "In summary, the general consensus among users is positive, highlighting the benefits of daily meditation on mental health and overall well-being.",
            },
          ],
        },
      ],
    },
    {
      question: "The best way to decompress after work?",
      image:
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=512",
      description: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "After a long day at work, finding ways to decompress is crucial. Here are some of the best methods shared by our community members.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Decompression Techniques",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Physical Activity",
                    },
                    {
                      type: "text",
                      text: ": Engaging in physical activities like walking, yoga, or gym sessions.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Mindfulness and Relaxation",
                    },
                    {
                      type: "text",
                      text: ": Practices such as meditation or listening to calming music.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Hobbies",
                    },
                    {
                      type: "text",
                      text: ": Indulging in hobbies like reading, painting, or gardening.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Conclusion",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Finding the right activity that helps you unwind is key to maintaining a healthy work-life balance.",
            },
          ],
        },
      ],
    },
    {
      question:
        "How disappointed would you be if you couldn’t use PublicHQ anymore?",
      image:
        "https://images.unsplash.com/photo-1691497300501-63c76ebd6a2a?q=80&w=512",
      description: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "PublicHQ has become an integral part of many of our lives. But how would you feel if it was no longer available?",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "User Reactions",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Major Disappointment",
                    },
                    {
                      type: "text",
                      text: ': "I would be extremely disappointed. PublicHQ is a part of my daily routine." - ',
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "User A",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Finding Alternatives",
                    },
                    {
                      type: "text",
                      text: ': "It would be inconvenient, but I\'d look for other similar platforms." - ',
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "User B",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              attrs: {
                color: "",
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Indifference",
                    },
                    {
                      type: "text",
                      text: ": \"I don't use it often, so it wouldn't affect me much.\" - ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "User C",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Conclusion",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The responses vary, but it's clear that PublicHQ holds significant value for many of its users.",
            },
          ],
        },
      ],
    },
  ];
  const sidebarSuggestionAction = (suggestion: InfoPost) => {
    setQuestion(suggestion.question);
    setImage(suggestion.image);
    setDescription(suggestion.description);

    if (editorRef.current) {
      editorRef.current.commands.setContent(suggestion.description);
    }
  };

  const fileInput = useRef<HTMLInputElement>(null);
  const showPreview = () => {
    if (fileInput.current) {
      const file = fileInput.current;

      if (file.files?.[0]) {
        // convert to base64 string for preview
        const reader = new FileReader();
        reader.onload = function (e) {
          setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file.files[0]);
      }
    }
  };

  return (
    <AddLayout
      title="Add Info Post"
      subTitle="New Post Suggestions"
      sidebarSuggestions={suggestedPosts}
      sidebarSuggestionAction={sidebarSuggestionAction}
      center={false}
    >
      <div className="space-y-8">
        <div className="flex flex-row-reverse border-b border-gray/50 py-2 lg:-ml-12">
          <Button className="!bg-green">Post</Button>
        </div>
        <div>
          <input
            type="file"
            id="image"
            className="hidden"
            ref={fileInput}
            onInput={showPreview}
          />
          <label htmlFor="image" className="cursor-pointer">
            <div
              className={clsx(
                "flex justify-center w-full rounded-3xl overflow-hidden bg-white",
                !!image ? "" : "hidden"
              )}
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <img
                src={image}
                alt="Info Post Cover Image"
                className="h-[16rem] w-full object-contain backdrop-blur-[128px]"
              />
            </div>

            <div
              className={clsx(
                "text-BodyLarge opacity-50 flex space-x-4",
                !!image ? "hidden" : ""
              )}
            >
              <svg
                width="28"
                height="23"
                viewBox="0 0 28 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.8 0H4.2C3.08609 0 2.0178 0.454352 1.23015 1.2631C0.442499 2.07185 0 3.16875 0 4.3125V18.6875C0 19.8312 0.442499 20.9281 1.23015 21.7369C2.0178 22.5456 3.08609 23 4.2 23H23.8C24.9139 23 25.9822 22.5456 26.7698 21.7369C27.5575 20.9281 28 19.8312 28 18.6875V4.3125C28 3.16875 27.5575 2.07185 26.7698 1.2631C25.9822 0.454352 24.9139 0 23.8 0ZM4.2 20.125C3.8287 20.125 3.4726 19.9736 3.21005 19.704C2.9475 19.4344 2.8 19.0687 2.8 18.6875V15.2087L7.42 10.4794C7.6817 10.216 8.03355 10.0685 8.4 10.0685C8.76645 10.0685 9.1183 10.216 9.38 10.4794L18.774 20.125H4.2ZM25.2 18.6875C25.2 19.0687 25.0525 19.4344 24.7899 19.704C24.5274 19.9736 24.1713 20.125 23.8 20.125H22.722L17.388 14.6194L18.62 13.3544C18.8817 13.091 19.2335 12.9435 19.6 12.9435C19.9665 12.9435 20.3183 13.091 20.58 13.3544L25.2 18.0837V18.6875ZM25.2 14.03L22.568 11.3419C21.7701 10.5547 20.7065 10.1152 19.6 10.1152C18.4935 10.1152 17.4299 10.5547 16.632 11.3419L15.4 12.6069L11.368 8.46688C10.5701 7.67975 9.5065 7.24015 8.4 7.24015C7.2935 7.24015 6.22992 7.67975 5.432 8.46688L2.8 11.155V4.3125C2.8 3.93125 2.9475 3.56562 3.21005 3.29603C3.4726 3.02645 3.8287 2.875 4.2 2.875H23.8C24.1713 2.875 24.5274 3.02645 24.7899 3.29603C25.0525 3.56562 25.2 3.93125 25.2 4.3125V14.03Z"
                  fill="#273648"
                />
              </svg>
              <span>Add a cover Image...</span>
            </div>
          </label>
        </div>
        <div className="border-b-2 border-transparent hover:border-gray/50 focus-within:!border-gray transition-all duration-300">
          <input
            required
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="New post title here..."
            className="w-full bg-lightGray border-none text-TitleMedium focus:ring-0 p-0"
          />
        </div>
        <NovelEditor />
        {/* <Tiptap editorRef={editorRef} /> */}
      </div>
    </AddLayout>
  );
};

export default AddInfoPost;

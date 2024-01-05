import { Information } from "@/types";
import React from "react";
import { resolveImageURL } from "@/utils/resolveImageURL";

const InformationCard = ({ information }: { information?: Information }) => {
  if (!information) return null;

  return (
    <div className="bg-white p-4 rounded-3xl flex flex-col space-y-3 mt-4">
      {information.image && (
        <img
          src={resolveImageURL(information.image)}
          alt="dummy"
          className="h-44 object-cover rounded-3xl"
        />
      )}
      <p className="text-BodyMedium2 opacity-40">
        {new Date(information.created_at).toLocaleString()}
      </p>
      <p className="text-TitleSmall2">{information.title}</p>
    </div>
  );
};

export default InformationCard;

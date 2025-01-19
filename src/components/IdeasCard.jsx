import React from "react";

const IdeasCard = ({ idea, formatDate }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {idea.medium_image?.[0]?.path && (
          <img
            src={idea.medium_image[0].path}
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-3 hover:line-clamp-none min-h-[4.5rem]">
          {idea.title}
        </h2>
        <p className="text-gray-600 text-sm">{formatDate(idea.published_at)}</p>
      </div>
    </div>
  );
};

export default IdeasCard;

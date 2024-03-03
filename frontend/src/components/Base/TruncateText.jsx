import React, { useState } from "react";

const TruncateText = ({ text, maxWords }) => {
  const words = text.split(" ");

  const truncatedText = words.slice(0, maxWords).join(" ");

  const isTruncated = words.length > maxWords;

  const [isExpanded, setExpanded] = useState(false);

  return (
    <div>
      <span>{isExpanded ? text : truncatedText}</span>
      {isTruncated && (
        <button className="text-blue-500 ml-2" onClick={() => setExpanded(!isExpanded)}>
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default TruncateText;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogInputCard = ({ onGenerate, isLoading = false }) => {
  const [topic, setTopic] = useState("");

  const handleGenerateContent = () => {
    onGenerate(topic);
    // setTopic("");
  };

  return (
    <div className="w-full mx-auto p-6 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Chủ đề Blog
      </h2>

      {/* Input Section */}
      <div className="mb-4 flex gap-4 items-end">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Nhập chủ đề blog của bạn (vd: Lợi ích của thiền định)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleGenerateContent();
              }
            }}
          />
        </div>
        <Button
          onClick={handleGenerateContent}
          disabled={isLoading}
          className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang tạo..." : "Tạo Nội Dung"}
        </Button>
      </div>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400">
        AI sẽ tạo ra nội dung blog dựa trên chủ đề bạn nhập
      </p>
    </div>
  );
};

export default BlogInputCard;

import React, { useState } from "react";
import BlogInputCard from "@/components/BlogInputCard";
import PreviewCard from "@/components/PreviewCard";
import { askGemini } from "@/services/gemini.service";

const Editor = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateContent = async (topic) => {
    if (!topic.trim()) {
      setError("Vui lòng nhập chủ đề blog");
      return;
    }

    setIsLoading(true);
    setError(null);
    setContent("");

    try {
      const prompt = `Hãy viết một bài blog chi tiết về chủ đề: "${topic}". 
      Bài viết nên bao gồm:
      - Giới thiệu
      - Nội dung chính (3-5 điểm chính)
      - Kết luận
      
      Viết bằng tiếng Việt, chi tiết và hấp dẫn.
      
      Định dạng bài viết chuẩn SEO, bao gồm:
      - Thêm tiêu đề h1, h2, h3
      `;

      const result = await askGemini(prompt);
      setContent(result);
      setError(null);
      localStorage.setItem(
        "history",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("history") || "[]"),
          { id: Date.now(), topic, content: result },
        ]),
      );
      console.log("🚀 ~ handleGenerateContent ~ content:", content);
    } catch (err) {
      setError("Lỗi khi tạo nội dung. Vui lòng thử lại.");
      console.error("Gemini API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 container mx-auto px-4 py-12">
      <BlogInputCard onGenerate={handleGenerateContent} isLoading={isLoading} />
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      <PreviewCard content={content} isLoading={isLoading} />
    </div>
  );
};

export default Editor;

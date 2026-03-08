import React from "react";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

const PreviewCard = ({ content = null, isLoading = false,  }) => {
  const handleCopy = async () => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      toast.success("Blog content copied to clipboard!");
    } catch (err) {
      toast.error("Không thể sao chép!");
    }
  };

  const handleDownload = () => {
    if (!content) return;

    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "blog-content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Blog content downloaded!");
  };

  return (
    <div className="w-full border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header with Title and Buttons */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Xem trước & Xuất
        </h2>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!content}
            className="gap-2 cursor-pointer"
          >
            <Copy className="w-4 h-4 " />
            Sao chép
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!content}
            className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 " />
            Tải xuống
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 min-h-80 flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin">
              <div className="w-8 h-8 border-4 border-slate-300 dark:border-slate-600 border-t-slate-900 dark:border-t-white rounded-full"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Đang tạo nội dung...
            </p>
          </div>
        ) : content ? (
          <div className="w-full prose dark:prose-invert max-w-none">
            <div className="text-slate-900 dark:text-white whitespace-pre-wrap">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-400 dark:text-slate-500 text-lg">
            Chưa có nội dung để hiển thị.
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;

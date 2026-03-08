import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Trash2, Eye, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState(
    JSON.parse(localStorage.getItem("history")) || [],
  );
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sync to localStorage whenever historyItems changes
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(historyItems));
  }, [historyItems]);

  const handleDelete = (id) => {
    setHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Blog đã được xóa!");
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setIsDialogOpen(true);
  };

  const handleCopy = async () => {
    if (!selectedBlog?.content) return;

    try {
      await navigator.clipboard.writeText(selectedBlog.content);
      toast.success("Blog content copied to clipboard!");
    } catch (err) {
      toast.error("Không thể sao chép!");
    }
  };

  const handleDownload = () => {
    if (!selectedBlog?.content) return;

    const element = document.createElement("a");
    const file = new Blob([selectedBlog.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    //topic name => thùy linh.txt == thuy-linh.txt
    const topicName = selectedBlog.topic.replace(/\s+/g, "-").toLowerCase();
    element.download = `${topicName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Blog content downloaded!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Lịch sử Blog
        </h1>

        {historyItems.length === 0 ? (
          // Empty State with Lottie
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-64 h-64">
              <DotLottieReact
                src="https://lottie.host/0799b007-0a93-4ff5-aeac-1100c81bf82e/Y7wcX1uYIP.lottie"
                loop
                autoplay
              />
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mt-4">
              No history found
            </h2>
          </div>
        ) : (
          // History Items Grid
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {historyItems.map((blog) => {
              // Extract first 150 characters as preview
              const preview =
                blog.content
                  .substring(0, 150)
                  .replace(/#+\s/g, "")
                  .replace(/\*\*/g, "")
                  .trim() + "...";

              return (
                <div
                  key={blog.id}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {blog.topic}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">
                      {preview}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(blog)}
                      className="flex-1 gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <Eye className="w-4 h-4" />
                      Xem
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dialog for viewing full blog content */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl! max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
              Xem trước & Xuất
            </DialogTitle>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                Sao chép
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Tải xuống
              </Button>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {selectedBlog?.topic}
              </h2>
            </div>
            <div className="w-full prose dark:prose-invert max-w-none">
              <div className="text-slate-900 dark:text-white">
                <ReactMarkdown>{selectedBlog?.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HistoryPage;

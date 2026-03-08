import React, { createContext, useContext, useState, useEffect } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  // Load blogs from localStorage on mount
  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      try {
        setBlogs(JSON.parse(savedBlogs));
      } catch (error) {
        console.error("Error loading blogs from localStorage:", error);
      }
    }
  }, []);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (title, content) => {
    const newBlog = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    setBlogs([newBlog, ...blogs]);
    return newBlog;
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

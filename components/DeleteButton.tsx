"use client";

import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  action: () => Promise<void>;
  className?: string;
}

export default function DeleteButton({ action, className }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await action();
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Failed to delete item");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={className || "text-red-600 hover:text-red-900 disabled:opacity-50"}
      title="Delete"
    >
      <Trash size={18} />
    </button>
  );
}

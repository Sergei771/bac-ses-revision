"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ProgressCardProps = {
  title: string;
  percentage?: number;
  value?: string;
  description: string;
  icon: ReactNode;
  variant?: "percentage" | "time" | "quiz";
};

export default function ProgressCard({
  title,
  percentage,
  value,
  description,
  icon,
  variant = "percentage",
}: ProgressCardProps) {
  return (
    <div className="card hover:translate-y-[-2px] transition-transform">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          {icon}
        </div>
      </div>
      
      {variant === "percentage" && percentage !== undefined && (
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-3xl font-bold">{percentage}%</span>
            <span className="text-gray-500 dark:text-gray-400">100%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
      
      {variant !== "percentage" && value && (
        <div className="mb-2">
          <span className="text-3xl font-bold">{value}</span>
        </div>
      )}
      
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

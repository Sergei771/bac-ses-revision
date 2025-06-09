"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type SubjectCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  progress: number;
  href: string;
  color: "eco" | "socio" | "politic";
};

export default function SubjectCard({
  title,
  description,
  icon,
  progress,
  href,
  color,
}: SubjectCardProps) {
  const colorMap = {
    eco: {
      bg: "bg-eco-blue",
      text: "text-eco-blue",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      cardBorder: "border-l-4 border-eco-blue",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
    },
    socio: {
      bg: "bg-socio-purple",
      text: "text-socio-purple",
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      cardBorder: "border-l-4 border-socio-purple",
      lightBg: "bg-purple-50 dark:bg-purple-900/20",
    },
    politic: {
      bg: "bg-politic-red",
      text: "text-politic-red",
      iconBg: "bg-red-50 dark:bg-red-900/20",
      cardBorder: "border-l-4 border-politic-red",
      lightBg: "bg-red-50 dark:bg-red-900/20",
    },
  };

  const colors = colorMap[color];

  return (
    <Link href={href}>
      <div className={`card ${colors.cardBorder} hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-md mr-3 ${colors.iconBg}`}>
            <div className={colors.text}>{icon}</div>
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className={`text-sm font-medium ${colors.text}`}>
              Progression: {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div 
              className={`${colors.bg} h-2 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className={`flex items-center text-sm font-medium ${colors.text} group`}>
            Explorer
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

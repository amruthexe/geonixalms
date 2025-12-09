"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const techFacts = [
  { term: "HTTP", fullForm: "HyperText Transfer Protocol" },
  { term: "API", fullForm: "Application Programming Interface" },
  { term: "JSON", fullForm: "JavaScript Object Notation" },
  { term: "CSS", fullForm: "Cascading Style Sheets" },
  { term: "HTML", fullForm: "HyperText Markup Language" },
  { term: "SQL", fullForm: "Structured Query Language" },
  { term: "DOM", fullForm: "Document Object Model" },
  { term: "URL", fullForm: "Uniform Resource Locator" },
  { term: "GUI", fullForm: "Graphical User Interface" },
  { term: "SSL", fullForm: "Secure Sockets Layer" },
  { term: "IoT", fullForm: "Internet of Things" },
  { term: "SaaS", fullForm: "Software as a Service" },
];

export default function TechLoader({ loading }: { loading: boolean }) {
  const [fact, setFact] = useState(techFacts[0]);

  useEffect(() => {
    if (loading) {
      // Pick a random fact when loading starts
      setFact(techFacts[Math.floor(Math.random() * techFacts.length)]);
      
      // Optional: Cycle through facts if loading takes too long
      const interval = setInterval(() => {
        setFact(techFacts[Math.floor(Math.random() * techFacts.length)]);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-3 mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2 text-primary font-medium">
        <Loader2 className="animate-spin" size={18} />
        <span>Processing...</span>
      </div>
      <div className="text-center">
        <span className="font-bold text-gray-800">{fact.term}</span>
        <span className="text-gray-500 mx-2">-</span>
        <span className="text-gray-600 text-sm">{fact.fullForm}</span>
      </div>
    </div>
  );
}

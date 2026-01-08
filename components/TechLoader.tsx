"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const techFacts = [
  // 🌐 Web basics
  { term: "HTTP", fullForm: "HyperText Transfer Protocol" },
  { term: "HTTPS", fullForm: "HyperText Transfer Protocol Secure" },
  { term: "URL", fullForm: "Uniform Resource Locator" },
  { term: "URI", fullForm: "Uniform Resource Identifier" },
  { term: "DNS", fullForm: "Domain Name System" },
  { term: "IP", fullForm: "Internet Protocol" },

  // 🧩 Frontend
  { term: "HTML", fullForm: "HyperText Markup Language" },
  { term: "CSS", fullForm: "Cascading Style Sheets" },
  { term: "JS", fullForm: "JavaScript" },
  { term: "DOM", fullForm: "Document Object Model" },
  { term: "SPA", fullForm: "Single Page Application" },
  { term: "SSR", fullForm: "Server-Side Rendering" },
  { term: "CSR", fullForm: "Client-Side Rendering" },
  { term: "LCP", fullForm: "Largest Contentful Paint" },
  { term: "FCP", fullForm: "First Contentful Paint" },
  { term: "CLS", fullForm: "Cumulative Layout Shift" },

  // ⚛️ React / Next.js
  { term: "JSX", fullForm: "JavaScript XML" },
  { term: "Hook", fullForm: "Special React Function for State & Effects" },
  { term: "useState", fullForm: "React Hook for Component State" },
  { term: "useEffect", fullForm: "React Hook for Side Effects" },
  { term: "RSC", fullForm: "React Server Components" },
  { term: "ISR", fullForm: "Incremental Static Regeneration" },

  // 🔗 APIs & Data
  { term: "API", fullForm: "Application Programming Interface" },
  { term: "REST", fullForm: "Representational State Transfer" },
  { term: "GraphQL", fullForm: "Graph Query Language" },
  { term: "JSON", fullForm: "JavaScript Object Notation" },
  { term: "XML", fullForm: "Extensible Markup Language" },
  { term: "CRUD", fullForm: "Create Read Update Delete" },

  // 🗄️ Databases
  { term: "SQL", fullForm: "Structured Query Language" },
  { term: "NoSQL", fullForm: "Non-Relational Database" },
  { term: "DBMS", fullForm: "Database Management System" },
  { term: "ORM", fullForm: "Object Relational Mapping" },
  { term: "Index", fullForm: "Data Structure to Speed Up Queries" },

  // 🍃 MongoDB
  { term: "BSON", fullForm: "Binary JSON" },
  { term: "Document", fullForm: "MongoDB Record Format" },
  { term: "Collection", fullForm: "Group of MongoDB Documents" },
  { term: "Aggregation", fullForm: "Data Processing Pipeline in MongoDB" },

  // ☁️ Cloud & DevOps
  { term: "CI", fullForm: "Continuous Integration" },
  { term: "CD", fullForm: "Continuous Deployment" },
  { term: "Docker", fullForm: "Containerization Platform" },
  { term: "K8s", fullForm: "Kubernetes" },
  { term: "VPC", fullForm: "Virtual Private Cloud" },
  { term: "CDN", fullForm: "Content Delivery Network" },

  // 🔐 Security
  { term: "Auth", fullForm: "Authentication" },
  { term: "JWT", fullForm: "JSON Web Token" },
  { term: "OAuth", fullForm: "Open Authorization Protocol" },
  { term: "SSL", fullForm: "Secure Sockets Layer" },
  { term: "TLS", fullForm: "Transport Layer Security" },
  { term: "CORS", fullForm: "Cross-Origin Resource Sharing" },

  // 🤖 AI / Modern Tech
  { term: "AI", fullForm: "Artificial Intelligence" },
  { term: "ML", fullForm: "Machine Learning" },
  { term: "LLM", fullForm: "Large Language Model" },
  { term: "NLP", fullForm: "Natural Language Processing" },

  // 🧠 Software Engineering
  { term: "OOP", fullForm: "Object-Oriented Programming" },
  { term: "DRY", fullForm: "Don't Repeat Yourself" },
  { term: "KISS", fullForm: "Keep It Simple, Stupid" },
  { term: "YAGNI", fullForm: "You Aren't Gonna Need It" },

  // 🧪 Testing
  { term: "TDD", fullForm: "Test Driven Development" },
  { term: "Unit Test", fullForm: "Testing Individual Functions" },
  { term: "E2E", fullForm: "End-to-End Testing" },

  // 💼 Industry
  { term: "SaaS", fullForm: "Software as a Service" },
  { term: "PaaS", fullForm: "Platform as a Service" },
  { term: "IaaS", fullForm: "Infrastructure as a Service" },
];

function getRandomFact() {
  return techFacts[Math.floor(Math.random() * techFacts.length)];
}

export default function TechLoader({ loading }: { loading: boolean }) {
  // ✅ Initial state set correctly
  const [fact, setFact] = useState(getRandomFact);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setFact(getRandomFact());
    }, 2000);

    return () => clearInterval(interval);
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

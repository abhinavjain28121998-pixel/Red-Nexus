import { Category, Author } from "../types";

export const categories: Category[] = [
  { id: "c1", name: "AI Insight", slug: "ai", color: "bg-red-500/10 text-red-400" },
  { id: "c2", name: "Software", slug: "software", color: "bg-purple-500/10 text-purple-400" },
  { id: "c3", name: "Hardware", slug: "hardware", color: "bg-orange-500/10 text-orange-400" },
  { id: "c4", name: "Cybersecurity", slug: "cybersecurity", color: "bg-red-500/10 text-red-400" },
  { id: "c5", name: "Cloud Compute", slug: "cloud", color: "bg-cyan-500/10 text-cyan-400" },
];

export const authors: Author[] = [
  {
    id: "a1",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    role: "Senior AI Correspondent",
    bio: "Covering the intersection of artificial intelligence and human ethics."
  },
  {
    id: "a2",
    name: "Marcus Thorne",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    role: "Hardware Editor",
    bio: "Obsessed with silicon, yields, and the physical limits of computing."
  },
  {
    id: "a3",
    name: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    role: "Security Researcher",
    bio: "Former white-hat hacker bringing clarity to complex security threats."
  }
];

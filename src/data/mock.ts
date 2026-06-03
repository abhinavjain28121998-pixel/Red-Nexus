import { BlogPost, Category, Author } from "../types";

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

export const mockPosts: BlogPost[] = [
  {
    id: "p1",
    title: "The Dawn of Quantum Advantage: What It Means for Encryption",
    slug: "dawn-of-quantum-advantage-encryption",
    excerpt: "With the latest breakthrough in qubit stability, we are inches away from a quantum advantage. But how will modern RSA encryption hold up against Shor's algorithm?",
    content: "Content goes here. In a real application, this would be a long markdown or rich text field. For now, imagine a deep dive into the cryptography.",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: "2026-05-28T10:00:00Z",
    readTimeMinutes: 8,
    author: authors[2],
    category: categories[3],
    tags: ["Quantum Computing", "Cryptography", "Security"],
    featured: true,
  },
  {
    id: "p2",
    title: "Beyond Transformer Models: The New Architectures in AI",
    slug: "beyond-transformer-models-new-ai-architectures",
    excerpt: "While Transformers have dominated the landscape for nearly a decade, new state-space models and optimized neuro-symbolic networks are showing incredible promise.",
    content: "It's all about Mamba, state-space models, and efficiency at the edge...",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: "2026-06-01T14:30:00Z",
    readTimeMinutes: 12,
    author: authors[0],
    category: categories[0],
    tags: ["Machine Learning", "Neural Networks", "Research"],
    trending: true,
  },
  {
    id: "p3",
    title: "Building Scalable Micro-Frontends with React 19",
    slug: "scalable-micro-frontends-react",
    excerpt: "A comprehensive guide to federating your monolithic frontend architecture using the latest React features and edge-side routing.",
    content: "Micro-frontends represent the next logical step in decoupling large application codebases...",
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: "2026-05-15T09:00:00Z",
    readTimeMinutes: 6,
    author: authors[1],
    category: categories[1],
    tags: ["React", "Web Dev", "Architecture"],
  },
  {
    id: "p4",
    title: "Silicon Limits: Why the 2nm Node is Harder Than We Thought",
    slug: "silicon-limits-2nm-node-challenges",
    excerpt: "Fab facilities are struggling with yield rates on the new 2nm node processes as quantum tunneling becomes a significant interference factor.",
    content: "Moore's law isn't dead, but it is certainly wheezing...",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: "2026-06-02T11:15:00Z",
    readTimeMinutes: 7,
    author: authors[1],
    category: categories[2],
    tags: ["Semiconductors", "Engineering", "Manufacturing"],
    trending: true,
  },
  {
    id: "p5",
    title: "Securing Kubernetes Clusters in Multi-Cloud Environments",
    slug: "securing-kubernetes-multi-cloud",
    excerpt: "Best practices for maintaining a zero-trust posture across AWS, Azure, and GCP distributed workloads.",
    content: "Zero trust is more than a buzzword; in a multi-cloud environment, it's a necessity...",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: "2026-05-20T08:45:00Z",
    readTimeMinutes: 10,
    author: authors[2],
    category: categories[4],
    tags: ["DevOps", "Kubernetes", "Cloud"],
  },
   {
    id: "p6",
    title: "The Next Era of Augmented Reality Headsets",
    slug: "next-era-augmented-reality-headsets",
    excerpt: "Waveguide technology has drastically improved, creating lighter, more efficient AR displays that might finally bring the tech mainstream.",
    content: "Reviewing the current landscape of AR...",
    coverImage: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: "2026-06-03T07:22:00Z",
    readTimeMinutes: 5,
    author: authors[1],
    category: categories[2],
    tags: ["AR/VR", "Headsets", "Gadgets"],
    trending: false,
  }
];

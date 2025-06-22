import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/search-form";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

const filterTags = [
  { label: "Newest", active: true },
  { label: "Active", active: false },
  { label: "Unanswered", active: false },
  { label: "Most Voted", active: false },
  { label: "Most Viewed", active: false },
];

const questions = [
  {
    id: 1,
    title: "How to implement authentication in Next.js 13?",
    author: "John Doe",
    date: new Date("2024-01-15"),
    votes: 42,
    answers: 5,
    views: 1234,
    text: "I'm trying to implement authentication in my Next.js 13 application using the new app router. I've tried several approaches but none seem to work properly...",
    tags: ["next.js", "authentication", "react"],
    solved: false,
  },
  {
    id: 2,
    title: "Best practices for React Server Components",
    author: "Jane Smith",
    date: new Date("2024-01-14"),
    votes: 38,
    answers: 3,
    views: 987,
    text: "What are the recommended patterns for using React Server Components? I'm especially interested in data fetching and state management...",
    tags: ["react", "server-components", "next.js"],
    solved: true,
  },
  {
    id: 3,
    title: "TypeScript type inference in custom hooks",
    author: "Mike Johnson",
    date: new Date("2024-01-13"),
    votes: 25,
    answers: 2,
    views: 756,
    text: "I'm having trouble with TypeScript type inference when creating custom hooks. The compiler keeps showing errors when I try to...",
    tags: ["typescript", "react-hooks", "javascript"],
    solved: false,
  },
  {
    id: 4,
    title: "Optimizing Tailwind CSS bundle size",
    author: "Sarah Wilson",
    date: new Date("2024-01-12"),
    votes: 31,
    answers: 4,
    views: 892,
    text: "My project's CSS bundle size is getting too large. Looking for ways to optimize Tailwind CSS in production. Has anyone successfully...",
    tags: ["tailwind", "css", "optimization"],
    solved: true,
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();
  if (!session?.user) return null;

  const { search } = await searchParams;

  return (
    <div className="flex flex-col gap-6 p-6 pr-[370px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">All Questions</h1>
        <Link href="/ask">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Ask Question
          </Button>
        </Link>
      </div>

      <SearchForm
        type="search"
        placeholder="Search questions..."
        defaultValue={search}
        className="w-full"
      />

      <div className="flex flex-wrap items-center gap-2">
        {filterTags.map((filter, index) => (
          <Badge
            key={index}
            variant={filter.active ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20 py-2"
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="flex flex-col gap-3">
          {questions.map((question) => (
            <button
              key={question.id}
              className="flex flex-col items-start gap-2 rounded-lg border p-4 text-left hover:bg-primary/10 transition-all"
            >
              <div className="flex w-full items-center gap-2">
                <div className="flex flex-col items-center gap-1 pr-4 border-r">
                  <span className="text-sm font-medium">{question.votes}</span>
                  <span className="text-xs text-muted-foreground">votes</span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{question.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(question.date, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {question.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>{question.answers} answers</span>
                    <span>{question.views} views</span>
                    <span>Asked by {question.author}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Home;

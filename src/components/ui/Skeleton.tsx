import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-theme-text/10 rounded-md ring-1 ring-theme-text/5",
        className
      )}
      {...props}
    />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden bg-theme-card border border-theme-border rounded-xl h-full">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full bg-theme-text/5 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <Skeleton className="h-6 w-20 bg-theme-text/15" />
        </div>
        {/* Glowing sheen simulation */}
        <div className="w-full h-full bg-theme-text/5 animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          {/* Metadata info */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-24 bg-theme-text/10" />
            <span className="w-px h-3 bg-theme-border" />
            <Skeleton className="h-4 w-16 bg-theme-text/10" />
          </div>

          {/* Heading Title */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-6 w-full bg-theme-text/15" />
            <Skeleton className="h-6 w-[85%] bg-theme-text/15" />
          </div>

          {/* Excerpt Summary */}
          <div className="space-y-2.5 mb-6">
            <Skeleton className="h-4 w-full bg-theme-text/10" />
            <Skeleton className="h-4 w-[95%] bg-theme-text/10" />
            <Skeleton className="h-4 w-[60%] bg-theme-text/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SinglePostSkeleton() {
  return (
    <div className="w-full bg-theme-bg pb-24 transition-colors duration-300">
      {/* Hero Image Block Skeleton */}
      <div className="relative h-[60vh] min-h-[500px] w-full mt-[-80px] bg-theme-text/5 flex items-end pb-16">
        <div className="absolute inset-0 bg-theme-bg/85 z-10" />
        
        <div className="relative w-full z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Skeleton className="h-4 w-32 bg-theme-text/15 mb-8" />
          
          {/* Category/Read time */}
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-6 w-24 bg-red-600/30" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 bg-theme-text/15" />
              <span className="w-px h-3 bg-theme-border" />
              <Skeleton className="h-4 w-16 bg-theme-text/15" />
            </div>
          </div>

          {/* Large Title */}
          <div className="space-y-3 mb-8">
            <Skeleton className="h-12 md:h-16 w-full bg-theme-text/20" />
            <Skeleton className="h-12 md:h-16 w-3/4 bg-theme-text/20" />
          </div>

          {/* Footer of Header */}
          <div className="flex items-center justify-between border-t border-theme-border pt-6 mt-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-theme-text/10" />
              <div>
                <Skeleton className="h-4 w-28 bg-theme-text/15 mb-1" />
                <Skeleton className="h-3 w-20 bg-theme-text/10" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full bg-theme-text/10" />
              <Skeleton className="h-10 w-10 rounded-full bg-theme-text/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8 xl:gap-16 items-start">
          
          {/* Main article body wrapper */}
          <div className="bg-theme-card p-8 md:p-12 xl:p-16 border border-theme-border w-full min-w-0 rounded-xl shadow-2xl space-y-10">
            {/* Control bar skeleton */}
            <div className="mb-8 p-4 bg-theme-text/5 border border-theme-border rounded-xl flex justify-between items-center gap-4">
              <Skeleton className="h-4 w-32 bg-theme-text/10" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-24 bg-theme-text/10" />
                <Skeleton className="h-6 w-32 bg-theme-text/10" />
              </div>
            </div>

            {/* Blockquote introduction */}
            <div className="border-l-4 border-red-500 pl-6 space-y-3">
              <Skeleton className="h-6 w-full bg-theme-text/15" />
              <Skeleton className="h-6 w-[95%] bg-theme-text/15" />
              <Skeleton className="h-6 w-[60%] bg-theme-text/15" />
            </div>

            {/* Paragraph skeletons */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-theme-text/10" />
              <Skeleton className="h-4 w-[98%] bg-theme-text/10" />
              <Skeleton className="h-4 w-[96%] bg-theme-text/10" />
              <Skeleton className="h-4 w-[93%] bg-theme-text/10" />
              <Skeleton className="h-4 w-[75%] bg-theme-text/10" />
            </div>

            {/* Paragraph skeletons */}
            <div className="space-y-4 pt-4">
              <Skeleton className="h-7 w-1/3 bg-theme-text/15 mb-6" />
              <Skeleton className="h-4 w-full bg-theme-text/10" />
              <Skeleton className="h-4 w-[97%] bg-theme-text/10" />
              <Skeleton className="h-4 w-[99%] bg-theme-text/10" />
              <Skeleton className="h-4 w-[40%] bg-theme-text/10" />
            </div>

            {/* Image Placeholder inside Body */}
            <div className="pt-6">
              <Skeleton className="h-72 w-full bg-theme-text/10 rounded-lg" />
            </div>

            {/* Lists/Tags */}
            <div className="pt-10 border-t border-theme-border flex gap-2">
              <Skeleton className="h-5 w-12 bg-theme-text/10" />
              <Skeleton className="h-8 w-16 bg-theme-text/10" />
              <Skeleton className="h-8 w-20 bg-theme-text/10" />
              <Skeleton className="h-8 w-24 bg-theme-text/10" />
            </div>
          </div>

          {/* Sticky Sidebar Right */}
          <div className="sticky top-24 hidden lg:block space-y-6">
            {/* Preferences card */}
            <div className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-lg space-y-4">
              <Skeleton className="h-4 w-36 bg-theme-text/15" />
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20 bg-theme-text/10" />
                  <Skeleton className="h-8 w-full bg-theme-text/10" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20 bg-theme-text/10" />
                  <Skeleton className="h-8 w-full bg-theme-text/10" />
                </div>
              </div>
            </div>

            {/* TOC Card */}
            <div className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-lg space-y-4">
              <Skeleton className="h-4 w-28 bg-theme-text/15" />
              <div className="space-y-3">
                <Skeleton className="h-3 w-full bg-theme-text/10" />
                <Skeleton className="h-3 w-[85%] bg-theme-text/10" />
                <Skeleton className="h-3 w-[95%] bg-theme-text/10" />
                <Skeleton className="h-3 w-[70%] bg-theme-text/10" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

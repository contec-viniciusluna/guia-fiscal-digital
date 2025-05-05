
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="mt-2 text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-500">{description}</p>
        {actionLabel && actionHref && (
          <div className="mt-6">
            <Link to={actionHref}>
              <Button className="bg-fiscal hover:bg-fiscal-light">
                {actionLabel}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

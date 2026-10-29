import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
}: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ArrowLeft className="size-4" />
            </Button>

            {pages.map((page) => (
                <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="icon"
                    className="size-8"
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                aria-label="Next page"
            >
                <ArrowRight className="size-4" />
            </Button>
        </div>
    );
}

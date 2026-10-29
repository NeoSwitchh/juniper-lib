import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
    return (
        <div className="relative w-full overflow-x-auto">
            <table
                {...props}
                className={cn('w-full caption-bottom text-sm', className)}
            />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return <thead {...props} className={cn('[&_tr]:border-b', className)} />;
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody {...props} className={cn('[&_tr:last-child]:border-0', className)} />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            {...props}
            className={cn(
                'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                className,
            )}
        />
    );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            {...props}
            className={cn(
                'h-10 px-2 text-left align-middle font-medium text-muted-foreground',
                className,
            )}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            {...props}
            className={cn('px-2 py-2 align-middle', className)}
        />
    );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>

                    <CardTitle className="text-2xl font-semibold">
                        Something went wrong!
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5 text-center">
                    <p className="text-sm text-muted-foreground">
                        We encountered an unexpected error while loading this page.
                        Please try again. If the problem continues, come back later.
                    </p>

                    {error.digest && (
                        <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                            Error ID: {error.digest}
                        </p>
                    )}

                    <Button
                        onClick={() => unstable_retry()}
                        className="w-full gap-2"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
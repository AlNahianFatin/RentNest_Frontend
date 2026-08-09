"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardToast() {

    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success)
            toast.success(success);

        if (error)
            toast.error(error);
    }, [searchParams]);


    return null;
}
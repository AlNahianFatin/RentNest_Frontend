"use client";

import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { IReview, ReviewStatus } from "@/lib/types";
import { updateReviewStatus } from "../../_actions/reviewsActions";
import { useRouter } from "next/navigation";

type Props = {
    review: IReview;
};

export function ManageReviewStatusButton({ review }: Props) {
    const router = useRouter();

    const status = review.status === ReviewStatus.REJECTED ?
        ReviewStatus.APPROVED :
        ReviewStatus.REJECTED;

    const action = updateReviewStatus.bind(null, review.id);

    const [state, formAction, pending] = useActionState(action, null);

    useEffect(() => {
        if (!state)
            return;

        if (state.success) {
            toast.success(status === ReviewStatus.REJECTED ? "Review published" : "Review hidden");
            router.refresh();
        }
            
        else
            toast.error(state.message || "Something went wrong");
    }, [state, status, router]);

    return (

        <CardAction>

            <form action={formAction}>

                <input type="hidden" name="status" value={status} />

                <Button type="submit" disabled={pending} variant={
                    review.status === ReviewStatus.REJECTED
                        ? "default"
                        : "destructive"
                } >
                    {
                        pending ? "Updating..." :
                            review.status === ReviewStatus.REJECTED ?
                                "Unhide" : "Hide"
                    }

                </Button>

            </form>

        </CardAction>

    );

}
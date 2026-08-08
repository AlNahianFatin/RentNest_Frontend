"use client";

import { CardAction } from "@/components/ui/card";
import { ReviewFormDialog } from "./ReviewFormDialog";
import { IReview } from "@/lib/types";

type Props = {
    propertyId?: string;
    review: IReview;
};

export function DeleteReviewButton({
    propertyId,
    review
}: Props) {
    return (
        <CardAction className="red">
            <ReviewFormDialog mode="delete" propertyId={propertyId} review={review} />
        </CardAction>
    );
}
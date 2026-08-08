"use client";

import { CardAction } from "@/components/ui/card";
import { ReviewFormDialog } from "./ReviewFormDialog";
import { IReview } from "@/lib/types";

type Props = {
    propertyId?: string;
    review: IReview;
};

export function EditReviewButton({
    propertyId,
    review
}: Props) {
    return (
        <CardAction className="blue">
            <ReviewFormDialog mode="edit" propertyId={propertyId} review={review} />
        </CardAction>
    );
}
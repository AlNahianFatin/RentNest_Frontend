"use client";

import { CardAction } from "@/components/ui/card";
import { ReviewFormDialog } from "./ReviewFormDialog";
import { IReview } from "@/lib/types";

type Props = {
    propertyId: string;
    review?: IReview;
};

export function PostReviewButton({
    propertyId,
    review
}: Props) {
    return (
        <CardAction className="green">
            <ReviewFormDialog mode="create" propertyId={propertyId} review={review} />
        </CardAction>
    );
}
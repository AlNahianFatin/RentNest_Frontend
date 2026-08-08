"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IReview } from "@/lib/types";
import { CirclePlusIcon, PencilIcon, Star, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createReview, deleteReview, updateReview } from "../../_actions/reviewsActions";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

type ReviewFormDialogProps = {
    mode: "create" | "edit" | "delete";
    propertyId?: string;
    review?: IReview;
}

export function ReviewFormDialog({ mode, propertyId, review }: ReviewFormDialogProps) {
    const router = useRouter();

    const [rating, setRating] = useState(review?.rating ?? 0);

    const [open, setOpen] = useState(false);

    const action = mode === "edit" && review
        ? updateReview.bind(null, review.id)
        : mode === "delete" && review
            ? deleteReview.bind(null, review.id)
            : createReview.bind(null, propertyId as string);

    const [state, formAction, pending] = useActionState(action, null);

    useEffect(() => {
        if (!state)
            return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Review updated successfully" :
                mode === "delete" ? "Review deleted successfully" : "Review posted successfully"));
            router.refresh();
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
        }
        else
            toast.error(state.message || "Something went wrong");
    }, [state, mode, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>

                {
                    mode === "edit" ?
                        <Button variant="outline" size="sm">
                            <PencilIcon />
                            Edit
                        </Button> :

                        mode === "delete" ?
                            <Button variant="destructive" size="sm">
                                <Trash2 />
                                Delete
                            </Button> :

                            <Button>
                                <CirclePlusIcon />
                                Post
                            </Button>
                }

            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Review" : mode === "delete" ? "Delete Review" : "Post Review"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    {
                        mode === "delete" ? (
                            <div className="space-y-2">
                                <p>Are you sure you want to delete this review?</p>
                            </div>
                        ) :
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating (out of 5) : {rating}</Label>
                                    <div className="flex gap-1">

                                        {
                                            Array.from({ length: 5 }).map((_, index) => {

                                                const starValue = index + 1;

                                                return (
                                                    <button
                                                        key={starValue}
                                                        type="button"
                                                        onClick={() => setRating(starValue)}
                                                    >
                                                        <Star
                                                            className={`h-7 w-7 cursor-pointer transition ${starValue <= rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-gray-300"
                                                                }`}
                                                        />
                                                    </button>
                                                );

                                            })
                                        }

                                    </div>

                                    <input type="hidden" name="rating" value={rating} />

                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="comment">Comment (optional)</Label>
                                    <Textarea id="comment" name="comment" defaultValue={review?.comment} className="min-h-32" />
                                </div>
                            </>
                    }

                    <DialogFooter>

                        <Button type="submit" disabled={pending || rating === 0}>
                            {pending ? "Saving..." : mode === "edit" ? "Update Review" : mode === "delete" ? "Delete Review" : "Post Review"}
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog >
    )
}
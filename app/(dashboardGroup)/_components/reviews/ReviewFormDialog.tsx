/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IReview } from "@/lib/types";
import { NotepadText, Star } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createReview, updateReview } from "../../_actions/reviewsActions";
import { Textarea } from "@/components/ui/textarea";

type ReviewFormDialogProps = {
    propertyId: string;
    review?: IReview;
}

export function ReviewFormDialog({ propertyId, review }: ReviewFormDialogProps) {
    const [rating, setRating] = useState(review?.rating ?? 0);

    const [open, setOpen] = useState(false);

    const mode = review ? "edit" : "create";
    // console.log("------------------")
    // console.log({
    //     propertyId: propertyId,
    //     reviews: review,
    //     mode
    // });

    const action = mode === "edit" && review
        ? updateReview.bind(null, propertyId)
        : createReview.bind(null, propertyId);

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state)
            return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Review updated successfully" : "Review created successfully"));
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
        } else
            toast.error(state.message || "Something went wrong");
    }, [state, mode]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    <Button size="sm">
                        <NotepadText />
                        Review
                    </Button>

                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Review" : "Create Review"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="rating">Rating (out of 5) : {rating}</Label>
                        {/* <Input id="rating" name="rating" defaultValue={review?.rating} required /> */}
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


                        {/* hidden input sends value to server action */}
                        <input
                            type="hidden"
                            name="rating"
                            value={rating}
                        />

                    </div>
                    {/* </div> */}
                    <div className="space-y-2">
                        <Label htmlFor="comment">Comment (optional)</Label>
                        <Textarea id="comment" name="comment" defaultValue={review?.comment} className="min-h-32" />
                    </div>
                    <DialogFooter>
                        {mode === "edit" && (
                            <Button variant={"destructive"}> Delete </Button>
                        )}

                        <Button type="submit" disabled={pending || rating === 0}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Review"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
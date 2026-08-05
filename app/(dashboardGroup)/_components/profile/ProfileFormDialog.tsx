/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProfile } from "@/lib/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateProfile } from "../../_actions/profileActions";
import { useRouter } from "next/navigation";

type ProfileFormDialogProps = {
    profile: IProfile;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProfileFormDialog({
    profile,
    open,
    setOpen,
}: ProfileFormDialogProps) {
    const router = useRouter();

    const action = updateProfile.bind(null);

    const [state, formAction, pending] =
        useActionState(action, null) as any;

    useEffect(() => {
        if (!state || pending) 
            return;

        if (state.success) {
            toast.success(state.message);
            router.refresh();
            setOpen(false);
        } else {
            toast.error(state.message);
        }
    }, [state, setOpen, router, pending]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={profile.name}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Confirm Password
                        </Label>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={pending}
                        >
                            {pending
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}
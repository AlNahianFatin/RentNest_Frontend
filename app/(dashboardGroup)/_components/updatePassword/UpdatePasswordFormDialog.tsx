/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUpdatePassword } from "@/lib/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updatePassword } from "../../_actions/updatePasswordActions";
import { useRouter } from "next/navigation";

type UpdatePasswordFormDialogProps = {
    user: IUpdatePassword;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdatePasswordFormDialog({
    open,
    setOpen,
}: UpdatePasswordFormDialogProps) {
    const router = useRouter();

    const [state, formAction, pending] = useActionState(updatePassword, null);

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
                    <DialogTitle>Update Password</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="oldPassword">Enter Previous Password to Continue</Label>
                        <Input
                            id="oldPassword"
                            name="oldPassword"
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
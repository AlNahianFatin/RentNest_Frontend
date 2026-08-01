/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICategory } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createCategory, updateCategory } from "../_actions/categoriesActions";

type CategoryFormDialogProps = {
    mode: "create" | "edit";
    category?: ICategory;
}

export function CategoryFormDialog({ mode, category }: CategoryFormDialogProps) {
    const [open, setOpen] = useState(false);

    const action = mode === "edit" && category
        ? updateCategory.bind(null, category.id)
        : createCategory;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) 
            return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Category updated successfully" : "Category created successfully"));
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    mode === "edit" ? (
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" />
                            Edit
                        </Button>
                    ) : (
                        <Button>
                            <PlusIcon data-icon="inline-start" />
                            Create Category
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Category" : "Create Category"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="propertyType">Category Name</Label>
                        <Input id="propertyType" name="propertyType" defaultValue={category?.propertyType} required />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
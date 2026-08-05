/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICategory, IProperty } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createProperty, updateProperty } from "../../_actions/propertiesActions";

type PropertyFormDialogProps = {
    mode: "create" | "edit";
    property?: IProperty;
    categories?: ICategory[];
}

export function PropertyFormDialog({ mode, property, categories }: PropertyFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState<string>(
        property?.categoryId ?? ""
    );

    const action = mode === "edit" && property
        ? updateProperty.bind(null, property.id)
        : createProperty;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state)
            return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Property updated successfully" : "Property created successfully"));
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
        } else
            toast.error(state.message || "Something went wrong");
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
                            Create Property
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Property" : "Create Property"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="houseNo">House No.</Label>
                        <Input id="houseNo" name="houseNo" defaultValue={property?.houseNo} type="number" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="roadNo">Road No.</Label>
                        <Input id="roadNo" name="roadNo" defaultValue={property?.roadNo} type="number" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue={property?.location} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                        <Input id="thumbnail" name="thumbnail" defaultValue={property?.thumbnail} placeholder="https://..." required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price (tk)</Label>
                        <Input id="price" name="price" defaultValue={property?.price} type="number" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="categoryId"> Category Name </Label>

                        <input
                            type="hidden"
                            name="categoryId"
                            value={category}
                        />

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                >
                                    {
                                        categories?.find(
                                            (cat) => cat.id === category
                                        )?.propertyType
                                        ??
                                        "Select Category"
                                    }
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-full">

                                <DropdownMenuRadioGroup
                                    value={category}
                                    onValueChange={setCategory}
                                >
                                    {
                                        categories?.map((cat) => (
                                            <DropdownMenuRadioItem
                                                key={cat.id}
                                                value={cat.id}
                                            >
                                                {cat.propertyType}
                                            </DropdownMenuRadioItem>
                                        ))
                                    }

                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>

                        </DropdownMenu>
                    </div>


                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Property"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
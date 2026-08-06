"use client";

import { Button } from "@/components/ui/button";
import { IUser, UserActiveStatus } from "@/lib/types";
import { toast } from "sonner";
import { updateUserStatus } from "../../_actions/usersActions";

type UserStatusButtonProps = {
    user: IUser;
};

export default function UserStatusButton({
    user
}: UserStatusButtonProps) {

    const handleClick = async () => {
        const status = user.status === UserActiveStatus.ACTIVE ? UserActiveStatus.BANNED : UserActiveStatus.ACTIVE;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await updateUserStatus(user.id, {} as any, status);

        if (result.success)
            toast.success(result.message);
        else
            toast.error(result.message);
    };

    return (
        <>
            {user.status === UserActiveStatus.ACTIVE
                ? <Button onClick={handleClick} className="bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300">Ban</Button>
                : <Button onClick={handleClick} className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">Unban</Button>}
        </>
    );
}
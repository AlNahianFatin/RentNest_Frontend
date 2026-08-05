// "use client";

// import { Button } from "@/components/ui/button";
// import { IUser, UserActiveStatus, UserRole } from "@/lib/types";
// import { verifyToken } from "@/utils/jwt";
// import { JwtPayload } from "jsonwebtoken";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { updateUserStatus } from "../../_actions/usersActions";
// import { useActionState, useEffect, useState } from "react";

// type UserStatusButtonProps = {
//     user: IUser;
//     status: UserActiveStatus
// };

// export default function UserStatusButton({ user, status }: UserStatusButtonProps) {
//     const router = useRouter();

//     const accessToken = document.cookie
//         .split("; ")
//         .find(cookie => cookie.startsWith("accessToken="))
//         ?.split("=")[1];


//     if (!accessToken) {
//         router.push(`/login?redirectTo=/users/${user.id}`);
//         return;
//     }

//     const decodedAccessToken = accessToken ? await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

//     let userRole = null;

//     if (decodedAccessToken?.success && decodedAccessToken.data)
//         userRole = (decodedAccessToken.data as JwtPayload).role;

//     if (!userRole || userRole !== UserRole.ADMIN) {
//         toast.error("You don't have permission to access this resource.");
//         return;
//     }

//     const [open, setOpen] = useState(false);

//     const result = updateUserStatus.bind(null, user.id, status);

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const [state, result, pending] = useActionState(result, null) as any;

//     useEffect(() => {
//         if (!state)
//             return;

//         if (state.success) {
//             toast.success(state.message || (status === UserActiveStatus.ACTIVE ? "User banned successfully" : "User unbanned successfully"));
//             // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
//             setOpen(false);
//         } else
//             toast.error(state.message || "Something went wrong");
//     }, [state, status]);
// };


// return (
//     <Button
//         size="lg"
//         className="w-full sm:w-auto"
//         onClick={handleUserStatus}
//     >
//         {user.status === UserActiveStatus.ACTIVE ? "BAN" : "UNBAN"}
//     </Button>
// );
// }



"use client";

import { Button } from "@/components/ui/button";
import { IUser, UserActiveStatus } from "@/lib/types";
import { toast } from "sonner";
import { updateUserStatus } from "../../_actions/usersActions";

type UserStatusButtonProps = {
    user: IUser;
    // status: UserActiveStatus;
};

export default function UserStatusButton({
    user,
    // status
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
        // <Button
        //     onClick={handleClick}
        // >
        //     {user.status === UserActiveStatus.ACTIVE
        //         ? "Ban"
        //         : "Unban"}
        // </Button>

        <>
            {user.status === UserActiveStatus.ACTIVE
                ? <Button onClick={handleClick} className="bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300">Ban</Button>
                : <Button onClick={handleClick} className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">Unban</Button>}
        </>
    );
}
// "use server"

// import { isAccessTokenExist } from "@/service/refreshToken";
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers"

// export const getMyPosts = async () => {
//     const accessToken = await isAccessTokenExist();

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
//         headers: {
//             Cookie: `accessToken=${accessToken}`
//         },
//         cache: "force-cache",
//         next: {
//             revalidate: 60 * 60 * 24,
//             tags: ["my-posts"]
//         }
//     });

//     const result = await res.json();

//     return result;
// }

// type PostState = {
//     success: boolean;
//     statusCode: number;
//     message: string;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data: Record<string, any>;
// }

// export const createPost = async (prevState: PostState, formData: FormData) => {
//     const accessToken = await isAccessTokenExist();

//     const payload = {
//         title: formData.get("title"),
//         content: formData.get("content"),
//         thumbnail: formData.get("thumbnail"),
//         tags: (formData.get("tags") as string).split(", "),
//         isPremium: formData.get("isPremium") === "on"
//     };

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
//         method: "post",
//         headers: {
//             Cookie: `accessToken=${accessToken}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     });

//     const result = await res.json();

//     if (result.success)
//         revalidateTag("my-posts", {
//             expire: 0
//         });

//     if (result.success && result.data.isPremium)
//         revalidateTag("premium-posts", {
//             expire: 0
//         });
//     else
//         revalidateTag("public-posts", {
//             expire: 0
//         });

//     return result;
// }

// export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
//     const accessToken = await isAccessTokenExist();

//     const payload = {
//         title: formData.get("title") ?? "",
//         content: formData.get("content") ?? "",
//         thumbnail: formData.get("thumbnail") ?? "",
//         tags: (formData.get("tags") as string).split(", ") ?? "",
//         isPremium: formData.get("isPremium") === "on"
//     };

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
//         method: "PATCH",
//         headers: {
//             Cookie: `accessToken=${accessToken}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     });

//     const result = await res.json();

//     if (result.success)
//         revalidateTag("my-posts", {
//             expire: 0
//         });

//     if (result.success && result.data.isPremium)
//         revalidateTag("premium-posts", {
//             expire: 0
//         });
//     else
//         revalidateTag("public-posts", {
//             expire: 0
//         });

//     return result;
// }
// "use client"

// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { LoginAction } from '../_actions/authActions'
// import { useActionState, useEffect } from 'react'
// import { toast } from 'sonner'
// import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'

// const LoginForm = () => {
//     const searchParams = useSearchParams();
//     const redirectTo = searchParams.get("redirectTo") ?? "";

//     const [state, action, pending] = useActionState(LoginAction.bind(null, redirectTo), false);

//     useEffect(() => {
//         if (!state)
//             return;

//         if (!state.success)
//             toast.error(state.message || "Login failed");
//     }, [state])

//     return (
//         <form action={action} className='space-y-4'>
//             <Card className='p-5 space-y-4'>
//                 <Input name='email' type='email' placeholder='Enter your email' required />
//                 <Input name='password' type='password' placeholder='Enter your password' required />
//                 <Button type='submit' >{
//                     pending ? "Submitting..." : "Login"
//                 }</Button>
//             </Card>
//             <p className='flex justify-center'>Don&apos;t have an account?&nbsp;
//                 <Link href={'/register'} className="text-foreground hover:text-primary transition-colors underline">Register now</Link>
//             </p>
//         </form>
//     )
// }

// export default LoginForm
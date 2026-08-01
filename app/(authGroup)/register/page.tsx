import Form from "../_components/Form";


export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Rent Nest!</h1>
            <p className="text-gray-500">
              Your are one step closer to your dream
            </p>
          </div>

          <Form mode="register" />

        </div>
      </div>
    </>
  )
}

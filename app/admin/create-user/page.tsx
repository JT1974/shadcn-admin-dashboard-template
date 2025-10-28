import { CreateUserForm } from "@/app/admin/_components/create-user-form";
import { createUser } from "@/app/admin/_lib/actions";


export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateUserForm createUser={createUser} />
      </div>
    </div>
  )
}

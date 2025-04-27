import { LoggedIn } from "@/utils/Api";
import { LoginForm } from "./loginForm.client";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  if((await LoggedIn())){
    redirect("/");
  }


    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    );
  }
  
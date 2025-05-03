import { LoggedIn } from "@/utils/Api";
import { redirect } from "next/navigation";
import NewProjectForm from "./newProjectForm";

export default async function NewprojectPage() {

  if(!(await LoggedIn())){
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col h-full p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">
        New Project
      </h2>
      <div className="w-1/2 p-6">
        <NewProjectForm />
      </div>
    </div>
  );
}
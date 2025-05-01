import { LoggedIn } from "@/utils/Api";
import { redirect } from "next/navigation";
import NewProjectForm from "./newProjectForm";

export default async function NewprojectPage() {

  if(!(await LoggedIn())){
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col h-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        New Project
      </h2>
      <div className="w-1/2 mx-autop-6">
        <NewProjectForm />
      </div>
    </div>
  );
}
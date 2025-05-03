import DeleteProkectBtn from "@/app/components/DeleteProjectBtn";
import FileGrid from "@/app/components/VideoFilesGrid.client";
import { GetProject, GetProjects, LoggedIn } from "@/utils/Api";
import { ArrowLeft, Trash } from "@phosphor-icons/react/dist/ssr";
import { redirect } from "next/navigation";

export default async function NewprojectPage({ params }) {
  const { uid } = await params; // this is your slug from [uid]
  
  if (!(await LoggedIn())) {
    redirect("/auth/login");
  }

  let projectData = null;
  try {
    projectData = await GetProject(uid);
  }
  catch (error) {
    redirect("/dashboard");
  }

  if (!projectData || projectData.error) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col h-full p-4 w-full">
      <div className="flex justify-between my-4 border-b border-gray-300 pb-4">
        <div className="flex space-x-4 items-center">
          <a className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition cursor-pointer" href="/dashboard">
            <ArrowLeft size={18} weight="bold" className="text-gray-500" />
          </a>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">
              {projectData.data.name}
            </h2>
            <p className="text-gray-600">{projectData.data.description}</p>
          </div>
        </div>
        <button className="w-12 h-12 border-2 border-red-300 rounded-full flex items-center justify-center hover:border-red-500 transition cursor-pointer">
          <Trash size={18}  className="text-red-500" />
        </button>
      </div>
      <div className="w-1/2 mx-autop-6 w-full">
      <FileGrid projectUid={uid} projectFiles={projectData.data.inputFiles} />
      </div>
      <DeleteProkectBtn id={uid} />
    </div>
  );
}
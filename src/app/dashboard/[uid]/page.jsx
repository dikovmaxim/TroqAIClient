import DeleteProkectBtn from "@/app/components/DeleteProjectBtn";
import VideoFileGrid from "@/app/components/VideoFilesGrid.client";
import { GetProject, GetProjects, LoggedIn } from "@/utils/Api";
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
    <div className="flex flex-col h-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        ProjectEditor - {uid}
      </h2>
      <DeleteProkectBtn id={uid} />
      <div className="w-1/2 mx-autop-6">
        <h3 className="text-lg font-bold">Project files</h3>
        <VideoFileGrid projectFiles={projectData.data.inputFiles} projectUid={uid} />
      </div>
    </div>
  );
}
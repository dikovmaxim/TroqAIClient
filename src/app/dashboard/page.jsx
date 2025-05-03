import { GetProjects, LoggedIn } from "@/utils/Api";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  if(!(await LoggedIn())){
    redirect("/auth/login");
  }

  const projects = (await GetProjects()).data;
  console.log("Projects: ", projects);

  return (
    <div className="flex flex-col h-full p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">My Projects</h2>
      <hr/>
      {projects.length > 0 ? (
        <div className="w-1/2 mx-auto p-6">
          {projects.map((project) => (
            <a key={project.id} className="flex block p-4 mb-4 rounded shadow hover:bg-gray-100 border-2" href={`/dashboard/${project.id}`}>
              <div className="left_info">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center">No projects found.</p>
      )}
      <div className="w-1/2 mx-auto p-6">
        <a href="/dashboard/new" className="flex block p-4 mb-4 rounded shadow hover:bg-gray-100 border-2">
          <h3 className="text-lg font-bold">Create New Project</h3>
        </a>
      </div>
    </div>
  );
}
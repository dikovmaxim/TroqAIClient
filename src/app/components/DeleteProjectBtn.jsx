"use client";
export default function DeleteProkectBtn({ id }) {

  const handleDelete = async () => {

    const res = await fetch(`/api/projects/delete`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    });
    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      console.error("Error deleting project");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 bg-red-500 text-white rounded w-64"
    >
      Delete Project
    </button>
  );
}
import { UploadFiles } from "@/utils/Api";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse the incoming multipart/form-data request
        const formData = await request.formData();
        const uid = formData.get('uid');
        // "files" field should be sent as array input (multiple files)
        const files = formData.getAll('files');

        if (!uid || files.length === 0) {
            return NextResponse.json(
                { error: 'Project uid and at least one file are required' },
                { status: 400 }
            );
        }

        // Assuming you have a function to add files to a project, e.g., AddFilesToProject
        let projectData = await UploadFiles(uid, files);
        console.log(projectData);

        return NextResponse.json(
            { message: 'Files added successfully'},
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Something went wrong' }
            , { status: 500 }
        );
    }
}
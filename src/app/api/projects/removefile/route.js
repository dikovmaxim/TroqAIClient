import { RemoveFiles, UploadFiles } from "@/utils/Api";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        
        //get project id and fileid from request body
        const { id, fileId } = await request.json();

        if (!id || !fileId) {
            return NextResponse.json(
                { error: 'Project uid and fileid are required' },
                { status: 400 }
            );
        }

        await RemoveFiles(id, fileId);
        
        return NextResponse.json(
            { message: 'File removed successfully' },
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
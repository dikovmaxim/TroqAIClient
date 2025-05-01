import { GetUserInfo, LoggedIn } from "@/utils/Api";
import { redirect } from "next/navigation";

export async function Header(){



    try{
        var userInfro = await GetUserInfo();
        var loggedIn = await LoggedIn();
    }catch(e){
        
    }

    return(
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center">
            <a href="/" className="text-lg font-bold">
                TroqAi
            </a>
            </div>
            {(loggedIn && userInfro) ? (
            <div className="flex items-center">
                <span className="mr-4">{userInfro.name}</span>
                <a href="/auth/logout" className="text-blue-500 hover:underline">
                    Logout
                </a>
            </div>
            ) : (
            <div className="flex items-center">
                <a href="/auth/login" className="text-blue-500 hover:underline mr-4">
                    Login
                </a>
            </div>
            )}
        </nav>
    );
}
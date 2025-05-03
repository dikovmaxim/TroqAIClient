import { GetUserInfo, LoggedIn } from "@/utils/Api";
import { redirect } from "next/navigation";


  import Link from "next/link"



export async function Header(){


    try {
        var loggedIn = await LoggedIn();
    }
    catch (error) {}

    return (
        <nav className="w-full bg-background fixed top-0 left-0 right-0 z-50 h-16">
            <div className="w-full container mx-auto md:flex items-center space-x-4 px-4 py-3 justify-between space-y-4 md:space-y-0">
                <div className="navbar-brand">
                    <Link href="/" className="text-xl font-bold">
                        TroqAi
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link href="/about" className="text-gray-800 hover:text-black transition-colors text-md font-medium">
                        About
                    </Link>
                    <Link href="/features" className="text-gray-800 hover:text-black transition-colors text-md font-medium">
                        Features
                    </Link>
                    <Link href="/solutions" className="text-gray-800 hover:text-black transition-colors text-md font-medium">
                        Solutions
                    </Link>
                    <Link href="/pricing" className="text-gray-800 hover:text-black transition-colors text-md font-medium">
                        Pricing
                    </Link>
                    <Link href="/blog" className="text-gray-800 hover:text-black transition-colors text-md font-medium">
                        Blog
                    </Link>

                </div>
                <div className="flex items-center space-x-4">
                    {loggedIn ? (
                        <>
                            <Link href="/dashboard" className="bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-medium transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/auth/logout" className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-lg px-5 py-2 text-sm font-medium transition-colors">
                                Sign out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-medium transition-colors">
                                Sign in
                            </Link>
                            <Link href="/auth/register" className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-lg px-5 py-2 text-sm font-medium transition-colors">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
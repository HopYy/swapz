import { useUser, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/utils/cn"
import defaultProfileImage from "@/assets/default_profile_image.jpg"

interface ProfileProps {
    expanded: boolean
}

export const Profile: React.FC<ProfileProps> = ({ expanded }) => {
    const { user } = useUser()
    
    return (
        <div className="px-3 mb-5">
            <div className="flex justify-center my-2">
                {user && <UserButton afterSignOutUrl="/" />}
                {!user && (
                    <Link href="/sign-in">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative mx-auto">
                            <Image 
                                src={defaultProfileImage}
                                priority 
                                alt="Profile image"
                                fill={true}
                                sizes="100%"
                                style={{objectPosition: "center"}}
                            />
                        </div>
                    </Link>
                )}
                <div className={cn("overflow-hidden transition-all flex flex-col justify-center", expanded ? "w-52 pl-2" : "w-0")}>
                    <div className="leading-4">
                    <h4 className="font-semibold">{user?.firstName ?? "Profile"}</h4>
                    {user?.primaryEmailAddress?.emailAddress &&  <span className="text-xs text-gray-600">{user.primaryEmailAddress.emailAddress}</span>}
                    </div>
                </div>
            </div>
        </div>
    ) 
}
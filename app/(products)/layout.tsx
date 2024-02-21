import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { Header } from '@/components/header/header'; 

export default function HomepageLayout({
    children
}: {
    children: React.ReactNode
}) {
    
    const { userId } = auth()

    if(!userId) {
        redirect('/sign-in')
    } 

    return  (
        <>  
            <Header />
            {children}
        </>
    )
}
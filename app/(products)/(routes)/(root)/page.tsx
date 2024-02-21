import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { routes } from "@/lib/routes"; 
import { Button } from "@/components/ui/button";
import CreatePostImage from "@/assets/createPost.svg"

export default async function Homepage () {
  const { userId } = auth()

  if(!userId) {
      redirect('/sign-in');
  }

  const categories = routes.filter((route) => route.label !== 'Home')

  return (
    <div className="flex flex-col justify-center items-center pb-10">
      <div className="py-4 max-w-[1280px]">
          <div className="flex flex-wrap justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-6 place-items-center gap-4 mx-auto">
            {categories.map((category) => (
              <Link 
                  key={category.label}
                  href={category.href}
                  className="w-[200px] h-[200px] p-2 bg-white rounded-lg duration-150 hover:scale-105"
                  style={{
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between items-center">
                    {category.img && (
                      <Image
                        className="w-full object-fit object-center"
                        src={category.img}
                        width={200}
                        height={200}
                        priority={true}
                        alt="Category image"
                      />
                    )}
                    <span className="text-black text-sm font-normal hover:underline text-center">{category.label}</span>
                  </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 p-4 flex flex-col justify-center items-center">
              <h1 className="text-3xl font-black text-center">Start by crafting your own products.</h1>
              <CreatePostImage />
              <Link href="/create">
                <Button>Create products</Button>
              </Link>
          </div>
      </div>
    </div>
  )
}
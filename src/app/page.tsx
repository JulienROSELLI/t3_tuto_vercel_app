import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="flex flex-wrap justify-center gap-4 p-4">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
async function Images() {
  const images = await getMyImages();
  return (
    <div className="  flex flex-wrap justify-center gap-4 p-4">
      {images.map(({ url, name, id }) => (
        <div className=" flex h-48   w-60 flex-col" key={id}>
          <Link href={`/img/${id}`}>
            <Image
              src={url}
              alt={name}
              width={240}
              height={192}
              style={{ objectFit: "contain" }}
              className="h-48 w-60"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

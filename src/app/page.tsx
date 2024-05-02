import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="flex flex-wrap gap-4">
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
  return images.map(({ url, name, id }) => (
    <div className="flex w-60 flex-col" key={id}>
      <img src={url} className="h-40 w-60" />
      <div className="truncate ">{name}</div>
    </div>
  ));
}

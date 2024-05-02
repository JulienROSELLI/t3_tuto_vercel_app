import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

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
  const images: {
    id: number;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[] = await db.query.images.findMany();
  return images.map(({ url, name, id }) => (
    <div className="flex flex-col" key={id}>
      <img src={url} className="h-40 w-60" />
      <div>{name}</div>
    </div>
  ));
}

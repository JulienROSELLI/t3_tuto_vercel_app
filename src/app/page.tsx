import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  return (
    <main className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div className="flex flex-col" key={image.id}>
          <img src={image.url} className="h-40 w-48" />
          <div>{image.name}</div>
        </div>
      ))}
    </main>
  );
}

import Link from "next/link";
const mockUrls = [
  "https://images.unsplash.com/photo-1640552435388-a54879e72b28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGludXh8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1549605659-32d82da3a059?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGludXh8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGludXh8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGludXh8ZW58MHx8MHx8fDA%3D",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="flex flex-wrap gap-4">
      {[...mockImages, ...mockImages, ...mockImages].map((image) => (
        <div key={image.id} className="w-48 ">
          <img src={image.url} />
        </div>
      ))}
    </main>
  );
}

import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function PhotoModalComponent(props: { id: number }) {
  const image = await getImage(props.id);

  const userInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 ">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          className="flex-shrink object-contain"
          alt={image.name}
        />
      </div>
      <div className="flex  w-48 flex-shrink-0 flex-col gap-2 border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{userInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created on</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(props.id);
            }}
          >
            <Button type="submit" className="" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

import PhotoModalComponent from "~/components/PhotoModalComponent";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return (
    <div className="h-full ">
      <PhotoModalComponent id={idAsNumber} />
    </div>
  );
}

import PhotoModalComponent from "~/components/PhotoModalComponent";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: number };
}) {
  return <PhotoModalComponent id={photoId} />;
}

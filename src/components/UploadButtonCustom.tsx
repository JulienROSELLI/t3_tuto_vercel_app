"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

import { toast } from "sonner";

import { useUploadThing } from "utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

/**
 * SimpleUploadButton component that allows users to upload images.
 *
 * This component renders a label and an input element for file upload.
 * When the user selects files to upload, the `onChange` event handler is called,
 * which starts the upload process.
 * After the upload process is complete, the `onClientUploadComplete` function is called,
 * which dismisses the loading spinner and displays a success message using the `toast` function.
 * The `useRouter` hook is used to refresh the page when the upload is complete.
 */
export default function SimpleUploadButton() {
  // Get the router object using the `useRouter` hook
  const router = useRouter();
  const posthog = usePostHog();

  // Call the `useUploadThingInputProps` function to get the input props
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    /**
     * Handler function that is called when the upload process begins.
     *
     * This function is triggered when the user starts uploading files. It shows
     * a loading spinner and a message to indicate that the upload is in progress.
     * The loading spinner is displayed using the `LoadingSpinnerSVG` component,
     * and the message is displayed using the `toast` function from the `sonner`
     * library. The `Infinity` duration is used to keep the toast message visible
     * until it is dismissed manually. The unique identifier `"upload-begin"` is
     * passed to the `toast` function to allow for dismissing this specific toast
     * message at a later time.
     */
    onUploadBegin() {
      posthog.capture("upload_begin");
      // Show a loading spinner and a message to indicate that the upload is in progress
      toast(
        <div className="flex items-center gap-2 text-white">
          {/* Display the loading spinner */}
          <LoadingSpinnerSVG />
          {/* Display the message */}
          Uploading...
        </div>,
        {
          // Set the duration to Infinity to keep the toast message visible until it is dismissed manually
          duration: Infinity,
          // Set the unique identifier to "upload-begin" to allow for dismissing this specific toast message at a later time
          id: "upload-begin",
        },
      );
    },
    /**
     * Handler function that is called when the client-side upload process is complete.
     *
     * This function is triggered when the client-side upload process is complete.
     * It dismisses the loading spinner and displays a success message using the `toast` function.
     * It also refreshes the page using the `router.refresh` function.
     */
    onClientUploadComplete() {
      // Dismiss the loading spinner and display a success message
      toast.dismiss("upload-begin");
      toast("Upload complete!");
      // Refresh the page
      router.refresh();
    },
    onUploadError: (error) => {
      posthog.capture("Upload error", { error });
      toast.error("Upload failed");
    },
  });

  return (
    <div>
      {/* Render a label and an input element for file upload */}
      <label htmlFor="upload-button">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}

// };

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );
}

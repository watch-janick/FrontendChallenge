// components/app/ImageUploadField.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CircleUserRound, X } from "lucide-react";
import React, { HTMLAttributes, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  direction?: "row" | "column";
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = "Picture",
  direction = "row",
  className,
  ...rest
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
  });

  const handleDelete = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div
      className={cn(
        "w-full",
        {
          "flex flex-col gap-2": direction === "column",
          "grid grid-cols-3 items-center gap-4": direction === "row",
        },
        className
      )}
      {...rest}
    >
      <Label htmlFor="image-upload" className={cn({ "text-right": direction === "row" })}>
        {label}
      </Label>
      <div
        className={cn("flex flex-col items-center justify-center gap-2", {
          "col-span-2": direction === "row",
        })}
      >
        {preview ? (
          <div className="relative">
            {/* We disable the warning because we don't need any optimisation as we're using the base64 encoded version of the image for this test purpose. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto max-h-40 rounded-md object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0"
              onClick={handleDelete}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              "border border-dashed rounded-lg p-3 flex flex-col items-center text-center cursor-pointer text-sm dark:text-gray-100 text-foreground gap-1",
              isDragActive ? "border-primary" : "border-muted-foreground"
            )}
          >
            <input {...getInputProps()} id="image-upload" />
            <CircleUserRound className="size-10" strokeWidth={1} />
            <p>Drag & drop an image or click to select one</p>
          </div>
        )}
      </div>
    </div>
  );
};

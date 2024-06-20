"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ConfirmAdultEdit from "./ConfirmAdultEdit";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ConfirmEditGuest = () => {
  const [url, setUrl] = useState("");

  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger>
        <p className="underline text-lg font-normal">Edit</p>
      </DialogTrigger>
      <DialogContent className="min-w-max p-0 shadow-md">
        <div className="px-8 py-16">
          <div className="flex flex-col gap-1 mb-8">
            <h2 className="text-2xl font-medium mb-8">Guests</h2>
            <div className="flex flex-col gap-6">
              <ConfirmAdultEdit setUrl={setUrl} />
            </div>
          </div>
        </div>
        <div className="flex absolute bottom-4 right-11 gap-2 text-sm">
          <DialogClose className="px-3 py-2 underline text-black/90">
            Cancel
          </DialogClose>
          <DialogClose
            className="bg-black/90 px-3 py-2 rounded-lg text-white"
            onClick={() => {
              if (url === "") return;
              router.push(url);
            }}
          >
            Save
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmEditGuest;

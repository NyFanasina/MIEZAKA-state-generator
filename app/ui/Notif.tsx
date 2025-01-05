"use client";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { resolveValue, Toaster } from "react-hot-toast";

export default function Notif() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Define default options
        duration: 5000,

        // Default options for specific types
        success: {
          duration: 3000,
        },
      }}
    >
      {(t) => (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{resolveValue(t.message, t)}</div>
          <Toast.Toggle />
        </Toast>
      )}
    </Toaster>
  );
}

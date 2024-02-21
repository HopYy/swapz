"use client"

import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner color="danger" />
    </div>
  );
}

import type React from "react";
import { DataForm } from "./form";
import MyForm from "./myform";

const actions = [
  { value: 1, label: "Action 1", channels: ["Channel A", "Channel B"] },
  { value: 2, label: "Action 2", channels: ["Channel B", "Channel C"] },
  { value: 3, label: "Action 3", channels: ["Channel D"] },
  { value: 4, label: "Action 4", channels: ["Channel E", "Channel F"] },
  // Add more actions as needed
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <DataForm />
      </div> */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <MyForm actions={actions} />
      </div>
    </main>
  );
}

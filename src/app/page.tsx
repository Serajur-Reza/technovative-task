import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 font-sans ">
      <ul className="text-xl flex justify-between w-[150px]">
        <Link href={"/assets"}>Asset</Link>
        <Link href={"/policy"}>Policy</Link>
      </ul>
    </div>
  );
}

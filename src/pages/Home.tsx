import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  return (
    <main className="w-full antialiased h-full">
      <div className="w-fit flex flex-col items-center">
        <Input type={"text"} />
        <h1 className="text-white text-2xl font-sans font-semibold">{count}</h1>

        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </main>
  );
}

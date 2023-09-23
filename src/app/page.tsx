"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import ImprovedPrompt from "@/components/improvedPrompt";
import Input from "@/components/input";

import Robot from "../../assets/robot.png";

export default function Home() {
  const [error, setError] = useState<string>();
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [improvedPrompts, setImprovedPrompts] = useState<
    { ogPrompt: string; improvedPrompts: string; id: string }[]
  >();
  const id = Math.random().toString(36).substring(7);

  const getData = async () => {
    try {
      if (userPrompt === "") return;
      const data = await axios.post("/api/prompts", { prompt: userPrompt });
      const response = data.data.prompt.choices[0].message.content;
      if (response === "no prompt") {
        setError("Invalid prompt. Please try again...");
        setTimeout(() => {
          setError(undefined);
        }, 2000);
        return;
      }
      improvedPrompts &&
        localStorage.setItem(
          "improvedPrompts",
          JSON.stringify([
            ...improvedPrompts,
            { id, ogPrompt: userPrompt, improvedPrompts: response },
          ])
        );
      setImprovedPrompts((pre: any) => [
        ...pre,
        { id, ogPrompt: userPrompt, improvedPrompts: response },
      ]);
      setUserPrompt("");
      console.log(data);
    } catch (err) {
      setError("Something went wrong. Please try again...");
      setTimeout(() => {
        setError(undefined);
      }, 2000);
      return;
    }
  };

  useEffect(() => {
    setImprovedPrompts(
      JSON.parse(localStorage.getItem("improvedPrompts") as string) || []
    );
  }, []);

  const handleDelete = (id: string) => {
    const newPrompts = improvedPrompts?.filter((e) => e.id !== id);
    localStorage.setItem("improvedPrompts", JSON.stringify(newPrompts));
    setImprovedPrompts(newPrompts);
  };

  return (
    <main className="flex flex-col items-center h-screen mt-6">
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md">{error}</div>
      )}
      <Image
        src={Robot}
        alt="Robot"
        className="inline-block"
        width={50}
        height={50}
      />
      <h1 className="text-5xl text-center header mt-5">Improve My Prompt </h1>
      <Input handleSubmit={getData} setText={setUserPrompt} text={userPrompt} />
      {
        <div
          className="flex flex-col items-center mt-5 w-full max-w-lg px-3 max-h-[60vh] min-h-[60vh] overflow-auto"
          style={{
            gap: "1rem",
          }}
        >
          {improvedPrompts?.map(({ ogPrompt, improvedPrompts, id }, index) => (
            <ImprovedPrompt
              key={index}
              ogPrompt={ogPrompt}
              improvedPrompt={improvedPrompts}
              handleDelete={() => {
                handleDelete(id);
              }}
            />
          ))}
        </div>
      }
    </main>
  );
}

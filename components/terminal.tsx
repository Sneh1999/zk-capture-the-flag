import { executeTransaction } from "@/utils/executeTransaction";
import { generateProof } from "@/utils/generateProof";
import { useState } from "react";
import Terminal, { ColorMode } from "react-terminal-ui";
import { useAccount } from "wagmi";

const HINTS = [
  "I determine true or false conditions.",
  "I deal with binary logic, often denoted by 0 and 1.",
  "I govern decision-making in programming.",
];

export const TerminalController: React.FC = (props = {}) => {
  const { address } = useAccount();

  const [outputMessages, setOutputMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (terminalInput: string) => {
    if (terminalInput === "help") {
      setOutputMessages([
        ...outputMessages,
        "Available commands: `help`, `hint`, `submit [ANSWER]`",
      ]);
    } else if (terminalInput === "hint") {
      const randomHint = HINTS[Math.floor(Math.random() * HINTS.length)];
      setOutputMessages([...outputMessages, randomHint]);
    } else if (terminalInput === "clear") {
      setOutputMessages([]);
    } else if (terminalInput.startsWith("submit ")) {
      const answer = terminalInput.split(" ")[1];

      if (!answer) {
        setOutputMessages([
          ...outputMessages,
          "Please provide an answer to submit.",
        ]);
        return;
      }

      submitAnswer(answer);
    }
  };

  const submitAnswer = async (secret: string) => {
    throw new Error("Not implemented");
  };

  return (
    <Terminal colorMode={ColorMode.Dark} onInput={handleInput} height={"24rem"}>
      <div className="flex flex-col gap-2 text-pretty">
        <p className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent flex flex-col gap-1 items-center">
          <span>In code, I’m the switch, the decisive force,</span>
          <span>True or false, I set the course.</span>
          <span>Logic&apos;s gate, I do define,</span>
          <span>With binary power, I intertwine.</span>

          <span>What am I?</span>
        </p>

        <span>
          Available commands: `help`, `hint`, `submit [ANSWER]`, and `clear`
        </span>

        {outputMessages.map((message, index) => (
          <span key={index} className="whitespace-pre-wrap break-words">
            {message}
          </span>
        ))}

        {isLoading && <span>Loading...</span>}
      </div>
    </Terminal>
  );
};

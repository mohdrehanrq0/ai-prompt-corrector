import React from "react";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const Input = ({ text, setText, handleSubmit }: IProps) => {
  return (
    <form
      className="w-full max-w-lg mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-wrap mx-3 mb-6">
        <div className="w-full px-3">
          <label
            htmlFor="grid-text"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Enter the prompt
          </label>
          <input
            id="grid-text"
            type="text"
            placeholder="Enter a prompt.."
            className="appearance-none block w-full bg-gray-100 border border-gray-200 rounded px-3 py-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Improve
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-xs italic px-6">
        Enter a prompt to get started
      </p>
    </form>
  );
};

export default Input;

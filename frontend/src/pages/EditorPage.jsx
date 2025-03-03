import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const socket = io("http://localhost:5000");

const EditorPage = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  console.log("Room ID:", roomId); // Debugging

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is null! Check your URL.");
      return;
    }

    socket.emit("join-room", roomId);
    console.log(`Joining room: ${roomId}`); // Debugging

    socket.on("receive-changes", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, [roomId]);

  const handleChange = (newValue) => {
    setCode(newValue);
    socket.emit("code-change", { roomId, code: newValue });
  };

  const handleRun = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/codeSnippets/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, code, language }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Code snippet saved successfully.");
      } else {
        alert("Failed to save code snippet.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleLoad = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/codeSnippets/load/${roomId}`);
      const data = await response.json();
      if (data.success) {
        setCode(data.code);
        setLanguage(data.language);
      } else {
        alert("No code snippet found for this room.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "cpp":
        return cpp();
      case "java":
        return java();
      case "python":
        return python();
      default:
        return javascript();
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <button
          onClick={handleRun}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Run
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save to Cloud
          </button>
          <button
            onClick={handleLoad}
            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Load Saved Code
          </button>
        </div>
      </div>
      <CodeMirror
        value={code}
        height="500px"
        theme={vscodeDark}
        extensions={[getLanguageExtension()]}
        onChange={handleChange}
        className="w-full max-w-4xl"
      />
      <div className="w-full max-w-4xl bg-gray-100 p-4 rounded mt-4">
        <h3 className="text-lg font-bold">Output:</h3>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default EditorPage;
import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-julia";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "./loader.css";
// import imageUrlTest from "./src/Un.png";
import { Link } from "react-router-dom";

function Editor() {
  const [code, setCode] = useState(`@def ocp begin
    t ∈ [ 0, 1 ], time
    x ∈ R², state
    u ∈ R, control
    x(0) == [ -1, 0 ]
    x(1) == [ 0, 0 ]
    ẋ(t) == [ x₂(t), u(t) ]
    ∫( 0.5u(t)^2 ) → min
    end`);

  const [exploring, setexploring] = useState(false); // to comment

  console.log(code);

  const latexSymbols = {
    "\\sqrt": "\u221A",
    "\\cbrt": "\u221B",
    "\\female": "♀",
    "\\mars": "♂",
    "\\pprime": "″",
    "\\ppprime": "‴",
    "\\pppprime": "⁗",
    "\\backpprime": "‶",
    "\\backppprime": "‷",
    "\\xor": "⊻",
    "\\nand": "⊼",
    "\\nor": "⊽",
    "\\iff": "⟺",
    "\\implies": "⟹",
    "\\impliedby": "⟸",
    "\\to": "→",
    "\\euler": "ℯ",
    "\\ohm": "Ω",
    "\\Sigma": "Σ",
    "\\Tau": "Τ",
    "\\Phi": "Φ",
    "\\Psi": "Ψ",
    "\\Omega": "Ω",
    "\\alpha": "α",
    "\\beta": "β",
    "\\gamma": "γ",
    "\\delta": "δ",
    "\\zeta": "ζ",
    "\\eta": "η",
    "\\theta": "θ",
    "\\lambda": "λ",
    "\\mu": "μ",
    "\\xi": "ξ",
    "\\pi": "π",
    "\\rho": "ρ",
    "\\sigma": "σ",
    "\\tau": "τ",
    "\\varphi": "φ",
    "\\psi": "ψ",
    "\\omega": "ω",
    "\\phi": "ϕ",
    "\\^1": "¹",
    "\\^2": "²",
    "\\^3": "³",
    "\\dot": "̇",
    "\\ddot": "̈",
  };

  const [isRunning, setIsRunning] = useState(false);

  // this function has been tested :
  // if the inputstring is in latexSymbols , its converted , otherwise the original string is outputted
  function convertWord(inputString) {
    // console.log(inputString);
    // var back = "\\" + inputString;
    const result = latexSymbols[inputString.toLowerCase()] || inputString;
    return result;
  }

  // console.log("\\alpha" == convertWord("\\alpha"));

  function convertString(inputString) {
    // console.log("convertString accessed !");
    const splittedArray = inputString.split(" ");
    const newArr = [];
    // console.log(splittedArray); // works
    for (let i = 0; i < splittedArray.length; i++) {
      // console.log(myArray[i]);
      newArr[i] = convertWord(splittedArray[i]);
    }
    // console.log(newArr);
    var outputString = newArr.join(" ");

    // console.log(newArr);
    // console.log(outputString);
    return outputString;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCode(e.target.result);
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a .txt file.");
      }
    }
  };

  const [imageUrl, setImageUrl] = useState("./logo-toulouse-inp-N7.png");

  const handleRunButtonClick = async () => {
    // Pass 'code' as an argument
    var coded = code + "";
    // console.log(code.value);
    console.log(coded);
    console.log(JSON.stringify(coded));
    try {
      const response = await fetch(
        "http://localhost:5144/api/JuliaAPI/runString",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coded), // Send 'code' as the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }

      // Parse the response as a blob (binary data)
      const imageBlob = await response.blob();

      // Create a URL for the blob data
      const i = URL.createObjectURL(imageBlob);

      // Set the image URL state
      setImageUrl(i);
      setIsRunning(true);
      console.log(isRunning);
    } catch (error) {
      console.log("an error has occured :");
      console.error("Error:", error);
      // Handle error here
    }
  };

  // var imageUrlTest = "./src/Un.png";

  // const handleRunButtonClick = () => {
  //   setIsRunning(true);
  //   console.log(code);
  // };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "52%",
          margin: "16px",
          maxWidth: "800px",
          height: "580px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#24292e",
        }}
      >
        <div className="icons">
          <h4>Julia: High-Speed Computing</h4>

          <div className="pointSvg">
            <svg
              onClick={handleRunButtonClick}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              width="20px"
              height="20px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </div>

          <div className="pointSvg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              width="20px"
              height="20px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
              />
            </svg>
          </div>

          <div>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              id="fileUpload"
            />
            <label htmlFor="fileUpload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                width="20px"
                height="20px"
                style={{ cursor: "pointer" }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
            </label>
          </div>
        </div>
        <AceEditor
          value={code}
          mode="julia"
          theme="github_dark"
          fontSize="16px"
          highlightActiveLine={true}
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            tabSize: 2,
            useWorker: false,
          }}
          style={{
            width: "100%", // Adjusted width
            height: "100%",
            borderRadius: "8px",
            backgroundColor: "#24292e",
          }}
          // onChange={(newCode) => setCode(newCode)} // Add this onChange handler
          onChange={(newCode) => {
            // console.log("onchange");
            var newstr = convertString(newCode);
            setCode(newstr);
            // console.log(code);
          }} // Add this onChange handler
        />

        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <button className="button-62 button-color2" style={{ marginRight: '50px',width: '150px' }}>Save</button>
          <label htmlFor="file-upload" className="button-62 button-color1" style={{ marginRight: '50px', width: '100px', cursor: 'pointer' }}>Upload</label>
          <input type="file" id="file-upload" accept=".txt" style={{ display: 'none' }} onChange={handleFileUpload} />
          <button className="button-62 button-color3" style={{ width: '150px' }} onClick={handleRunButtonClick}>Run</button>
        </div> */}

        <div
          className="button-62 button-color3"
          style={{
            marginTop: "55px",
            marginBottom: "12px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <Link
            to="/explore"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Explore More Problems
          </Link>
        </div>
      </div>

      <div
        style={{
          width: "48%",
          margin: "16px",
          maxWidth: "800px",
          height: "600px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          position: "relative", // Make the container relative for absolute positioning of the image
        }}
      >
        {isRunning ? (
          <img
            src={imageUrl}
            alt="Your image"
            style={{
              maxWidth: "100%",
              height: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <>
            <div className="overlay2" id="overlay2"></div>
            <div className="loader2">
              <div className="loader-cube2">
                <div className="face2"></div>
                <div className="face2"></div>
                <div className="face2"></div>
                <div className="face2"></div>
                <div className="face2"></div>
                <div className="face2"></div>
              </div>
            </div>
          </>
        )}

        <input
          style={{
            marginTop: "620px",
            marginBottom: "12px",
            width: "710px",
            maxWidth: "800px",
            height: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            position: "relative", // Make the container relative for absolute positioning of the image
            border: "none", // Remove border
            padding: "8px", // Add padding
            fontSize: "16px", // Font size
            outline: "none", // Remove focus outline
          }}
          type="text"
          placeholder="Type your parameters "
        />
      </div>
    </div>
  );
}

export default Editor;

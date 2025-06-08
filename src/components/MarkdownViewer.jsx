// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
// // import "katex/dist/katex.min.css"; // Import KaTeX styles

// const MarkdownViewer = () => {
//   const problems = {
//     problem1: "# Problem 1\nSolve $$ x^2 + 2x - 3 = 0 $$.",
//     problem2: "# Problem 2\nEvaluate: $$\\int_0^1 x^2 \\,dx$$",
//     problem3: "# Problem 3\nFind the derivative of $$ f(x) = x^3 + 2x $$.",
//     problem4: `# Problem A : Efficient Data Routing

// ## **Problem Description**
// In a large-scale distributed system, data packets must be routed between servers efficiently. Each server is represented as a node in a network graph, and direct connections between servers are represented as edges with an associated cost. The goal is to determine the minimum cost required to send a data packet from a given source server to a destination server.

// You are given a weighted undirected graph with **N** nodes (servers) and **M** edges (connections). Each edge has a cost representing the time required to transmit data.  
// Given multiple queries, each asking for the **minimum cost** to transfer data between two specific servers, determine the shortest path cost or report if no such path exists.
// `
//   };

//   const [markdown, setMarkdown] = useState(problems.problem1);

//   return (
//     <div style={{ padding: "20px", maxHeight : "calc(100vh - 100px)",border: "2px solid #f5f5f5" , width: "40vw" , marginTop: "30px", overflowY : "scroll"}}>
//       <h2>Select a Problem</h2>
//       <select onChange={(e) => setMarkdown(problems[e.target.value])}>
//         <option value="problem1">Problem 1</option>
//         <option value="problem2">Problem 2</option>
//         <option value="problem3">Problem 3</option>
//         <option value="problem4">Problem A</option>
//       </select>
      
//       <div style={{ marginTop: "0px", padding: "10px", border: "1px solid #ddd" }}>
//         <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
//           {markdown}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default MarkdownViewer;

import React, { useEffect, useState } from "react";
import {marked} from "marked";

const MarkdownViewer = ({problem , link}) => {
  const [markdown, setMarkdown] = useState("");
  // console.log(link)
  const Headers = {
    'Content-Type': 'text/html',
    'x-problem-name': `${problem}`
  };
  useEffect(() => {
    fetch(link , {method : 'GET' , headers: Headers
    })
      .then((res) => res.text())
      .then((text) => setMarkdown(marked.parse(text)))
      .catch((err) => {
        console.error("Error loading markdown:", err);
        setMarkdown("<p>Error loading content</p>");
      });
  }, []);

  return <div style={{padding:"20px", border:"2px solid #d9d9d9", fontFamily:"JetBrains Mono"}} dangerouslySetInnerHTML={{ __html: markdown }} />;
};

export default MarkdownViewer;


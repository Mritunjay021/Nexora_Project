// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// // Setup Gemini client using Google Generative AI SDK
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// // Create MCP server
// const server = new McpServer(
//   {
//     name: "gemini-mcp-server",
//     version: "1.0.0",
//   },
//   {
//     capabilities: { tools: {} },
//   }
// );

// // Define a tool directly
// server.tool("askGemini", {
//   description: "Ask Gemini a question and get a direct answer.",
//   inputSchema: {
//     type: "object",
//     properties: {
//       prompt: {
//         type: "string",
//         description: "The question you want to ask Gemini.",
//       },
//     },
//     required: ["prompt"],
//   },
//   execute: async ({ prompt }) => {
//     try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text() || "No response from Gemini.";


//       return {
//         type: "text",
//         text,
//       };
//     } catch (err) {
//       console.error("Gemini API error:", err);
//       return {
//         type: "text",
//         text: "Error calling Gemini API",
//       };
//     }
//   },
// });

// // Start server with stdio transport
// async function startServer() {
//   console.log("🚀 Starting Gemini MCP Server...");
//   const transport = new StdioServerTransport();
//   await server.connect(transport);
//   console.log("✅ Gemini MCP Server running, ready for requests.");
// }

// startServer();


// testClient.js (with safer logging)

// import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// // import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// dotenv.config();

// // --- START: Added Validation ---
// const apiKey = process.env.GEMINI_API_KEY;
// if (!apiKey) {
//   // Use console.error so the client can see this message
//   console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
//   // Exit the process cleanly to prevent a crash
//   process.exit(1);
// }
// // --- END: Added Validation ---

// // Setup Gemini client using the validated API key
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// // ... the rest of your server code remains the same ...


// async function testGeminiMCPServer() {
//   let client = null;

//   try {
//     console.log("🚀 Initializing transport to start the server...");

//     const transport = new StdioClientTransport({
//       command: "node",
//       args: ["geminiMCPServer.js"],
//     });

//     client = new Client(
//       { name: "test-client", version: "1.0.0" },
//       { capabilities: {} }
//     );
    
//     await client.connect(transport);
//     console.log("✅ Server started and client connected.");

//     console.log("\n💬 Testing askGemini tool...");
//     const result = await client.callTool({
//       name: "askGemini",
//       arguments: { 
//         prompt: "What is the capital of India? Give a brief answer." 
//       },
//     });

//     console.log("✅ Response from Gemini:");
    
//     // Log the entire raw result object for debugging
//     console.log("--- Raw Server Response ---");
//     console.log(JSON.stringify(result, null, 2));
//     console.log("---------------------------");

//     // Add a check to prevent the crash
//     if (result && result.result && result.result.text) {
//       console.log(result.result.text);
//     } else {
//       console.error("❌ Client Error: Server returned an unexpected or empty result object.");
//     }

//   } catch (error) {
//     console.error("❌ Test failed:", error);
//   } finally {
//     if (client) {
//       await client.close();
//     }
//     console.log("🧹 Cleanup completed");
//   }
// }

// testGeminiMCPServer();

// geminiMCPServer.js (Final, Robust Version)

// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// // --- START: Added Validation ---
// const apiKey = process.env.GEMINI_API_KEY;
// if (!apiKey) {
//   // Use console.error so the client can see this message
//   console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
//   // Exit the process cleanly to prevent a crash
//   process.exit(1);
// }
// // --- END: Added Validation ---

// // Setup Gemini client using the validated API key
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// // ... the rest of your server code remains the same ...


import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const server = new McpServer(
  { name: "gemini-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.tool("askGemini", {
  description: "Ask Gemini a question and get a direct answer.",
  inputSchema: {
    type: "object",
    properties: {
      prompt: { type: "string", description: "India capital in breif" },
    },
    required: ["prompt"],
  },
  execute: async ({ prompt }) => {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text() || "No response from Gemini.";
      return { type: "text", text };
    } catch (err) {
      console.error("Gemini API error:", err);
      return { type: "text", text: "Error calling Gemini API" };
    }
  }
});

async function startServer() {
  console.log("🚀 Starting Gemini MCP Server...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("✅ Gemini MCP Server running, ready for requests.");
}
startServer();

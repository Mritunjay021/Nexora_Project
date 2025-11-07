// // import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// // import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// // import { spawn } from "child_process";
// // import { Readable, Writable } from "stream";

// // async function testGeminiMCPServer() {
// //   let serverProcess = null;
// //   let client = null;

// //   try {
// //     console.log("🚀 Starting Gemini MCP Server...");
    
// //     // Start the server process
// //     serverProcess = spawn("node", ["geminiMCPServer.js"], {
// //       stdio: ["pipe", "pipe", "pipe"],
// //       shell: true
// //     });

// //     // Wait for server to start
// //     await new Promise(resolve => setTimeout(resolve, 2000));

// //     if (!serverProcess.stdout || !serverProcess.stdin) {
// //       throw new Error("Failed to initialize server process streams");
// //     }

// //     // Create client transport
// //     const transport = new StdioClientTransport();
    
// //     // Pipe the streams
// //     // serverProcess.stdout.pipe(process.stdout);
// //     // process.stdin.pipe(serverProcess.stdin);
// //     serverProcess.stderr.pipe(process.stderr);

// //     // Create and connect client
// //     client = new Client(
// //       { name: "test-client", version: "1.0.0" },
// //       { capabilities: {} }
// //     );

// //     try {
// //       await client.connect(transport);
// //       console.log("✅ Connected to server");
// //     } catch (error) {
// //       console.error("Failed to connect to server:", error.message);
// //       throw error;
// //     }

// //     // Test the askGemini tool
// //     console.log("\n💬 Testing askGemini tool...");
// //     const result = await client.callTool({
// //       name: "askGemini",
// //       arguments: { 
// //         prompt: "What is the meaning of life? Give a brief answer." 
// //       }
// //     });

// //     console.log("✅ Response from Gemini:");
// //     console.log(result.content[0].text);

// //   } catch (error) {
// //     console.error("❌ Test failed:", error);
// //   } finally {
// //     // Cleanup
// //     if (client) {
// //       await client.close();
// //     }
// //     if (serverProcess) {
// //       serverProcess.kill();
// //     }
// //     console.log("🧹 Cleanup completed");
// //   }
// // }

// // testGeminiMCPServer();


// // import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// // import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// // import { spawn } from "child_process";
// // import { Readable, Writable } from "stream";

// // async function testGeminiMCPServer() {
// //   let serverProcess = null;
// //   let client = null;

// //   try {
// //     console.log("🚀 Starting Gemini MCP Server...");
    
// //     // Start the server process
// //     serverProcess = spawn("node", ["geminiMCPServer.js"], {
// //       stdio: ["pipe", "pipe", "pipe"],
// //       // Note: shell: true can sometimes cause issues. It's often safer to set it to false
// //       // unless you specifically need shell features. It should work either way here.
// //       shell: true 
// //     });

// //     // Wait for server to start
// //     await new Promise(resolve => setTimeout(resolve, 2000));

// //     if (!serverProcess.stdout || !serverProcess.stdin) {
// //       throw new Error("Failed to initialize server process streams");
// //     }

// //     // Create client transport by giving it the server's streams to read/write from
// //     const transport = new StdioClientTransport(
// //       serverProcess.stdout,
// //       serverProcess.stdin
// //     );
    
// //     // Keep this line to see any errors from the server process
// //     serverProcess.stderr.pipe(process.stderr);

// //     // Create and connect client
// //     client = new Client(
// //       { name: "test-client", version: "1.0.0" },
// //       { capabilities: {} }
// //     );

// //     try {
// //       await client.connect(transport);
// //       console.log("✅ Connected to server");
// //     } catch (error) {
// //       console.error("Failed to connect to server:", error.message);
// //       throw error;
// //     }

// //     // Test the askGemini tool
// //     console.log("\n💬 Testing askGemini tool...");
// //     const result = await client.callTool({
// //       name: "askGemini",
// //       arguments: { 
// //         prompt: "What is the meaning of life? Give a brief answer." 
// //       }
// //     });

// //     console.log("✅ Response from Gemini:");
// //     // The result from a tool call is an object, access the content like this:
// //     console.log(result.result.text);

// //   } catch (error) {
// //     console.error("❌ Test failed:", error);
// //   } finally {
// //     // Cleanup
// //     if (client) {
// //       await client.close();
// //     }
// //     if (serverProcess) {
// //       serverProcess.kill();
// //     }
// //     console.log("🧹 Cleanup completed");
// //   }
// // }

// // testGeminiMCPServer();

// // testClient.js (Final Corrected Version)

// import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// // We no longer need to import spawn
// // import { spawn } from "child_process";

// async function testGeminiMCPServer() {
//   // We no longer need a separate serverProcess variable
//   let client = null;

//   try {
//     console.log("🚀 Initializing transport to start the server...");

//     // 1. Configure the transport with the command to run.
//     // It will automatically start the server when client.connect() is called.
//     const transport = new StdioClientTransport({
//       command: "node",
//       args: ["geminiMCPServer.js"],
//     });

//     // 2. Create the client as usual
//     client = new Client(
//       { name: "test-client", version: "1.0.0" },
//       { capabilities: {} }
//     );
    
//     // 3. This will now start the server and connect to it.
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
//     console.log(result.result.text);

//   } catch (error) {
//     console.error("❌ Test failed:", error);
//   } finally {
//     // 4. Closing the client will now also automatically terminate the server process.
//     if (client) {
//       await client.close();
//     }
//     console.log("🧹 Cleanup completed");
//   }
// }

// testGeminiMCPServer();


import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function testGeminiMCPServer() {
  let client = null;

  try {
    console.log("🚀 Initializing transport to start the server...");

    const transport = new StdioClientTransport({
      command: "node",
      args: ["geminiMCPServer.js"],
    });

    client = new Client(
      { name: "test-client", version: "1.0.0" },
      { capabilities: {} }
    );

    await client.connect(transport);
    console.log("✅ Server started and client connected.");

    console.log("\n💬 Testing askGemini tool...");
    const result = await client.callTool({
      name: "askGemini",
      arguments: { prompt: "What is the capital of India? Give a brief answer." },
    });

    console.log("✅ Response from Gemini:");
    console.log("--- Raw Server Response ---\n" + JSON.stringify(result, null, 2) + "\n---------------------------");

    // Defensive check, log answer...
    if (result && result.result && typeof result.result.text === "string") {
      console.log("Gemini says:", result.result.text);
    } else if (result && result.content && result.content[0]?.text) {
      // fallback for some SDK versions
      console.log("Gemini says:", result.content[0].text);
    } else {
      console.error("❌ Client Error: Server returned an unexpected or empty result object.");
    }

  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    if (client) {
      await client.close();
    }
    console.log("🧹 Cleanup completed");
  }
}

testGeminiMCPServer();

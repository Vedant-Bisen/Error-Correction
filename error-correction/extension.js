// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const { spawn } = require("child_process");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

let terminal;

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("error-correction.helloWorld", () => {
      terminal = terminal || vscode.window.createTerminal("Error Correction");
      terminal.show();

      const process = spawn("cd");
      let data = "";

      process.stdout.on("data", (chunk) => {
        data += chunk.toString();
      });

      process.on("close", (code) => {
        fs.writeFile("output.txt", data, (err) => {
          console.log("file created");

          if (err) {
            return console.log(err);
          }
        });
      });
    })
  );
}
exports.activate = activate;

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

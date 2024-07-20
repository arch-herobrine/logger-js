const fs = require("node:fs");
const cp = require("node:child_process");

try {
    fs.rmdirSync("./dist");
} catch (e) {
    console.log();
}
cp.execSync("npx tsc");

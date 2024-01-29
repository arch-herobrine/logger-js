import fs from "node:fs"
import cp from "node:child_process"

try {
    fs.rmdirSync("./dist");
} catch (e) {
    console.log();
}
cp.execSync("npx tsc");

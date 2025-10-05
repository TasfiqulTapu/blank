#!/usr/bin/env node

import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import data from "./data.js"
const currentDirectory = process.cwd();

console.log(data);
const files = readdirSync(currentDirectory, "utf-8");

if(files.includes("package.json"))
    console.log("this directory contain a package.json.\nAre you sure you want to create a new package?");
else{
    const packagePath = path.join(currentDirectory, "package.json");
    // writeFileSync(packagePath, )
}
const contents = data["package.json"];
contents.name = path.basename(process.cwd());
console.log(`Creating package.json`);
console.log(contents);

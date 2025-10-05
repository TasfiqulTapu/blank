#!/usr/bin/env node

import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import data from "./data.js"

const currentDirectory = process.cwd();
const files = readdirSync(currentDirectory, "utf-8");

if(files.includes("package.json"))
    console.log("😾 This directory contains a \x1b[;33mpackage.json\x1b[;0m.\nAre you sure you want to create a new package?");
else{
    const packagePath = path.join(currentDirectory, "package.json");
    const pjContents = data["package.json"];
    pjContents.name = path.basename(process.cwd());
    console.log(`Creating package.json`);
    console.log(pjContents);
    writeFileSync(packagePath, JSON.stringify(pjContents, null, 4));
    console.log("😸 package.json created!");
}
if(files.includes(".gitignore")) 
    console.log("😾 This directory contains a \x1b[;33m.gitignore\x1b[;0m.\nAre you sure you want to create a new package?");
else{ 
    const gitignorePath = path.join(currentDirectory, ".gitignore");
    const giContents = data[".gitignore"];
    console.log(`Creating .gitgnore`);
    console.log(giContents);
    writeFileSync(gitignorePath, giContents);
    console.log("😸 .gitignore created!");

}

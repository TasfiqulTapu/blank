#!/usr/bin/env node

import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import data from "./data.js"
import { diffieHellman } from 'crypto';

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
if(process.argv.length >=3 && process.argv[2].toLowerCase() == "license" && !files.includes("LICENSE")){
    
    let license = data["license"]["MIT"]
    const licensePath = path.join(currentDirectory, "LICENSE");
    if(process.argv.length > 3){
        switch (process.argv[3].toUpperCase()) {
            case "MIT":
                license = data["license"]["MIT"]
                break;
        // TODO: Add API to load licenses
        // https://opendefinition.org/licenses/api/
            default:
                console.log("😿 License not found. Using MIT.")
                break;
        }
    }
    console.log(`Creating LICENSE`);
    console.log(license);
    writeFileSync(licensePath, license);
    console.log("😸 LICENSE created!");

}

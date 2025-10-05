#!/usr/bin/env node

import { readdirSync, writeFileSync, mkdirSync, statSync} from 'fs';
import path from 'path';
import data from "./data.js"

let currentDirectory = process.cwd();
let files = readdirSync(currentDirectory, "utf-8");


if(process.argv.length==2){
    createPackage();
    createGitIgnore();
    createLicense();
}
if(process.argv.length >=3){
    switch (process.argv[2].toLowerCase()) {
        case "package":
        case "pack":
            createPackage()
            break;
        case "gitignore":
        case "gi":
            createGitIgnore()
            break;
        case "license":
        case "lc":
            createLicense()
            break;

        default:
            createScaffold(process.argv[2])
            console.log("que?")
            break;
    }
    
}

function createScaffold(name){
    const dirPath = path.join(currentDirectory, name);
    try {
        const stats = statSync(dirPath);
        if(stats.isDirectory()) console.log("😿 A directory with that name exists.");
    } catch (err) {
        if (err.code === 'ENOENT') {
            // Directory does not exist
            mkdirSync(dirPath);
            currentDirectory = path.join(currentDirectory, name);
            files = []
            createPackage();
            createGitIgnore();
            createLicense();
            return true;
        } else {
        // Other error
        console.log(err)
            console.log("😿 Error making directory.")
            return false;
        }
    }
}


function createPackage(){

    if(files.includes("package.json")){
        console.log("😾 This directory contains a \x1b[;33mpackage.json\x1b[;0m.\nAre you sure you want to create a new package?");
        return 1;
    }

    const packagePath = path.join(currentDirectory, "package.json");
    // TODO: let user choose from templates or input custom data
    const pjContents = data["package.json"];
    pjContents.name = path.basename(process.cwd());
    if(process.argv.length >= 4) pjContents.name = process.argv[3];
    console.log(`Creating package.json`);
    // console.log(pjContents);
    writeFileSync(packagePath, JSON.stringify(pjContents, null, 4));
    console.log("😸 package.json created!");
    return 0;
}

function createGitIgnore(){

    if(files.includes(".gitignore")){
        console.log("😾 This directory contains a \x1b[;33m.gitignore\x1b[;0m.\nAre you sure you want to create a new package?");
        return 1;
    } 

    const gitignorePath = path.join(currentDirectory, ".gitignore");
    // TODO: allow users to choose gitignore template
    const giContents = data[".gitignore"];
    console.log(`Creating .gitgnore`);
    // console.log(giContents);
    writeFileSync(gitignorePath, giContents);
    console.log("😸 .gitignore created!");
    return 0;
}


function createLicense(){

    if(files.includes("LICENSE")){
        console.log("😾 This directory contains a \x1b[;33mLICENSE\x1b[;0m.\nAre you sure you want to create a new license?");
        return 1; 
    }

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
                    console.log("😿 License not specified. Using MIT.")
                    break;
            }
        }
    console.log(`Creating LICENSE`);
    // console.log(license);
    writeFileSync(licensePath, license);
    console.log("😸 LICENSE created!");
    return 0;
}
            

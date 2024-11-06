<!-- write a read me for this app that is a node js project that converts doc or docx files that is given to it by their address to pdf file and the path of the file is given to is with a get request to port 3000 of /convert url -->

# Docx to PDF Converter

This is a simple Node.js project that converts .docx files to .pdf files.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies

## Usage

1. Run `node index.cjs` to convert a .docx file to a .pdf file
2. Send a GET request to `http://localhost:3000/convert?path=/path/to/docx/file` to convert a .docx file to a .pdf file

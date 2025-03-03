import express from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/run', (req, res) => {
  const { code, language } = req.body;
  const fileName = `temp.${language}`;
  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, code);

  let command;
  switch (language) {
    case 'javascript':
      command = `node ${filePath}`;
      break;
    case 'cpp':
      command = `g++ ${filePath} -o temp && ./temp`;
      break;
    case 'java':
      command = `javac ${filePath} && java ${fileName.split('.')[0]}`;
      break;
    case 'python':
      command = `python ${filePath}`;
      break;
    default:
      return res.status(400).json({ output: 'Unsupported language' });
  }

  console.log(`Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    fs.unlinkSync(filePath);
    if (language === 'cpp') {
      fs.unlinkSync('temp'); // Remove the compiled executable for C++
    }
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ output: stderr });
    }
    console.log(`Output: ${stdout}`);
    res.status(200).json({ output: stdout });
  });
});

export default router;
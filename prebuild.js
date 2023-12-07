const { exec } = require("child_process");

exec(
  "cd ./node_modules/shamir-secret-sharing && yarn build && cd ../../",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);

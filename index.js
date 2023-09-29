const core = require('@actions/core');
const github = require('@actions/github');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


try {
  
  const input = core.getInput('input_1');
  console.log(input);
  const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
  const output_1 = 'I am output_1';
  core.info("INFO: input_1 = " + input);
  core.notice("This is a notice");
  core.warning("This is a warning");
  core.error("This is an error");
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);  
  core.setOutput('output_1',output_1);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

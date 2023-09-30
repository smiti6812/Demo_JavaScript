const core = require('@actions/core');
const github = require('@actions/github');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function main(){
try {
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(GITHUB_TOKEN);    
    const { context } = require('@actions/github')
    if (!context.payload.action) {
        core.warning("This action should only be used with pull requests.");
        return;
    }    
    // https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
    if (context.payload.action === "opened") {
      /*
        const randomPos = Math.round(Math.random() * 1000);
        const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
        const response = await fetch(url);
        const { results } = await response.json();
        const gifUrl = results[0].media[0].tinygif.url;
        */
        // add a comment to the PR
        await octokit.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.payload.number,
            body: `Thank you for submitting a pull request! We will try to review this as soon as we can. + \n\n<img src="${gifUrl}" alt="thank you" />`           
          
        });

        // add a label to the PR
        await octokit.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.payload.number,
            labels: ['acknowledged']
        })
    } else {
        return;
    }
  const input = core.getInput('input_1');
  console.log(input);
 
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
}
main();
  

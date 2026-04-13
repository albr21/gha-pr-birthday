module.exports = async ({github, context, core, glob, io, exec, getOctokit}) => {
  core.info('Processing celebrate-pr-birthday.js');
  
  // Getting open pull-request
  core.info('Getting open pull-request');
  let pullRequestList = [];
  let page = 1;
  const perPage = 100;

  try {
    while(true) {
      const response = await github.rest.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
        per_page: perPage,
        page: page
      });

      if (response.data.length === 0) {
        break
      };

      pullRequestList = pullRequestList.concat(response.data);
      page++;
    }
  } catch (err) {
    core.setFailed(`Request failed with error ${err}`);
  }

  core.info('Number of Open pull-request: ' + pullRequestList.length);

  const today = new Date();
  
  // Browse open pull-request and write comment if this is the day
  core.info('Browsing open pull-request');
  for (const pullRequest of pullRequestList) {
    // Check if the PR is open
    if (pullRequest.state !== 'open') {
      continue;
    };

    const createdAt = new Date(pullRequest.created_at);
    const isBirthdayDate = createdAt.getUTCDate() === today.getUTCDate() &&
                           createdAt.getUTCMonth() === today.getUTCMonth() &&
                           createdAt.getUTCFullYear() < today.getUTCFullYear();
    if (isBirthdayDate) {
      const age = today.getUTCFullYear() - createdAt.getUTCFullYear();
      const message = `Automated Message 🤖:

      Happy Birthday! 🎉

      Wishing you a wonderful day as you celebrate ${age} years of your PR. 🌟
      `;
      core.info(`Celebrating birthday for PR #${pullRequest.number}`);
      try {
        await github.rest.issues.createComment({
          issue_number: pullRequest.number,
          owner: context.repo.owner,
          repo: context.repo.repo,
          body: message
        });
      } catch (err) {
        core.setFailed(`Request failed with error ${err}`);
      }
    }
  }
}

const binoculars = require('@foo-software/binoculars').default;
const core = require('@actions/core');
const get = require('lodash.get');
const github = require('@actions/github');

const formatInput = input => {
  if (input === 'true') {
    return true;
  }

  if (input === 'false') {
    return false;
  }

  if (input === '') {
    return undefined;
  }

  return input;
};

(async () => {
  try {
    const urls = formatInput(core.getInput('urls'));
    const commentUrl = core.getInput('commentUrl');
    const prApiUrl =  get(github, 'context.payload.pull_request.url');

    const results = await binoculars({
      author: formatInput(core.getInput('author')),
      awsAccessKeyId: formatInput(core.getInput('awsAccessKeyId')),
      awsBucket: formatInput(core.getInput('awsBucket')),
      awsRegion: formatInput(core.getInput('awsRegion')),
      awsSecretAccessKey: formatInput(core.getInput('awsSecretAccessKey')),
      branch: formatInput(core.getInput('branch')),
      outputDirectory: formatInput(core.getInput('outputDirectory')),
      pr: formatInput(core.getInput('pr')),
      commentAccessToken: formatInput(core.getInput('accessToken')),
      commentUrl: commentUrl || (!prApiUrl ? undefined : `${prApiUrl}/reviews`),
      enableComments: formatInput(core.getInput('enableComments')),
      sha: formatInput(core.getInput('sha')),
      slackWebhookUrl: formatInput(core.getInput('slackWebhookUrl')),
      urls: !urls ? undefined : urls.split('|'),

      // static
      isGitHubAction: true,
    });

    // yikesers - only strings :(
    // https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions#steps-context
    core.setOutput('binocularsResults', JSON.stringify(results));
  } catch (error) {
    core.setFailed(error.message);
  }
})();

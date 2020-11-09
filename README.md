# Binoculars Action

<img alt="Binoculars Logo" align="right" src="https://s3.amazonaws.com/foo.software/images/marketing/binoculars.svg" width="20%" />

A GitHub Action to measure web page SEO friendliness. Binoculars extends [Google's Lighthouse](https://github.com/GoogleChrome/lighthouse) to provide a more opinionated, SEO specific audit. Simple implementation or advanced customization including **Slack** notifications, **AWS S3** HTML report uploads, and more!

- Run a single audit or multiple audits at once.
- Upload reports to S3 via simple configuration.
- Automatically post results as comments in GitHub via commits or pull requests (see [options](#options)).
- Automatically post results in Slack (see [options](#options)).

# Table of Contents

- [Screenshots](#screenshots)
  - [Output](#screenshot-output)
  - [Save HTML Reports as Artifacts](#screenshot-save-html-reports-as-artifacts)
  - [HTML Reports](#screenshot-html-reports)
  - [PR Comments](#screenshot-pr-comments)
  - [Slack Notifications](#screenshot-slack-notifications)
  - [Fail Workflow when Minimum Scores Aren't Met](#screenshot-fail-workflow-when-minimum-scores-arent-met)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Usage](#usage)
  - [Standard Example](#usage-standard-example)

# Screenshots

Screenshots below for visual look at the things you can do.

## Screenshot: Output
<img alt="Binoculars GitHub action output" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-output.png" />

## Screenshot: Save HTML Reports as Artifacts
<img alt="Binoculars GitHub action save artifacts" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-artifacts.png" width="600" />

## Screenshot: HTML Reports
<img alt="Binoculars GitHub action HTML report" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-lighthouse-report.png" />

## Screenshot: PR Comments
<img alt="Binoculars GitHub comments" src="https://lighthouse-check.s3.amazonaws.com/images/lighthouse-check-pr-comment.png" width="400">

## Screenshot: Slack Notifications
<img alt="Binoculars GitHub action Slack notification" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-slack.png" width="520" />

## Screenshot: Fail Workflow when Minimum Scores Aren't Met

<img alt="Binoculars GitHub action fail if scores don't meet minimum requirement on a PR" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-status-action-pr-fail.png" width="600" />

<img alt="Binoculars GitHub action fail if scores don't meet minimum requirement" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-status-action.png" />

## Inputs

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Run Type</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>accessToken</code></td>
    <td><a href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line">Access token</a> of a user (to do things like post PR comments for example).</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>author</code></td>
    <td>For Slack notifications: A user handle, typically from GitHub.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>awsAccessKeyId</code></td>
    <td>The AWS <code>accessKeyId</code> for an S3 bucket.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>awsBucket</code></td>
    <td>The AWS <code>Bucket</code> for an S3 bucket.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>awsRegion</code></td>
    <td>The AWS <code>region</code> for an S3 bucket.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>awsSecretAccessKey</code></td>
    <td>The AWS <code>secretAccessKey</code> for an S3 bucket.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>branch</code></td>
    <td>For Slack notifications: A version control branch, typically from GitHub.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>commentUrl</code></td>
    <td>An endpoint to post comments to. This is only needed if you want to trigger comments on <code>push</code>. A <code>pull_request</code> trigger does not require this to be set. Typically this will be from GitHub's API. Example: <code>https://api.github.com/repos/:owner/:repo/commits/:commit_sha/comments</code>.</td>
    <td><code>string</code></td>
    <td><code>pull_request</code> triggered actions populate this under the hood by default</td>
  </tr>
  <tr>
    <td><code>enableComments</code></td>
    <td>If <code>true</code> and <code>accessToken</code> is set scores will be posted as comments.</td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>outputDirectory</code></td>
    <td>An absolute directory path to output report. You can do this an an alternative or combined with an S3 upload.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>sha</code></td>
    <td>For Slack notifications: A version control <code>sha</code>, typically from GitHub.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>slackWebhookUrl</code></td>
    <td>A Slack Incoming Webhook URL to send notifications to.</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>urls</code></td>
    <td>A pipe separated list of URLs to be audited (<code>|</code>).</td>
    <td><code>string</code></td>
    <td><code>undefined</code></td>
  </tr>
</table>

## Outputs

### `binocularsResults`

A stringified array of objects with of the below shape.

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td><code>localReport</code></td>
    <td>A local path to the report (if applicable).</td>
    <td><code>string</code></td>
  </tr>
  <tr>
    <td><code>result</code></td>
    <td>A comprehensive result - the equivalent of what is returned when using the <code>lighthouse</code> module directly.</td>
    <td><code>object</code></td>
  </tr>
  <tr>
    <td><code>report</code></td>
    <td>A URL to the report HTML file.</td>
    <td><code>string</code></td>
  </tr>
</table>

## Usage

## Usage: Standard Example

```yaml
name: Binoculars
on: [pull_request]

jobs:
  binoculars:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: mkdir /tmp/artifacts
      - name: Run Binoculars
        uses: foo-software/binoculars-action@master
        with:
          accessToken: ${{ secrets.BINOCULARS_GITHUB_ACCESS_TOKEN }}
          author: ${{ github.actor }}
          awsAccessKeyId: ${{ secrets.BINOCULARS_AWS_ACCESS_KEY_ID }}
          awsBucket: ${{ secrets.BINOCULARS_AWS_BUCKET }}
          awsRegion: ${{ secrets.BINOCULARS_AWS_REGION }}
          awsSecretAccessKey: ${{ secrets.BINOCULARS_AWS_SECRET_ACCESS_KEY }}
          branch: ${{ github.ref }}
          enableComments: true
          minScore: 80
          outputDirectory: /tmp/artifacts
          urls: 'https://www.foo.software,https://www.foo.software/lighthouse'
          sha: ${{ github.sha }}
          slackWebhookUrl: ${{ secrets.BINOCULARS_WEBHOOK_URL }}
      - name: Upload artifacts
        uses: actions/upload-artifact@master
        with:
          name: Binoculars reports
          path: /tmp/artifacts
```

## Credits

> <img src="https://lighthouse-check.s3.amazonaws.com/images/logo-simple-blue-light-512.png" width="100" height="100" align="left" /> This package was brought to you by [Foo - a website performance monitoring tool](https://www.foo.software). Create a **free account** with standard performance testing. Automatic website performance testing, uptime checks, charts showing performance metrics by day, month, and year. Foo also provides real time notifications. Users can integrate email, Slack and PagerDuty notifications.

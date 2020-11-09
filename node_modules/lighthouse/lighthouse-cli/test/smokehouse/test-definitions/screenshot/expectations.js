/**
 * @license Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * @type {Array<Smokehouse.ExpectedRunnerResult>}
 */
const expectations = [
  {
    artifacts: {
      FullPageScreenshot: {
        width: '>1000',
        height: '>1000',
        data: /data:image\/jpeg;base64,.{10000,}$/,
      },
    },
    lhr: {
      requestedUrl: 'http://localhost:10200/screenshot.html?width=1000px&height=1000px',
      finalUrl: 'http://localhost:10200/screenshot.html?width=1000px&height=1000px',
      audits: {},
    },
  },
  {
    artifacts: {
      FullPageScreenshot: null,
    },
    lhr: {
      requestedUrl: 'http://localhost:10200/screenshot.html?width=5000px&height=5000px',
      finalUrl: 'http://localhost:10200/screenshot.html?width=5000px&height=5000px',
      runWarnings: [/Full page screenshot is too big/],
      audits: {},
    },
  },
];

module.exports = expectations;

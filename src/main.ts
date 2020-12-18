import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const octokit = new github.GitHub(core.getInput('token'))
    const helpLabel = 'help wanted'

    const {owner, repo, number} = github.context.issue

    core.debug(`Getting issue #${number}`)

    const issue = await octokit.issues.get({
      owner,
      repo,
      issue_number: number
    })

    if (issue.data.assignees.length === 0) {
      core.debug('Nobody is assgined, adding help wanted label...')
      await octokit.issues.addLabels({
        owner,
        repo,
        issue_number: number,
        labels: [helpLabel]
      })
    } else {
      if (
        issue.data.labels.find(element => element.name === helpLabel) != null
      ) {
        core.debug(
          'There are assignees and a help wanted label, removing help wanted label...'
        )
        await octokit.issues.removeLabel({
          owner,
          repo,
          issue_number: number,
          name: helpLabel
        })
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

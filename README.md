# Help Wanted Action

![build](https://github.com/mkqavi/help-wanted-action/workflows/build/badge.svg)

Assigns a help-wanted tag when there isn't anybody assigned to an issue.

## Usage

```yaml
name: "issue-assigned-labeled"
on:
  issues:
    types:
      - assigned
      - labeled
      - unassigned
      - unlabeled

jobs:
  help-wanted:
    runs-on: ubuntu-latest
    steps:
      - uses: mkqavi/help-wanted-action@v0.1.0

```

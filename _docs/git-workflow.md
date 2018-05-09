
# Git workflow

Until project increases in size and complexity, Git workflow should be kept as simple as possible. Follow these guidelines for branching and development:

1. Every task should have its own branch.

2. Final work is submitted as pull request to the `master` branch for code review. Don't do any work and commits in `master` branch.

3. Merge in `master` branch using `--squash` flag and write commit messages following [commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). This ensures that Git log and changelog both match work assigned.

4. Merge to `master` branch should be done only after sucessfull code review.

5. Make sure to clean remote repo from unused branches when ending a sprint to prevent generating unnecessary noise.

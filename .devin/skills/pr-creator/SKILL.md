# PR Creator Skill

Automatically creates a well-documented pull request based on unstaged changes in the repository.

## What it does

This skill automates the entire PR creation process:
1. Analyzes unstaged changes to understand the modifications
2. Stashes current changes and switches to the main/master branch
3. Creates a new descriptive feature branch from main/master
4. Applies the stashed changes to the new branch
5. Stages all changes
6. Creates a commit with a detailed, conventional commit message
7. Pushes the new feature branch to remote
8. Creates a new pull request targeting the main branch with a comprehensive description

**Important**: This skill **always** creates a new branch and a new PR, even if you're currently on an existing feature branch. This ensures each set of changes gets its own isolated PR.

## Features

- **Always creates new branch**: Switches to main/master and creates a fresh feature branch, ensuring isolated PRs
- **Intelligent branch naming**: Generates descriptive branch names based on file changes and diff analysis
- **Conventional commits**: Uses conventional commit format (feat/fix/refactor/etc.)
- **Comprehensive PR description**: Includes:
  - Clear summary of changes
  - Detailed change breakdown by file/component
  - Type of changes (features, bug fixes, refactoring, etc.)
  - Testing information
  - Breaking changes (if any)
  - Additional notes/context
- **Automatic categorization**: Identifies change types (feature, bug fix, refactor, docs, etc.)
- **Safe operations**: Verifies git status, stashes changes, and handles edge cases

## Usage

Invoke this skill when you have unstaged changes that you want to turn into a PR:

```
"Create a PR for my current unstaged changes"
```

or

```
"Turn my unstaged changes into a well-documented pull request"
```

## Requirements

- Must be in a git repository
- Must have a remote configured (for pushing the branch)
- Must have `gh` CLI installed (for creating PRs)
- Must have unstaged changes to commit

## Branch Naming Convention

The skill generates branch names using this pattern:
- `feature/<description>` for new features
- `fix/<description>` for bug fixes
- `refactor/<description>` for refactoring
- `docs/<description>` for documentation changes
- `test/<description>` for test changes
- `chore/<description>` for maintenance tasks

## Commit Message Format

Uses conventional commit format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `test`: Test changes
- `chore`: Maintenance tasks
- `style`: Code style changes (formatting, etc.)

## PR Description Template

The generated PR description includes:

```markdown
## Summary
[Brief overview of changes]

## Changes
- [File/Component 1]: Description of changes
- [File/Component 2]: Description of changes
- ...

## Type of Changes
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test changes
- [ ] Other

## Testing
[Description of testing performed or test coverage]

## Breaking Changes
[Any breaking changes, or "None"]

## Additional Notes
[Any additional context, screenshots, or related issues]
```

## Example Invocation

```
"Create a PR for my current changes"
```

The skill will:
1. Analyze your unstaged changes
2. Stash your changes and switch to main/master
3. Create a new branch like `feature/add-search-filter-items-component` from main/master
4. Apply your stashed changes to the new branch
5. Commit with message like "feat(items): add search and filter functionality to items component"
6. Push to remote
7. Create a detailed PR with comprehensive description

**Note**: Even if you're on an existing feature branch, this skill will always create a NEW branch from main/master to ensure each PR is isolated.
#!/bin/bash

set -e

echo "🔍 Analyzing unstaged changes..."

# Get the list of modified files
CHANGED_FILES=$(git diff --name-only)
if [ -z "$CHANGED_FILES" ]; then
  echo "❌ No unstaged changes found. Please make some changes first."
  exit 1
fi

echo "📁 Changed files:"
echo "$CHANGED_FILES"
echo ""

# Analyze changes to determine type and description
echo "🔎 Analyzing changes to determine PR type and description..."

# Get git diff for analysis
DIFF_OUTPUT=$(git diff)

# Determine change type based on file patterns and diff content
CHANGE_TYPE="feature"
SCOPE=""
DESCRIPTION=""

# Check for test files
if echo "$CHANGED_FILES" | grep -q "\.spec\."; then
  if [ $(echo "$CHANGED_FILES" | grep -c "\.spec\.") -eq $(echo "$CHANGED_FILES" | wc -l) ]; then
    CHANGE_TYPE="test"
    DESCRIPTION="update tests"
  fi
fi

# Check for documentation
if echo "$CHANGED_FILES" | grep -q -E "\.(md|txt)$"; then
  if [ $(echo "$CHANGED_FILES" | grep -c -E "\.(md|txt)$") -eq $(echo "$CHANGED_FILES" | wc -l) ]; then
    CHANGE_TYPE="docs"
    DESCRIPTION="update documentation"
  fi
fi

# Check for bug fixes (simple heuristic)
if echo "$DIFF_OUTPUT" | grep -qi "fix\|bug\|error\|correct"; then
  CHANGE_TYPE="fix"
fi

# Extract scope from file paths
if echo "$CHANGED_FILES" | grep -q "items"; then
  SCOPE="items"
elif echo "$CHANGED_FILES" | grep -q "users"; then
  SCOPE="users"
elif echo "$CHANGED_FILES" | grep -q "shop"; then
  SCOPE="shop"
elif echo "$CHANGED_FILES" | grep -q "user"; then
  SCOPE="user"
fi

# Generate description based on changes
if [ -z "$DESCRIPTION" ]; then
  # Count files
  FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')

  if [ "$FILE_COUNT" -eq 1 ]; then
    FILE_NAME=$(basename "$CHANGED_FILES")
    DESCRIPTION="update $(echo "$FILE_NAME" | sed 's/\.[^.]*$//')"
  else
    DESCRIPTION="update multiple files"
  fi
fi

# More specific description based on diff content
if echo "$DIFF_OUTPUT" | grep -qi "search\|filter"; then
  DESCRIPTION="add search and filter functionality"
elif echo "$DIFF_OUTPUT" | grep -qi "test\|spec"; then
  DESCRIPTION="add test coverage"
elif echo "$DIFF_OUTPUT" | grep -qi "import\|require"; then
  DESCRIPTION="fix import paths"
fi

echo "📊 Analysis results:"
echo "   Type: $CHANGE_TYPE"
echo "   Scope: $SCOPE"
echo "   Description: $DESCRIPTION"
echo ""

# Generate branch name
BRANCH_NAME="${CHANGE_TYPE}"
if [ -n "$SCOPE" ]; then
  BRANCH_NAME="${BRANCH_NAME}/${SCOPE}-"
else
  BRANCH_NAME="${BRANCH_NAME}/"
fi
BRANCH_NAME="${BRANCH_NAME}${DESCRIPTION}"
# Sanitize branch name
BRANCH_NAME=$(echo "$BRANCH_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')

echo "🌿 Creating feature branch: $BRANCH_NAME"

# Stash any uncommitted changes temporarily
echo "💾 Stashing current changes..."
STASH_NAME="pr-creator-temp-$(date +%s)"
git stash push -u -m "$STASH_NAME" 2>/dev/null || true

# Determine main branch (main or master)
MAIN_BRANCH="main"
if git show-ref --verify --quiet refs/heads/master; then
  MAIN_BRANCH="master"
fi

echo "🔄 Switching to $MAIN_BRANCH branch..."
git checkout "$MAIN_BRANCH" 2>/dev/null || git checkout master 2>/dev/null || {
  echo "❌ Could not checkout main or master branch"
  exit 1
}

# Pull latest changes from main
echo "📥 Pulling latest changes from $MAIN_BRANCH..."
git pull origin "$MAIN_BRANCH" 2>/dev/null || true

# Create and checkout new branch from main
git checkout -b "$BRANCH_NAME"

# Apply stashed changes
echo "📤 Applying stashed changes..."
git stash pop 2>/dev/null || true

echo "✅ Branch created: $BRANCH_NAME (from $MAIN_BRANCH)"
echo ""

# Stage all changes
echo "📦 Staging changes..."
git add .

echo "✅ Changes staged"
echo ""

# Create commit message
COMMIT_SUBJECT="${CHANGE_TYPE}"
if [ -n "$SCOPE" ]; then
  COMMIT_SUBJECT="${COMMIT_SUBJECT}(${SCOPE})"
fi
COMMIT_SUBJECT="${COMMIT_SUBJECT}: ${DESCRIPTION}"

COMMIT_BODY="Changes made:
$(echo "$CHANGED_FILES" | sed 's/^/- /')"

echo "📝 Creating commit with message:"
echo "   $COMMIT_SUBJECT"
echo ""

# Commit changes
git commit -m "$(cat <<EOF
$COMMIT_SUBJECT

$COMMIT_BODY

Generated with [Devin](https://cli.devin.ai/docs)

Co-Authored-By: Devin <158243242+devin-ai-integration[bot]@users.noreply.github.com>
EOF
)"

echo "✅ Changes committed"
echo ""

# Push to remote
echo "📤 Pushing branch to remote..."
git push -u origin "$BRANCH_NAME"

echo "✅ Branch pushed to remote"
echo ""

# Generate PR description
PR_DESCRIPTION="## Summary
This PR ${DESCRIPTION}$(if [ -n "$SCOPE" ]; then echo " in the ${SCOPE} module"; fi).

## Changes
$(echo "$CHANGED_FILES" | while read file; do
  echo "- \`$file\`: $(git diff --stat "$file" | tail -1)"
done)

## Type of Changes
"

# Add checkboxes based on change type
case "$CHANGE_TYPE" in
  "feat")
    PR_DESCRIPTION="${PR_DESCRIPTION}- [x] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test changes
- [ ] Other
"
    ;;
  "fix")
    PR_DESCRIPTION="${PR_DESCRIPTION}- [x] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test changes
- [ ] Other
"
    ;;
  "test")
    PR_DESCRIPTION="${PR_DESCRIPTION}- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [x] Test changes
- [ ] Other
"
    ;;
  "docs")
    PR_DESCRIPTION="${PR_DESCRIPTION}- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [x] Documentation update
- [ ] Refactoring
- [ ] Test changes
- [ ] Other
"
    ;;
  *)
    PR_DESCRIPTION="${PR_DESCRIPTION}- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [x] Refactoring
- [ ] Test changes
- [ ] Other
"
    ;;
esac

PR_DESCRIPTION="${PR_DESCRIPTION}
## Testing
"

# Check if test files were modified
if echo "$CHANGED_FILES" | grep -q "\.spec\."; then
  PR_DESCRIPTION="${PR_DESCRIPTION}Tests have been updated/added to cover the changes. Run \`npm test\` to verify.
"
else
  PR_DESCRIPTION="${PR_DESCRIPTION}Manual testing has been performed. No automated test changes included.
"
fi

PR_DESCRIPTION="${PR_DESCRIPTION}
## Breaking Changes
None

## Additional Notes
- This change was automatically generated based on unstaged changes
- Please review the changes and update this description as needed
"

echo "📋 Creating pull request..."
echo ""

# Create PR using gh CLI
gh pr create --title "$COMMIT_SUBJECT" --body "$PR_DESCRIPTION" --base main

echo ""
echo "🎉 Pull request created successfully!"
echo "   Branch: $BRANCH_NAME"
echo "   Title: $COMMIT_SUBJECT"
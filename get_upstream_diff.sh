#!/bin/bash

# Script to pull diffs from the upstream nextjournal/clojure-mode repository

UPSTREAM_REPO="https://github.com/nextjournal/clojure-mode.git"
UPSTREAM_REMOTE_NAME="upstream"
DIFF_FILE="upstream_diff.patch"

echo "Checking for upstream remote..."
if ! git remote get-url "$UPSTREAM_REMOTE_NAME" > /dev/null 2>&1; then
  echo "Adding upstream remote: $UPSTREAM_REPO"
  git remote add "$UPSTREAM_REMOTE_NAME" "$UPSTREAM_REPO"
else
  echo "Upstream remote '$UPSTREAM_REMOTE_NAME' already exists."
fi

echo "Fetching latest changes from upstream..."
git fetch "$UPSTREAM_REMOTE_NAME"

echo "Generating diff between current main and upstream/main..."
# Compare the current main branch with the upstream's main branch
# You can change 'main' to your desired branch name if different
git diff "main" "$UPSTREAM_REMOTE_NAME/main" > "$DIFF_FILE"

if [ -s "$DIFF_FILE" ]; then
  echo "Diff generated and saved to $DIFF_FILE"
  echo "Review the changes in $DIFF_FILE"
else
  echo "No differences found between current main and upstream/main, or diff is empty."
  rm "$DIFF_FILE" # Remove empty diff file
fi

echo "Done."

#!/bin/bash
# Run this script from the soc-showcase directory to commit polish changes
cd "$(dirname "$0")"
git add -A
git commit --author="Solomon Neas <me@solomonneas.dev>" -m "fix: add error handling, a11y, reduced motion, README, and code cleanup"

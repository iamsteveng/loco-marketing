# CLAUDE.md

## Deployment rule

Never push changes directly to the `main` branch — pushing to `main` triggers a production deployment. All changes must go through a pull request:

- Push changes to an existing PR branch, or open a new PR.
- Only merge the PR into `main` when the change is ready to deploy.

## Adding school domains

Whenever the user gives school email domains to add to the student benefit school list, follow the `add-school-domains` skill in `.claude/skills/add-school-domains/SKILL.md`: update the CSV, regenerate `public/student/schools.js`, and open a PR.

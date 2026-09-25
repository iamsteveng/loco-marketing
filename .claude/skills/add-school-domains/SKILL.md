---
name: add-school-domains
description: Add Eligible Email Domains to the Student Benefit Program school list. Use whenever the user gives one or more school email domains to add, usually each with a Chinese or English school name.
---

# Add school domains

The school list is `data/school-domains/school-domains.csv`, with columns `English name,Chinese name,email domain`, one row per domain. `data/school-domains/build.mjs` turns it into `public/student/schools.js`, which both student pages (`public/student/zh.html`, `public/student/en.html`) load. Never edit `schools.js` by hand. Read `CONTEXT.md` first for the terms used below.

Follow every step for every batch.

## 1. Check eligibility

Check each domain against the glossary rules in `CONTEXT.md`:

- The school is secondary or higher. Primary schools and continuing / further education schools are never Eligible Schools.
- The domain is issued to students, not staff. For example, `my.cityu.edu.hk` is the student domain and `cityu.edu.hk` is the staff one.
- The domain identifies exactly one school and nothing broader.
- Domains match exactly. A parent domain does not cover its subdomains, and vice versa.

Hold back any domain that fails or that you cannot confirm. Ask the user about each one, with the reason. Carry on with the clean ones.

## 2. Fill in the missing name

The user gives one name per domain, Chinese or English. Find the other, in this order:

1. If the school is already in the CSV, copy both names exactly as they appear there. The build groups domains into one school by the exact (English, Chinese) pair, so a different spelling creates a duplicate school on the page.
2. Otherwise, take the name from the school's official website.
3. If neither is clear, ask the user.

## 3. Handle duplicates

- Domain already listed under the same school: skip it and mention it in the report.
- Domain already listed under a different school: stop and ask the user.

## 4. Update the CSV and regenerate

Add the new rows to the CSV. Keep its existing ordering and encoding. Then run:

```
node data/school-domains/build.mjs
```

It must succeed. It validates empty fields, malformed domains, and duplicates. Commit the CSV and the regenerated `public/student/schools.js` together.

## 5. Open a PR

Never push to `main`; it deploys to production. Create a new branch from an up-to-date `main`, commit, push, and open a PR. Do not merge it; the user merges.

## 6. Report back

Tell the user:

- The PR link.
- Every name you filled in, and where it came from, so they can check it.
- Domains skipped as already listed.
- Domains held back, with the reason and the question for the user.

Put every question for the user in one numbered list, one question per item, so they can reply with just numbers, like "1 yes, 2 no".

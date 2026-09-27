---
name: add-school-domains
description: Add Eligible Email Domains to the Student Benefit Program school list. Use whenever the user gives one or more school email domains to add, usually each with a Chinese or English school name.
---

# Add school domains

The school list is `data/school-domains/school-domains.csv`, with columns `English name,Chinese name,email domain`, one row per domain. `data/school-domains/build.mjs` turns it into `public/student/schools.js`, which both student pages (`public/student/zh.html`, `public/student/en.html`) load. Never edit `schools.js` by hand. Read `CONTEXT.md` first for the terms used below.

Follow every step for every batch.

## 1. Check eligibility

Check each domain against the glossary rules in `CONTEXT.md`:

- The school fits the Eligible School definition in `CONTEXT.md`, including its named exceptions (for example HKU SPACE, VTC). Primary schools are never eligible.
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

Report in two stages.

**While anything is unresolved**, tell the user:

- The PR link.
- Every name you filled in, and where it came from, so they can check it.
- Domains skipped as already listed, and domains rejected under the rules, with reasons.
- Domains held back, with the reason.

Put every question for the user in one numbered list, one question per item, so they can reply with just numbers, like "1 yes, 2 no". Apply their answers to the same PR, then ask any follow-up questions the same way. Do not give the summary below yet.

**Once every question is settled**, give the summary: one line per line of the user's original input, in the same order, tab-separated, inside a fenced code block so they can paste it into their Excel file. Columns:

1. School name, exactly as the user gave it.
2. Email domain, exactly as the user gave it, including any `@` or full address.
3. Comment: blank if accepted. If rejected, the reason in Traditional Chinese, for example `小學不屬合資格學校` or `非學生電郵域名`. A domain already on the list counts as rejected, with `此域名已在合資格名單內，毋須新增`.
4. Updated website: the date the change goes live, as `YYYY-MM-DD`, if accepted. `N/A` if rejected.

The site updates only when the user merges the PR. Use today's date and say it assumes they merge today.

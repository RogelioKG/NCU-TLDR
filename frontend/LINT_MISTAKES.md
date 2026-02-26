# Lint Mistakes Checklist

## Vue template spacing

- `vue/block-tag-newline`
  - Wrong: two blank lines before `</script>`
  - Correct: keep exactly one line break before `</script>`
- `vue/multiline-html-element-content-newline`
  - Wrong: extra blank line before multiline closing tags like `</section>` / `</nav>`
  - Correct: keep exactly one line break before closing tag
- `vue/singleline-html-element-content-newline`
  - Wrong: single-line content in enforced multiline tags, e.g. `<h3>Title</h3>`
  - Correct: put content on its own line:
    - opening tag
    - content line
    - closing tag

## Script style rules

- `perfectionist/sort-named-imports`
  - Wrong: unordered named imports
  - Correct: keep named imports sorted (e.g. `computed, reactive, ref`)
- `antfu/if-newline`
  - Wrong: `if (cond) return value`
  - Correct:
    - `if (cond)`
    - `  return value`
- `style/arrow-parens`
  - Wrong: `(item) => item.name`
  - Correct: `item => item.name` (single param without parens)

## Transition requirement

- `vue/require-toggle-inside-transition`
  - Wrong: direct child inside `<Transition>` has no `v-if` / `v-show`
  - Correct: ensure the direct child element has `v-if` or `v-show`

## Quick pre-commit check

- Scan one-line `if` in `<script setup>` and split to next-line return when needed
- Scan arrow functions with single parameter and remove parentheses
- Check direct child of every `<Transition>` has `v-if` or `v-show`
- Check no extra blank lines before closing `</script>` and major closing tags

---
title: "Stochastic in Form, Deterministic in Function"
date: 2025-07-29
description: "An experiment showing that LLM 'unreliability' is a usage problem, not a tool limitation. 100+ iterations across four models."
---

The criticism that LLMs are "too stochastic for production use" misunderstands their nature. I ran a systematic experiment to test this.

---

## The Experiment

**Hypothesis:** LLM "unreliability" is a usage problem, not a tool limitation.

**Two tests across four models** (GPT-3.5-turbo, Claude-3-haiku, Claude-3.5-sonnet, Gemini-1.5-flash):

**Test 1 - Direct Question:** "Count the r's in 'strawberry'"

**Test 2 - Code Generation:** "Write and execute python code that accepts two parameters: a string and a character and returns the count of the character in the string. Execute it with 'strawberry' and 'r'."

Same task. Different framing.

---

## Results

### Direct Question

**Initial test (10 iterations per model):**

| Model | Accuracy |
|-------|----------|
| GPT-3.5-turbo | 0% |
| Claude-3-haiku | 100% |
| Claude-3.5-sonnet | 0% |
| Gemini-1.5-flash | 0% |

Three of four models consistently answered "2" instead of "3." Systematic undercounting by 1.

**Extended test (100 iterations, Claude-3-haiku):**

| Model | Iterations | Correct | Accuracy |
|-------|------------|---------|----------|
| Claude-3-haiku | 100 | 99 | 99% |

Even the best-performing model had one error over 100 runs.

### Code Generation

| Model | Iterations | Correct | Accuracy |
|-------|------------|---------|----------|
| GPT-3.5-turbo | 10 | 10 | 100% |
| Claude-3-haiku | 37 | 35 | 94.6% |
| Claude-3.5-sonnet | 10 | 10 | 100% |
| Gemini-1.5-flash | 7 | 7 | 100% |

When errors occurred, they were execution failures—not logic errors. Every successfully executed piece of code returned 3.

---

## The Gap

For most models: **0% → 100% accuracy**. A 100 percentage point improvement.

Same task. Same models. Same underlying question. The only difference was *how I asked*.

---

## Code Variability

Here's what's interesting: **20-25% of implementations were structurally unique**—from the same model with the same prompt.

From 37 iterations of Claude-3-haiku, I observed 8 distinct code structures:

```python
# Variation 1: Simple function with counter
def count_r(word):
    count = 0
    for char in word:
        if char == 'r':
            count += 1
    return count
result = count_r('strawberry')

# Variation 2: Using built-in method
word = 'strawberry'
count = word.count('r')
print(count)

# Variation 3: With descriptive output
def count_letter_r(word):
    count = 0
    for char in word:
        if char == 'r':
            count += 1
    return count
result = count_letter_r(word)
print(f"The letter 'r' appears {result} times in '{word}'.")

# Variation 4: One-liner function
def count_r(s):
    return s.count('r')
print(count_r('strawberry'))

# Variation 5: With enumerate
def count_r_occurrences(text):
    count = 0
    for i, char in enumerate(text):
        if char == 'r':
            count += 1
    return count
```

The variations extended beyond algorithm choice:
- **Variable names:** count, counter, result, num, total
- **Function names:** count_r, count_letter, count_char, count_r_occurrences
- **Output formats:** bare number, formatted string, descriptive sentence
- **Algorithm approaches:** for loops (85%), built-ins (10%), comprehensions (5%)

Yet all successful executions returned 3.

---

## The Distinction

LLMs are:

- **Stochastic in form:** They generate different implementations
- **Deterministic in function:** They produce consistent correct results

This is exactly backward from how most people think about them. The *implementation* varies. The *outcome* doesn't.

---

## What This Means

The perceived "unreliability" of LLMs stems from using them as calculators when they should be used as code generators.

When you ask an LLM to count letters directly, you're asking it to pattern-match through its training data. It's guessing based on what it's seen before. The answer "2" for strawberry probably reflects how often that question has been answered incorrectly in training data.

When you ask it to write code, you're leveraging what it's actually good at: translation between natural language and formal specification. The code is then executed deterministically.

---

## The Architecture

This is why the approach matters:

1. **Human provides intent** in natural language
2. **LLM translates** to executable code
3. **Code executes** deterministically
4. **Human reviews** results

The LLM is a *translation layer*, not an oracle. It converts between representations. The actual computation happens in deterministic code that can be inspected, tested, and verified.

---

## Practical Implication

For tasks requiring precision, use LLMs as code generators, not calculators.

Don't ask: "What's the NPV of this project?"

Ask: "Write code to calculate NPV given these cash flows and this discount rate."

The first is an oracle query—you're trusting the model's pattern matching. The second produces auditable, testable, reproducible output.

The 75-point accuracy gap isn't a fluke. It's the difference between proper and improper use of the tool.

---

*Test methodology: 40 iterations per test across GPT-3.5-turbo, Claude-3-haiku, Claude-3.5-sonnet, and Gemini-1.5-flash. Temperature=0 for reproducibility. Full results and code available on request.*

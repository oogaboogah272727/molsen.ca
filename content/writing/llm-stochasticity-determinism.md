---
title: "Stochastic in Form, Deterministic in Function"
date: 2025-01-20
description: "700 iterations across seven models. 25% accuracy asking directly. 100% accuracy asking for code. The gap tells you everything about how to use these tools."
originalPublication: "Originally published January 2025"
---

> *Cross-references to related essays reflect the current state of an evolving intellectual framework. The version here is authoritative.*

The criticism that LLMs are "too stochastic for production use" misunderstands their nature. I ran a systematic experiment to demonstrate this.

---

## The Experiment

**Hypothesis:** LLM "unreliability" is a usage problem, not a tool limitation.

**Seven models tested:**
- GPT-4, GPT-4.1, plus mini variants of each
- Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku

**100 iterations per model.** 700 total runs.

**Two approaches to the same task:**

**Test 1 — Direct Question:** "How many r's are in 'strawberry'?"

**Test 2 — Code Generation:** "Write Python code that counts the incidence of a character in a string. Use it to count 'r' in 'strawberry'."

Same underlying question. Different framing.

---

## Results

### Direct Question

**Aggregate accuracy across all models: 25%**

Three out of four answers were wrong. The dominant error was answering "2" instead of "3."

This isn't undercounting. The models aren't counting at all. They're pattern-matching: recognizing a 10-character string, applying statistical knowledge of 'r' frequency in English text, and generating the most probable token. Two r's in a 10-character word is statistically reasonable. The occasional correct answer of "3"—along with "1" and "4"—results from stochastic sampling selecting lower-probability tokens, not from the model successfully counting.

### Code Generation

**Aggregate accuracy: 100%**

Every model, every iteration. When the code ran, it returned 3.

---

## The Gap

**25% to 100%.** A 75 percentage point improvement from changing nothing but how I asked.

Same models. Same question. Same answer required. The only variable was the framing.

---

## Code Variability

Here's what surprised me: the code varied considerably across iterations.

From the same model with the same prompt, I observed multiple distinct implementations:

```python
# Approach 1: Loop with counter
def count_char(string, char):
    count = 0
    for c in string:
        if c == char:
            count += 1
    return count

# Approach 2: Built-in method
def count_char(s, c):
    return s.count(c)

# Approach 3: List comprehension
def count_char(text, target):
    return sum(1 for ch in text if ch == target)

# Approach 4: Filter and length
def count_char(string, char):
    return len([c for c in string if c == char])
```

Variable names varied. Function structures varied. Output formatting varied. Algorithm choices varied.

Yet every successful execution returned 3.

**Stochastic generation. Deterministic accuracy.**

---

## What This Demonstrates

LLMs are:

- **Stochastic in form:** They generate different implementations each time
- **Deterministic in function:** Those implementations produce consistent correct results

Most people have this backward. They see the variation and conclude the tool is unreliable. But the *implementation* varies while the *outcome* doesn't.

---

## Why This Happens

When you ask an LLM to count letters directly, you're asking it to do something it fundamentally cannot do. It has no counting mechanism. It can only predict the next probable token based on patterns in training data—which includes statistical knowledge of letter frequencies in English. The model generates a plausible-sounding answer, not a computed one.

When you ask it to write code, you're using what it actually does well: translation between natural language and formal specification. The code then executes deterministically. The LLM's stochasticity is confined to the representation; the computation itself is exact.

This is the key insight: the LLM doesn't perform the calculation in either case. In oracle mode, it guesses. In assistant mode, it produces a program that calculates. The difference isn't in how hard the model tries—it's in what you're asking it to produce.

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

The first is an [oracle query](/writing/ai-oracle-vs-assistant/)—you're trusting the model's pattern matching. The second produces auditable, testable, reproducible output. This is the operational difference between [oracle and assistant modes](/writing/ai-oracle-vs-assistant/), demonstrated empirically.

The 75-point accuracy gap isn't a fluke. It's the difference between proper and improper use of the tool.

---

*Test methodology: 100 iterations per model across seven models (GPT-4 family, Claude 3 family). Temperature=0 for reproducibility. Full results and code available on request.*

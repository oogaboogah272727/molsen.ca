---
title: "Stochastic in Form, Deterministic in Function"
date: 2024-11-01
description: "700 iterations across seven models. 25% accuracy asking directly. 100% accuracy asking for code. The gap tells you everything about how to use these tools."
originalPublication: "Originally published November 2024"
type: empirical
tags: ["Epistemic Rigor", "AI Governance"]

# Knowledge graph metadata
graph_id: stochasticity
defines: ["Stochastic Form", "Deterministic Function", "Translation Layer"]
themes: ["Epistemic Rigor", "AI Governance"]
relationships:
  - target: oracle-assistant
    type: core
    label: evidence for
---

> *Cross-references to related essays reflect the current state of an evolving intellectual framework. The version here is authoritative.*

The criticism that LLMs are "too stochastic for production use" misunderstands their nature. I ran a systematic experiment to demonstrate this.

*Note: The experiment below is a didactic demonstration—it illustrates the mechanism that makes assistant pattern work, not a general benchmark. For systematic evidence across reasoning models, RAG systems, and production deployments, see [Update for February 2026](/writing/update-february-2026/).*

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

Beyond accuracy, there was a precision problem. Answers came in varied formats: "2", "two", "There are two r's in 'strawberry'", and other variations. The output was neither accurate nor precise—you couldn't reliably parse it without additional processing.

This isn't undercounting. The models aren't counting at all—they have no counting mechanism. They can only predict probable tokens based on patterns in training data. The likely explanation: the model recognizes the word length, applies statistical knowledge of letter frequencies in English, and generates a plausible-sounding answer. Two r's in a 10-character word is statistically reasonable. The occasional correct answer of "3"—along with "1" and "4"—probably results from stochastic sampling selecting lower-probability tokens, not from the model successfully counting.

We can't inspect closed models to confirm the exact mechanism. But the key point is clear: the model is estimating, not computing.

### Code Generation

**Aggregate accuracy: 100%. Aggregate precision: 100%.**

Every model, every iteration. When the code ran, it returned the integer 3. Not "three", not "There are 3 r's"—the integer 3, every time. Accurate and precise. Deterministic given the same code and input. (Production reproducibility requires capturing the execution environment—versioned dependencies, fixed inputs. The point here is that the code artifact creates a *path* to reproducibility that direct answers do not. See [Answers to Critics](/writing/answers-to-critics/#determinism) for the full qualification.)

---

## The Gap

The important comparison isn't 25% to 100%. It's that one approach is *unreliable* and the other is *reliable*. Direct queries failed 75% of the time. Code generation failed 0% of the time.

Asking directly produced stochastic, unreliable results. Asking for code produced deterministic, reliable results. Same models. Same question. Same answer required. The only variable was what I asked for: a guess versus a program.

---

## Code Variability

The code varied considerably across iterations. This was expected—the instructions were intentionally vague, and transformer architecture produces stochastic outputs.

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

The hypothesis was confirmed. LLMs are:

- **Stochastic in form:** They generate different implementations each time
- **Deterministic in function:** Those implementations produce consistent correct results

Most people have this backward. They see the variation and conclude the tool is unreliable. But the *implementation* varies while the *outcome* doesn't. Understanding the architecture made this result predictable.

---

## Why This Happens

When you ask an LLM to count letters directly, you're asking it to do something it fundamentally cannot do. It has no counting mechanism. It can only predict the next probable token based on patterns in training data. The model generates a plausible-sounding answer, not a computed one.

When you ask it to write code, you're using what it actually does well: translation between natural language and formal specification. The code then executes deterministically. The LLM's stochasticity is confined to the representation; the computation itself is exact.

This is the key insight: the LLM doesn't perform the calculation in either case. When asked directly, it guesses. When asked to write code, it produces a program that calculates. The difference isn't in how hard the model tries—it's in what you're asking it to produce.

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

The first trusts the model's pattern matching. The second produces auditable, testable, reproducible output. I develop this distinction further in [Oracle vs. Assistant](/writing/ai-oracle-vs-assistant/).

The 75-point accuracy gap isn't a fluke. It's the difference between proper and improper use of the tool.

---

*Test methodology: 100 iterations per model across seven models (GPT-4 family, Claude 3 family). Temperature=0 for reproducibility. Full results and code available on request.*

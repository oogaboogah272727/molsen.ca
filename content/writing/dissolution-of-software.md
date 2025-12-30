---
title: "The Dissolution of Software"
date: 2025-06-30
description: "When agentic AI becomes the universal interface, much of the value software provides becomes directly accessible. What remains and what dissolves."
type: core
tags: ["AI Governance", "Professional Practice"]
---

[Agentic AI as Universal Interface](/writing/agentic-ai-universal-interface/) removes the barriers between domain expertise and system access. This has consequences for what we call "software."

---

## What Dissolves

Most software exists because those barriers existed.

Applications sit between users and data because users couldn't directly express what they wanted from the data. Integration software connects systems because connecting systems required specialized knowledge. Business software encodes business logic because encoding required coding skill.

As the barriers fall, much of this software becomes generatable on demand. Why maintain permanent translation layers when translation is increasingly available?

**What faces pressure:**

- Application software that exists primarily as interface to data
- Integration software that exists primarily to connect systems
- Software development work focused on building intermediary layers

---

## What Remains

**Data** — still needs to exist somewhere, still needs structure.

**Infrastructure** — systems still need to run.

**Access permissions** — technical barriers give way to administrative ones.

**Intent specification** — the domain expertise to say what you want.

**Verification** — confirming the generated approach is correct.

The formulation from [AI-First Software](/writing/ai-first-software/) holds: the data is the system. The application layer was always intermediary. The intermediary becomes ephemeral.

---

## Implications

**Software as product faces pressure.** Most business software is: data storage + business logic + interface. If the interface is generated on demand and business logic is expressed in plain language specifications, what exactly is the product? Data persistence and infrastructure remain valuable. The layers built on top of them become optional.

**Integration as a category faces pressure.** Integration platforms sell one thing: we've pre-built connections between systems so you don't have to. As connections become generatable on demand, pre-built connections lose much of their value.

**Technical roles shift.** Less building intermediary layers, more: designing data structures, managing infrastructure, specifying intent clearly, verifying generated approaches. The work moves from implementation to specification and verification.

**Business logic becomes specification.** A business rule doesn't need to be implemented in software and maintained indefinitely. It can be expressed in plain language. The agent generates instructions to execute it when needed. The rule exists as specification, not as permanent code.

---

## Objections

**"Generated code can't handle production reliability — retry logic, error recovery, guaranteed delivery."** The agent handles this. Agentic AI isn't fire-and-forget. The agent retries failed operations, adapts to errors, maintains state across attempts. The reliability guarantees that integration platforms provide are exactly what persistent agents do. The difference: the agent generates the approach for your specific need rather than forcing your need into a pre-built pattern.

**"Network effects protect incumbents — everyone uses Salesforce because everyone uses Salesforce."** Network effects are communication effects. Agentic AI streamlines communication across systems. You can write a Slack integration in minutes. You can connect to most systems your organization uses. The network effect of being the common platform weakens when many platforms become accessible through the same interface.

**"Switching costs protect installed software — trained staff, documented processes, compliance certifications."** The largest switching cost is organizational. Installed software means installed personnel, institutional knowledge, career dependencies. The transition will be uneven. But the economic pressure is directional: generated interfaces cost less to create and maintain than permanent software and the staff to operate it. Organizations that move first gain cost advantages that compound.

**"Who is liable when generated code causes harm?"** You are. You specified the intent. You verified (or failed to verify) the approach. You deployed it. Agentic AI is infrastructure, like a compiler — you don't sue GCC when your C program crashes. Generated code actually provides clearer accountability than current enterprise software. When something breaks in a vendor's black-box system, the specification that caused the failure is buried in product decisions you never made and can't inspect. When something breaks in generated code, the specification is your conversation with the agent, fully inspectable.

**"Pattern accumulation just recreates software — you're maintaining templates instead of applications."** Yes, and the maintenance is done by agents. The templates get vetted by agents, distributed by agents, updated by agents. Human contribution is specifying what patterns matter and verifying they work correctly. The recursion makes the dissolution thesis complete, not contradictory. The software layer that remains is itself agent-maintained.

**"Interoperability requires shared standards — if everyone generates custom systems, we lose coordination."** The ontology layer addresses this. Patterns that work get extracted and shared. Successful encodings become templates. Organizations that need to interoperate converge on shared encodings through the same mechanism: express once, available to all agents. Standardization emerges from successful practice rather than committee negotiation.

---

## The Strategic Question

The question from [Making AI Make Sense](/writing/making-ai-make-sense/) applies with force: are you encoding or being encoded?

If you hold domain expertise, access permissions, and can specify intent clearly, you can distill your knowledge directly. The intermediary layers that previously extracted value from standing between you and systems become optional.

If your work was building those intermediary layers, the value you provided is dissolving. If someone else specifies intent that affects you, your role is being encoded out.

The organizations and individuals who understand this shift can position accordingly. Those who don't will discover that the software they maintained was never the point. The data was the point. The expertise was the point. The software was just how we accessed them before the barriers fell.

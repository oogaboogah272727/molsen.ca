---
title: "Evaluating AI Table Extraction: Claude vs Docling vs ScaleDP"
date: 2024-02-20
description: "A practical comparison of three table extraction approaches reveals surprising accuracy gaps that practitioners need to understand before selecting tools for document processing at scale."
originalPublication: "Originally published February 2024"
type: empirical
tags: ["AI Governance"]

# Knowledge graph metadata
graph_id: table-extraction
defines: ["Semantic Extraction", "Document Understanding"]
themes: ["AI Governance"]
relationships: []
---

> *This essay may be revised as my thinking develops. The version here is authoritative.*

I ran identical documents through three extraction approaches: Docling, ScaleDP, and Claude-based sub-agents. The results surprised me. The difference between 11% and 100% accuracy isn't a statistical curiosity. It's the difference between a usable system and one that generates more work than it saves.

---

## The Test: Real Proposals, Real Complexity

The evaluation used actual consulting proposals containing the kinds of tables that matter in business contexts: project cost summaries, detailed budget breakdowns with multi-level headers, milestone schedules, and staffing matrices. These were not laboratory-clean tables designed for benchmarks. They included merged cells, currency formatting, task hierarchies, and the inevitable formatting quirks that accumulate in real documents.

The BHP proposal contained a seemingly simple five-row cost summary and a complex 17-by-24 budget breakdown spanning multiple staff categories and task hierarchies. The LKAB proposal included milestone tables with TBD placeholders and cost estimates with subtotals. Both documents included the standard noise of professional proposals: letterheads, contact information, resume sections, and boilerplate formatting.

---

## The Critical Metric: Table Title Detection

For any downstream use of extracted tables, the table title is essential context. A table labeled "Project Costs" serves a different analytical purpose than one labeled "Historical Spending." Without accurate title detection, extracted data requires expensive manual review before it becomes useful.

The tools diverged dramatically.

Docling detected titles correctly on only 11% to 14% of tables across the test documents. ScaleDP improved to roughly 20%, but with a significant caveat: many of its "correct" titles were actually wrong. In the BHP proposal, ScaleDP labeled Table 1 with the content "+1 604 681 4196 office." That's the phone number from the letterhead, not the actual table title "Summary of Project Costs by Task."

The Claude-based approach achieved 100% title detection. It correctly identified "Table 1: Summary of Project Costs by Task" and "Detailed Budget Breakdown by Task and Staff" with complete accuracy.

---

## The 44% False Positive Problem

Beyond title accuracy, both open-source tools generated substantial noise. Docling detected 27 tables in the BHP proposal, of which 12 were completely empty (0x0 dimensions). That's a 44% false positive rate. Nearly half of the "tables" found were phantoms that would pollute any downstream processing.

ScaleDP showed a different failure mode. While it detected fewer empty tables, it consistently misidentified document elements as tables. Letterheads became tables. Resume section headers became 1x2 tables. The header block containing contact information was dutifully extracted as tabular data, complete with its phone number serving as a table title.

For anyone processing documents at scale, this matters. A 44% false positive rate means your pipeline spends nearly half its effort on garbage. Every false table requires storage, processing, and eventual filtering. Those costs compound quickly across thousands or millions of documents.

---

## Structural Preservation Under Pressure

Simple tables with clean rows and columns extract reasonably well across all three approaches. The differentiation appears with complex tables.

The 17-by-24 budget breakdown in the BHP proposal tested each tool's ability to preserve structure across merged headers, nested task hierarchies, and multiple currency columns. Docling's output had "structure compromised due to complexity." ScaleDP extracted the table but added phantom empty columns. That's a parsing artifact that would break any automated analysis expecting consistent column counts.

The Claude-based extraction preserved the complete structure: the relationships between headers and data cells, the task hierarchy, and the staff-rate associations. It also captured contextual metadata. Costs were in Canadian dollars. The table detailed a specific section of the proposal. It related to other tables in the document.

---

## What This Means for Practitioners

The practical implications depend on your scale and tolerance for post-processing.

For small-scale extraction, tens of documents where manual review is feasible, any tool will work. Budget time for cleanup. ScaleDP's speed makes it attractive for quick extraction tasks where you'll verify results anyway.

For medium-scale processing, hundreds to thousands of documents, the false positive rate becomes the dominant concern. At 44% false positives, you're effectively doubling your data volume with noise. The time saved on extraction gets consumed by filtering and validation.

For large-scale processing, the document corpuses that motivate tool selection in the first place, accuracy compounds. Extrapolating from these results across a 200,000-document corpus, the Claude-based approach would yield approximately 200,000 correctly titled tables. Docling would produce roughly 25,000 correct titles alongside substantial noise. ScaleDP would generate 40,000 apparent titles, many of which would be wrong.

---

## The Hybrid Reality

No single tool solves every extraction problem perfectly. The evaluation suggests a practical hierarchy for tool selection.

For title detection and contextual understanding, AI-native approaches have a substantial advantage. They understand that a phone number is not a table title, that a resume header is not tabular data, and that "Table 1: Summary of Project Costs" has a semantic structure worth preserving.

For raw extraction speed at massive scale with tolerance for post-processing, ScaleDP offers throughput. Budget for significant cleanup. Column alignment issues and false positives will require additional processing steps.

For structural accuracy on simpler tables, both open-source tools perform adequately. The false positive rate remains a concern.

The uncomfortable conclusion: document understanding still requires understanding. Tools that attempt pure pattern matching against PDF structure will continue to find patterns where none exist. Letterheads as tables. Phone numbers as titles. Resume headers as data structures. Tools that bring semantic comprehension to extraction will continue to outperform on the metrics that matter for downstream use.

The 44% false positive rate is not a bug to be fixed in the next release. It reflects a fundamental difference in approach: recognizing *what a table is* versus recognizing that *something looks like a table*. For practitioners building production systems, that distinction determines whether your document processing pipeline creates value or creates cleanup work.

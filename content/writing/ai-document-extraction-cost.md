---
title: "Practical AI Document Extraction: The Real Cost of Processing 40,000 Documents"
date: 2025-01-15
description: "A data-driven analysis of AI-powered document extraction costs, revealing that processing complex technical documents costs just $0.0169 per page with the right approach."
originalPublication: "Originally published January 2025"
---

> *This essay may be revised as my thinking develops. The version here is authoritative.*

Organizations considering AI document extraction always hit the same wall: "What does this actually cost?" I ran thousands of pages through extraction and measured everything. Now I have concrete numbers.

---

## The Challenge

Large organizations accumulate decades of documents. A typical consulting firm might have 40,000 proposals in SharePoint, each packed with project scopes, cost breakdowns, team compositions, and lessons learned. All that institutional knowledge sits locked in PDFs. Traditional search can't touch it.

AI document extraction promises to change that. Transform static files into queryable data. But the economics have always been murky. Vendor claims rarely survive contact with reality. Pilot projects reveal costs that kill production deployments.

---

## The Methodology

I didn't estimate. I ran actual extraction tests on representative documents and measured everything.

The approach uses Claude Sonnet 4 with native PDF support. No OCR preprocessing. No document conversion. The system processes documents in five focused passes:

1. **Metadata extraction** (document identification, dates, references)
2. **Project and client information** (scope, objectives, deliverables)
3. **Financial data** (costs, rates, budgets)
4. **Table extraction** (structured data within the document)
5. **Schedule and team information** (timelines, personnel, roles)

Why five passes? Single-prompt extraction degrades quality. Ask a model to extract everything at once and you get incomplete results. Each focused pass produces more accurate and complete data. That's the discipline.

---

## The Numbers

Measured extraction costs:

**Commercial Proposal (19 pages)**
- Input tokens: 217,042
- Output tokens: 1,307
- Total cost: $0.34
- Cost per page: **$0.0177**

**Technical Proposal (83 pages)**
- Input tokens: 868,037
- Output tokens: 3,542
- Total cost: $1.33
- Cost per page: **$0.0160**

The weighted average across document types: **$0.0169 per page**.

Larger documents are more cost-efficient. The 83-page technical proposal processed at $0.0160 per page versus $0.0177 for the smaller commercial document. PDF processing overhead gets amortized across more pages, and technical content follows more predictable structures. Go figure.

---

## Token Economics

Each extraction pass consumes nearly identical tokens. The PDF processing overhead stays constant regardless of what you're extracting. For the commercial proposal:

- Metadata pass: 43,501 tokens
- Project/Client pass: 43,624 tokens
- Financial pass: 43,861 tokens
- Tables pass: 43,614 tokens
- Schedule/Team pass: 43,749 tokens

This consistency matters. Know your page count and document mix, and you can budget with confidence.

---

## Batch Processing Economics

The figures above use batch processing, which cuts API costs in half:

- Input: $1.50 per million tokens (versus $3.00 standard)
- Output: $7.50 per million tokens (versus $15.00 standard)

The tradeoff: you accept asynchronous results instead of real-time responses. For large extraction projects, that's an easy call. For a 40,000-document archive, batch processing saves thousands of dollars.

---

## Scaling Projections

Using the measured $0.0169 per page average:

| Document Size | Extraction Cost |
|---------------|-----------------|
| 10 pages | $0.17 |
| 25 pages | $0.42 |
| 50 pages | $0.85 |
| 100 pages | $1.69 |

An archive of 15,000 proposals averaging 25 pages each costs approximately $6,300 to extract. That's 375,000 pages of structured data.

---

## What Makes This Approach Work

**Native PDF support eliminates preprocessing.** Modern AI models read PDFs directly, including both text and visual elements. No OCR step means no OCR errors and no OCR cost.

**Multi-pass extraction ensures quality.** A single prompt asking for everything produces inferior results. Five focused passes yield more complete and accurate extractions.

**Smart chunking handles large documents.** Documents exceeding 100 pages get split and processed in segments, with results merged. Edge cases that break simpler approaches don't break this one.

**Token tracking enables optimization.** Built-in monitoring shows exactly where costs accumulate. You can optimize prompts and processing strategies based on real data.

---

## The ROI Perspective

At $0.43 average cost per proposal, processing 15,000 documents costs roughly $6,400. For organizations where proposals range from $500,000 to $5,000,000 in value, the extraction cost represents less than 0.002% of the documented business.

The honest answer is that extraction creates value in multiple ways:
- Pattern discovery across successful proposals
- Rapid retrieval of relevant precedents
- Automated generation of new proposals based on historical templates
- Analytics on pricing, timing, and team composition trends

---

## Practical Recommendations

For organizations considering similar projects:

1. **Run actual tests before budgeting.** Extract ten representative documents and measure costs. Vendor estimates consistently miss the mark.

2. **Use batch processing for bulk operations.** The 50% cost reduction makes large-scale extraction economically viable.

3. **Separate document types.** Technical and commercial documents have different token profiles. Processing them separately enables optimization.

4. **Plan for documents over 100 pages.** These require chunking logic and add processing complexity, but they're also more cost-efficient per page.

5. **Build in a buffer.** Budget 10-15% above projections for retries and edge cases.

---

## Conclusion

AI document extraction now works at scale. The economics are defensible. At $0.0169 per page, organizations can extract decades of institutional knowledge at a fraction of what it cost to create those documents originally.

The approach matters: measure actual costs, use batch processing, implement multi-pass extraction for quality, and build robust handling for edge cases. The technology is ready. I'd push back on any assumption that it isn't.

# UI refresh design QA — 19 October 2026

**Source visual truth:** `docs/design/selected-refresh.png` (1487 × 1058 pixels).
**User selection:** Option 2: Quiet Ledger. Quiet sidebar, sequential status rail, grouped modules with separators, configuration drawers.
**Implementation:** `docs/design/refresh-implementation.png`.
**Viewport and density:** 1440 × 1024 CSS px; browser capture 1440 × 1024 pixels, 1×. Source proportionally normalized to 1440 × 1024 for comparison. macOS Display P3 captures converted to sRGB for palette comparison.
**State:** Initial, unconnected single bot-builder workspace; TradingView / Pepperstone / Momentum Guard defaults.
**Full-view comparison:** `docs/design/refresh-comparison.png` places source and implementation together.
**Focused comparison:** `docs/design/refresh-detail.png` compares readable headings, provider identity, controls, surface color, spacing and border treatment.
**Additional evidence:** `docs/design/refresh-mobile.png`, `refresh-tablet.png`, `refresh-monitor.png`.

## Findings and fidelity surfaces

No actionable P0/P1/P2 findings remain.

- Fonts/typography: self-hosted Inter, 14px base; refined 32px wizard title / 36px workspace title, 500–700 weight hierarchy, compact readable labels and consistent line heights. Body and helper text use cool neutral colors. The supplied TF logo and provider assets remain sharp at intended sizes.
- Spacing/layout: consistent 8–12px component radii, 24–36px section rhythm, aligned labels and actions, quiet borders and minimal elevation. V1 intentionally retains its wizard forms rather than converting into the mock's four-module process. V2 follows the mock's sidebar/rail/module anatomy and density.
- Colors/tokens: orange #fa6838, pale orange selected states, near-black #19212f, muted #687588, white and light gray surfaces, green success and restrained error states. Disabled controls use readable gray styling.
- Asset fidelity: original TraderFrame/provider raster assets reused; TradingView brand mark from Simple Icons; existing Phosphor icon library. No decorative imagery, charts, or additional metrics introduced in setup. Inter font and OFL license included locally.
- Copy/content: original providers, broker choices, fields, amounts, dependencies, four settings sections and seven-step order preserved. Existing readiness status retained. All prototype simulation disclosures remain.
- Responsive: 390 × 844 mobile and 768 × 1000 tablet inspected in the Codex in-app browser; no page-level horizontal overflow. Wizard progress scrolls horizontally on smaller screens; V2 sequence becomes horizontal, modules stack, drawers fill mobile width. Debug utility moves into document flow below content at smaller breakpoints.

## Comparison history

1. Initial desktop comparison: [P2] V2 sidebar/type scale differed from selected image; module spacing pushed lower content down and debug overlapped an action. Fixed sidebar width, type hierarchy, module spacing and CTA sizing; moved desktop V2 debug control to navigation footer. Added actual TradingView brand icon. Evidence: `verification/ui-refresh/v2-comparison-pass2.png` at workspace root.
2. Mobile pass: [P2] V2 header action text clipped at 390px; fixed mobile-specific button typography. [P2] fixed debug widget could cover content; moved utility into flow below content on mobile/tablet. Re-captured and inspected mobile header and full-width signal drawer.
3. Final: opened and compared both selected images against final implementations together, then focused detail comparisons. Confirmed required typography, layout, color, assets and copy surfaces. V1 no-left-navigation adaptation is intentional. V2 retains readiness pill and utility absent from mock to preserve existing controls. No blocking visual issues.

## Interaction and console verification

Both: manual source connection → broker authentication → execution account → Trading → Goals → Risk → Filters → Review → acknowledgement → activation → monitor passed. Demo loading, reset, leave/return and pause/resume passed.
V2 additionally: simulated source failure/retry, invalid trade amount blocking save, activation failure/retry with setup preserved, reconnect, empty activity and event log passed. Mobile drawer opened and closed with all controls accessible.
Existing model and hosting tests: 3 + 4 per prototype (14 total), passed. No model changes. Fresh final browser console: no warnings or errors in either prototype.

## Implementation checklist

- [x] Apply selected visual direction and preserve workflows.
- [x] Compare source and implementation together; fix P2 differences.
- [x] Inspect focused typography/control details.
- [x] Verify desktop, tablet, mobile, drawer and monitor states.
- [x] Verify primary interaction flows and browser console.

## Follow-up polish

None required for this handoff. Generated mock glyph shapes and subtle optical weights vary slightly from live Inter/Phosphor rendering (P3).

final result: passed

# Pattern: file upload

The deep version of one dimension-5 flow. The same upload can feel broken or feel safe depending entirely on its feedback. Uploading is a moment of low user control — they've handed over a file and can only wait — so the interface's whole job is to keep them informed and in control. Five signals do that.

## 1. Answer the drag before the drop

A drop zone must react *before* the file lands, or users hesitate ("did it register?"). On drag-over, change at least three things at once so the response is unmistakable:

- **Border** — shift to an active/accent state.
- **Glow or fill** — a subtle background or shadow change.
- **Copy** — swap the label: `Drop your file` → `Release to upload`.

Nothing moving on drag-over reads as "this zone is dead". Reset all three the instant the drag leaves or drops.

## 2. Honest progress, never a bare spinner

An indeterminate spinner hides the truth and gives the user nothing to decide on. For uploads, show real numbers so they can choose to wait or walk away:

- **Percent complete**
- **Time remaining**
- **Transfer speed**

Never use an indeterminate spinner for an upload whose progress you can measure. Determinate progress is the difference between "is this stuck?" and "90 seconds left, I'll grab coffee".

## 3. Inline retry — never make them start over

Uploads die, often near the end. When one fails or pauses, **keep the file in memory** and offer a one-tap resume from the last chunk — don't discard it and force a re-pick.

- Show an honest paused state: `Paused at 90% — file kept in memory`.
- A single **Retry** button resumes from where it stopped (chunked/resumable upload), not from zero.

Losing 90% of a transfer to a blip and being sent back to the file picker is the most enraging upload failure; designing it out is high-value.

## 4. A filename is not feedback — show proof

Confirm you received the *right* file with a real preview, not just its name:

- **Thumbnail** (or a type-specific icon when no preview is possible)
- **Type** and **size**
- Per-file actions: **Replace**, **Remove**

This catches "wrong file" before it costs the user a full upload-and-undo cycle.

## 5. Independent queue — every file its own lane

In a multi-file upload, each file gets isolated progress, state, and retry. One file's failure must never pause or block the others.

- Per-file progress and status.
- A failed item sits in its own error/retry state while the rest keep going.
- A summary line that tells the truth: `2 of 5 · 1 failed`.

A single shared progress bar for a batch is dishonest — it hides which file is stuck and couples every file's fate to the slowest or most fragile one.

## Checklist

- [ ] Drag-over changes border + glow + copy, and resets on leave/drop
- [ ] Progress shows percent, time remaining, and speed — no indeterminate spinner
- [ ] Failed/paused uploads keep the file and resume from the last chunk
- [ ] Each file shows a thumbnail/type/size with Replace and Remove
- [ ] Multi-file uploads have one independent lane per file, with a truthful summary
- [ ] Quality floor: keyboard-operable picker, focus-visible, reduced motion respected

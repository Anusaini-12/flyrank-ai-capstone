# NOTES.md

## Modal / Dialog Comparison

I compared my `playground/modal/Modal.tsx` with shadcn/ui's `components/ui/dialog.tsx`.

### 1. Focus management

In my Modal, I manually find the first focusable element and move focus to it when the modal opens. In my test, the input receives focus when the modal opens.

In shadcn's Dialog, the focus is managed by the `@base-ui/react/dialog` primitive. In my test, the Close button receives focus when the dialog opens.

This is different from my implementation because I manually decide where the focus should go, while the primitive handles the focus behavior for me.

### 2. Focus trapping

In my Modal, I manually implement focus trapping using `onKeyDown`. I check for `Tab` and `Shift + Tab` and move focus between the first and last focusable elements.

shadcn uses the `@base-ui/react/dialog` primitive for this behavior instead of requiring the focus-trapping logic to be written manually.

This means the primitive can handle focus management and accessibility edge cases that my simple implementation may not cover.

### 3. Body scroll

My Modal does not have any code that explicitly locks the body's scrolling when the modal is open.

The shadcn Dialog delegates this behavior to the `@base-ui/react/dialog` primitive, which manages the modal and the interaction with the background page.

This is a gap in my implementation because I only implemented the dialog's focus behavior and did not add separate body-scroll management.

### 4. Zero focusable elements

My Modal handles the case where there are no focusable elements.

If no focusable element is found, I use `tabIndex={-1}` on the dialog and move focus to the dialog itself.

This means my implementation already covers this case instead of leaving focus outside the modal.

### 5. Open and close animations

My Modal does not have any animation when it opens or closes. It appears and disappears immediately.

shadcn's Dialog has animation and transition classes for both states. It uses classes such as `data-open:animate-in` and `data-closed:animate-out`, along with fade and zoom effects.

This is another difference between my implementation and shadcn's implementation.

---

## Tabs Comparison

I compared my `playground/tabs/Tabs.tsx` with shadcn/ui's `components/ui/tabs.tsx`.

### 6. Tab activation behavior

My Tabs component uses automatic activation.

When I press `ArrowRight` or `ArrowLeft`, focus moves to the next or previous tab and the tab content changes immediately.

In my testing of shadcn's Tabs, pressing an arrow key moves focus to another tab, but the content is activated separately by pressing Enter/Space.

This helped me understand that keyboard navigation and tab activation can be separate behaviors. My implementation combines them, while the primitive can handle them separately.

### 7. Keyboard and focus management

In my Tabs component, I manually manage keyboard interaction and focus. I use refs, `tabIndex`, and an `onKeyDown` handler to implement `ArrowRight`, `ArrowLeft`, `Home`, and `End`.

shadcn uses the `@base-ui/react/tabs` primitive to handle the tab behavior. The primitive manages the keyboard interaction, focus management, ARIA behavior, and active tab state.

This is a gap in my implementation because I had to manually write and maintain all of this keyboard and accessibility logic.

---

## What I Learned

Building these components from scratch helped me understand what accessibility logic is actually required instead of treating UI components as just visual elements.

The biggest difference I noticed is that my components contain a lot of manual focus and keyboard-management code, while shadcn uses headless primitives such as `@base-ui/react/dialog` and `@base-ui/react/tabs` to handle much of this behavior.

I also learned that small differences, such as where focus goes when a dialog opens or whether a tab activates immediately after an arrow key, are important parts of accessible component behavior.

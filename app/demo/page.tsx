import SendButton from "@/components/ui/SendButton";
import SaveButton from "@/components/ui/SaveButton";

export default function MotionButtonPage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Motion Button
      </h1>

      <p className="max-w-lg text-base leading-7 text-muted-foreground">
        Interactive buttons demonstrating smooth state transitions, loading
        feedback, success and error states, and reduced-motion support.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <SendButton />
        <SaveButton />
      </div>

      <section className="max-w-2xl space-y-3 text-left">
        <h2 className="text-lg font-semibold text-foreground">
          Motion & Timing
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Hover and focus feedback uses a fast 150ms ease-out transition to
          keep interactions responsive. Loading transitions use 200–250ms
          durations so the label, spinner, and button width changes feel
          deliberate and smooth rather than abrupt. The success state holds
          for 600ms before returning to idle, giving users enough time to
          notice the completed action.
        </p>

        <p className="text-sm leading-6 text-muted-foreground">
          The error state uses a short ~400ms shake to draw attention to the
          failed action. When prefers-reduced-motion is enabled, the shake and
          other movement-based transitions are removed or reduced, while color
          and label changes remain so the state is still clearly communicated.
        </p>
      </section>
    </main>
  );
}
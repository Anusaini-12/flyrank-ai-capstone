import Disclosure from "./disclosure/Disclosure";
import Modal from "./modal/Modal";
import Tabs from "./tabs/Tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function PlaygroundPage() {
  return (
    <main className="min-h-full bg-[#eef8f4] px-6 py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F6E56]">
            UI components
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 lg:text-5xl">
            Component Playground
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600">
            Explore the interactive building blocks used across the application.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">Disclosure</h2>
            <p className="mt-1 text-base text-zinc-600">Expandable content</p>
          </div>
          <Disclosure title="Show sample content">
            <p className="mt-4 max-w-md text-base leading-7 text-zinc-600">
              This content is hidden until you activate the disclosure button.
            </p>
          </Disclosure>
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">Tabs</h2>
            <p className="mt-1 text-base text-zinc-600">Organized content panels</p>
          </div>
          <Tabs
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <p className="mt-5 max-w-md text-base leading-7 text-zinc-600">
                    This is the overview panel for the component playground.
                  </p>
                ),
              },
              {
                id: "features",
                label: "Features",
                content: (
                  <p className="mt-5 max-w-md text-base leading-7 text-zinc-600">
                    Tabs support selection, keyboard navigation, and accessible relationships.
                  </p>
                ),
              },
              {
                id: "notes",
                label: "Notes",
                content: (
                  <p className="mt-5 max-w-md text-base leading-7 text-zinc-600">
                    Use the arrow keys to move between tabs, or Home and End to jump.
                  </p>
                ),
              },
            ]}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">Modal</h2>
            <p className="mt-1 text-base text-zinc-600">Focused dialog content</p>
          </div>
          <Modal trigger="Open sample modal" title="Sample modal">
            <p>
              This dialog moves focus inside when it opens and returns focus to
              the trigger when it closes.
            </p>
            <label className="mt-5 block text-base font-semibold text-zinc-900">
              Sample input
              <input
                type="text"
                placeholder="Type something"
                className="mt-2 block w-full rounded-lg border border-zinc-300 px-4 py-3 text-base font-normal text-zinc-900 outline-none focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]"
              />
            </label>
          </Modal>
        </section>

        <section className="space-y-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F6E56]">
              shadcn/ui
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
              Dialog and Tabs
            </h2>
            <p className="mt-1 text-base text-zinc-600">
              Compare the generated primitives with the custom components above.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-zinc-950">Dialog</h3>
            <Dialog>
              <DialogTrigger render={<Button size="lg" />}>Open shadcn dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sample shadcn dialog</DialogTitle>
                  <DialogDescription>
                    This dialog uses shadcn/ui&apos;s generated accessibility and focus behavior.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>Try Tab, Shift+Tab, and Escape while the dialog is open.</p>
                  <label className="block font-medium text-foreground">
                    Sample input
                    <input
                      type="text"
                      placeholder="Type something"
                      className="mt-2 flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </label>
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-zinc-950">Tabs</h3>
            <ShadcnTabs defaultValue="overview" className="max-w-xl">
              <TabsList variant="line" className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-5 text-base leading-7 text-zinc-600">
                This is the overview panel from the shadcn/ui Tabs primitive.
              </TabsContent>
              <TabsContent value="details" className="pt-5 text-base leading-7 text-zinc-600">
                The generated Tabs component provides accessible tab and panel relationships.
              </TabsContent>
              <TabsContent value="notes" className="pt-5 text-base leading-7 text-zinc-600">
                Use the arrow keys to move between tabs and test the roving focus behavior.
              </TabsContent>
            </ShadcnTabs>
          </div>
        </section>
      </div>
    </main>
  );
}

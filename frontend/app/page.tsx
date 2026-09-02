import ChatPanel from "@/components/chat/ChatPanel";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-white md:min-h-0 md:flex-row">
      <ChatPanel />

      <section className="flex min-w-0 flex-1 flex-col px-6 py-8 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
            Product shortlist
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-950">
            Decision board
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Compare the products that best match your current brief.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-8 flex h-32 items-center justify-center rounded-xl bg-primary-50 text-4xl font-semibold text-primary-600">
              <span>A</span>
              <span className="ml-auto self-start rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-900">
                94% match
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Best for battery
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-950">
              AeroBook Pro 14
            </h2>
            <p className="mt-2 text-2xl font-semibold text-primary-600">$1,299</p>
            <a
              href="#aerobook-pro-14"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-primary-600 px-4 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
            >
              View real product
            </a>
          </article>

          <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-8 flex h-32 items-center justify-center rounded-xl bg-primary-50 text-4xl font-semibold text-primary-600">
              <span>N</span>
              <span className="ml-auto self-start rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-900">
                87% match
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Best value
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-950">
              Northstar Air 13
            </h2>
            <p className="mt-2 text-2xl font-semibold text-primary-600">$899</p>
            <a
              href="#northstar-air-13"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-primary-600 px-4 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
            >
              View real product
            </a>
          </article>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 px-5 py-4">
            <h2 className="font-semibold text-zinc-950">Quick comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Feature</th>
                  <th scope="col" className="px-5 py-3 font-semibold">AeroBook Pro 14</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Northstar Air 13</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <th scope="row" className="px-5 py-4 font-medium text-zinc-950">Price</th>
                  <td className="px-5 py-4">$1,299</td>
                  <td className="px-5 py-4">$899</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 font-medium text-zinc-950">Battery life</th>
                  <td className="px-5 py-4">18 hours</td>
                  <td className="px-5 py-4">14 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type Tab = {
  id: string;
  label: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  tabs: readonly Tab[];
  defaultTabId?: string;
  id?: string;
};

export default function Tabs({
  tabs,
  defaultTabId,
  id,
}: TabsProps) {
  const generatedId = useId();
  const tabsId = id ?? `tabs-${generatedId}`;
  const [selectedTabId, setSelectedTabId] = useState(
    defaultTabId && tabs.some((tab) => tab.id === defaultTabId)
      ? defaultTabId
      : tabs[0]?.id ?? "",
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTabId = tabs.some((tab) => tab.id === selectedTabId)
    ? selectedTabId
    : tabs[0]?.id ?? "";

  function selectTab(tabId: string, tabIndex: number) {
    setSelectedTabId(tabId);
    tabRefs.current[tabIndex]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, tabIndex: number) {
    if (tabs.length === 0) {
      return;
    }

    let nextTabIndex: number | undefined;

    switch (event.key) {
      case "ArrowRight":
        nextTabIndex = (tabIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextTabIndex = (tabIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextTabIndex = 0;
        break;
      case "End":
        nextTabIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextTabIndex];
    selectTab(nextTab.id, nextTabIndex);
  }

  return (
    <div id={tabsId}>
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex flex-wrap gap-2 border-b border-zinc-200"
      >
        {tabs.map((tab, tabIndex) => {
          const tabId = `${tabsId}-tab-${tab.id}`;
          const panelId = `${tabsId}-panel-${tab.id}`;
          const isSelected = tab.id === activeTabId;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[tabIndex] = element;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className={
                isSelected
                  ? "border-b-2 border-[#0F6E56] px-5 py-3 text-lg font-semibold text-[#0F6E56]"
                  : "border-b-2 border-transparent px-5 py-3 text-lg font-medium text-zinc-500 transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0F6E56] focus:ring-offset-2"
              }
              onClick={() => selectTab(tab.id, tabIndex)}
              onKeyDown={(event) => handleKeyDown(event, tabIndex)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const tabId = `${tabsId}-tab-${tab.id}`;
        const panelId = `${tabsId}-panel-${tab.id}`;
        const isSelected = tab.id === activeTabId;

        return (
          <div
            key={panelId}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={isSelected ? 0 : -1}
            hidden={!isSelected}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}

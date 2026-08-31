import { useEffect } from "react";
import PersonalInformation from "./components/TabItems/PersonalInformation";
import Subscription from "./components/TabItems/Subscription";
import { Tabs } from "flowbite";
import type { TabsOptions, TabsInterface, TabItem } from "flowbite";

export default function AccountManagementPage() {
  useEffect(() => {
    const tabsElement = document.getElementById("tabs");

    if (tabsElement) {
      const tabElements: TabItem[] = [
        {
          id: "personal-information-tab",
          triggerEl: document.querySelector("#personal-information-tab"),
          targetEl: document.querySelector("#personal-information-content"),
        },
        {
          id: "subscription-tab",
          triggerEl: document.querySelector("#subscription-tab"),
          targetEl: document.querySelector("#subscription-content"),
        },
      ].filter(
        (item) => item.triggerEl !== null && item.targetEl !== null,
      ) as TabItem[];

      const options: TabsOptions = {
        defaultTabId: "personal-information-tab",
        activeClasses:
          "text-pep-orange hover:text-pep-orange border-pep-orange",
        inactiveClasses:
          "text-gray-500 hover:text-gray-600 border-gray-100 hover:border-gray-300",
      };

      const tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);

      tabs.show("personal-information-tab");
    } else {
      console.error("Tabs element not found!");
    }
  }, []);

  return (
    <div>
      <div className="mb-8 border-b text-gray-500 border-gray-500">
        <ul
          className="flex flex-wrap -mb-px text-center"
          id="tabs"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="personal-information-tab"
              type="button"
              role="tab"
              aria-controls="personal-information-content"
              aria-selected="true"
            >
              Personal Information
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              disabled
              className="cursor-not-allowed inline-block p-4 border-b-2 rounded-t-lg"
              id="subscription-tab"
              type="button"
              role="tab"
              aria-controls="subscription-content"
              aria-selected="false"
            >
              Subscription
            </button>
          </li>
        </ul>
      </div>
      <div id="default-styled-tab-content">
        <div
          id="personal-information-content"
          role="tabpanel"
          aria-labelledby="personal-information-tab"
        >
          <PersonalInformation />
        </div>
        <div
          id="subscription-content"
          role="tabpanel"
          aria-labelledby="subscription-tab"
        >
          <Subscription />
        </div>
      </div>
    </div>
  );
}

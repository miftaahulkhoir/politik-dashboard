import { Button } from "antd";
// import { useRouter } from "next/router";

// import HomeMoreMenuDropdown from "./HomeMoreMenuDropdown";
// import styles from "./homeNavbar.module.css";
import HomeSocmedMenuDropdown from "./HomeSocmedMenuDropdown";

// import MobileNavbarToggler from "../../templates/navbar/MobileNavbarToggler";
import ProfileDropdown from "../dashboardLayout/ProfileDropdown";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";

import cx from "classnames";

export default function HomeNavbar({ profile, setSelectedContent, selectedContent }) {
  // const router = useRouter();

  // const links = [
  //   { name: "Manajemen Survei", path: "/surveys" },
  //   { name: "Analisis Survei", path: "/survey-analysis" },
  //   { name: "social-media" },
  //   { name: "WhatsApp Blast", path: "/whatsapp-blast" },
  // ];

  const items = [
    {
      key: "1",
      label: `Home`,
    },
    {
      key: "2",
      label: `Patroli`,
    },
  ];

  const onTabChange = (key) => {
    setSelectedContent(key);
  };

  return (
    <header>
      <nav className="flex justify-between px-4 py-2 items-center border-b-[2px] border-gray-200 ">
        <div className="flex gap-[90px] relative">
          <img src="/images/logo-black.svg" alt="Patrons" className="w-[112px] h-[60px]" />
          <Tab.Group defaultIndex={1}>
            <Tab.List className="flex gap-4">
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <div
                    className={cx(
                      selected ? "text-red-primary" : "text-black cursor-pointer ",
                      "font-semibold px-3 pt-[20px] flex justify-center outline-none relative",
                    )}
                  >
                    Home
                    <div className={cx(selected && "bg-red-primary", " absolute h-1 w-full -bottom-[10px]")} />
                  </div>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <div
                    className={cx(
                      selected ? "text-red-primary" : "text-black cursor-pointer ",
                      "font-semibold px-3 pt-[20px] flex justify-center outline-none relative",
                    )}
                  >
                    Patroli
                    <div className={cx(selected && "bg-red-primary", " absolute h-1 w-full -bottom-[10px]")} />
                  </div>
                )}
              </Tab>

              {/* ...  */}
            </Tab.List>
            {/* <Tab.Panels>
              <Tab.Panel>Content 1</Tab.Panel>
            </Tab.Panels> */}
          </Tab.Group>
        </div>
        <ProfileDropdown profile={profile} />
        {/* <div className={styles.items_container}>
          {smallDevice ? (
            <MobileNavbarToggler setActive={setActive} />
          ) : (
            <>
              <div className={styles.links_container}> {links.map((link, i) => displayMenu(link, i, router))} </div>
              <HomeMoreMenuDropdown />
            </>
          )}
        </div> */}
      </nav>
    </header>
  );
}

function displayMenu(link, i, router) {
  if (link.name === "social-media") {
    return <HomeSocmedMenuDropdown />;
  } else {
    return (
      <Button type="text" key={i} onClick={() => router.push(link.path)}>
        {link.name}
      </Button>
    );
  }
}

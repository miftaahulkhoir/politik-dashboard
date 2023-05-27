import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
export const talkwalkerData = [
  {
    id: 1,
    img: "bg-[url(/images/talkwalker/menu1.png)]",
  },
  {
    id: 2,
    img: "bg-[url(/images/talkwalker/menu2.png)]",
  },
  {
    id: 3,
    img: "bg-[url(/images/talkwalker/menu3.png)]",
  },
  {
    id: 4,
    img: "bg-[url(/images/talkwalker/menu4.png)]",
  },
  {
    id: 5,
    img: "bg-[url(/images/talkwalker/menu5.png)]",
  },
  {
    id: 6,
    img: "bg-[url(/images/talkwalker/menu6.png)]",
  },
];

export default function TalkwalkerPage(props) {
  const [selectedMenu, setSelectedMenu] = useState(talkwalkerData[0]);

  return (
    <DashboardLayout topBarConfig={{ isShowSearchRegion: true, title: "Analisis Sosial", hideMapButton: true }}>
      <div className="flex flex-row mt-14 ml-[62px] bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white relative ">
        <div className="bg-transparent h-full w-[65px] z-10 pt-[100px] flex-row">
          {talkwalkerData.map((item) => (
            <div key={item.key} className="p-6 decoration-black cursor-pointer" onClick={() => setSelectedMenu(item)}>
              {" "}
            </div>
          ))}
        </div>
        <div className={`${selectedMenu?.img} bg-cover bg-no-repeat w-full h-full absolute`} />
      </div>
    </DashboardLayout>
  );
}

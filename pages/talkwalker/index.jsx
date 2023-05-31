import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import { MdFeaturedVideo } from "react-icons/md";
export const talkwalkerData = [
  {
    id: 1,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu1.png)]",
  },
  {
    id: 2,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu2.png)]",
  },
  {
    id: 3,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu3.png)]",
  },
  {
    id: 4,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu4.png)]",
  },
  {
    id: 5,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu5.png)]",
  },
  {
    id: 6,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu6.png)]",
  },
  {
    id: 7,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu7.png)]",
  },
  {
    id: 8,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu8.png)]",
  },
  {
    id: 9,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu9.png)]",
  },
  {
    id: 10,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu10.png)]",
  },
  {
    id: 11,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu11.png)]",
  },
  {
    id: 12,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu12.png)]",
  },
  {
    id: 13,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu13.png)]",
  },
  {
    id: 14,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu14.png)]",
  },
  {
    id: 15,
    label: <MdFeaturedVideo color="black" />,
    img: "bg-[url(/images/talkwalker/menu15.png)]",
  },
];

export default function TalkwalkerPage(props) {
  const [selectedMenu, setSelectedMenu] = useState(talkwalkerData[0]);

  return (
    <DashboardLayout topBarConfig={{ isShowSearchRegion: true, title: "Analisis Sosial", hideMapButton: true }}>
      <div className="flex flex-row mt-14 ml-[62px] bg-[#FFFFFFF] h-[calc(100vh-134px)] overflow-auto text-white relative">
        <div className="h-full w-[65px] z-10 flex-row border-r-2">
          {talkwalkerData.map((item, index) => (
            <>
              {index === 6 && <div className="border-t-2" />}
              <div key={item.key} className="p-4 decoration-black cursor-pointer" onClick={() => setSelectedMenu(item)}>
                {item.label}
              </div>
            </>
          ))}
        </div>
        <div className={`${selectedMenu?.img} bg-cover bg-no-repeat w-full h-full`} />
      </div>
    </DashboardLayout>
  );
}

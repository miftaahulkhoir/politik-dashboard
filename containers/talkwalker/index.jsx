import DashboardLayout from "@/layouts/DashboardLayout";
import { Typography } from "antd";
import { useState } from "react";
import cx from "classnames";

export const talkwalkerData = [
  {
    id: 1,
    label: <Typography className="text-black">Key Metric</Typography>,
    img: "/images/talkwalker/menu1.png",
  },
  {
    id: 2,
    label: <Typography className="text-black">Top Themes</Typography>,
    img: "/images/talkwalker/menu2.png",
  },
  {
    id: 3,
    label: <Typography className="text-black">Influencers</Typography>,
    img: "/images/talkwalker/menu3.png",
  },
  {
    id: 4,
    label: <Typography className="text-black">Demographics</Typography>,
    img: "/images/talkwalker/menu4.png",
  },
  {
    id: 5,
    label: <Typography className="text-black">World Map</Typography>,
    img: "/images/talkwalker/menu5.png",
  },
  {
    id: 6,
    label: <Typography className="text-black">Result</Typography>,
    img: "/images/talkwalker/menu6.png",
  },
  {
    id: 7,
    label: <Typography className="text-black">Activities</Typography>,
    img: "/images/talkwalker/menu7.png",
  },
  {
    id: 8,
    label: <Typography className="text-black">Sentiment</Typography>,
    img: "/images/talkwalker/menu8.png",
  },
  {
    id: 9,
    label: <Typography className="text-black">Alert</Typography>,
    img: "/images/talkwalker/menu9.png",
  },
  {
    id: 10,
    label: <Typography className="text-black">Sentiment Chart</Typography>,
    img: "/images/talkwalker/menu10.png",
  },
  {
    id: 11,
    label: <Typography className="text-black">Sentiment Split</Typography>,
    img: "/images/talkwalker/menu11.png",
  },
  {
    id: 12,
    label: <Typography className="text-black">Top Influencers</Typography>,
    img: "/images/talkwalker/menu12.png",
  },
  {
    id: 13,
    label: <Typography className="text-black">Trend analysis</Typography>,
    img: "/images/talkwalker/menu13.png",
  },
  {
    id: 14,
    label: <Typography className="text-black">Data visualization</Typography>,
    img: "/images/talkwalker/menu14.png",
  },
  {
    id: 15,
    label: <Typography className="text-black">Engagement</Typography>,
    img: "/images/talkwalker/menu15.png",
  },
  {
    id: 16,
    label: <Typography className="text-black">Competitive Intelligence</Typography>,
    img: "/images/talkwalker/menu16.png",
  },
  {
    id: 17,
    label: <Typography className="text-black">Virality Map</Typography>,
    img: "/images/talkwalker/menu17.png",
  },
];

export default function TalkwalkerContainer({ profile }) {
  const [selectedMenu, setSelectedMenu] = useState(talkwalkerData[0]);

  return (
    <DashboardLayout profile={profile} topBarConfig={{ isShowSearchRegion: true, title: "Analisis Sosial" }}>
      <div className="flex flex-row mt-14 ml-[62px] bg-[#FFFFFFF] max-h-[calc(100vh-138px)] text-white">
        <div className="min-w-[250px] sticky top-0 overflow-auto bg-[#FFFFFF] flex flex-col p-4 border-r">
          {talkwalkerData.map((item, index) => (
            <div className={cx(selectedMenu.id === item.id && "bg-slate-400 rounded")}>
              {index === 6 && <div className="border-t-2" />}
              <div key={item.key} className="p-4 decoration-black cursor-pointer" onClick={() => setSelectedMenu(item)}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <img src={`${selectedMenu?.img}`} className="h-full w-full" />
        </div>
      </div>
    </DashboardLayout>
  );
}

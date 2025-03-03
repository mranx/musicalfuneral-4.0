'use client'

import MoveBackButton from "@/_mycomponents/common/MoveBackButton";
import SelectedDataChips from "@/_mycomponents/selected-chips/SelectedDataChips";
import SecTypeSelections from "@/_mycomponents/selections/sec-type-selections";
import CustomVideoPlayer from "@/_mycomponents/video/CustomVideoPlayer";
const videoList = [
  {
    id: "1",
    title: "Introduction Video",
    src: "/assets/videos/test.mp4",
    thumbnail: "/assets/images/thumbnail.jpg"
  },
  {
    id: "2",
    title: "Product Demo",
    src: "/assets/videos/Sample Video.mp4",
    thumbnail: "/assets/images/thumbnail.jpg"
  }
];
const page = () => {
  return (
    <div className="px-6 pt-10 pb-16">
      <div className="max-w-2xl-container mx-auto">
        <div className="mb-7">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <MoveBackButton />
            <h1 className="text-[32px] font-bold ">Choose sect type</h1>
          </div>
          <SelectedDataChips
            showSelectedMusicFormat={true}
            showSelectedPreferredService={true}
          />
        </div>
        <div className="mb-7">
          <SecTypeSelections />
        </div>
        <div className="  p-6 sm:p-8 border-2 border-[#3F72AF] max-w-[680px] mx-auto rounded-xl dark:bg-[#191D31]">
          <h4 className=" text-center text-2xl font-bold mb-4">
            Watch tutorial for this step
          </h4>
          <CustomVideoPlayer 
            videoList={videoList}
            initialVideo={videoList[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

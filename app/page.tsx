import { DescriptionSection, FooterSection, LandingPage, PeopleSection, TitleSection } from "@page";

export default function Home() {
  return (
    <div>
      <div className="w-full pt-20">
        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <TitleSection />
          </div>
        </div>

        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <DescriptionSection />
          </div>
        </div>

        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <PeopleSection />
          </div>
        </div>

        <div className="flex items-center justify-center w-full px-[5%]">
          <div className="w-[1200px] mb-10">
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
}

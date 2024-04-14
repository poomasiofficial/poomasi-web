import { Fragment } from "react";
import Link from "next/link";

interface ProfileData {
  id: string;
  profile_image: string;
  name: string;
  field: string;
  company1: string;
  job1: string;
  company2: string;
  job2: string;
  is_vacation: boolean;
}

interface Props {
  profileData: ProfileData;
}

export function ProfileCard({ profileData }: Props) {
  return (
    <div className="relative bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden p-4 cursor-pointer w-[140px] h-[290px] md:w-[180px] md:h-[332px] ml-[3px] mr-[17px] my-2.5 hover:scale-[0.98] transition-all duration-[200ms] hover:bg-gray-50">
      {profileData.is_vacation ? (
        <Fragment>
          <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md">
            <div className="p-4">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="text-[100px]">🏖</div>
                <div className="text-xl font-bold w-[70px] text-center">휴가를 떠났어요 :D</div>
              </div>
            </div>
          </div>
          <ProfileCardContent profileData={profileData} />
        </Fragment>
      ) : (
        <div className="">
          <ProfileCardContent profileData={profileData} />
        </div>
      )}
    </div>
  );
}

const ProfileCardContent: React.FC<{ profileData: ProfileData }> = ({ profileData }) => (
  <Link href={`/${profileData.id}`}>
    <div className="">
      <div className="rounded-full overflow-hidden mb-4">
        <img src={profileData.profile_image} alt="profile" className="w-full h-full object-contain" />
      </div>
      <div className="text-20px md:text-xl font-bold leading-tight">{profileData.name}</div>
      <div className="text-[var(--gray-color)] text-[16px] md:text-[17px] font-bold mb-2 leading-tight">
        {profileData.field}
      </div>
      <div className="text-[#aaaaaa] text-[13px] font-bold mb-2 leading-tight md:leading-normal">
        <div className="flex flex-col">
          <span className="font-bold">{profileData.company1}</span>
          <span className="font-bold">{profileData.job1}</span>
        </div>
        <div>
          {profileData.company2 && (
            <div className="flex flex-col mt-[8px]">
              <span className="font-bold">{profileData.company2}</span>
              <span className="font-bold">{profileData.job2}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </Link>
);

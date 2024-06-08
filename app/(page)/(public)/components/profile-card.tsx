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
    <div className="relative bg-white rounded-lg overflow-hidden p-2 cursor-pointer w-[160px] h-[250px] md:w-[220px] md:h-[230px]  my-2.5 hover:scale-[0.98] transition-all duration-[200ms] hover:bg-gray-50">
      {profileData.is_vacation ? (
        <Fragment>
          <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md">
            <div className="p-4">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="text-[100px]">🏖</div>
                <div className="text-xl font-bold w-[70px] text-center">휴가를 떠났어요</div>
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
      <div className=" overflow-hidden mb-4 flex justify-center">
        <img src={profileData.profile_image} alt="profile" className=" rounded-full w-[127px] h-[127px]" />
      </div>
      <div className="flex items-center gap-2">
        <div className="text-20px md:text-xl font-bold leading-tight text-[#495057]">{profileData.name}</div>
        <div className="text-[var(--gray-color)] text-[12px] md:text-[12px]  leading-tight bg-[#D7E0F9] rounded px-[5px] py-[2px]">
          {profileData.field}
        </div>
      </div>
      <div className="text-[#A1A1A1] text-[12px] md:text-[13px] font-bold mt-2 mb-2 leading-tight md:leading-normal">
        <div className="flex flex-col">
          <span>
            {profileData.company1} | {profileData.job1}
          </span>
        </div>
        <div>
          {profileData.company2 && (
            <div className="flex flex-col mt-[2px]">
              <span>
                {profileData.company2} | {profileData.job2}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </Link>
);

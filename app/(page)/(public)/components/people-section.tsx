"use client";
import { ProfileCard } from "./profile-card";
import { Badge } from "@components";
import { useEffect, useState } from "react";
import { AccountListResponse, RequestApi } from "@api";

export function PeopleSection() {
  const [selectedField, setSelectedField] = useState("전체");
  const [accountList, setAccountList] = useState<AccountListResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const accountList = await RequestApi.accounts.getAccountList();
        setAccountList(accountList);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleClickBadge = (word: string) => {
    setSelectedField(word);
  };

  return (
    <div className="w-full">
      <div className="text-[24px] md:text-3xl mb-[10px] md:mb-[13px] text-[#1e1e1e] font-semibold">품앗이꾼 🌱</div>
      <span className="text-[#495057] font-normal text-[16px] md:text-[24px] mb-[40px]">
        로그인 후 도움받고 싶은 품앗이꾼에게 질문을 작성해보세요!
      </span>
      <div className="flex flex-wrap mt-[40px]">
        <Badge onClick={() => handleClickBadge("전체")} word={"전체"} isSelected={selectedField === "전체"} />
        <Badge
          onClick={() => handleClickBadge("Web Frontend")}
          word={"Web Frontend"}
          isSelected={selectedField === "Web Frontend"}
        />
        <Badge onClick={() => handleClickBadge("Backend")} word={"Backend"} isSelected={selectedField === "Backend"} />
        <Badge
          onClick={() => handleClickBadge("Fullstack")}
          word={"Fullstack"}
          isSelected={selectedField === "Fullstack"}
        />
        <Badge onClick={() => handleClickBadge("Android")} word={"Android"} isSelected={selectedField === "Android"} />
        <Badge onClick={() => handleClickBadge("iOS")} word={"iOS"} isSelected={selectedField === "iOS"} />
        <Badge onClick={() => handleClickBadge("Data")} word={"Data"} isSelected={selectedField === "Data"} />
      </div>

      <div className="flex">
        <div className="flex flex-wrap justify-around">
          {accountList
            .filter((account: any) => {
              if (selectedField === "전체") return true;
              else return account.field === selectedField;
            })
            .map((account: any) => (
              <ProfileCard key={account.id} profileData={account} />
            ))}
        </div>
      </div>
    </div>
  );
}

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
      <div className="h-1 w-[30px] bg-[black] mt-[7px] mb-4"></div>
      <div className="text-[25px] md:text-3xl mb-[13px]">품앗이꾼</div>

      <div className="flex flex-wrap">
        <Badge onClick={() => handleClickBadge("전체")} word={"전체"} />
        <Badge onClick={() => handleClickBadge("Web Frontend")} word={"Web Frontend"} />
        <Badge onClick={() => handleClickBadge("Backend")} word={"Backend"} />
        <Badge onClick={() => handleClickBadge("Fullstack")} word={"Fullstack"} />
        <Badge onClick={() => handleClickBadge("Android")} word={"Android"} />
        <Badge onClick={() => handleClickBadge("iOS")} word={"iOS"} />
        <Badge onClick={() => handleClickBadge("Data")} word={"Data"} />
      </div>

      <div className="flex">
        <div className="flex flex-wrap  ">
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

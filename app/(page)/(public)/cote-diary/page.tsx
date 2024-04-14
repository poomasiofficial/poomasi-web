"use client";
import { RequestApi, getCoteDiaryMainResponse } from "@api";
import { accountTokenState } from "@store";
import { KakaoLogin } from "@utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const CoteDiaryPage = () => {
  const accountToken: string | null = useRecoilValue(accountTokenState);

  const [recentDiary, setRecentDiary] = useState<any>();
  const [activityRecord, setActivityRecord] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const response = await RequestApi.posts.getCoteDiaryMain();
        setRecentDiary(response?.recent_diary);
        setActivityRecord(response?.activity_record);
      } catch (error: any) {}
    })();
  }, []);

  return (
    <>
      {accountToken ? (
        <div className="w-full pt-20">
          <Link
            href="/cote-diary/post"
            className="shadow-lg flex justify-center items-center rounded-full w-[80px] h-[80px] fixed bottom-[20px] right-[20px] md:bottom-[50px] md:right-[50px] bg-black text-white"
          >
            <Image src="/pencil.png" width={30} height={30} alt="일기쓰기 아이콘" />
          </Link>
          <div className="flex items-center justify-center w-full px-[5%]">
            <div className="w-[1200px] mb-10">
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-6">
                  <Image src="/diary.png" alt="일기 아이콘" width={80} height={80} />
                  <span className="text-[#939393] text-center leading-7">
                    규칙적으로 꾸준히 문제를 풀어보세요.
                    <br />
                    조금씩 성장하고 있는 나를 발견할 수 있을 거에요.
                  </span>
                  <Link href="/cote-diary/post">
                    <button className="bg-[#F7F8F9] rounded-xl w-[300px] h-[56px] border-solid border-[1px] border-[#C8C8C8] font-semibold">
                      코테일기 작성하기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full px-[5%]">
            <div className="w-[1200px] mb-10">
              <div>
                <div className="flex justify-between">
                  <h2 className="text-[1.3rem] md:text-[1.5rem] font-semibold">최근 일기</h2>
                  <Link href="/cote-diary/calendar" className="flex gap-[4px] items-center">
                    <span className="text-[#8A8F95] text-[1.25rem] font-semibold">전체 일기</span>
                    <Image src="/arrow-right.svg" alt="오른쪽 화살표" width={24} height={24}></Image>
                  </Link>
                </div>

                <div className="pt-[20px] flex gap-[20px] flex-wrap ">
                  {recentDiary?.map((diary: any) => (
                    <Link
                      href={`cote-diary/${diary?.public_id}`}
                      key={diary?.public_id}
                      className="w-full md:w-[280px]"
                    >
                      <li className="flex flex-col h-[123px] bg-[#F7F8F9] rounded-xl p-[18px]">
                        <span className="text-[#8A8F95] font-semibold text-[1rem]">{diary?.site_name}</span>
                        <span className="font-semibold text-[1.25rem]">{diary?.name}</span>
                        <div className="flex gap-[16px] pt-[10px]">
                          <div className="flex items-center gap-[4px]">
                            {diary?.incorrect_type === "해결하지 못함" ? (
                              <div className="rounded-full bg-[#FF4343] w-[10px] h-[10px] leading-[10px]"></div>
                            ) : diary?.incorrect_type === "단순 실수" ? (
                              <div className="rounded-full bg-[#FFE143] w-[10px] h-[10px] leading-[10px]"></div>
                            ) : diary?.incorrect_type === "더 좋은 풀이가 있음" ? (
                              <div className="rounded-full bg-[#84B1ED] w-[10px] h-[10px] leading-[10px]"></div>
                            ) : diary?.incorrect_type === "잘 풀었음" ? (
                              <div className="rounded-full bg-[#67D5B5] w-[10px] h-[10px] leading-[10px]"></div>
                            ) : null}
                            <span className="text-[#8A8F95] font-semibold text-[1rem]">{diary?.incorrect_type}</span>
                          </div>
                          <span className="text-[#8A8F95] font-semibold text-[1rem]"># {diary?.category}</span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full px-[5%]">
            <div className="w-[1200px] mb-10">
              <div>
                <h2 className="text-[1.3rem] md:text-[1.5rem] font-semibold">활동 기록</h2>
                <article className="bg-[#F7F8F9] rounded-xl w-full h-auto p-[20px] md:p-[60px] mt-[20px]">
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="border-solid border-b-[1px] border-[#C8C8C8]">
                        <th className="border border-gray-400 px-4 py-2">카테고리</th>
                        <th className="border border-gray-400 px-4 py-2">문제 수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityRecord?.map((item: any, index: number) => (
                        <tr key={index} className="border-solid border-b-[1px] border-[#C8C8C8]">
                          <td className="border border-gray-400 px-4 py-2 text-[#747474]">{item?.category}</td>
                          <td className="border border-gray-400 px-4 py-2 text-center text-[#747474]">{item?.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full pt-20 h-[100vh] flex items-center">
          <div className="flex items-center justify-center w-full px-[5%]">
            <div className="w-[1200px] mb-10">
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-6">
                  <Image src="/diary.png" alt="일기 아이콘" width={80} height={80} />
                  <span className="text-[#939393] text-center leading-7">
                    규칙적으로 꾸준히 문제를 풀어보세요.
                    <br />
                    조금씩 성장하고 있는 나를 발견할 수 있을 거에요.
                  </span>
                  <KakaoLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoteDiaryPage;

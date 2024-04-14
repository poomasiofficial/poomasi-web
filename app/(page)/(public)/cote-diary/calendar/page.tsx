"use client";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
import { GetCoteDiaryListResponse, RequestApi } from "@api";
import Image from "next/image";
import { accountTokenState } from "@store";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
const DiaryCalendarPage = () => {
  const router = useRouter();
  const accountToken: string | null = useRecoilValue(accountTokenState);
  const [selectedFilter, setSelectedFilter] = useState("");
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  const [date, setDate] = useState(dayjs());
  const [diaryList, setDiaryList] = useState<React.SetStateAction<GetCoteDiaryListResponse[] | null>>();
  const handleDateChange = (newValue: any) => {
    setDate(newValue);
    (async () => {
      try {
        const diaries = await RequestApi.posts.getCoteDiaryList(dayjs(newValue).format("YYYY-MM-DD"));
        setDiaryList(diaries);
      } catch (error: any) {
        console.log(error);
      }
    })();
  };
  useEffect(() => {
    (async () => {
      try {
        const diaries = await RequestApi.posts.getCoteDiaryList(dayjs().format("YYYY-MM-DD"));
        setDiaryList(diaries);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (!accountToken) {
      router.push("/cote-diary");
    }
  }, [accountToken]);
  return (
    <div className="w-full pt-20 h-[100dvh] overflow-hidden">
      <div className="flex items-center justify-center w-full px-[5%]">
        <div className="w-[1200px] mb-10">
          <Link
            href="/cote-diary/post"
            className="shadow-lg flex justify-center items-center rounded-full w-[80px] h-[80px] fixed bottom-[20px] right-[20px] md:bottom-[50px] md:right-[50px] bg-black text-white"
          >
            <Image src="/pencil.png" width={30} height={30} alt="일기쓰기 아이콘" />
          </Link>
          <div className="flex flex-wrap">
            <div className="flex-[1] flex justify-center items-center min-w-[100px] mt-0">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DateCalendar
                  value={date}
                  onChange={(newValue) => handleDateChange(newValue)}
                  sx={{
                    "@media (min-width: 768px)": {
                      transform: "scale(1.5)",
                    },
                    "@media (max-width: 768px)": {
                      transform: "scale(1.15)",
                    },
                    margin: 0,
                    "& .MuiPickersDay-root": {
                      "&.Mui-selected": {
                        backgroundColor: "#000000",
                      },
                    },
                    "& .MuiPickersDay-root:hover": {
                      "&.Mui-selected": {
                        backgroundColor: "#000000",
                      },
                    },
                    ".css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected": {
                      backgroundColor: "#000000",
                    },
                    ".css-23p0if-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected": {
                      backgroundColor: "#000000",
                    },
                  }}
                  defaultValue={dayjs()}
                />
              </LocalizationProvider>
            </div>
            <div className="flex-[1] bg-[#F7F8F9] h-[calc(100vh_-_450px)] md:h-[80vh] rounded-2xl px-[20px] min-w-full md:min-w-[500px]">
              {diaryList && diaryList?.length > 0 ? (
                <div className="flex flex-[flex-start] gap-x-[20px] gap-y-[10px] mt-[20px] flex-wrap">
                  <button
                    className={`flex items-center ${
                      selectedFilter === "" ? "text-black" : "text-[#8A8F95]"
                    } font-regular text-[1rem]`}
                    onClick={() => handleFilterChange("")}
                  >
                    전체
                  </button>
                  <button
                    className={`flex items-center gap-[4px] ${
                      selectedFilter === "해결하지 못함" ? "text-black" : "text-[#8A8F95]"
                    } font-regular text-[1rem]`}
                    onClick={() => handleFilterChange("해결하지 못함")}
                  >
                    <div className="rounded-full bg-[#FF4343] w-[10px] h-[10px] leading-[10px]"></div>
                    해결하지 못함
                  </button>
                  <button
                    className={`flex items-center gap-[4px] ${
                      selectedFilter === "단순 실수" ? "text-black" : "text-[#8A8F95]"
                    } font-regular text-[1rem]`}
                    onClick={() => handleFilterChange("단순 실수")}
                  >
                    <div className="rounded-full bg-[#FEEE7D] w-[10px] h-[10px] leading-[10px]"></div>
                    단순 실수
                  </button>
                  <button
                    className={`flex items-center gap-[4px] ${
                      selectedFilter === "더 좋은 풀이가 있음" ? "text-black" : "text-[#8A8F95]"
                    } font-regular text-[1rem]`}
                    onClick={() => handleFilterChange("더 좋은 풀이가 있음")}
                  >
                    <div className="rounded-full bg-[#84B1ED] w-[10px] h-[10px] leading-[10px]"></div>더 좋은 풀이가
                    있음
                  </button>
                  <button
                    className={`flex items-center gap-[4px] ${
                      selectedFilter === "잘 풀었음" ? "text-black" : "text-[#8A8F95]"
                    } font-regular text-[1rem]`}
                    onClick={() => handleFilterChange("잘 풀었음")}
                  >
                    <div className="rounded-full bg-[#67D5B5] w-[10px] h-[10px] leading-[10px]"></div>잘 풀었음
                  </button>
                </div>
              ) : null}

              {diaryList && diaryList?.length > 0 ? (
                <ul className="flex flex-col gap-[20px] my-[20px] md:mt-[30px] overflow-y-scroll h-[70%] md:h-[460px]">
                  {Array.isArray(diaryList) &&
                    diaryList?.map((diary) =>
                      selectedFilter === "" || selectedFilter === diary?.incorrect_type ? (
                        <Link href={`/cote-diary/${diary?.public_id}`} key={diary?.public_id}>
                          <li className="flex flex-col w-full h-[123px] bg-[white] rounded-xl p-[18px] cursor-pointer">
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
                                <span className="text-[#8A8F95] font-semibold text-[1rem]">
                                  {diary?.incorrect_type}
                                </span>
                              </div>
                              <span className="text-[#8A8F95] font-semibold text-[1rem]"># {diary?.category}</span>
                            </div>
                          </li>
                        </Link>
                      ) : null
                    )}
                </ul>
              ) : (
                <div className="flex items-center h-full justify-center">
                  <span className="text-[#939393] text-center leading-7">작성한 일기가 없어요 ):</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCalendarPage;

"use client";

import { RequestApi } from "@api";
import {
  errorToastMessageState,
  isErrorToastOpenState,
  isSuccessToastOpenState,
  successToastMessageState,
} from "@store";
import Crawler from "@utils/crawler/crawler";
import { ReactNode, useState } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DiaryPostPage = () => {
  const router = useRouter();
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState);
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState);
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState);
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState);

  const [inputs, setInputs] = useState({
    link: "",
    name: "",
    siteName: "",
    incorrectType: "해결하지 못함",
    category: "",
    timeComplexity: "",
    code: "",
    memo: "",
    isAgain: false,
  });
  const { link, name, siteName, incorrectType, category, timeComplexity, code, memo, isAgain } = inputs;

  const [showTip, setShowTip] = useState(true);
  const postDiary = () => {
    (async () => {
      try {
        await RequestApi.posts.postCoteDiary({
          link,
          name,
          siteName,
          incorrectType,
          category,
          timeComplexity,
          code,
          memo,
          isAgain,
        });

        setInputs({
          link: "",
          name: "",
          siteName: "",
          incorrectType: "해결하지 못함",
          category: "",
          timeComplexity: "",
          code: "",
          memo: "",
          isAgain: false,
        });
        setTimeout(() => {
          setIsSuccessToastOpen(true);
          setSuccessToastMessage("일기가 등록되었습니다.");
        }, 1300);
        router.push("/cote-diary/calendar");
      } catch (error: any) {
        console.log(error);
        setIsErrorToastOpen(true);
        setErrorToastMessage("일기 등록에 실패했습니다!");
      }
    })();
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const 문제검색 = async () => {
    setShowTip(false);
    try {
      const data: any = await RequestApi.posts.getLinkInfo(link);
      if (data?.site_name === "" || data?.name === "") {
        setIsErrorToastOpen(true);
        setErrorToastMessage("현재 문제검색 기능은 백준, 프로그래머스만 지원하고 있어요 ");
      }
      setInputs({
        ...inputs,
        siteName: data?.site_name as string,
        name: data?.name as string,
      });
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className="w-full pt-20">
      <div className="flex items-center justify-center w-full px-[5%]">
        <div className="w-[1200px] mb-10">
          <h1 className="text-[1.5rem] font-semibold">일기 작성</h1>
          <div className="h-[1px] w-full bg-[#808080] my-[20px]" />
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center">
              <div className="w-[80px]">
                <span>문제 링크</span>
              </div>
              <input
                placeholder="문제링크를 붙여넣어주세요!"
                className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] focus:outline-none"
                name="link"
                value={link}
                onChange={handleChange}
              />
              {/^https:\/\/www\.acmicpc\.net\/.*/.test(link) ||
              /^https:\/\/school\.programmers\.co\.kr\/.*/.test(link) ? (
                <div className="relative">
                  {showTip ? (
                    <>
                      <div className="bg-[#3b82f6] w-[max-content] h-[40px] absolute top-[-50px] right-[-40px] shadow-lg p-[10px] rounded-lg text-center leading-[20px] text-white animate-bounce hidden md:block">
                        Tip ⭐️ 문제를 검색하면 자동으로 문제가 채워져요!
                      </div>
                    </>
                  ) : null}

                  <button
                    className="bg-black p-[12px] rounded-r-[5px] text-white"
                    onClick={() => {
                      문제검색();
                    }}
                  >
                    <Image src="/search.png" width={24} height={24} alt="검색 아이콘" />
                  </button>
                </div>
              ) : null}
            </div>
            <div className="flex items-center">
              <div className="w-[80px]">
                <span>문제</span>
              </div>
              <input
                value={siteName && name ? `[${siteName}] ${name}` : ""}
                className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] focus:outline-none"
              />
            </div>
            <div className="flex gap-x-[44px] gap-y-[20px] flex-wrap">
              <div className="flex items-center flex-auto">
                <div className="w-[80px]">
                  <span>카테고리</span>
                </div>
                <select
                  className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] w-[250px] md:w-[200px]"
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    -----
                  </option>
                  <option value="자료구조">자료구조</option>
                  <option value="수학">수학</option>
                  <option value="구현">구현</option>
                  <option value="정렬">정렬</option>
                  <option value="백트래킹">백트래킹</option>
                  <option value="DFS">DFS</option>
                  <option value="BFS">BFS</option>
                  <option value="DP">DP</option>
                  <option value="그리디">그리디</option>
                  <option value="이분 탐색">이분 탐색</option>
                  <option value="분할 정복">분할 정복</option>
                  <option value="최단 경로">최단 경로</option>
                  <option value="최소 신장 트리">최소 신장 트리</option>
                  <option value="위상 정렬">위상 정렬</option>
                  <option value="세그먼트 트리">세그먼트 트리</option>
                  <option value="문자열">문자열</option>
                </select>
              </div>
              <div className="flex items-center flex-auto">
                <div className="w-[80px]">
                  <span>시간복잡도</span>
                </div>
                <select
                  className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] w-[250px] md:w-[200px]"
                  name="timeComplexity"
                  value={timeComplexity}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    -----
                  </option>
                  <option value="O(1)">O(1)</option>
                  <option value="O(logn)">O(logn)</option>
                  <option value="O(n)">O(n)</option>
                  <option value="O(nlogn)">O(nlogn)</option>
                  <option value="O(n^2)">O(n^2)</option>
                  <option value="O(n^3)">O(n^3)</option>
                  <option value="O(2^n)">O(2^n)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-[80px]">
                <span>오답유형</span>
              </div>
              <div className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px]">
                <div className="flex flex-[flex-start] gap-x-[20px] gap-y-[12px] flex-wrap">
                  <label className="flex items-center gap-[4px] ">
                    <input
                      type="radio"
                      name="incorrectType"
                      value="해결하지 못함"
                      checked={incorrectType === "해결하지 못함"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`rounded-full w-[10px] h-[10px] leading-[10px] ${
                        incorrectType === "해결하지 못함" ? "bg-[#FF4343]" : "bg-gray-200"
                      }`}
                    ></div>
                    <span
                      className={`text-[#8A8F95] font-regular text-[1rem] ${
                        incorrectType === "해결하지 못함" ? "text-black" : ""
                      }`}
                    >
                      해결하지 못함
                    </span>
                  </label>
                  <label className="flex items-center gap-[4px]">
                    <input
                      type="radio"
                      name="incorrectType"
                      value="단순 실수"
                      checked={incorrectType === "단순 실수"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`rounded-full w-[10px] h-[10px] leading-[10px] ${
                        incorrectType === "단순 실수" ? "bg-[#FEEE7D]" : "bg-gray-200"
                      }`}
                    ></div>
                    <span
                      className={`text-[#8A8F95] font-regular text-[1rem] ${
                        incorrectType === "단순 실수" ? "text-black" : ""
                      }`}
                    >
                      단순 실수
                    </span>
                  </label>
                  <label className="flex items-center gap-[4px]">
                    <input
                      type="radio"
                      name="incorrectType"
                      value="더 좋은 풀이가 있음"
                      checked={incorrectType === "더 좋은 풀이가 있음"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`rounded-full w-[10px] h-[10px] leading-[10px] ${
                        incorrectType === "더 좋은 풀이가 있음" ? "bg-[#84B1ED]" : "bg-gray-200"
                      }`}
                    ></div>
                    <span
                      className={`text-[#8A8F95] font-regular text-[1rem] ${
                        incorrectType === "더 좋은 풀이가 있음" ? "text-black" : ""
                      }`}
                    >
                      더 좋은 풀이가 있음
                    </span>
                  </label>
                  <label className="flex items-center gap-[4px]">
                    <input
                      type="radio"
                      name="incorrectType"
                      value="잘 풀었음"
                      checked={incorrectType === "잘 풀었음"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`rounded-full w-[10px] h-[10px] leading-[10px] ${
                        incorrectType === "잘 풀었음" ? "bg-[#67D5B5]" : "bg-gray-200"
                      }`}
                    ></div>
                    <span
                      className={`text-[#8A8F95] font-regular text-[1rem] ${
                        incorrectType === "잘 풀었음" ? "text-black" : ""
                      }`}
                    >
                      잘 풀었음
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-[80px] pt-[4px]">
                <span>코드</span>
              </div>
              <textarea
                className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] h-[300px] overflow-y-scroll"
                name="code"
                value={code}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex">
              <div className="w-[80px] pt-[4px]">
                <span>메모</span>
              </div>
              <textarea
                className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] h-[300px] overflow-y-scroll"
                name="memo"
                value={memo}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              onClick={postDiary}
              className="w-full h-[60px] md:w-[130px] md:h-[50px] bg-black text-white rounded-lg ml-auto mb-[0px] md:mb-[80px] font-semibold text-[20px] md:text-[18px]"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryPostPage;

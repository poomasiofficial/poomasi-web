"use client";
import { GetCoteDiaryDetailResponse, GetCoteDiaryListResponse, RequestApi } from "@api";
import {
  accountTokenState,
  errorToastMessageState,
  isErrorToastOpenState,
  isSuccessToastOpenState,
  successToastMessageState,
} from "@store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
const DetailPage = () => {
  const router = useRouter();
  const accountToken: string | null = useRecoilValue(accountTokenState);
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState);
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState);
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState);
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState);

  const [diary, setDiary] = useState<GetCoteDiaryDetailResponse | null>();
  const [isEditMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState({
    link: diary?.link,
    name: diary?.name,
    siteName: diary?.site_name,
    incorrectType: diary?.incorrect_type,
    category: diary?.category,
    timeComplexity: diary?.time_complexity,
    code: diary?.code,
    memo: diary?.memo,
    isAgain: false,
  });
  const { link, name, siteName, incorrectType, category, timeComplexity, code, memo, isAgain } = inputs;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const params = useParams<{ id: string }>();
  useEffect(() => {
    (async () => {
      try {
        const response = await RequestApi.posts.getCoteDiaryDetail(params.id);
        setDiary(response);
        setInputs({
          link: response?.link,
          name: response?.name,
          siteName: response?.site_name,
          incorrectType: response?.incorrect_type,
          category: response?.category,
          timeComplexity: response?.time_complexity,
          code: response?.code,
          memo: response?.memo,
          isAgain: false,
        });
      } catch (error: any) {}
    })();
  }, [isEditMode]);

  console.log(incorrectType);
  const patchDiary = () => {
    const id = params.id;
    console.log(id, link, name, siteName, incorrectType, category, timeComplexity, code, memo, isAgain);

    (async () => {
      try {
        await RequestApi.posts.patchCoteDiary({
          id,
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

        setEditMode(false);
        setTimeout(() => {
          setIsSuccessToastOpen(true);
          setSuccessToastMessage("일기가 수정되었습니다.");
        }, 1300);
      } catch (error: any) {
        console.log(error);
        setIsErrorToastOpen(true);
        setErrorToastMessage("일기 수정에 실패했습니다!");
      }
    })();
  };
  useEffect(() => {
    if (!accountToken) {
      router.push("/cote-diary");
    }
  }, [accountToken]);

  return (
    <div className="w-full pt-20">
      <div className="flex items-center justify-center w-full px-[5%]">
        <div className="w-[1200px] mb-10">
          {!isEditMode ? (
            <>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[#808080]">{diary?.site_name}</span>
                  <h1 className="text-[1.5rem] font-semibold">{diary?.name}</h1>
                </div>
                <button
                  className="flex items-end"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  수정하기
                </button>
              </div>
              <div className="h-[1px] w-full bg-[#808080] my-[12px]" />
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
                <span className="text-[#8A8F95] font-semibold text-[1rem] ml-[10px]"> # {diary?.category}</span>
                <span className="text-[#8A8F95] font-semibold text-[1rem] ml-[10px]">{diary?.time_complexity}</span>
              </div>

              <div className="flex flex-col gap-[20px]  mt-[40px]">
                <div className="flex">
                  <div className="w-[50px] md:w-[80px] pt-[4px]">
                    <span>코드</span>
                  </div>
                  <textarea
                    readOnly
                    className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] h-[300px] overflow-y-scroll"
                    name="code"
                    value={diary?.code}
                  ></textarea>
                </div>
                <div className="flex">
                  <div className="w-[50px] md:w-[80px] pt-[4px]">
                    <span>메모</span>
                  </div>
                  <textarea
                    className="bg-[#F7F8F9] flex-[1] p-[12px] rounded-[5px] h-[300px] overflow-y-scroll"
                    name="memo"
                    readOnly
                    value={diary?.memo}
                  ></textarea>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[#808080]">{diary?.site_name}</span>
                  <h1 className="text-[1.5rem] font-semibold">{diary?.name}</h1>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#808080] my-[12px]" />
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-x-[44px] gap-y-[20px] flex-wrap  mt-[20px]">
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
              </div>
              <div className="flex flex-col gap-[20px]  mt-[20px]">
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
                  onClick={patchDiary}
                  className="w-full h-[60px] md:w-[130px] md:h-[50px] bg-black text-white rounded-lg ml-auto mb-[0px] md:mb-[80px] font-semibold text-[20px] md:text-[18px]"
                >
                  저장
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

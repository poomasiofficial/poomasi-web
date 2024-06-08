"use client";

import { useParams, useRouter } from "next/navigation";

import {
  isErrorToastOpenState,
  errorToastMessageState,
  isSuccessToastOpenState,
  successToastMessageState,
  accountTokenState,
  publicIdState,
} from "@store";
import { useRecoilValue, useSetRecoilState, SetterOrUpdater } from "recoil";

import { AccountResponse, CareerYearType, GetQnaListResponse, QnaListType, RequestApi } from "@api";
import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { TextareaAutosize } from "@mui/material";
import { DebouncedButton, Badge } from "@components";
import Image from "next/image";

const QUESTION_MAX_LENGTH: number = 500;

const getCareerYearString = (career_year: string) => {
  switch (career_year) {
    case CareerYearType.대학생:
      return "대학생";
    case CareerYearType.취준생:
      return "취준생";
    case CareerYearType.신입_3년차:
      return "신입~3년차";
    case CareerYearType._3년차_이상:
      return "3년차 이상";
    default:
      return "대학생";
  }
};

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();

  const publicId: string | null = useRecoilValue(publicIdState);
  const accountToken: string | null = useRecoilValue(accountTokenState);
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState);
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState);
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState);
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState);

  const [account, setAccount]: [AccountResponse | undefined, Function] = useState();
  const [qnas, setQnas]: [Array<GetQnaListResponse>, Function] = useState([]);
  const [qnaListType, setQnaListType]: [QnaListType, Function] = useState(QnaListType.ALL);

  /**
   * Question info
   */
  const [questionText, setQuestionText]: [string, Function] = useState("");
  const [isSecret, setIsSecret]: [boolean, Function] = useState(false);
  // U(대학생), R(취준생), N(신입~3년차), S(3년차 이상)
  const [careerYear, setCareerYear]: [string, Function] = useState(CareerYearType.대학생);
  const [isMajor, setIsMajor]: [boolean, Function] = useState(true);

  const handleClickBadge = (word: string) => {
    setQnaListType(word);
  };

  const handleQuestionTextChange = (event: any) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value);
    }
  };
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev);
  };
  const handleCareerYearChange = (event: any) => {
    setCareerYear(event.target.value);
  };
  const handleIsMajorChange = (e: any, value: boolean) => {
    setIsMajor(value);
  };

  const handleQuestionButtonClick = () => {
    const id = params.nickname as string;
    if (!accountToken) {
      setIsErrorToastOpen(true);
      setErrorToastMessage("질문하려면 로그인이 필수입니다!");
      return;
    }
    if (questionText.length < 10) {
      setIsErrorToastOpen(true);
      setErrorToastMessage("질문은 10자 이상이어야 합니다!");
      return;
    }
    (async () => {
      try {
        await RequestApi.posts.postQna({ id, isSecret, careerYear, isMajor, questionText });

        setQuestionText("");
        setIsSecret(false);
        setCareerYear(CareerYearType.대학생);
        setIsMajor(true);

        setTimeout(() => {
          setIsSuccessToastOpen(true);
          setSuccessToastMessage("질문이 등록되었습니다.");
        }, 1300);

        const qnas = await RequestApi.posts.getQnaList(qnaListType, id);
        setQnas(qnas);
      } catch (error: any) {
        console.log(error);
        setIsErrorToastOpen(true);
        setErrorToastMessage("질문 등록에 실패했습니다!");
      }
    })();
  };

  useEffect(() => {
    const id = params.nickname as string;
    window.scrollTo(0, 0);

    (async () => {
      try {
        const account = await RequestApi.accounts.getAccount(id);
        setAccount(account);

        const qnas = await RequestApi.posts.getQnaList(qnaListType, id);
        setQnas(qnas);
      } catch (error: any) {
        router.push("/");
      }
    })();
  }, [qnaListType]);

  useEffect(() => {
    const id = params.nickname as string;
    (async () => {
      const qnas = await RequestApi.posts.getQnaList(qnaListType, id);
      setQnas(qnas);
    })();
  }, [qnaListType, params.nickname]);

  return (
    <div className="w-full pt-[80px]">
      <div className="flex items-center justify-center w-full px-[5%] py-0">
        <div className="w-[1200px] mb-[50px]">
          {!account || !qnas ? (
            <>Loading...</>
          ) : (
            <>
              <div className="w-full flex">
                <div className="flex w-[140px]  overflow-hidden relative rounded-[50%]">
                  <Image
                    className="object-contain"
                    src={account?.profile_image}
                    alt={"profile-image"}
                    width={140}
                    height={140}
                  />
                </div>

                <div className="ml-[13px] pt-0 flex flex-col justify-between w-full md:ml-[30px] md:pt-10">
                  <div className="flex flex-col items-start md:flex-row md:items-end">
                    <div className="text-3xl font-bold md:text-[40px] text-[#1E1E1E]">{account?.name}</div>
                    <div className="mt-[5px] md:mt-[0px] text-[14px] md:text-[23px] ml-0 md:text-xl text-[#1E1E1E] md:ml-2.5 rounded bg-[#D7E0F9] py-[3px] px-[10px]">
                      {account?.field}
                    </div>
                  </div>
                  <div className="sm:text-base text-[15px] md:text-xl font-semibold text-[var(--light-gray-color)]">
                    {"現 " + account?.company1 + " " + account?.job1}
                  </div>
                </div>
              </div>

              <TextareaAutosize
                className="text-[#495057] text-sm md:text-[17px] box-border w-full resize-none mt-12 p-0 border-none outline-none"
                readOnly
                value={account?.description}
              />

              <div className="w-full h-[250px] md:h-[300px] mt-5">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="flex items-center font-semibold text-2xl text-[#1E1E1E]">질문하기</div>
                    {questionText.length === 500 ? (
                      <div className="text-base flex items-center text-[red] ml-[10px] mt-0.5">
                        {`(${questionText.length} / 500)`}
                      </div>
                    ) : (
                      <div className="text-base flex items-center text-[color:var(--gray-color)] ml-[10px] mt-0.5">
                        {`(${questionText.length} / 500)`}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-2 flex-col md:flex-row">
                  <div style={{ marginTop: "7px", display: "flex" }} className="justify-start md:justify-between">
                    <div style={{ display: "flex" }} className="flex-col md:flex-row">
                      <div className="flex items-center ">
                        <label className="mr-[10px]">개발 경력</label>
                        <select
                          className="bg-[#F7F8F9] py-[5px] px-[6px] md:px-[10px] rounded"
                          value={careerYear}
                          onChange={handleCareerYearChange}
                        >
                          <option value={CareerYearType.대학생}>대학생</option>
                          <option value={CareerYearType.취준생}>취준생</option>
                          <option value={CareerYearType.신입_3년차}>신입~3년차</option>
                          <option value={CareerYearType._3년차_이상}>3년차 이상</option>
                        </select>
                        <RadioGroup row className="ml-[10px] md:ml-[15px]">
                          <FormControlLabel
                            value="전공"
                            control={
                              <Radio
                                sx={{
                                  "&.Mui-checked": {
                                    color: "#65BD57",
                                  },
                                }}
                                size="small"
                                checked={isMajor}
                                onChange={(e) => handleIsMajorChange(e, true)}
                              />
                            }
                            label="전공"
                          />
                          <FormControlLabel
                            sx={{ marginRight: "0" }}
                            value="비전공"
                            control={
                              <Radio
                                sx={{
                                  "&.Mui-checked": {
                                    color: "#65BD57",
                                  },
                                }}
                                size="small"
                                checked={!isMajor}
                                onChange={(e) => handleIsMajorChange(e, false)}
                              />
                            }
                            label="비전공"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <FormControlLabel
                    className="m-0"
                    control={
                      <Switch
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#65BD57",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#65BD57",
                          },
                        }}
                        checked={isSecret}
                        onChange={handleIsSecretChange}
                      />
                    }
                    label="비밀 질문"
                  />
                </div>
                <textarea
                  className="text-[15px] h-2/5 outline-[#65BD57] md:text-base box-border w-full md:h-3/5 resize-none mt-[10px] p-5 rounded-[10px] border border-[#65BD57] border-solid"
                  value={questionText}
                  onChange={handleQuestionTextChange}
                  placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
                />
              </div>
              <DebouncedButton
                text={"등록하기"}
                onClick={() => handleQuestionButtonClick()}
                variant="contained"
                sx={{
                  width: "120px",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  color: "white",
                  float: "right",
                  background: "#65BD57",
                  boxShadow: "none",
                }}
              />

              <div className="mt-[70px] w-full">
                <div className="h-1 w-full mt-2.5 mb-5 border-t-2 border-solid border-[#D9D9D9]" />
                <div
                  className="text-2xl font-semibold"
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  질문
                </div>

                <div className="flex w-full">
                  <Badge
                    onClick={() => handleClickBadge(QnaListType.ALL)}
                    word={"전체"}
                    isSelected={qnaListType === QnaListType.ALL}
                  />
                  <Badge
                    onClick={() => handleClickBadge(QnaListType.ME)}
                    word={"내질문"}
                    isSelected={qnaListType === QnaListType.ME}
                  />
                </div>

                {qnas.length === 0 ? (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    아직 질문이 없네요 :D
                  </div>
                ) : (
                  qnas.map((qna: GetQnaListResponse) => (
                    <div className="mb-[30px] md:mb-[50px]" key={qna.public_id}>
                      {qna.is_secret && qna.questioner_public_id !== publicId ? (
                        <div className="w-4/5 bg-[#E4F7EF] shadow-[0px_4px_8px_rgba(0,0,0,0.2)] md:w-3/5 relative mt-5 p-5">
                          <div className="w-full h-full blur-[7px]">
                            <div style={{ display: "flex" }}>
                              <span className="text-xl mr-[5px] -mt-1">Q.</span>
                              <TextareaAutosize
                                className="outline-none text-sm md:text-base bg-[#E4F7EF] box-border w-full h-full resize-none border-[none]"
                                readOnly
                                value={qna.question_text}
                              />
                            </div>
                            <br />
                            <div
                              className="text-sm"
                              style={{ color: "var(--gray-color)", display: "flex", justifyContent: "flex-end" }}
                            >{`${getCareerYearString(qna.career_year)} / ${qna.is_major ? "전공" : "비전공"} / ${
                              qna.created_at
                            }`}</div>
                          </div>
                          <div className="text-[#495057] text-2xl break-keep absolute -translate-x-2/4 -translate-y-2/4 z-[1] text-center font-bold left-2/4 top-2/4">
                            비밀 질문이에요 🤫
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="w-4/5 bg-[#E4F7EF] shadow-[0px_4px_8px_rgba(0,0,0,0.2)] md:w-3/5 relative mt-5 p-5">
                            <div style={{ display: "flex" }}>
                              <span className="text-xl mr-[5px] -mt-1">Q.</span>
                              <TextareaAutosize
                                className="outline-none text-sm md:text-base bg-[#E4F7EF] box-border w-full h-full resize-none border-[none]"
                                readOnly
                                value={qna.question_text}
                              />
                            </div>

                            <br />

                            <div
                              className="text-sm"
                              style={{ color: "var(--gray-color)", display: "flex", justifyContent: "flex-end" }}
                            >{`${getCareerYearString(qna.career_year)} / ${qna.is_major ? "전공" : "비전공"} / ${
                              qna.created_at
                            }`}</div>
                          </div>
                        </div>
                      )}

                      {qna.answer_text ? (
                        publicId === qna.questioner_public_id ? (
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="w-4/5 bg-[#F7F8F9] shadow-[0px_4px_8px_rgba(0,0,0,0.2)] md:w-3/5 relative mt-5 p-5">
                              <div style={{ display: "flex" }}>
                                <span className="text-xl mr-[5px] -mt-1">A.</span>
                                <TextareaAutosize
                                  className="outline-none text-sm md:text-base bg[#F7F8F9] box-border w-full h-full resize-none border-[none]"
                                  readOnly
                                  value={qna.answer_text}
                                />
                              </div>

                              <br />

                              <div
                                className="text-sm"
                                style={{ color: "var(--gray-color)", display: "flex", justifyContent: "flex-end" }}
                              >{`품앗이꾼 ${account?.name}`}</div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="w-4/5 bg-[#F7F8F9] shadow-[0px_4px_8px_rgba(0,0,0,0.2)] md:w-3/5 relative mt-5 p-5">
                              <div className="w-full h-full blur-[7px]">
                                <div style={{ display: "flex" }}>
                                  <span className="text-xl mr-[5px] -mt-1">A.</span>
                                  <TextareaAutosize
                                    className="text-sm md:text-base bg-[#F7F8F9] box-border w-full h-full resize-none border-[none]"
                                    readOnly
                                    value={qna.answer_text}
                                  />
                                </div>
                                <br />
                                <div
                                  className="text-sm"
                                  style={{ color: "var(--gray-color)", display: "flex", justifyContent: "flex-end" }}
                                >{`품앗이꾼 ${account?.name}`}</div>
                              </div>
                              <div className="text-[#495057] text-2xl break-keep absolute -translate-x-2/4 -translate-y-2/4 z-[1] text-center font-bold left-2/4 top-2/4">
                                {accountToken
                                  ? "답변은 본인만 확인할 수 있어요 👀"
                                  : "답변을 보려면 로그인을 해주세요 👀"}
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

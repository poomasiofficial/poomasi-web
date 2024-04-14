export function FooterSection() {
  return (
    <div className="w-full">
      <div className="h-1 w-[30px] bg-[black] mt-[7px] mb-4"></div>
      <div className="text-[25px] md:text-3xl mb-[13px]">세부 안내</div>
      <div className="leading-relaxed text-lg">
        품삯은 따로 받고 있지 않으나, <br />
        타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요. <br />
        가능한 빠르게 답변하려 노력하고 있으나, <br />
        품앗이꾼별 스케줄 이슈로 답변이 늦어질 수도 있다는 점 양해 부탁드립니다. <br />
        기타 문의 :{" "}
        <a
          href="mailto://poomasiofficial@gmail.com"
          className="hover:text-white hover:bg-black transition duration-500 ease"
        >
          poomasiofficial@gmail.com
        </a>
      </div>
    </div>
  );
}

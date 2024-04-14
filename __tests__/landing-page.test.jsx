import { render, screen } from "@testing-library/react";
import Home from "../app/page";

jest.mock("../app/api/index.ts", () => ({
  RequestApi() {
    return "";
  },
}));

describe("랜딩페이지", () => {
  it("제목 렌더링 테스트", () => {
    render(<Home />);

    const subTitle = screen.getByText("대학생 전문 상담 멘토링,");
    expect(subTitle).toBeInTheDocument();

    const Title = screen.getByText("품앗이");
    expect(Title).toBeInTheDocument();
  });
});

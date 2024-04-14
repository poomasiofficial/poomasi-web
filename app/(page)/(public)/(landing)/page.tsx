import { ReactNode } from "react";
import { DescriptionSection, FooterSection, PeopleSection, TitleSection } from "@page";

export const LandingPage = () => {
  interface WrapperProps {
    children: ReactNode;
  }
  const Container = ({ children }: WrapperProps) => {
    return <div className="w-full pt-20">{children}</div>;
  };

  const PageContainer = ({ children }: WrapperProps) => {
    return <div className="flex items-center justify-center w-full px-[5%]">{children}</div>;
  };

  const PageContent = ({ children }: WrapperProps) => {
    return <div className="w-[1200px] mb-10">{children}</div>;
  };

  return (
    <Container>
      <PageContainer>
        <PageContent>
          <TitleSection />
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent>
          <DescriptionSection />
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent>
          <PeopleSection />
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent>
          <FooterSection />
        </PageContent>
      </PageContainer>
    </Container>
  );
};

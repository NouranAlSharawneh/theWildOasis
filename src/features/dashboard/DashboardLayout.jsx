import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  return (
    <StyledDashboardLayout>
      <div>Stats</div>
      <div>activity</div>
      <div>stay du</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;

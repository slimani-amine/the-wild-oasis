import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
import React from "react";
import { useRecentBookings } from "../../hooks/useRecentBooking";
import { useRecentStays } from "../../hooks/useRecentStays";
import Spinner from "../../ui/Spinner";

export default function DashboardLayout() {
  const { isLoading: isLoading1, bookings = [] } = useRecentBookings();
  const { stays = [], confirmStays, isLoading: isLoading2 } = useRecentStays();

  if (isLoading1 || isLoading1) {
    <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's Activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

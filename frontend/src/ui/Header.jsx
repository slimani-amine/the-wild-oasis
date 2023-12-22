import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 2.4rem;
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

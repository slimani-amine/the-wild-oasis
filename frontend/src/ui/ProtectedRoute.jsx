import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1 Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2 if there is no authenticated user redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  //3 while loading , show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //4 if there is a user , render the app
  if (isAuthenticated) {
    return children;
  }
}

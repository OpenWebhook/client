import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@pluralsight/ps-design-system-button";
import NavUser from "@pluralsight/ps-design-system-navuser";

export const UserOrLogin: React.FC = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  return isAuthenticated && user ? (
    <NavUser name={user.email} meta={user.name} src={user.picture} />
  ) : (
    <Button onClick={() => loginWithRedirect()}>Log In</Button>
  );
};

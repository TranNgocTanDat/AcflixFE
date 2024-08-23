import { useEffect, useState } from "react";
import { useAppDispatch, useAuthSelector } from "../../redux/store";
import { Key } from "../../constants/Key";
import { getUserInfo } from "../../services/authApi";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface AuthorizationFilterProps {
  isAuthenticated: boolean;
  children?: JSX.Element;
}

const AuthorizationFilter = (props: AuthorizationFilterProps) => {
  const { principle } = useAuthSelector();
  const { isAuthenticated, children } = props;
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!principle && isAuthenticated) {
      navigator("/login");
    }
  }, []);

  return <>{children} </>;
};

export default AuthorizationFilter;

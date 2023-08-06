import { emailRegex, passwordRegex } from "../../constants/regex";
import useRegexValidation from "../../hooks/useRegexValidation";
import { signin } from "../../api/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spacing from "../../components/UI/Spacing";
import AuthForm from "../../components/auth/AuthForm";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";
import { LoadingContext } from "../../store/loadingContext";

const SigninPage = () => {
  const email = useRegexValidation({ regex: emailRegex });
  const password = useRegexValidation({ regex: passwordRegex });
  const isFormValid =
    email.isValid &&
    email.value.trim().length !== 0 &&
    password.isValid &&
    password.value.trim().length !== 0;

  const navigate = useNavigate();

  const { setTokenInLocalStorage } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    const data = { email: email.value, password: password.value };
    try {
      const response = await signin(data);
      const accessToken = response.data.access_token;
      setTokenInLocalStorage(accessToken);
      toast.success("로그인에 성공하였습니다.");
      navigate("/todo");
    } catch (error: any) {
      toast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="로그인">
      <Input.TextFiled
        id="email"
        data-testid="email-input"
        type="email"
        placeholder="이메일을 입력해주세요."
        error={!email.isValid}
        onChange={email.handleChange}
        disabled={isLoading}
      />

      <Spacing size={10} direction="vertical" />

      <Input.TextFiled
        id="password"
        data-testid="password-input"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        error={!password.isValid}
        onChange={password.handleChange}
        disabled={isLoading}
      />

      <Spacing size={24} direction="vertical" />

      <Button
        onClick={handleSubmit}
        data-testid="signin-button"
        isFullWidth
        disabled={isLoading || !isFormValid}
      >
        로그인
      </Button>
    </AuthForm>
  );
};

export default SigninPage;

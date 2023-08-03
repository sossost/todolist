import { emailRegex, passwordRegex } from "../../constants/regex";
import useRegexValidation from "../../hooks/useRegexValidation";
import { signin } from "../../api/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, loadingState } from "../../store/recoilAtoms";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spacing from "../../components/UI/Spacing";
import AuthForm from "../../components/auth/AuthForm";

const SigninPage = () => {
  const {
    input: email,
    isValid: emailIsValid,
    handleChange: emailChangeHandler,
  } = useRegexValidation({ regex: emailRegex });
  const {
    input: password,
    isValid: passwordIsValid,
    handleChange: passwordChangeHandler,
  } = useRegexValidation({ regex: passwordRegex });
  const isValid =
    emailIsValid &&
    passwordIsValid &&
    email.trim().length !== 0 &&
    password.trim().length !== 0;

  const navigate = useNavigate();

  const setAccessToken = useSetRecoilState(accessTokenState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };
    try {
      const response = await signin(data);
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
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
        error={!emailIsValid}
        onChange={emailChangeHandler}
        disabled={isLoading}
      />

      <Spacing size={10} direction="vertical" />

      <Input.TextFiled
        id="password"
        data-testid="password-input"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        error={!passwordIsValid}
        onChange={passwordChangeHandler}
        disabled={isLoading}
      />

      <Spacing size={24} direction="vertical" />

      <Button
        onClick={handleSubmit}
        data-testid="signin-button"
        isFullWidth
        disabled={isLoading || !isValid}
      >
        로그인
      </Button>
    </AuthForm>
  );
};

export default SigninPage;

import { useState } from "react";
import { emailRegex, passwordRegex } from "../../constants/regex";
import useRegexValidation from "../../hooks/useRegexValidation";
import { signin } from "../../api/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../store/recoilAtoms";

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
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { email, password };
    setIsLoading(true);
    try {
      const response = await signin(data);
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
      toast.success("로그인에 성공하였습니다.");
      navigate("/todo");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="로그인">
      <Input>
        <Input.TextFiled
          id="email"
          data-testid="email-input"
          type="email"
          placeholder="이메일을 입력해주세요."
          error={!emailIsValid}
          onChange={emailChangeHandler}
          disabled={isLoading}
        />
      </Input>

      <Spacing size={4} direction="vertical" />

      <Input>
        <Input.TextFiled
          id="password"
          data-testid="password-input"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          error={!passwordIsValid}
          onChange={passwordChangeHandler}
          disabled={isLoading}
        />
      </Input>

      <Spacing size={24} direction="vertical" />

      <Button
        onClick={handleSubmit}
        data-testid="signin-button"
        isFullWidth
        disabled={isLoading}
      >
        로그인
      </Button>
    </AuthForm>
  );
};

export default SigninPage;

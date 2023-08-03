import { emailRegex, passwordRegex } from "../../constants/regex";
import useRegexValidation from "../../hooks/useRegexValidation";
import { useState } from "react";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spacing from "../../components/UI/Spacing";
import AuthForm from "../../components/auth/AuthForm";
import ErrorText from "../../components/auth/ErrorText";

const SignupPage = () => {
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
  const {
    input: passwordConfirm,
    isValid: passwordConfirmIsValid,
    handleChange: passwordConfirmChangeHandler,
  } = useRegexValidation({
    regex: passwordRegex,
    password,
  });
  const isValid =
    emailIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid &&
    email.trim().length !== 0 &&
    password.trim().length !== 0 &&
    passwordConfirm.trim().length !== 0;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };
    try {
      await signup(data);
      toast.success("회원가입이 완료되었습니다.");
      navigate("/signin");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="회원가입">
      <Input label="이메일">
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
      {!emailIsValid && <ErrorText>이메일 형식이 올바르지 않습니다.</ErrorText>}

      <Spacing size={12} direction="vertical" />

      <Input label="비밀번호">
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
      {!passwordIsValid && (
        <ErrorText>비밀번호는 8자 이상 입력해주세요.</ErrorText>
      )}
      <Input>
        <Input.TextFiled
          id="password_confirm"
          type="password"
          placeholder="비밀번호를 한번더 입력해주세요."
          error={!passwordConfirmIsValid}
          onChange={passwordConfirmChangeHandler}
          disabled={isLoading}
        />
      </Input>
      {!passwordConfirmIsValid && (
        <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
      )}

      <Spacing size={24} direction="vertical" />

      <Button
        onClick={handleSubmit}
        data-testid="signup-button"
        isFullWidth
        disabled={!isValid || isLoading}
      >
        회원가입
      </Button>
    </AuthForm>
  );
};

export default SignupPage;

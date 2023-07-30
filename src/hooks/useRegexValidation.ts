import { ChangeEvent, useState } from "react";

interface UseRegexValidationProps {
  regex: RegExp;
  password?: string;
}

interface UseRegexValidationReturn {
  input: string;
  isValid: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useRegexValidation = ({
  regex,
  password,
}: UseRegexValidationProps): UseRegexValidationReturn => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validate = (value: string) => {
    const isValidInput = regex.test(value);
    const isValidPasswordConfirm = password ? value === password : true;
    setIsValid(isValidInput && isValidPasswordConfirm);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    validate(e.target.value);
  };

  return {
    input,
    isValid,
    handleChange,
  };
};

export default useRegexValidation;

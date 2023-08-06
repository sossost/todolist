import { ChangeEvent, useState } from "react";

interface UseRegexValidationProps {
  regex: RegExp;
  password?: string;
}

interface UseRegexValidationReturn {
  value: string;
  isValid: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useRegexValidation = ({
  regex,
  password,
}: UseRegexValidationProps): UseRegexValidationReturn => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validate = (value: string) => {
    const isValidInput = regex.test(value);
    const isValidPasswordConfirm = password ? value === password : true;
    setIsValid(isValidInput && isValidPasswordConfirm);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    validate(e.target.value);
  };

  return {
    value,
    isValid,
    handleChange,
  };
};

export default useRegexValidation;

type ValidationProps =
  | {
      value: string | number | RegExp | boolean;
      message?: string;
    }
  | ((arg0: string) => boolean | string);

type InputProps = {
  id: string;
  placeholder: string;
  className?: string;
  additionalValidation?: Record<string, ValidationProps>;
};

export type { InputProps };

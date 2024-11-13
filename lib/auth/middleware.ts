import { z } from 'zod';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      // TODO - We should amend this to use zod properly
      const firstErrorKey = Object.keys(result.error.formErrors.fieldErrors)[0]
      const firstErrorValue = Object.values(result.error.formErrors.fieldErrors)[0]
      return { error: `${firstErrorKey}: ${firstErrorValue}` } as T;
    }

    return action(result.data, formData);
  };
}


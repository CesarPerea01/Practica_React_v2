import React, { createContext, useContext, useState } from "react";

type FormContextType = {
  formState: boolean;
  setFormState: (value: boolean) => void;
};

//1. Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

//2. Create the provider

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState(false);

  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

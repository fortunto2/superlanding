/// <reference types="@testing-library/jest-dom" />

// Расширение глобального namespace jest для добавления пользовательских matcher'ов
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
  }
}

// Расширение типов для testing-library
declare module '@testing-library/react' {
  export * from '@testing-library/react/types';
  export const screen: {
    getByText(text: string): HTMLElement;
    getByRole(role: string): HTMLElement;
    getByTestId(testId: string): HTMLElement;
    queryByText(text: string): HTMLElement | null;
    queryByTestId(testId: string): HTMLElement | null;
    getAllByTestId(testId: string): HTMLElement[];
  };
} 
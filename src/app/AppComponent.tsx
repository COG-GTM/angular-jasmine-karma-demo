import React from 'react';
import { AppRouting } from './AppRouting';

interface AppComponentProps {}

export const AppComponent: React.FC<AppComponentProps> = () => {
  const title = 'angular-jasmine-karma-demo';

  return (
    <>
      <span>{title} app is running!</span>
      <AppRouting />
    </>
  );
};

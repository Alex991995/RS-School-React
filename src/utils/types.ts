export type ObjFormType = {
  username?: string;
  age?: number;
  email?: string;
  gender?: string;
  password?: string;
  passwordConfirmation?: string;
  agree?: boolean;
  img?: FileList | null | string;
  country?: string;
};

export type ObjErrorFormType = {
  username?: string;
  age?: string;
  email?: string;
  gender?: string;
  password?: string;
  passwordConfirmation?: string;
  agree?: string;
  img?: string;
  country?: string;
};

export interface FormElements extends HTMLFormElement {
  username: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  password: HTMLInputElement;
  passwordConfirmation: HTMLInputElement;
  agree: HTMLInputElement;
  country: HTMLInputElement;
  img: HTMLInputElement;
}

export interface Action {
  value: number;
  label: string;
  channels: string[];
}

export interface FormInputs {
  name: string;
  description?: string;
  validity: [Date, Date];
  actions: Action[];
  recommendationFlag: boolean;
  channels?: { [key: string]: number };
}

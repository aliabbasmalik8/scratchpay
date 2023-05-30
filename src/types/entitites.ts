
export interface IClinic {
    name: string;
    state: string;
    availability: IClinicDuration,
}

export interface IState {
  name: string;
  abbreviation: string;
}

export interface IClinicDuration {
  from: string;
  to: string;
}
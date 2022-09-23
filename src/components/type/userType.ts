interface TechStack {
  value?: number;
  id?: number;
  name?: string;
  label?: string;
}

export interface IuserType {
  id: string;
  techStackDtos: TechStack[];
  profileImage: string;
  nickname: string;
}

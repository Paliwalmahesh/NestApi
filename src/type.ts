import { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  password: string;
}

export interface IRequest extends Request {
  userData: AuthUser;
}

export interface Pokemon {
  id: string;
  name: string;
  imageUrl: string;
  power: Power[];
}

export interface Power {
  id: string;
  name: string;
}

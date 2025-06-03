
export interface VersionDTO {
    version: string;
}

export interface GameDTO {
  sorszam: number;
  cim: string;
  beszerzes_datuma: Date;
  kategoria: string;
  platform: string;
}

export interface StaffDTO {
id: number;
username: string;
password: string;
isActive: boolean;
}

export interface StaffResponseDTO {
  id: number;
  username: string;
  isActive: boolean;
}

export interface AdminDTO {
  id: number;
  username: string;
  password: string;
  code: string;
  isActive: boolean;
}

export interface AdminResponseDTO {
  id: number;
  username: string;
  isActive: boolean;
}

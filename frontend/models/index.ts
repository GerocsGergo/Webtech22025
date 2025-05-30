
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

// Frontendnek küldött DTO
export interface AdminResponseDTO {
  id: number;
  username: string;
  isActive: boolean;
}



/* export interface CustomerDTO {
    azonosito: number;
    nev: string;
    telefonszam: string;
    lakcim: string;
    statusz: string;
}



export interface BorrowingDTO {
    id: number;
    game: {
      sorszam: number;
      cim: string;
      beszerzes_datuma: Date;
      tipus: string;
      statusz: string;
      platform: string;
      };
      customer: {
        azonosito: number;
        nev: string;
        telefonszam: string;
        lakcim: string;
        statusz: string;
      };
    kolcsonzes_datuma: Date;
    visszahozas_datuma: Date | null;
  }

  export interface BorrowingLateDTO {
    id: number;
    daysLate: number;
  } */

  
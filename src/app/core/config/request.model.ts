export interface Coin {
    id: number;
    acronym: string;
    name: string;
    valueCoin?: number | string;
}

export interface Portfolio {
    id: number;
    name: string;
}
export interface Line {
    id: number;
    portfolioId: number;
    coinId: number;
    amount: number;
}
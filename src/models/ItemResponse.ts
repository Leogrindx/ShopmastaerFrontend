export interface ItemResponse{
    id: number;
    ean: number;
    brand: string;
    name: string;
    type: string;
    under_type: string;
    size: string[];
    material: string;
    price: number;
    cent: number;
    gender: string;
    color: string;
    fasion: string,
	cutting: string,
    img: string[];
}

export interface Filters{
    filter: string;
    value: string[]
}
import {Station_brend} from "./station.brend.enum";

export type FuelCard = {
    id:number,
    number: string,
    pin: string,
    active: boolean,
    station_brend: Station_brend;
}
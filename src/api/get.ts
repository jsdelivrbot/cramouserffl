// Status = ava, nco, rnt, rep
// type = Flexi, Personalvagn, toilet, container, bod
export enum Statuses {
  NONE = 0,
  NCO = 1,
  RNT = 2,
  REP = 3,
  AVA = 4,
}
export enum Types {
  empty = 0,
  staffWagon = 1,
  toilet = 2,
  container = 3,
  shed = 4,
  Flexi = 5,
  other = 6
}
export interface IFloor {
 floor?: number
 individual?: string
 type?: number
 status?: number
}
export interface ILot {
  id: number
  col: number
  row: string
  floors: IFloor[]
}

export const getLots = async () => {
  return {lots: await (await fetch('https://mighty-beyond-46233.herokuapp.com/api/lots')).json()}
}
interface IUpdateLog {
  lot: ILot
}
export const updateLot = async ({lot}: IUpdateLog) => {
  let response = await (await fetch('https://mighty-beyond-46233.herokuapp.com/api/lots', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lot: lot
    })
  })).json()
  console.log(response)
  return response
}
interface IRemoveLot {
  id: number
  floor: number
}
export const removeLot = async ({id, floor}: IRemoveLot) => {

}

import {match} from "ts-pattern";

export const StatusValue = ({status}: any) => {
  const color = match(status)
    .with("A1", () => "#E48203")
    .with("A2", () => "#0FBC2B")
    .with("R", () => "#A7A7A7")
    .with("P", () => "#CFB929")
    .otherwise(() => "")
  return (
    <span className={`px-2 rounded-[2px] py-0.5 text-white font-bold`} style={{backgroundColor: color}}>
      {status}
    </span>
  )
}

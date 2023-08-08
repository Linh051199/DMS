import { match } from "ts-pattern";

export const StatusValue = ({ status }: any) => {
  const color = match(status)
    .with("A", () => "#0FBC2B") // đợi màu từ thiết kế
    .with("A1", () => "#E48203")
    .with("A2", () => "#0FBC2B")
    .with("R", () => "#A7A7A7")
    .with("P", () => "#CFB929")
    .otherwise(() => "");
  return (
    <span
      className={`px-[10px] rounded-[2px] py-[4px] text-white font-[400] text-[11px]`}
      style={{ backgroundColor: color }}
    >
      {status}
    </span>
  );
};

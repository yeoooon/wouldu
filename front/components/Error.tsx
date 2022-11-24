import { FallbackProps } from "react-error-boundary";

export default function Error({ error }: FallbackProps) {
  console.log(error.message);
  return (
    <div>
      <div>error page</div>
      <button onClick={() => (location.href = "/")}>back</button>
    </div>
  );
}

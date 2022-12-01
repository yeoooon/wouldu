import { FallbackProps } from "react-error-boundary";

const Error = ({ error }: FallbackProps) => {
  return (
    <div>
      <div>error page</div>
      <button onClick={() => (location.href = "/")}>back</button>
    </div>
  );
};
export default Error;

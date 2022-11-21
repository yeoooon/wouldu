export default function Error() {
  return (
    <div>
      <div>error page</div>
      <button onClick={() => (location.href = "/")}>back</button>
    </div>
  );
}

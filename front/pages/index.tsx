import Seo from "../components/Seo";
import styled from "styled-components";

// const Home: NextPage = () => {
//   return (
//     <>
//       <Seo title="Home" />
//       <div>Home</div>
//     </>
//   );
// };

export default function Home() {
  return (
    <>
      <Seo title="Home" />
      <Test>Home</Test>
    </>
  );
}

const Test = styled.div`
  background-color: red;
`;

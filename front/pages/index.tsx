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
  background-color: ${props => props.theme.color.background};
  font-size: ${props => props.theme.fontSize.textLg};
  color: ${props => props.theme.color.white};
`;

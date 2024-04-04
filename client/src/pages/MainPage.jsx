import Header from '../component/header';
import MainContainer from '../component/MainContainer';
import { InformContextProvider } from "../context/InformContext";

export default function MainPage() {
    return(
      <InformContextProvider>
      <div id="background">
        <Header />
        <MainContainer />
      </div>
      </InformContextProvider>
    )
  }
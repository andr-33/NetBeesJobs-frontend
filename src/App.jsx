import PersonalDataView from "./views/personalData";
import UploadFileView from "./views/uploadFile";

const App = () =>{

  return (
    <div className="w-full flex items-center flex-col bg-green-300">
      <h1>CV Manager / NetBees</h1>
      <div className="w-[1000px] flex flex-row flex-grow h-screen">
        <PersonalDataView />
        <UploadFileView />
      </div>
    </div>
  )
};

export default App

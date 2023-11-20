import { FaMicrophone } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import ListeningModal from "./ListeningModal";
import SpeechRecognition from "react-speech-recognition";

const SpeechListener = (props) => {
  const { listening, searchValue } = props;

  return (
    <>
      {listening ? (
        <button
          className="cursor-pointer dark:hover:bg-dark-gray hover:bg-gray-300/40 rounded-full p-2"
          onClick={SpeechRecognition.stopListening}
        >
          <RxCross2 className="text-lg md:text-xl" />
        </button>
      ) : (
        <button
          className="cursor-pointer dark:hover:bg-dark-gray hover:bg-gray-300/40 rounded-full p-2"
          onClick={SpeechRecognition.startListening}
        >
          <FaMicrophone className="text-lg md:text-xl" />
        </button>
      )}

      {listening && (
        <ListeningModal
          searchValue={searchValue}
          stopListening={SpeechRecognition.stopListening}
        />
      )}
    </>
  );
};

export default SpeechListener;

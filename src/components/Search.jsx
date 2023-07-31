import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SuggestionBox from "./SuggestionBox";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { RxCross2 } from "react-icons/rx";
import ListeningModal from "./ListeningModal";

const Search = () => {
  const navigate = useNavigate();
  const [suggestedData, setSuggestedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue.trim().length) {
      navigate(`/search/${searchValue}`);
    } else {
      e.target[0].classList.toggle("invisible");
      e.target[1].classList.toggle("rounded-full");
    }

    e.target[0].value = "";
    setSearchValue("")
    setSuggestedData([]); // Reset suggestedData when search is performed
  };

  useEffect(() => {
    // Define the callback function in the global scope
    window.handleSuggestionCallback = (data) => {
      setSuggestedData(data[1]);
    };
  }, [searchValue]);

  const handleSuggestion = (query) => {
    setSearchValue(query);

    if (query.trim().length) {
      const script = document.createElement("script");
      script.src = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${query}&callback=handleSuggestionCallback`;
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    const handleSearchValue = () => {
      setSearchValue(transcript);
      if (!listening && transcript.trim().length) {
        navigate(`/search/${transcript}`);
      }
    };

    handleSearchValue();

    // eslint-disable-next-line
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="d-flex justify-between md:w-[55%] w-[63%] relative md:gap-3 gap-1">
        <form onSubmit={handleSearch} className="w-full d-flex h-9 rounded-3xl overflow-hidden">
          <input
            className={`search h-full dark:bg-stone-800/80 w-[82%] sm:w-[90%] focus:border focus:border-blue-700 outline-0 text-base py-1 px-3 sm:px-4 ${searchValue || listening ? "visible" : "invisible"
              } sm:visible border-2 dark:border-0 border-r-0 dark:focus:border dark:focus:border-blue-700`}
            type="search"
            placeholder={listening ? "Listening..." : "Search"}

            onFocus={() => {
              handleSuggestion(searchValue);
              setIsFocused(true);
            }}

            onBlur={() => {
              if (!isHover) {
                setIsFocused(false);
                setSuggestedData([]);
              }
            }}

            onChange={(e) => handleSuggestion(e.target.value)}
            value={searchValue}
          />

          <button
            className={`h-full d-flex justify-center w-[18%] sm:w-[10%] bg-gray-200/60 hover:bg-gray-300/40 dark:bg-stone-700 dark:hover:bg-stone-700 ${searchValue || listening ? "rounded-none" : "rounded-full"
              } sm:rounded-none border-2 dark:border-0 border-l-0`}
            title="search"
          >
            <BsSearch className="text-lg sm:text-xl" />
          </button>

          {isFocused && (
            <SuggestionBox suggestedData={suggestedData} setSearchValue={setSearchValue} setIsFocused={setIsFocused} setIsHover={setIsHover} />
          )}
        </form>

        {
          listening ?
            <button className="cursor-pointer dark:hover:bg-dark-gray hover:bg-gray-300/40 rounded-full p-2"
              onClick={SpeechRecognition.stopListening}>
              <RxCross2 className="text-lg md:text-xl" />
            </button>
            :
            <button className="cursor-pointer dark:hover:bg-dark-gray hover:bg-gray-300/40 rounded-full p-2" onClick={SpeechRecognition.startListening} >
              <FaMicrophone className="text-lg md:text-xl" />
            </button>
        }


        {listening && <ListeningModal searchValue={searchValue} stopListening={SpeechRecognition.stopListening} />}
      </div>
    </>
  );
};

export default Search;

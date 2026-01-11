"use client";

import { useRef, useState } from "react";

const SoundCheck = () => {
  const candidateSoundRef = useRef<HTMLAudioElement | null>(null);
  const otherSoundRef = useRef<HTMLAudioElement | null>(null);

  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [candidateClicks, setCandidateClicks] = useState([false, false, false]);
  const [showFourthTable, setShowFourthTable] = useState(false);

  const toMarathi = (num: number) =>
    num
      .toString()
      .replace(/0/g, "०")
      .replace(/1/g, "१")
      .replace(/2/g, "२")
      .replace(/3/g, "३")
      .replace(/4/g, "४")
      .replace(/5/g, "५")
      .replace(/6/g, "६")
      .replace(/7/g, "७")
      .replace(/8/g, "८")
      .replace(/9/g, "९");

  const playSound = (index: number, isCandidate: boolean, tableIndex: number) => {
    const audio = isCandidate ? candidateSoundRef.current : otherSoundRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

    setActiveRow(index);

    if (isCandidate && tableIndex < 3) {
      const updated = [...candidateClicks];
      updated[tableIndex] = true;
      setCandidateClicks(updated);

      if (updated.every(Boolean)) {
        setShowFourthTable(true);
      }
    }
  };

  const renderRow = (
    index: number,
    baseIndex: number,
    name: string,
    totalRows: number,
    candidateIndex: number,
    tableIndex: number,
    imageSrc: string
  ) => {
    const isCandidate = index === candidateIndex;
    const isNota = index === totalRows - 1;

    return (
      <tr>
        <td className="border-2 border-gray-400 text-xs font-bold text-center w-[50px] min-w-[50px] max-w-[50px]">
          {toMarathi(index + 1)}
        </td>

        <td className="border-2 border-gray-400 text-sm font-bold text-center">
          {isCandidate ? name : isNota ? "नोटा (NOTA)" : ""}
        </td>

        <td className="border-2 border-gray-400 text-center">
          {isCandidate && (
            <img src={imageSrc} className="w-10 h-10 mx-auto" />
          )}
        </td>

        <td className="border-2 border-gray-400 text-center">
          {isCandidate && (
            <img src="/symbol-bartan.png" className="w-10 h-10 mx-auto" />
          )}
        </td>

        <td className="border-2 border-gray-400 text-center">
          <div
            className={`w-5 h-5 mx-auto rounded-full ${
              activeRow === baseIndex + index ? "bg-red-600" : "bg-gray-400"
            }`}
          />
        </td>

        <td className="border-2 border-gray-400 text-center">
          <button
            onClick={() =>
              playSound(baseIndex + index, isCandidate, tableIndex)
            }
            className="w-24 h-10 bg-blue-700 text-white text-xs font-bold rounded-full whitespace-pre-line"
          >
            {isCandidate ? "बटन\nदाबा" : ""}
          </button>
        </td>
      </tr>
    );
  };

  const renderTable = (
    tableIndex: number,
    title: string,
    totalRows: number,
    name: string,
    candidateIndex: number,
    imageSrc: string,
    bgColor: string,
    showThead: boolean,
    start = 0,
    end?: number
  ) => {
    const limit = end ?? totalRows;

    return (
      <div className={`${bgColor} p-0 m-0`}>
        {/* 🔹 COLORED HEADING FOR SPLIT TABLES */}
        {!showThead && (
          <div className={`text-center font-bold py-2 border-2 border-gray-400 ${bgColor}`}>
            {title}
          </div>
        )}

        <table className="w-full border-collapse border-2 border-gray-400">
          {showThead && (
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-gray-400 text-xs font-bold text-center w-[50px] min-w-[50px] max-w-[50px]">
                  अनु. क्र.
                </th>
                <th className="border-2 border-gray-400 text-xs">{title}</th>
                <th className="border-2 border-gray-400 text-xs">फोटो</th>
                <th className="border-2 border-gray-400 text-xs">निशाणी</th>
                <th className="border-2 border-gray-400 text-xs">बत्ती</th>
                <th className="border-2 border-gray-400 text-xs">बटन</th>
              </tr>
            </thead>
          )}

          <tbody>
            {[...Array(limit - start)].map((_, i) =>
              renderRow(
                i + start,
                tableIndex * 100,
                name,
                totalRows,
                candidateIndex,
                tableIndex,
                imageSrc
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="bg-gray-100 px-4 py-4">
      {!showFourthTable && (
        <>
          {renderTable(
            0,
            "प्रभाग क्र. ९ (अ)",
            4,
            "चिमटे रोहिणी सुधीर",
            0,
            "/use1.png",
            "bg-white",
            true
          )}

          {renderTable(
            1,
            "प्रभाग क्र. ९ (ब)",
            8,
            "कळमकर गणेश ज्ञानोबा",
            0,
            "/use2.png",
            "bg-[#e8bbda]",
            false
          )}

          {renderTable(
            2,
            "प्रभाग क्र. ९ (क)",
            5,
            "कोकाटे मयुरी राहुल",
            0,
            "/use3.png",
            "bg-[#fdfda5]",
            false,
            0,
            2
          )}
        </>
      )}

      {showFourthTable && (
        <>
          {renderTable(
            2,
            "प्रभाग क्र. ९ (क)",
            5,
            "कोकाटे मयुरी राहुल",
            0,
            "/use3.png",
            "bg-[#fdfda5]",
            true,
            2
          )}

          {renderTable(
            3,
            "प्रभाग क्र. ९ (ड)",
            10,
            "बालवडकर लहू गजानन",
            3,
            "/use4.png",
            "bg-[#9fdaeb]",
            false
          )}
        </>
      )}

      <audio ref={candidateSoundRef} src="/sound1.mp3" />
      <audio ref={otherSoundRef} src="/sound2.mp3" />
    </section>
  );
};

export default SoundCheck;

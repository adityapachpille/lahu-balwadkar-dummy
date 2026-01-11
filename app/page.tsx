"use client";

import { useRef, useState } from "react";

const SoundCheck = () => {
  const candidateSoundRef = useRef<HTMLAudioElement | null>(null);
  const otherSoundRef = useRef<HTMLAudioElement | null>(null);

  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [candidateClicks, setCandidateClicks] = useState([false, false, false]); // Track 3 candidate buttons
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
      const updatedClicks = [...candidateClicks];
      updatedClicks[tableIndex] = true;
      setCandidateClicks(updatedClicks);

      if (updatedClicks.every((clicked) => clicked)) {
        setShowFourthTable(true);
      }
    }
  };

  const renderRow = (
    index: number,
    baseIndex: number,
    name: string,
    totalRows: number,
    bgColor: string,
    candidateIndex = 0,
    tableIndex = 0,
    imageSrc?: string
  ) => {
    const isCandidate = index === candidateIndex;
    const isNota = index === totalRows - 1;

    return (
      <tr key={index} className={bgColor}>
        <td className="border-2 border-gray-400 text-center font-bold text-xs">
          {toMarathi(index + 1)}
        </td>
        <td className="border-2 border-gray-400 text-center font-bold text-sm">
          {isCandidate ? name : isNota ? "नोटा (NOTA)" : ""}
        </td>
        <td className="border-2 border-gray-400 text-center">
          {isCandidate && imageSrc && <img src={imageSrc} className="w-10 h-10 mx-auto" />}
        </td>
        <td className="border-2 border-gray-400 text-center">
          {isCandidate && <img src="/symbol-bartan.png" className="w-10 h-10 mx-auto" />}
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
            onClick={() => playSound(baseIndex + index, isCandidate, tableIndex)}
            className="rounded-full w-24 h-6 bg-blue-700 text-white text-xs font-bold"
          >
            {isCandidate ? "बटन दाबा" : ""}
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
    bgColor: string,
    candidateIndex: number,
    imageSrc: string
  ) => (
    <>
      <h4 className="text-center text-xl font-bold mb-0 pt-2">{title}</h4>
      <table className="w-full border-2 border-gray-400 mt-0">
        <tbody>
          {[...Array(totalRows)].map((_, i) =>
            renderRow(i, tableIndex * 100, name, totalRows, bgColor, candidateIndex, tableIndex, imageSrc)
          )}
        </tbody>
      </table>
    </>
  );

  return (
    <section className="bg-gray-100 px-4 py-6">
      <h1 className="text-center text-xl font-bold mb-2 pt-2">
        पुणे महानगरपालिका सार्वत्रिक निवडणूक - २०२६ डमी मतदान यंत्र
      </h1>

      <div className="text-center mb-2 pt-2">
        <span className="bg-blue-700 font-bold text-white px-4 py-2 inline-block rounded-full">
          डेमो मतदानासाठी कमळ या निशाणी समोरील बटन दाबावे
        </span>
      </div>

      <h1 className="text-center text-xl font-bold mb-2 pt-2">
        बाणेर-बालेवाडी-पाषाण-सोमेेश्वरवाडी-सुतारवाडी- सुस- महाळुंगे
      </h1>

      <div className="text-center mb-2 pt-2">
        <span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded dark:bg-yellow-300">
          प्रभाग क्रमांक ९ – भारतीय जनता पार्टीचे अधिकृत उमेदवार
        </span>
      </div>

      {/* TABLES 1-3 */}
      {!showFourthTable && renderTable(0, "प्रभाग क्र. ९ (अ)", 4, "चिमटे रोहिणी सुधीर", "bg-white", 0, "/use1.png")}
      {!showFourthTable && renderTable(1, "प्रभाग क्र. ९ (ब)", 8, "कळमकर गणेश ज्ञानोबा", "bg-[#e8bbda]", 0, "/use2.png")}
      {!showFourthTable && renderTable(2, "प्रभाग क्र. ९ (क)", 5, "कोकाटे मयुरी राहुल", "bg-[#fdfda5]", 0, "/use3.png")}

      {/* TABLE 4 */}
      {showFourthTable &&
        renderTable(3, "प्रभाग क्र. ९ (ड)", 10, "बालवडकर लहू गजानन", "bg-[#9fdaeb]", 3, "/use4.png")}

      {/* FOOTER MESSAGE */}
      <h1 className="text-center text-xl font-bold mb-2 mt-4">
        <span className="text-red-600">कमळ </span> या निशाणी समोरील बटन दाबून{" "}
        <span className="text-red-600">भारतीय जनता पक्षाच्या .</span> चारही उमेदवारांना प्रचंड बहुमतांनी विजयी करा
      </h1>

      <div className="text-center mb-2 pt-2">
        <span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded">
          मतदान - गुरुवार, दि. १५ जानेवारी २०२६ सकाळी ७:३० ते सायंकाळी ५.३० वाजेपर्यंत.
        </span>
      </div>

      {/* AUDIO */}
      <audio ref={candidateSoundRef} src="/sound1.mp3" />
      <audio ref={otherSoundRef} src="/sound2.mp3" />
    </section>
  );
};

export default SoundCheck;

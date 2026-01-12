"use client";

import React, { useRef, useState } from "react";

const SoundCheck: React.FC = () => {
  const candidateSoundRef = useRef<HTMLAudioElement | null>(null);
  const otherSoundRef = useRef<HTMLAudioElement | null>(null);

  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [candidateClicks, setCandidateClicks] = useState([false, false, false]);
  const [showFourthTable, setShowFourthTable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
    const audio = isCandidate
      ? candidateSoundRef.current
      : otherSoundRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

    setActiveRow(index);

    if (isCandidate && tableIndex === 3) {
      setShowPopup(true);
    }

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
    name: React.ReactNode,
    totalRows: number,
    candidateIndex: number,
    tableIndex: number,
    imageSrc: string
  ) => {
    const isCandidate = index === candidateIndex;
    const isNota = index === totalRows - 1;

    return (
      <tr key={baseIndex + index} className="align-middle">
        <td className="border-2 border-gray-400 text-xs font-bold text-center w-[40px]">
          {toMarathi(index + 1)}
        </td>

        <td className="border-2 border-gray-400 w-[180px]">
          {isCandidate && (
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="leading-tight font-bold text-sm">{name}</div>
              <img src={imageSrc} alt="" className="w-16 h-16 rounded object-cover" />
            </div>
          )}
          {isNota && (
            <div className="text-center font-bold py-4">नोटा (NOTA)</div>
          )}
        </td>

        <td className="border-2 border-gray-400 text-center w-[120px]">
          {isCandidate && (
            <img src="/symbol-bartan.png" alt="" className="w-16 h-16 mx-auto" />
          )}
        </td>

        <td className="border-2 border-gray-400 text-center w-[60px]">
          <div
            className={`w-5 h-5 mx-auto rounded-full ${
              activeRow === baseIndex + index ? "bg-red-600" : "bg-gray-400"
            }`}
          />
        </td>

        <td className="border-2 border-gray-400 text-center w-[100px] font-bold">
          <button
            onClick={() => playSound(baseIndex + index, isCandidate, tableIndex)}
            className="w-24 h-10 bg-blue-700 text-white text-sm font-bold rounded-full"
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
    name: React.ReactNode,
    candidateIndex: number,
    imageSrc: string,
    bgColor: string,
    showThead: boolean,
    start = 0,
    end?: number
  ) => {
    const limit = end ?? totalRows;

    return (
      <div className={bgColor}>
        <h5 className={`text-center text-xl font-bold py-3 border-2 border-gray-400 ${bgColor}`}>
          {title}
        </h5>

        <table className="w-full border-collapse border-2 border-gray-400">
          {showThead && (
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-gray-400 text-xs font-bold w-[40px]">अनु. क्र.</th>
                <th className="border-2 border-gray-400 text-xs font-bold">उमेदवाराचे नाव</th>
                <th className="border-2 border-gray-400 text-xs font-bold">निशाणी</th>
                <th className="border-2 border-gray-400 text-xs font-bold">बत्ती</th>
                <th className="border-2 border-gray-400 text-xs font-bold">बटन</th>
              </tr>
            </thead>
          )}

          <tbody>
            {Array.from({ length: limit - start }).map((_, i) =>
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
       <h1 className="text-center text-xl font-bold mb-4">
        पुणे महानगरपालिका सार्वत्रिक निवडणूक - २०२६ डमी मतदान यंत्र
      </h1>

      <div className="text-center mb-4 pt-2">
        <span className="bg-blue-700 font-bold text-white px-4 py-2 inline-block rounded-full">
          डेमो मतदानासाठी कमळ या निशाणी समोरील बटन दाबावे
        </span>
      </div>

      <h1 className="text-center text-xl font-bold mb-4 pt-2">
        बाणेर-बालेवाडी-पाषाण-सोमेेश्वरवाडी-सुतारवाडी- सुस- महाळुंगे
      </h1>

      <div className="text-center mb-4 pt-2">
        <span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded">
          प्रभाग क्रमांक ०९ – भारतीय जनता पार्टीचे अधिकृत उमेदवार
        </span>
      </div>

      {!showFourthTable && (
        <>
          {/* 🔴 मशीन १ */}
          <h2 className="text-center text-2xl font-extrabold my-3">मशिन १</h2>

          {renderTable(
            0,
            "प्रभाग क्र. ०९ (अ)",
            4,
            <>चिमटे रोहिणी सुधीर</>,
            0,
            "/use1.png",
            "bg-white",
            true
          )}

          {renderTable(
            1,
            "प्रभाग क्र. ०९ (ब)",
            8,
            <>कळमकर गणेश ज्ञानोबा</>,
            0,
            "/use2.png",
            "bg-[#e8bbda]",
            false
          )}

          {renderTable(
            2,
            "प्रभाग क्र. ०९ (क)",
            5,
            <>कोकाटे मयुरी राहुल</>,
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
          {/* 🔵 मशीन २ */}
          <h2 className="text-center text-2xl font-extrabold my-3">मशिन २</h2>

          {renderTable(
            2,
            "प्रभाग क्र. ०९ (क)",
            5,
            <>कोकाटे मयुरी राहुल</>,
            0,
            "/use3.png",
            "bg-[#fdfda5]",
            true,
            2
          )}

          {renderTable(
            3,
            "प्रभाग क्र. ०९ (ड)",
            10,
            <>बालवडकर लहू गजानन</>,
            3,
            "/use4.png",
            "bg-[#9fdaeb]",
            false
          )}
        </>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-md w-full">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-xl font-bold text-red-600"
            >
              ✕
            </button>
            <img src="/balwadkar-popup.jpg" alt="" className="w-full rounded" />
          </div>
        </div>
      )}

       <h1 className="text-center text-xl font-bold mb-4 mt-6">
        <span className="text-red-600">कमळ </span>
        या निशाणी समोरील बटन दाबून{" "}
        <span className="text-red-600">भारतीय जनता पक्षाच्या </span>
        चारही उमेदवारांना प्रचंड बहुमतांनी विजयी करा
      </h1>

      <div className="text-center mb-4 pt-2">
        <span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded">
          मतदान - गुरुवार, दि. १५ जानेवारी २०२६ सकाळी ७:३० ते सायंकाळी ५.३० वाजेपर्यंत.
        </span>
      </div>

      <audio ref={candidateSoundRef} src="/sound1.mp3" />
      <audio ref={otherSoundRef} src="/sound2.mp3" />
    </section>
  );
};

export default SoundCheck;

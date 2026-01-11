"use client";

import { useRef, useState } from "react";

const SoundCheck = () => {
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null);
  const otherButtonSoundRef = useRef<HTMLAudioElement | null>(null);

  const [activeRow, setActiveRow] = useState<number | null>(null);

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

  const playSound = (index: number, main = false) => {
    const ref = main ? buttonSoundRef : otherButtonSoundRef;
    ref.current?.pause();

    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }

    setActiveRow(index);
  };

  const TableHeader = ({ title }: { title: string }) => (
    <thead>
      <tr className="bg-gray-100">
        <th className="border-2 border-gray-400 text-[11px] sm:text-xs w-10">
          अनु. क्र.
        </th>
        <th className="border-2 border-gray-400 text-[11px] sm:text-xs">
          {title}
        </th>
        <th className="border-2 border-gray-400 text-[11px] sm:text-xs">फोटो</th>
        <th className="border-2 border-gray-400 text-[11px] sm:text-xs">निशाणी</th>
        <th className="border-2 border-gray-400 text-[11px] sm:text-xs">बत्ती</th>
        <th className="border-2 border-gray-400 text-[11px] sm:text-xs">बटन</th>
      </tr>
    </thead>
  );

  return (
    <section className="bg-gray-100 px-2 sm:px-4 md:px-24 py-6 text-black">
      {/* ================= TITLE ================= */}
    
      <h1 className="text-center text-xl font-bold mb-4 pt-2">
छत्रपती संभाजीनगर महानगरपालिका सार्वत्रिक निवडणूक - २०२६ डमी मतदान यंत्र
</h1>

      {/* ================= INFO BANNERS ================= */}

      <div className="text-center mb-4 pt-2">
<span className="bg-blue-700 font-bold text-white px-4 py-2 inline-block rounded-full">
डेमो मतदानासाठी मेणबत्ती या निशाणी समोरील बटन दाबावे
</span>
</div>



      <div className="text-center mb-4 pt-2">
<span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded dark:bg-yellow-300">
प्रभाग क्र. २ (ब) चे अपक्ष उमेदवार
</span>
</div>

      {/* ================= TABLES ================= */}
      <div className="overflow-x-auto">
        {/* ---------- TABLE 1 ---------- */}
        <table className="w-full border-2 border-gray-400 table-fixed">
          <TableHeader title="प्रभाग क्र. २ (ब) उमेदवाराचे नाव" />
          <tbody>
            {[...Array(6)].map((_, index) => {
              const isCandidate = index === 4;
              const isNota = index === 5;

              return (
                <tr key={index} className="bg-[#e8bbda]">
                  <td className="border-2 border-gray-400 text-center font-bold text-xs">
                    {toMarathi(index + 1)}
                  </td>

                  <td className="border-2 border-gray-400 text-center font-bold text-[11px] sm:text-sm px-1 leading-tight whitespace-normal break-words">
                    {isCandidate
                      ? "प्रशांत विश्वासराव भदाणे पा"
                      : isNota
                      ? "नोटा (NOTA)"
                      : ""}
                  </td>

                  <td className="border-2 border-gray-400 text-center">
                    {isCandidate ? (
                      <img
                        src="/user.png"
                        alt="candidate"
                        className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" />
                    )}
                  </td>

                  <td className="border-2 border-gray-400 text-center">
                    {isCandidate ? (
                      <img
                        src="/symbol-bartan.png"
                        alt="symbol"
                        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
                    )}
                  </td>

                  <td className="border-2 border-gray-400 text-center">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto rounded-full ${
                        activeRow === index ? "bg-red-600" : "bg-gray-400"
                      }`}
                    />
                  </td>

                  <td className="border-2 border-gray-400 text-center">
                    <button
                      onClick={() => playSound(index, isCandidate)}
                      className={`rounded-full w-10 h-5 sm:w-12 sm:h-6 ${
                        isCandidate ? "bg-green-500" : "bg-blue-700"
                      }`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ---------- TABLE 2 ---------- */}
        <table className="w-full border-2 border-t-0 border-gray-400 table-fixed mt-4">
          <TableHeader title="प्रभाग क्र. २ (क) उमेदवाराचे नाव" />
          <tbody>
            {[...Array(7)].map((_, index) => {
              const isNota = index === 6;

              return (
                <tr key={index} className="bg-[#fdfda5]">
                  <td className="border-2 border-gray-400 text-center font-bold text-xs">
                    {toMarathi(index + 1)}
                  </td>

                  <td className="border-2 border-gray-400 text-center font-bold text-[11px] sm:text-sm px-1 break-words">
                    {isNota ? "नोटा (NOTA)" : ""}
                  </td>

                  <td className="border-2 border-gray-400" />
                  <td className="border-2 border-gray-400" />

                  <td className="border-2 border-gray-400 text-center">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto rounded-full ${
                        activeRow === index + 10
                          ? "bg-red-600"
                          : "bg-gray-400"
                      }`}
                    />
                  </td>

                  <td className="border-2 border-gray-400 text-center">
                    <button
                      onClick={() => playSound(index + 10)}
                      className="rounded-full w-10 h-5 sm:w-12 sm:h-6 bg-blue-700"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER MESSAGE ================= */}   
   <h1 className="text-center text-xl font-bold mb-4 mt-6">
<span className="text-red-600">मेणबत्ती </span> या निशाणी समोरील बटन दाबून{" "}
<span className="text-red-600">प्रशांत विश्वासराव भदाणे पा </span> यांना
प्रचंड बहुमतांनी विजय करा.
</h1>

     <div className="text-center mb-4 pt-2">
<span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded">
मतदान - गुरुवार, दि. १५ जानेवारी २०२६ सकाळी ७:३० ते सायंकाळी ५.३० वाजेपर्यंत.
</span>
</div>

      {/* ================= AUDIO ================= */}
      <audio ref={buttonSoundRef} src="/sound1.mp3" />
      <audio ref={otherButtonSoundRef} src="/sound2.mp3" />
    </section>
  );
};

export default SoundCheck;

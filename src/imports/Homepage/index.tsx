function Frame() {
  return <div className="absolute bg-[#201a2b] h-[44px] left-[1160px] rounded-[100px] top-[23px] w-[150px]" data-name="Frame" />;
}

function Header() {
  return (
    <div className="bg-[#fff9f2] h-[90px] overflow-clip relative shrink-0 w-full" data-name="Header">
      <div className="absolute left-[130px] size-[14px] top-[38px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
          <circle cx="7" cy="7" fill="#FF6B4A" id="Ellipse" r="7" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[normal] left-[156px] text-[#201a2b] text-[21px] top-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{`Pixel & Palette`}</p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[950px] opacity-75 text-[#201a2b] text-[15px] top-[35px] whitespace-nowrap">Work</p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[1040px] opacity-75 text-[#201a2b] text-[15px] top-[35px] whitespace-nowrap">Services</p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[1130px] opacity-75 text-[#201a2b] text-[15px] top-[35px] whitespace-nowrap">Process</p>
      <Frame />
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[1178px] text-[#fff9f2] text-[14.5px] top-[37px] whitespace-nowrap">Start a project</p>
    </div>
  );
}

function Marquee() {
  return (
    <div className="bg-[#201a2b] h-[70px] overflow-clip relative shrink-0 w-full" data-name="Marquee">
      <p className="[word-break:break-word] absolute font-['Fraunces:Italic','Noto_Sans:Italic','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal italic leading-[normal] left-[40px] text-[#fff9f2] text-[22px] top-[22px] whitespace-pre" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{`Custom design   ✦   No templates   ✦   Fast turnaround   ✦   Built to convert   ✦   Custom design   ✦   No templates`}</p>
    </div>
  );
}

function Frame1() {
  return <div className="absolute bg-[#ff6b4a] h-[52px] left-[130px] rounded-[100px] top-[460px] w-[190px]" data-name="Frame" />;
}

function Frame2() {
  return <div className="absolute border-[#201a2b] border-[1.5px] border-solid h-[52px] left-[336px] rounded-[100px] top-[460px] w-[150px]" data-name="Frame" />;
}

function Hero() {
  return (
    <div className="bg-[#fff9f2] h-[640px] overflow-clip relative shrink-0 w-full" data-name="Hero">
      <div className="absolute left-[130px] size-[7px] top-[108px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="7" preserveAspectRatio="none" viewBox="0 0 7 7" width="7">
          <circle cx="3.5" cy="3.5" fill="#FF6B4A" id="Ellipse" r="3.5" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[145px] not-italic opacity-65 text-[#201a2b] text-[13px] top-[103px] tracking-[1.82px] whitespace-nowrap">FREELANCE WEB DESIGN STUDIO</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[normal] left-[126px] text-[#201a2b] text-[76px] top-[140px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Your website,
      </p>
      <p className="[word-break:break-word] absolute font-['Fraunces:Italic',sans-serif] font-normal italic leading-[normal] left-[126px] text-[#ff6b4a] text-[76px] top-[232px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        hand-mixed.
      </p>
      <div className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[0] left-[130px] opacity-78 text-[#201a2b] text-[18px] top-[350px] w-[480px]">
        <p className="leading-[1.5] mb-0">I design and build sites for small businesses and</p>
        <p className="leading-[1.5] mb-0">founders who want their website to look like</p>
        <p className="leading-[1.5]">{`nobody else's — not a template with a swapped logo.`}</p>
      </div>
      <Frame1 />
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[158px] text-[#fff9f2] text-[15px] top-[477px] whitespace-nowrap">Get a free quote</p>
      <Frame2 />
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[358px] text-[#201a2b] text-[15px] top-[477px] whitespace-nowrap">See the work ↓</p>
      <div className="absolute left-[1010px] size-[180px] top-[40px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="180" preserveAspectRatio="none" viewBox="0 0 180 180" width="180">
          <circle cx="90" cy="90" fill="#FF6B4A" id="Ellipse" r="90" />
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Space_Mono:Bold',sans-serif] leading-[normal] left-[1100px] not-italic text-[#fff9f2] text-[11px] text-center top-[114px] w-[160px]">Coral Rush</p>
      <div className="absolute left-[1130px] size-[120px] top-[260px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="120" preserveAspectRatio="none" viewBox="0 0 120 120" width="120">
          <circle cx="60" cy="60" fill="#3EC1D3" id="Ellipse" r="60" />
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Space_Mono:Bold',sans-serif] leading-[normal] left-[1190px] not-italic text-[#201a2b] text-[11px] text-center top-[304px] w-[100px]">Deep Lagoon</p>
      <div className="absolute left-[900px] size-[140px] top-[420px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="140" preserveAspectRatio="none" viewBox="0 0 140 140" width="140">
          <circle cx="70" cy="70" fill="#FFC145" id="Ellipse" r="70" />
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Space_Mono:Bold',sans-serif] leading-[normal] left-[970px] not-italic text-[#201a2b] text-[11px] text-center top-[474px] w-[120px]">Sunburnt Mustard</p>
      <div className="absolute left-[830px] size-[92px] top-[100px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="92" preserveAspectRatio="none" viewBox="0 0 92 92" width="92">
          <circle cx="46" cy="46" fill="#7B61FF" id="Ellipse" r="46" />
        </svg>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Space_Mono:Bold',sans-serif] leading-[normal] left-[876px] not-italic text-[#fff9f2] text-[11px] text-center top-[130px] w-[72px]">Ultraviolet</p>
    </div>
  );
}

function Frame3() {
  return <div className="absolute bg-[#fff9f2] border border-[#d9d4cc] border-solid h-[210px] left-[130px] rounded-[18px] top-[300px] w-[277px]" data-name="Frame" />;
}

function Frame4() {
  return <div className="absolute bg-[#fff9f2] border border-[#d9d4cc] border-solid h-[210px] left-[431px] rounded-[18px] top-[300px] w-[277px]" data-name="Frame" />;
}

function Frame5() {
  return <div className="absolute bg-[#fff9f2] border border-[#d9d4cc] border-solid h-[210px] left-[732px] rounded-[18px] top-[300px] w-[277px]" data-name="Frame" />;
}

function Frame6() {
  return <div className="absolute bg-[#fff9f2] border border-[#d9d4cc] border-solid h-[210px] left-[1033px] rounded-[18px] top-[300px] w-[277px]" data-name="Frame" />;
}

function Services() {
  return (
    <div className="bg-[#fff9f2] h-[620px] overflow-clip relative shrink-0 w-full" data-name="Services">
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic text-[#ff6b4a] text-[13px] top-[60px] tracking-[1.82px] whitespace-nowrap">WHAT I DO</p>
      <div className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[0] left-[126px] text-[#201a2b] text-[42px] top-[90px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        <p className="leading-[1.1] mb-0">One studio, four ways</p>
        <p className="leading-[1.1]">to work together.</p>
      </div>
      <Frame3 />
      <div className="absolute bg-[#ff6b4a] left-[156px] rounded-[8px] size-[28px] top-[326px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[156px] text-[#201a2b] text-[18px] top-[372px] w-[225px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Full Website Design
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.45] left-[156px] opacity-72 text-[#201a2b] text-[13.5px] top-[404px] w-[225px]">A complete, custom-built site from homepage to contact.</p>
      <Frame4 />
      <div className="absolute bg-[#3ec1d3] left-[457px] rounded-[8px] size-[28px] top-[326px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[457px] text-[#201a2b] text-[18px] top-[372px] w-[225px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Landing Pages
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.45] left-[457px] opacity-72 text-[#201a2b] text-[13.5px] top-[404px] w-[225px]">One sharp, high-converting page — live in days, not weeks.</p>
      <Frame5 />
      <div className="absolute bg-[#ffc145] left-[758px] rounded-[8px] size-[28px] top-[326px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[758px] text-[#201a2b] text-[18px] top-[372px] w-[225px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Brand Refresh
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.45] left-[758px] opacity-72 text-[#201a2b] text-[13.5px] top-[404px] w-[225px]">Already have a site? I repaint it with a sharper identity.</p>
      <Frame6 />
      <div className="absolute bg-[#7b61ff] left-[1059px] rounded-[8px] size-[28px] top-[326px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[1059px] text-[#201a2b] text-[18px] top-[372px] w-[225px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Ongoing Care
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.45] left-[1059px] opacity-72 text-[#201a2b] text-[13.5px] top-[404px] w-[225px]">Monthly updates and fixes as your business grows.</p>
    </div>
  );
}

function Frame7() {
  return <div className="absolute border border-[rgba(255,249,242,0.35)] border-solid h-[36px] left-[1200px] rounded-[100px] top-[216px] w-[110px]" data-name="Frame" />;
}

function Frame8() {
  return <div className="absolute border border-[rgba(255,249,242,0.35)] border-solid h-[36px] left-[1200px] rounded-[100px] top-[366px] w-[110px]" data-name="Frame" />;
}

function Frame9() {
  return <div className="absolute border border-[rgba(255,249,242,0.35)] border-solid h-[36px] left-[1200px] rounded-[100px] top-[516px] w-[110px]" data-name="Frame" />;
}

function Frame10() {
  return <div className="absolute border border-[rgba(255,249,242,0.35)] border-solid h-[36px] left-[1200px] rounded-[100px] top-[666px] w-[110px]" data-name="Frame" />;
}

function Process() {
  return (
    <div className="bg-[#201a2b] h-[780px] overflow-clip relative rounded-[28px] shrink-0 w-full" data-name="Process">
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic text-[#ffc145] text-[13px] top-[60px] tracking-[1.82px] whitespace-nowrap">HOW A PROJECT RUNS</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[normal] left-[126px] text-[#fff9f2] text-[40px] top-[90px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Four steps. No surprises.
      </p>
      <div className="absolute bg-[rgba(255,249,242,0.16)] h-px left-[130px] top-[190px] w-[1180px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic opacity-55 text-[#fff9f2] text-[14px] top-[218px] whitespace-nowrap">01</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[240px] text-[#fff9f2] text-[24px] top-[212px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Sketch
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[240px] opacity-68 text-[#fff9f2] text-[14.5px] top-[250px] w-[560px]">A 20-minute call to understand your business and what the site needs to do.</p>
      <Frame7 />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[1212px] not-italic opacity-85 text-[#fff9f2] text-[11px] top-[227px] whitespace-nowrap">1–2 days</p>
      <div className="absolute bg-[rgba(255,249,242,0.16)] h-px left-[130px] top-[340px] w-[1180px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic opacity-55 text-[#fff9f2] text-[14px] top-[368px] whitespace-nowrap">02</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[240px] text-[#fff9f2] text-[24px] top-[362px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Mix
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[240px] opacity-68 text-[#fff9f2] text-[14.5px] top-[400px] w-[560px]">I design a full homepage concept — color, type, layout — before any code.</p>
      <Frame8 />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[1212px] not-italic opacity-85 text-[#fff9f2] text-[11px] top-[377px] whitespace-nowrap">3–5 days</p>
      <div className="absolute bg-[rgba(255,249,242,0.16)] h-px left-[130px] top-[490px] w-[1180px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic opacity-55 text-[#fff9f2] text-[14px] top-[518px] whitespace-nowrap">03</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[240px] text-[#fff9f2] text-[24px] top-[512px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Paint
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[240px] opacity-68 text-[#fff9f2] text-[14.5px] top-[550px] w-[560px]">Once approved, I build every page: responsive, fast, two rounds of revisions.</p>
      <Frame9 />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[1212px] not-italic opacity-85 text-[#fff9f2] text-[11px] top-[527px] whitespace-nowrap">1–2 weeks</p>
      <div className="absolute bg-[rgba(255,249,242,0.16)] h-px left-[130px] top-[640px] w-[1180px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic opacity-55 text-[#fff9f2] text-[14px] top-[668px] whitespace-nowrap">04</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[240px] text-[#fff9f2] text-[24px] top-[662px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Varnish
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[240px] opacity-68 text-[#fff9f2] text-[14.5px] top-[700px] w-[560px]">Final polish, real-device testing, launch, and a short handover call.</p>
      <Frame10 />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[1212px] not-italic opacity-85 text-[#fff9f2] text-[11px] top-[677px] whitespace-nowrap">2–3 days</p>
    </div>
  );
}

function Frame11() {
  return <div className="absolute bg-[#ff6b4a] h-[320px] left-[130px] rounded-[20px] top-[300px] w-[577px]" data-name="Frame" />;
}

function Frame12() {
  return <div className="absolute bg-[#7b61ff] h-[320px] left-[733px] rounded-[20px] top-[300px] w-[577px]" data-name="Frame" />;
}

function Frame13() {
  return <div className="absolute bg-[#3ec1d3] h-[320px] left-[130px] rounded-[20px] top-[650px] w-[577px]" data-name="Frame" />;
}

function Frame14() {
  return <div className="absolute bg-[#ffc145] h-[320px] left-[733px] rounded-[20px] top-[650px] w-[577px]" data-name="Frame" />;
}

function Work() {
  return (
    <div className="bg-[#fff9f2] h-[900px] overflow-clip relative shrink-0 w-full" data-name="Work">
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic text-[#ff6b4a] text-[13px] top-[60px] tracking-[1.82px] whitespace-nowrap">SELECTED WORK</p>
      <p className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[normal] left-[126px] text-[#201a2b] text-[42px] top-[90px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        A few recent canvases.
      </p>
      <Frame11 />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[156px] text-[#fff9f2] text-[28px] top-[530px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{`Kettle & Co.`}</p>
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[156px] not-italic opacity-85 text-[#fff9f2] text-[12px] top-[580px] whitespace-nowrap">Café · Full site</p>
      <Frame12 />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[759px] text-[#fff9f2] text-[28px] top-[530px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Nomad Studio
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[759px] not-italic opacity-85 text-[#fff9f2] text-[12px] top-[580px] whitespace-nowrap">Photography · Landing page</p>
      <Frame13 />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[156px] text-[#201a2b] text-[28px] top-[880px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Lumen Skincare
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[156px] not-italic opacity-85 text-[#201a2b] text-[12px] top-[930px] whitespace-nowrap">D2C brand · Full site</p>
      <Frame14 />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[759px] text-[#201a2b] text-[28px] top-[880px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Field Notes Co.
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[759px] not-italic opacity-85 text-[#201a2b] text-[12px] top-[930px] whitespace-nowrap">Stationery · Brand refresh</p>
    </div>
  );
}

function Why() {
  return (
    <div className="bg-[#fff9f2] h-[500px] overflow-clip relative shrink-0 w-full" data-name="Why">
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[130px] not-italic text-[#ff6b4a] text-[13px] top-[60px] tracking-[1.82px] whitespace-nowrap">WHY A FREELANCER</p>
      <div className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[0] left-[126px] text-[#201a2b] text-[34px] top-[90px] w-[700px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        <p className="leading-[1.12] mb-0">You work with me.</p>
        <p className="leading-[1.12]">Not a rotating account team.</p>
      </div>
      <div className="absolute bg-[#201a2b] h-[2px] left-[130px] top-[300px] w-[372px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[130px] text-[#201a2b] text-[19px] top-[322px] w-[372px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        One point of contact
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[130px] opacity-72 text-[#201a2b] text-[13.5px] top-[358px] w-[372px]">Every message goes through the person actually designing your site.</p>
      <div className="absolute bg-[#201a2b] h-[2px] left-[534px] top-[300px] w-[372px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[534px] text-[#201a2b] text-[19px] top-[322px] w-[372px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Agency quality, freelance price
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[534px] opacity-72 text-[#201a2b] text-[13.5px] top-[358px] w-[372px]">No studio overhead, no junior handoffs — just the work.</p>
      <div className="absolute bg-[#201a2b] h-[2px] left-[938px] top-[300px] w-[372px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Fraunces:SemiBold',sans-serif] font-semibold leading-[normal] left-[938px] text-[#201a2b] text-[19px] top-[322px] w-[372px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        Built to be maintained
      </p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[1.5] left-[946px] opacity-72 text-[#201a2b] text-[13.5px] top-[348px] w-[372px]">{`Clean code and a simple CMS, so you're never stuck waiting on me.`}</p>
    </div>
  );
}

function Frame16() {
  return <div className="absolute bg-[#201a2b] h-[58px] left-[60px] rounded-[100px] top-[320px] w-[300px]" data-name="Frame" />;
}

function Frame17() {
  return <div className="absolute bg-[#fff9f2] h-[58px] left-[376px] rounded-[100px] top-[320px] w-[180px]" data-name="Frame" />;
}

function Frame15() {
  return (
    <div className="absolute bg-[#ffc145] h-[460px] left-[130px] overflow-clip rounded-[28px] top-[50px] w-[1180px]" data-name="Frame">
      <div className="absolute left-[900px] size-[320px] top-[-120px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="320" preserveAspectRatio="none" viewBox="0 0 320 320" width="320">
          <circle cx="160" cy="160" fill="#FF6B4A" fillOpacity="0.85" id="Ellipse" r="160" />
        </svg>
      </div>
      <div className="absolute left-[700px] size-[200px] top-[340px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="200" preserveAspectRatio="none" viewBox="0 0 200 200" width="200">
          <circle cx="100" cy="100" fill="#7B61FF" fillOpacity="0.9" id="Ellipse" r="100" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[60px] not-italic opacity-70 text-[#201a2b] text-[13px] top-[60px] tracking-[1.82px] whitespace-nowrap">{`LET'S START A PROJECT`}</p>
      <div className="[word-break:break-word] absolute font-['Fraunces:Bold',sans-serif] font-bold leading-[0] left-[56px] text-[#201a2b] text-[44px] top-[95px] whitespace-nowrap" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        <p className="leading-[1.08] mb-0">Got a website that needs</p>
        <p className="leading-[1.08]">a fresh coat of paint?</p>
      </div>
      <div className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[0] left-[60px] opacity-80 text-[#201a2b] text-[16.5px] top-[225px] w-[460px]">
        <p className="leading-[1.5] mb-0">{`Tell me a bit about your business and I'll send a`}</p>
        <p className="leading-[1.5]">free quote within 48 hours — no obligation.</p>
      </div>
      <Frame16 />
      <p className="[word-break:break-word] absolute font-['Space_Mono:Regular',sans-serif] leading-[normal] left-[82px] not-italic text-[#fff9f2] text-[14px] top-[339px] whitespace-nowrap">hello@pixelandpalette.co</p>
      <Frame17 />
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[normal] left-[404px] text-[#201a2b] text-[14.5px] top-[339px] whitespace-nowrap">Book a free call</p>
    </div>
  );
}

function ContactOriginal() {
  return (
    <div className="bg-[#fff9f2] h-[560px] overflow-clip relative shrink-0 w-full" data-name="Contact (Original)">
      <Frame15 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#fff9f2] h-[140px] overflow-clip relative shrink-0 w-full" data-name="Footer">
      <div className="absolute bg-[#d9d4cc] h-px left-[130px] top-[40px] w-[1180px]" data-name="Rectangle" />
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-[130px] opacity-60 text-[#201a2b] text-[13.5px] top-[68px] whitespace-nowrap">{`© 2026 Pixel & Palette. Freelance web design.`}</p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-[980px] opacity-60 text-[#201a2b] text-[13.5px] top-[68px] whitespace-nowrap">Instagram</p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-[1080px] opacity-60 text-[#201a2b] text-[13.5px] top-[68px] whitespace-nowrap">LinkedIn</p>
      <p className="[word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-[1180px] opacity-60 text-[#201a2b] text-[13.5px] top-[68px] whitespace-nowrap">Dribbble</p>
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="bg-[#fff9f2] content-stretch flex flex-col items-start relative size-full" data-name="Homepage">
      <Header />
      <Marquee />
      <Hero />
      <Services />
      <Process />
      <Work />
      <Why />
      <ContactOriginal />
      <Footer />
    </div>
  );
}
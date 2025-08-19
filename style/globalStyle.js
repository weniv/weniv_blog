// menu style
const menuListStyle = 'mx-4 text-base leading-snug text-surface hover:text-graylv3 font-medium capitalize';

// mobile menu style
const mobileMenuStyle = 'm-0 block py-4 px-6';

// blog style과 notebook style
const posth1Style = 'text-[40px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5';
const posth2Style = 'text-[32px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5';
const posth3Style = 'text-[28px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5';
const posth4Style = 'text-2xl font-bold mb-2 mt-4';
const posth5Style = 'text-xl font-bold mb-2 mt-4';
const posth6Style = 'text-lg font-bold mb-2 mt-4';

const postpStyle = 'text-base sm:text-lg my-4 sm:my-6 font-normal tracking-wide text-justify';
const postimgStyle = 'border-4 border-graylv1 rounded my-10 mx-auto block max-w-full h-auto align-middle';
const postaStyle = 'text-lg text-primary underline hover:bg-activation transition duration-200';

const postulStyle = 'list-disc list-inside text-lg font-normal tracking-wide text-justify';
const postolStyle = 'list-decimal list-inside text-lg font-normal tracking-wide text-justify';
const postliStyle = 'pl-4 mb-2 leading-relaxed tracking-wide text-justify';

const postblockquoteStyle = 'border-l-4 border-primary pl-4';
const postpreStyle = 'relative bg-graylv1 p-4 rounded-[10px] mb-6 text-base font-medium overflow-auto whitespace-pre-wrap break-words text-justify max-w-full h-auto align-middle';
const postcodeStyle = 'text-base bg-transparent';

const posttableStyle = 'table-auto w-auto border-collapse mb-6 h-auto align-middle border-graylv2 text-left';
const posttheadStyle = 'text-left';
const postthStyle = 'overflow-auto bg-graylv1 border border-graylv2 px-4 py-2.5 font-medium text-sm capitalize whitespace-nowrap';
const posttbodyStyle = 'text-left';
const posttdStyle = 'border border-graylv2 px-4 py-2.5 text-sm text-gray-700 break-keep';

const posthrStyle = 'my-4 border-gray-400 border-2 rounded-lg';
const postemStyle = 'text-lg font-medium italic pr-0.5';
const poststrongStyle = 'text-lg font-bold';

// blog에 최상단 제목과 이미지 날짜 카테고리를 표시하는 부분
const postcategoryStyle = 'bg-activation text-primary text-sm font-medium px-3 py-1.5 rounded-lg tracking-wide transition duration-200 ease-in-out hover:bg-primary hover:text-white';
const posttitleStyle = 'md:text-[40px] md:leading-[56px] text-[32px] leading-[40px] font-bold my-3';

const postauthordateDivStyle = 'md:mb-8 mb-6 h-fit';
const postauthorDivStyle = 'inline-block';
const postauthorImgStyle = 'inline w-8 h-8 rounded-full object-cover object-center mr-2 border border-graylv2 overflow-hidden';
const postauthorStyle = 'inline text-sm font-semibold text-black mr-2';
const postdateStyle = 'inline-block text-graylv3 text-sm font-normal';
const postimgtitleStyle = 'w-full max-h-[520px] object-cover object-center my-4 rounded-2xl mx-auto block max-w-full align-middle';

// 상세 본문 섹션 스타일
const postsectionStyle = 'w-full mb-10 md:mb-[60px] max-w-none mx-auto h-auto align-middle bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20';

// notebook에 code cell을 표시하는 부분
const notebookpreStyle = 'relative bg-graylv1 p-8 rounded-[10px] mb-6 text-base font-medium overflow-auto whitespace-pre-wrap break-words text-justify max-w-full h-auto align-middle';
const notebookcodeStyle = 'text-base bg-graylv1';
const notebookcopyButtonStyle = 'border border-graylv2 copy-button bg-white rounded-[10px] opacity-70 absolute top-5 right-5 p-2 shadow-md';
const notebookdownloadButtonStyle = 'download-button px-5 py-[11px] mb-4 text-sm font-medium text-white bg-primary rounded-[10px] hover:bg-primary';

// bloglist 목록 스타일
const bloglistFirstCardStyle = 'w-full lg:col-span-3 md:col-span-2 col-span-1 h-auto rounded-none md:rounded-lg overflow-hidden bg-white/50 hover:bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col md:flex-row flex-1 md:mb-8 cursor-pointer';
const bloglistFirstCardImgStyle = 'w-full object-cover object-center overflow-hidden md:h-auto h-[200px] md:w-[49%] lg:w-[52%] shrink-0 mr-8 transition duration-300 ease-in-out transform hover:scale-102';
const bloglistFirstCardDescriptionStyle = 'text-gray-700 text-base font-normal leading-snug mb-3';

const bloglistCardStyle = 'w-full h-auto overflow-visible bg-white/50 hover:bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer col-span-1 rounded-lg flex flex-col';
const bloglistCardImgStyle = 'w-full h-[220px] object-cover object-center overflow-hidden transition duration-300 ease-in-out transform hover:scale-102';

const bloglistCardBodyStyle = 'px-6 py-4 flex-grow flex flex-col';
const bloglistCardTitleStyle = 'text-gray-800 font-bold text-lg mb-2 hover:text-primary transition duration-200 ease-in-out';
const bloglistCardCategoryStyle = 'inline-block bg-activation text-primary text-sm font-medium mb-2 px-3 py-1.5 rounded-lg transition duration-200 ease-in-out hover:bg-primary hover:text-white';
const bloglistCardDescriptionStyle = 'text-gray-700 text-sm font-normal leading-snug h-auto mb-2 flex-grow';
const bloglistCardAuthorDivStyle = 'inline-block mt-auto';
const bloglistCardAuthorImgStyle = 'inline w-8 h-8 rounded-full object-cover object-center mr-2 border border-graylv2 overflow-hidden';
const bloglistCardAuthorStyle = 'inline text-sm font-semibold text-gray-800 mr-2';
const bloglistCardDateStyle = 'text-gray-600 text-sm inline-block font-normal';

// pagination 관련 스타일
const paginationStyle       = 'mt-20 mb-[132px] flex justify-center items-center gap-8';
const pageMoveButtonStyle   = 'relative flex inline-flex items-center rounded-[10px] p-[11px] text-graylv2 hover:text-graylv4 bg-graylv1';
const pageNumberListStyle   = 'flex items-center justify-center gap-1';
const pageNumberStyle       = 'relative inline-flex items-center w-10 h-10 px-4 py-2 text-md font-normal text-graylv3 hover:text-primary hover:bg-graylv1 rounded-lg transition duration-200 ease-in-out cursor-pointer';
const pageNumberActiveStyle = 'text-primary font-bold bg-activation rounded-lg';

// category 검색 영역 스타일
const categoryContainerStyle = 'flex-col md:w-[220px] overflow-y-auto rounded-md bg-white shadow-sm z-10';
const categoryItemStyle      = 'text-base font-normal px-5 py-[9px] cursor-pointer hover:bg-graylv1 hover:text-primary transition duration-200 ease-in-out rounded-lg';
const categoryItemCountStyle = 'text-base font-normal text-graylv3 ml-1';

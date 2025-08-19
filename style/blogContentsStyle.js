// 날짜 포맷 함수 정의 (YYYY-MM-DD 또는 YYYYMMDD 지원)
function formatDate(dateString) {
  const norm = dateString.includes('-')
    ? dateString
    : dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  const date = new Date(norm);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function styleMarkdown(kinds, text, title_info = null) {
  /*
    메뉴와 블로그 상세 목록을 globalStyle.js에 정의된 Tailwind CSS로 스타일링합니다.
  */
  const tempDiv = document.createElement("div");
  const html = marked.parse(text);
  tempDiv.innerHTML = html;

  // 마크다운 콘텐츠 내 메타 태그 제거 (CSP 메타 태그 방지)
  tempDiv.querySelectorAll('meta').forEach(el => el.remove());

  // 헤딩 스타일링
  tempDiv.querySelectorAll("h1").forEach(h1 => h1.classList.add(...posth1Style.split(" ")));
  tempDiv.querySelectorAll("h2").forEach(h2 => h2.classList.add(...posth2Style.split(" ")));
  tempDiv.querySelectorAll("h3").forEach(h3 => h3.classList.add(...posth3Style.split(" ")));
  tempDiv.querySelectorAll("h4").forEach(h4 => h4.classList.add(...posth4Style.split(" ")));
  tempDiv.querySelectorAll("h5").forEach(h5 => h5.classList.add(...posth5Style.split(" ")));
  tempDiv.querySelectorAll("h6").forEach(h6 => h6.classList.add(...posth6Style.split(" ")));

  // 본문 텍스트, 이미지, 링크 스타일링
  tempDiv.querySelectorAll("p").forEach(p => p.classList.add(...postpStyle.split(" ")));
  tempDiv.querySelectorAll("img").forEach(img => img.classList.add(...postimgStyle.split(" ")));
  tempDiv.querySelectorAll("a").forEach(a => a.classList.add(...postaStyle.split(" ")));

  // 리스트 스타일링
  tempDiv.querySelectorAll("ul").forEach(ul => ul.classList.add(...postulStyle.split(" ")));
  tempDiv.querySelectorAll("ol").forEach(ol => ol.classList.add(...postolStyle.split(" ")));
  tempDiv.querySelectorAll("li").forEach(li => li.classList.add(...postliStyle.split(" ")));

  // 기타 요소
  tempDiv.querySelectorAll("blockquote").forEach(blockquote => blockquote.classList.add(...postblockquoteStyle.split(" ")));
  tempDiv.querySelectorAll("pre").forEach(pre => {
    pre.classList.add(...postpreStyle.split(" "));
    const codeText = pre.textContent;
    // 복사 버튼 생성
    const copyButton = document.createElement("button");
    copyButton.innerHTML = '<span class="sr-only">코드 복사하기</span>';
    copyButton.classList.add(...notebookcopyButtonStyle.split(" "));
    copyButton.setAttribute("id", "copy-button");
    copyButton.addEventListener("click", async event => {
      event.stopPropagation();
      try {
        await navigator.clipboard.writeText(codeText);
        alert("복사되었습니다");
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("복사에 실패했습니다.");
      }
    });
    pre.appendChild(copyButton);
  });
  tempDiv.querySelectorAll("code").forEach(code => code.classList.add(...postcodeStyle.split(" ")));

  // 테이블 래퍼
  tempDiv.querySelectorAll("table").forEach(table => {
    table.classList.add(...posttableStyle.split(" "));
    const wrapper = document.createElement("div");
    wrapper.classList.add("w-auto", "max-w-[990px]", "overflow-auto", "overflow-y-visible");
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
  tempDiv.querySelectorAll("thead").forEach(thead => thead.classList.add(...posttheadStyle.split(" ")));
  tempDiv.querySelectorAll("th").forEach(th => th.classList.add(...postthStyle.split(" ")));
  tempDiv.querySelectorAll("tbody").forEach(tbody => tbody.classList.add(...posttbodyStyle.split(" ")));
  tempDiv.querySelectorAll("td").forEach(td => td.classList.add(...posttdStyle.split(" ")));
  tempDiv.querySelectorAll("hr").forEach(hr => hr.classList.add(...posthrStyle.split(" ")));
  tempDiv.querySelectorAll("em").forEach(em => em.classList.add(...postemStyle.split(" ")));
  tempDiv.querySelectorAll("strong").forEach(strong => strong.classList.add(...poststrongStyle.split(" ")));

  // 포스트 타입일 때 제목 영역 구성
  const contentsDiv = document.getElementById("contents");
  if (kinds === "post") {
    const titleSection = document.createElement("div");
    // 메타 정보
    const categoryEl = document.createElement("a");
    categoryEl.classList.add(...postcategoryStyle.split(" "));
    categoryEl.textContent = title_info.category;
    categoryEl.addEventListener("click", event => {
      event.preventDefault();
      search(title_info.category);
      const url = new URL(origin);
      url.searchParams.set("search", title_info.category);
      window.history.pushState({}, "", url);
    });
    titleSection.appendChild(categoryEl);

    const titleEl = document.createElement("h1");
    titleEl.classList.add(...posttitleStyle.split(" "));
    titleEl.textContent = title_info.title;
    titleSection.appendChild(titleEl);

    const authorDateDiv = document.createElement("div");
    authorDateDiv.classList.add(...postauthordateDivStyle.split(" "));
    // author
    const authDiv = document.createElement("div");
    authDiv.classList.add(...postauthorDivStyle.split(" "));
    const authImg = document.createElement("img");
    authImg.src = users[title_info.author].img;
    authImg.alt = users[title_info.author].username;
    authImg.classList.add(...postauthorImgStyle.split(" "));
    authDiv.appendChild(authImg);
    const authName = document.createElement("div");
    authName.classList.add(...postauthorStyle.split(" "));
    authName.textContent = users[title_info.author].username;
    authDiv.appendChild(authName);
    authorDateDiv.appendChild(authDiv);
    // date
    const dateEl = document.createElement("div");
    dateEl.classList.add(...postdateStyle.split(" "));
    dateEl.textContent = formatDate(title_info.date);
    authorDateDiv.appendChild(dateEl);
    titleSection.appendChild(authorDateDiv);

    // thumbnail
    if (title_info.thumbnail) {
      const imgEl = document.createElement("img");
      imgEl.src = title_info.thumbnail;
      imgEl.alt = title_info.title;
      imgEl.classList.add(...postimgtitleStyle.split(" "));
      titleSection.appendChild(imgEl);
    }

    titleSection.classList.add(...postsectionStyle.split(" "));
    titleSection.id = "title_section";
    contentsDiv.innerHTML = '';
    contentsDiv.appendChild(titleSection);
  }

  // 메인 콘텐츠 렌더링
  contentsDiv.appendChild(tempDiv);
  hljs.highlightAll();
}

function styleJupyter(kinds, text, title_info = null) {
  const tempDiv = document.createElement("div");
  // 함수명 수정: convertIpynbToHtml
  const html = convertIpynbToHtml(text);
  tempDiv.innerHTML = html;
  tempDiv.querySelectorAll('meta').forEach(el => el.remove());
  // 유사하게 styleMarkdown 로직을 적용...
  // (생략: 스타일링 블록 동일)
  const contentsDiv = document.getElementById("contents");
  contentsDiv.innerHTML = '';
  contentsDiv.appendChild(tempDiv);
  hljs.highlightAll();
}

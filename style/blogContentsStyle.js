function styleMarkdown(kinds, text, title_info = null) {
  /* 
    메뉴와 블로그 상세 목록을 globalStyle.js에 정의된 tailwind css로 스타일링 합니다. 
    */
  // console.log(kinds, text, title_info);

  const tempDiv = document.createElement("div");
  const html = marked.parse(text);
  tempDiv.innerHTML = html;

  tempDiv
    .querySelectorAll("h1")
    .forEach((h1) => h1.classList.add(...posth1Style.split(" ")));
  tempDiv
    .querySelectorAll("h2")
    .forEach((h2) => h2.classList.add(...posth2Style.split(" ")));
  tempDiv
    .querySelectorAll("h3")
    .forEach((h3) => h3.classList.add(...posth3Style.split(" ")));
  tempDiv
    .querySelectorAll("h4")
    .forEach((h4) => h4.classList.add(...posth4Style.split(" ")));
  tempDiv
    .querySelectorAll("h5")
    .forEach((h5) => h5.classList.add(...posth5Style.split(" ")));
  tempDiv
    .querySelectorAll("h6")
    .forEach((h6) => h6.classList.add(...posth6Style.split(" ")));

  tempDiv
    .querySelectorAll("p")
    .forEach((p) => p.classList.add(...postpStyle.split(" ")));
  tempDiv
    .querySelectorAll("img")
    .forEach((img) => img.classList.add(...postimgStyle.split(" ")));
  tempDiv
    .querySelectorAll("a")
    .forEach((a) => a.classList.add(...postaStyle.split(" ")));

  tempDiv
    .querySelectorAll("ul")
    .forEach((ul) => ul.classList.add(...postulStyle.split(" ")));
  tempDiv
    .querySelectorAll("ol")
    .forEach((ol) => ol.classList.add(...postolStyle.split(" ")));
  tempDiv
    .querySelectorAll("li")
    .forEach((li) => li.classList.add(...postliStyle.split(" ")));

  tempDiv
    .querySelectorAll("blockquote")
    .forEach((blockquote) =>
      blockquote.classList.add(...postblockquoteStyle.split(" "))
    );
  tempDiv.querySelectorAll("pre").forEach((pre) => {
    pre.classList.add(...postpreStyle.split(" "));

    const code = pre.textContent;

    // 복사 버튼 생성
    const copyButton = document.createElement("button");
    copyButton.innerHTML = '<span class="sr-only">코드 복사하기</span>';
    copyButton.classList.add(...notebookcopyButtonStyle.split(" "));
    copyButton.setAttribute("id", "copy-button");

    // 복사 버튼 클릭 이벤트, pre에 텍스트가 있는 경우에만 활성화
    copyButton.addEventListener("click", async function (event) {
      event.stopPropagation(); // 이벤트 버블링을 막습니다.
      try {
        await navigator.clipboard.writeText(code);
        alert("복사되었습니다");
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("복사에 실패했습니다.");
      }
    });

    // pre 요소 안에 버튼 삽입
    pre.appendChild(copyButton);
  });
  tempDiv
    .querySelectorAll("code")
    .forEach((code) => code.classList.add(...postcodeStyle.split(" ")));

  tempDiv
    .querySelectorAll("table")
    .forEach((table) => table.classList.add(...posttableStyle.split(" ")));
  tempDiv.querySelectorAll("table").forEach((table) => {
    const tableWrapper = document.createElement("div");
    tableWrapper.classList.add(
      "w-auto",
      "max-w-[990px]",
      "overflow-auto",
      "overflow-y-visible"
    );
    table.parentNode.insertBefore(tableWrapper, table);
    tableWrapper.appendChild(table);
  });

  tempDiv
    .querySelectorAll("thead")
    .forEach((thead) => thead.classList.add(...posttheadStyle.split(" ")));
  tempDiv
    .querySelectorAll("th")
    .forEach((th) => th.classList.add(...postthStyle.split(" ")));
  tempDiv
    .querySelectorAll("tbody")
    .forEach((tbody) => tbody.classList.add(...posttbodyStyle.split(" ")));
  tempDiv
    .querySelectorAll("td")
    .forEach((td) => td.classList.add(...posttdStyle.split(" ")));

  tempDiv
    .querySelectorAll("hr")
    .forEach((hr) => hr.classList.add(...posthrStyle.split(" ")));
  tempDiv
    .querySelectorAll("em")
    .forEach((em) => em.classList.add(...postemStyle.split(" ")));
  tempDiv
    .querySelectorAll("strong")
    .forEach((strong) => strong.classList.add(...poststrongStyle.split(" ")));

  if (kinds === "post") {
    // 일반 마크다운 블로그 포스트
    const title_section = document.createElement("div");

    // category
    // category는 클릭하면 해당 카테고리의 블로그 리스트를 렌더링
    const category = document.createElement("a");
    category.classList.add(...postcategoryStyle.split(" "));
    category.textContent = title_info.category;

    category.onclick = (event) => {
      event.preventDefault();
      // console.log('click')
      search(title_info.category);
      const url = new URL(origin);
      url.searchParams.set("search", title_info.category);
      window.history.pushState({}, "", url);
    };
    title_section.appendChild(category);

    // title
    const title = document.createElement("h1");
    title.classList.add(...posttitleStyle.split(" "));
    // console.log(title_info)
    title.textContent = title_info.title;
    title_section.appendChild(title);

    // author와 date를 담는 div
    const author_date = document.createElement("div");
    author_date.classList.add(...postauthordateDivStyle.split(" "));
    title_section.appendChild(author_date);

    // author
    const authorDiv = document.createElement("div");
    authorDiv.classList.add(...postauthorDivStyle.split(" "));
    author_date.appendChild(authorDiv);

    const authorImg = document.createElement("img");
    authorImg.src = users[title_info.author]["img"];
    authorImg.alt = users[title_info.author]["username"];
    authorImg.classList.add(...postauthorImgStyle.split(" "));
    authorDiv.appendChild(authorImg);

    const author = document.createElement("div");
    author.classList.add(...postauthorStyle.split(" "));
    author.textContent = users[title_info.author]["username"];
    authorDiv.appendChild(author);

    // date
    const date = document.createElement("div");
    date.classList.add(...postdateStyle.split(" "));
    date.textContent = formatDate(title_info.date);
    author_date.appendChild(date);

    // image
    const image = document.createElement("img");
    image.src = title_info.thumbnail;
    image.alt = title_info.title;
    image.classList.add(...postimgtitleStyle.split(" "));
    title_section.appendChild(image);

    // section styling
    title_section.classList.add(...postsectionStyle.split(" "));
    title_section.setAttribute("id", "title_section");

    tempDiv.insertBefore(title_section, tempDiv.firstChild);
  } else if (kinds === "menu") {
  }

  // innerHTML을 사용하면 click이벤트가 사라지므로, appendChild를 사용하여 렌더링
  const contentsDiv = document.getElementById("contents");
  while (contentsDiv.firstChild) {
    contentsDiv.removeChild(contentsDiv.firstChild);
  }
  contentsDiv.appendChild(tempDiv);

  hljs.highlightAll();
}

function styleJupyter(kinds, text, title_info = null) {
  /* 
    주피터 노트북 파일 내용을 globalStyle.js에 정의된 tailwind css로 스타일링 합니다. 
    */
  const tempDiv = document.createElement("div");
  const html = convertIpynvToHtml(text);
  // const html = marked.parse(text);
  tempDiv.innerHTML = html;

  tempDiv.querySelectorAll(".markdown-cell").forEach((markdownCell) => {
    markdownCell
      .querySelectorAll("h1")
      .forEach((h1) => h1.classList.add(...posth1Style.split(" ")));
    markdownCell
      .querySelectorAll("h2")
      .forEach((h2) => h2.classList.add(...posth2Style.split(" ")));
    markdownCell
      .querySelectorAll("h3")
      .forEach((h3) => h3.classList.add(...posth3Style.split(" ")));
    markdownCell
      .querySelectorAll("h4")
      .forEach((h4) => h4.classList.add(...posth4Style.split(" ")));
    markdownCell
      .querySelectorAll("h5")
      .forEach((h5) => h5.classList.add(...posth5Style.split(" ")));
    markdownCell
      .querySelectorAll("h6")
      .forEach((h6) => h6.classList.add(...posth6Style.split(" ")));

    markdownCell
      .querySelectorAll("p")
      .forEach((p) => p.classList.add(...postpStyle.split(" ")));
    markdownCell
      .querySelectorAll("img")
      .forEach((img) => img.classList.add(...postimgStyle.split(" ")));
    markdownCell
      .querySelectorAll("a")
      .forEach((a) => a.classList.add(...postaStyle.split(" ")));

    markdownCell
      .querySelectorAll("ul")
      .forEach((ul) => ul.classList.add(...postulStyle.split(" ")));
    markdownCell
      .querySelectorAll("ol")
      .forEach((ol) => ol.classList.add(...postolStyle.split(" ")));
    markdownCell
      .querySelectorAll("li")
      .forEach((li) => li.classList.add(...postliStyle.split(" ")));

    markdownCell
      .querySelectorAll("blockquote")
      .forEach((blockquote) =>
        blockquote.classList.add(...postblockquoteStyle.split(" "))
      );
    markdownCell
      .querySelectorAll("pre")
      .forEach((pre) => pre.classList.add(...postpreStyle.split(" ")));
    markdownCell
      .querySelectorAll("code")
      .forEach((code) => code.classList.add(...postcodeStyle.split(" ")));

    markdownCell
      .querySelectorAll("table")
      .forEach((table) => table.classList.add(...posttableStyle.split(" ")));
    markdownCell
      .querySelectorAll("thead")
      .forEach((thead) => thead.classList.add(...posttheadStyle.split(" ")));
    markdownCell
      .querySelectorAll("th")
      .forEach((th) => th.classList.add(...postthStyle.split(" ")));
    markdownCell
      .querySelectorAll("tbody")
      .forEach((tbody) => tbody.classList.add(...posttbodyStyle.split(" ")));
    markdownCell
      .querySelectorAll("td")
      .forEach((td) => td.classList.add(...posttdStyle.split(" ")));

    markdownCell
      .querySelectorAll("hr")
      .forEach((hr) => hr.classList.add(...posthrStyle.split(" ")));
    markdownCell
      .querySelectorAll("em")
      .forEach((em) => em.classList.add(...postemStyle.split(" ")));
    markdownCell
      .querySelectorAll("strong")
      .forEach((strong) => strong.classList.add(...poststrongStyle.split(" ")));
  });

  tempDiv.querySelectorAll("code").forEach((code) => {
    code.classList.add(...notebookcodeStyle.split(" "));
  });
  tempDiv.querySelectorAll("pre").forEach((pre) => {
    pre.classList.add(...notebookpreStyle.split(" "));
    const code = pre.textContent;

    // 복사 버튼 생성
    const copyButton = document.createElement("button");
    copyButton.innerHTML = '<span class="sr-only">코드 복사하기</span>';
    copyButton.classList.add(...notebookcopyButtonStyle.split(" "));
    copyButton.setAttribute("id", "copy-button");

    // 복사 버튼 클릭 이벤트, pre에 텍스트가 있는 경우에만 활성화
    copyButton.addEventListener("click", async function (event) {
      event.stopPropagation(); // 이벤트 버블링을 막습니다.
      try {
        await navigator.clipboard.writeText(code);
        alert("복사되었습니다");
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("복사에 실패했습니다.");
      }
    });

    // pre 요소 안에 버튼 삽입
    pre.appendChild(copyButton);
  });

  const contentsDiv = document.getElementById("contents");
  while (contentsDiv.firstChild) {
    contentsDiv.removeChild(contentsDiv.firstChild);
  }

  if (kinds === "post") {
    // 일반 마크다운 블로그 포스트
    const title_section = document.createElement("div");

    // category
    // category는 클릭하면 해당 카테고리의 블로그 리스트를 렌더링
    const category = document.createElement("a");
    category.classList.add(...postcategoryStyle.split(" "));
    category.textContent = title_info.category;

    category.onclick = (event) => {
      event.preventDefault();
      // console.log('click')
      search(title_info.category);
      const url = new URL(origin);
      url.searchParams.set("search", title_info.category);
      window.history.pushState({}, "", url);
    };
    title_section.appendChild(category);

    // title
    const title = document.createElement("h1");
    title.classList.add(...posttitleStyle.split(" "));
    // console.log(title_info)
    title.textContent = title_info.title;
    title_section.appendChild(title);

    // author와 date를 담는 div
    const author_date = document.createElement("div");
    author_date.classList.add(...postauthordateDivStyle.split(" "));
    title_section.appendChild(author_date);

    // author
    const authorDiv = document.createElement("div");
    authorDiv.classList.add(...postauthorDivStyle.split(" "));
    author_date.appendChild(authorDiv);

    const authorImg = document.createElement("img");
    authorImg.src = users[title_info.author]["img"];
    authorImg.alt = users[title_info.author]["username"];
    authorImg.classList.add(...postauthorImgStyle.split(" "));
    authorDiv.appendChild(authorImg);

    const author = document.createElement("div");
    author.classList.add(...postauthorStyle.split(" "));
    author.textContent = users[title_info.author]["username"];
    authorDiv.appendChild(author);

    // date
    const date = document.createElement("div");
    date.classList.add(...postdateStyle.split(" "));
    date.textContent = formatDate(title_info.date);
    author_date.appendChild(date);

    // image
    const image = document.createElement("img");
    image.src = title_info.thumbnail;
    image.alt = title_info.title;
    image.classList.add(...postimgtitleStyle.split(" "));
    title_section.appendChild(image);

    // section styling
    title_section.classList.add(...postsectionStyle.split(" "));
    title_section.setAttribute("id", "title_section");

    contentsDiv.insertBefore(title_section, contentsDiv.firstChild);
  }

  // 노트북 다운로드 버튼 추가
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Notebook Download";
  downloadButton.classList.add(...notebookdownloadButtonStyle.split(" "));
  downloadButton.addEventListener("click", function (event) {
    event.stopPropagation(); // 이벤트 버블링을 막습니다.
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title_info.title + ".ipynb";
    a.click();
    window.URL.revokeObjectURL(url);
  });
  contentsDiv.appendChild(downloadButton);
  contentsDiv.appendChild(tempDiv);
  hljs.highlightAll();
}

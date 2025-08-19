function search(keyword, kinds) {
  /*
    트러블슈팅: 실제 데이터가 없을 경우 API 호출을 한 번 실행.
    1. 메뉴에서 검색 버튼을 클릭해서 검색하였을 경우 검색 결과를 renderBlogList 함수를 통해 렌더링
    2. 포스트에서 카테고리를 클릭하였을 때 해당 카테고리로 검색하여 renderBlogList함수를 통해 렌더링
    */
  keyword = keyword ? keyword.toLowerCase().trim() : "";

  if (blogList.length === 0) {
    if (isInitData === false) {
      // 데이터 초기화가 되지 않은 경우에만 검색 허용. 이 작업을 하지 않으면 데이터가 없을 때 무한 루프에 빠지게 됨.
      initDataBlogList().then(() => {
        search(keyword);
      });
      return;
    }
  } else {
    if (!keyword) {
      const searchInput = document.getElementById("search-input");
      const searchKeyword = searchInput.value.toLowerCase(); // 검색어를 소문자로 변환
      const searchResult = blogList.filter((post) => {
        // 대소문자 가리지 않고 검색
        if (post.name.toLowerCase().includes(searchKeyword)) {
          return post;
        }
      });
      renderBlogList(searchResult);
    } else {
      // 만약 kinds가 있을 경우 해당 종류대로 검색(카테고리면 카테고리, 이름이면 이름)
      if (kinds) {
        const searchResult = blogList.filter((post) => {
          if (kinds === "category") {
            // post를 parsing하여 카테고리 내 검색
            const postInfo = extractFileInfo(post.name);
            if (postInfo.category.toLowerCase() === keyword) {
              return post;
            }
          }
        });
        renderBlogList(searchResult);
      } else {
        const searchKeyword = keyword.toLowerCase();
        const searchResult = blogList.filter((post) => {
          // 대소문자 가리지 않고 검색
          if (post.name.toLowerCase().includes(searchKeyword)) {
            return post;
          }
        });
        // 검색 결과를 렌더링
        renderBlogList(searchResult);
      }
    }
  }
}

async function renderMenu() {
  /* 
    1. 메인페이지 메뉴 생성 및 메뉴클릭 이벤트 정의
    2. 검색창과 검색 이벤트 정의(검색이 메뉴에 있으므로) - 함수가 커지면 별도 파일로 분리 필요
    */
  blogMenu.forEach((menu) => {
    // 메뉴 링크 생성
    const link = document.createElement("a");

    // iMac style left menu bar styling
    link.classList.add(
      "menu-item",          // 메뉴 아이템 클래스
      "flex",               // 세로 배치용 flex 컨테이너
      "flex-col",           // 위 ↓ 아래 방향
      "items-center",       // 수평 중앙 정렬
      "space-y-1",          // 아이콘과 텍스트 사이 간격
      "px-2",               // 좌우 패딩
      "py-2",               // 상하 패딩
      "rounded-xl",         // 둥근 모서리
      "text-xs",            // 작은 글자 크기
      "font-medium",        // 중간 굵기
      "text-text",          // 기본 텍스트 색
      "hover:text-primary", // 호버 시 primary 컬러
      "transition-all",     // 부드러운 전환
      "duration-200",       // 전환 시간
      "cursor-pointer"      // 커서 포인터
    );

    link.href = menu.download_url;
    // 확장자를 제외하고 이름만 innerText로 사용
    const menuName = menu.name.split(".")[0];
    link.innerHTML = `
      <img src="img/icon/${menuName.toLowerCase()}.svg"
            alt="${menuName}"
            class="w-6 h-6 opacity-80">  <!-- 아이콘 크기 -->
      <span class="text-center">${menuName}</span>  <!-- 텍스트 -->
    `;

    link.onclick = (event) => {
      // 메뉴 링크 클릭 시 이벤트 중지 후 menu 내용을 읽어와 contents 영역에 렌더링
      event.preventDefault();

      if (menu.name === "blog.md") {
        // contents 영역 숨기기
        document.getElementById("contents").style.display = "none";
        
        if (blogList.length === 0) {
          // 블로그 리스트 로딩
          initDataBlogList().then(() => {
            renderBlogList();
          });
        } else {
          renderBlogList();
        }
        const url = new URL(origin);
        url.searchParams.set("menu", menu.name);
        window.history.pushState({}, "", url);
      } else {
        renderOtherContents(menu);
      }
    };
    document.getElementById("menu").appendChild(link);
  });

  // 검색 입력 이벤트 설정
  const searchInput = document.getElementById("search-input");
  
  searchInput.addEventListener("input", (event) => {
    const keyword = event.target.value;
    if (keyword.trim() === "") {
      // 검색어가 비어있으면 전체 블로그 리스트 표시
      renderBlogList();
    } else {
      // 검색 실행
      search(keyword);
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const keyword = event.target.value;
      search(keyword);
    }
  });
}

function createCardElement(fileInfo, index) {
  /*
    정규표현식으로 파싱된 파일정보 fileInfo를 기반으로 blog의 card 생성, index를 받는 이유는 첫번째 카드는 넓이를 크게 차지해야 하기 때문
    */
  const cardElement = document.createElement("div");
   
  // Windows 8 style card styling
  cardElement.classList.add(
    "blog-card",           // 호버 효과용 클래스
    "bg-card",             // 아이맥 스타일 배경
    "backdrop-blur-sm",    // 글래스 효과
    "border",              // 테두리
    "border-border/20",    // 테두리 색상
    "rounded-lg",          // 둥근 모서리
    "shadow-lg",           // 그림자
    "overflow-hidden",     // 오버플로우 숨김
    "cursor-pointer",      // 커서 포인터
    "transition-all",      // 부드러운 전환
    "duration-300"         // 전환 시간
  );

  // Add prism effect overlay
  const prismOverlay = document.createElement("div");
  prismOverlay.classList.add("prism-overlay");
  cardElement.appendChild(prismOverlay);

  if (fileInfo.thumbnail) {
    const img = document.createElement("img");
    img.src = fileInfo.thumbnail;
    img.alt = fileInfo.title;
    img.classList.add(
      "card-image",
      "transition-transform",
      "duration-300",
      "hover:scale-105"
    );
    cardElement.appendChild(img);
  }

  const cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-content"
  );

  const category = document.createElement("span");
  category.classList.add(
    "inline-block",
    "px-3",
    "py-1",
    "bg-primary/10",
    "text-primary",
    "text-xs",
    "font-medium",
    "rounded-full",
    "self-start",
    "cursor-pointer",
    "hover:bg-primary/20",
    "transition-colors",
    "duration-200",
    "mb-2"
  );
  category.textContent = fileInfo.category;
  cardBody.appendChild(category);

  // category 이벤트 생성으로 카테고리 클릭 시 해당 카테고리로 검색
  category.onclick = (event) => {
    // 클릭했을 때 카드가 클릭되는 것이 아니라 카테고리가 클릭되게 해야함
    event.stopPropagation();
    search(fileInfo.category, "category");
  };

  const title = document.createElement("h2");
  title.classList.add(
    "text-lg",
    "font-bold",
    "text-text",
    "hover:text-primary",
    "transition-colors",
    "duration-200",
    "mb-2",
    "leading-tight"
  );
  title.textContent = fileInfo.title;
  cardBody.appendChild(title);

  const description = document.createElement("p");
  description.classList.add(
    "text-textSecondary",
    "text-sm",
    "flex-grow",
    "mb-3",
    "leading-relaxed"
  );
  description.textContent = fileInfo.description;
  cardBody.appendChild(description);

  const authorDiv = document.createElement("div");
  authorDiv.classList.add(
    "flex",
    "items-center",
    "space-x-3",
    "mt-auto",
    "pt-3"
  );

  const authorImg = document.createElement("img");
  authorImg.src = users[fileInfo.author]["img"];
  authorImg.alt = users[fileInfo.author]["username"];
  authorImg.classList.add(
    "w-5",
    "h-5",
    "rounded-full",
    "object-cover"
  );
  authorDiv.appendChild(authorImg);

  const author = document.createElement("p");
  author.classList.add(
    "text-xs",
    "text-textSecondary",
    "font-medium",
    "whitespace-nowrap"
  );
  author.textContent = users[fileInfo.author]["username"];
  authorDiv.appendChild(author);

  const date = document.createElement("p");
  date.classList.add(
    "text-xs",
    "text-textSecondary",
    "ml-auto",
    "whitespace-nowrap"
  );
  date.textContent = formatDate(fileInfo.date);
  authorDiv.appendChild(date);

  cardBody.appendChild(authorDiv);
  cardElement.appendChild(cardBody);

  return cardElement;
}

// 검색어 강조 함수
function highlightSearchTerm(element, searchTerm) {
  if (!searchTerm) return;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const text = element.textContent;
  const highlightedText = text.replace(regex, '<span class="search-highlight">$1</span>');
  element.innerHTML = highlightedText;
}

// 검색 결과 팝업 표시
function showSearchPopup(searchTerm, postInfo) {
  const popup = document.getElementById("search-popup");
  const keywordSpan = document.getElementById("search-keyword");
  const goToButton = document.getElementById("go-to-search");
  const closeButton = document.getElementById("close-popup");
  
  keywordSpan.textContent = searchTerm;
  popup.classList.remove("hidden");
  
  // 이동하기 버튼 클릭 시
  goToButton.onclick = () => {
    popup.classList.add("hidden");
    // 해당 포스트로 이동
    renderPostContent(postInfo);
  };
  
  // 취소 버튼 클릭 시
  closeButton.onclick = () => {
    popup.classList.add("hidden");
  };
  
  // 팝업 외부 클릭 시 닫기
  popup.onclick = (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  };
}

// 포스트 내용 렌더링
function renderPostContent(postInfo) {
  document.getElementById("contents").style.display = "block";
  document.getElementById("blog-posts").style.display = "none";
  
  document.getElementById("contents").innerHTML = "";
  
  fetch(postInfo.download_url)
    .then((response) => response.text())
    .then((text) =>
      postInfo.fileType === "md"
        ? styleMarkdown("post", text, postInfo)
        : styleJupyter("post", text, postInfo)
    )
    .then(() => {
      // 검색어가 있으면 해당 부분으로 스크롤
      const searchTerm = document.getElementById("search-input").value;
      if (searchTerm) {
        setTimeout(() => {
          const highlightedElements = document.querySelectorAll('.search-highlight');
          if (highlightedElements.length > 0) {
            highlightedElements[0].scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 500);
      }
      
      const url = new URL(origin);
      url.searchParams.set("post", postInfo.name);
      window.history.pushState({}, "", url);
    });
}

function renderBlogList(searchResult = null, currentPage = 1) {
  /*
    blog의 main 영역에 블로그 포스트 목록을 렌더링
    1. 검색 키워드 없이 대부분 renderBlogList()로 사용.
    2. 검색을 했을 때만 searchResult에 목록이 담겨 들어옴
    */
  const postsToRender = searchResult || blogList;
  const searchTerm = document.getElementById("search-input").value;

  if (searchResult) {
    // 검색 keyword가 있을 경우
    document.getElementById("blog-posts").style.display = "grid";
    document.getElementById("blog-posts").innerHTML = "";
    document.getElementById("pagination").style.display = "none";

    postsToRender.forEach((post, index) => {
      const postInfo = extractFileInfo(post.name);
      if (postInfo) {
        const cardElement = createCardElement(postInfo, index);
        
        // 검색어 강조
        if (searchTerm) {
          const titleElement = cardElement.querySelector("h2");
          const descriptionElement = cardElement.querySelector("p");
          highlightSearchTerm(titleElement, searchTerm);
          highlightSearchTerm(descriptionElement, searchTerm);
        }

        cardElement.onclick = (event) => {
          event.preventDefault();
          
          // 검색어가 있으면 팝업 표시
          if (searchTerm) {
            showSearchPopup(searchTerm, postInfo);
          } else {
            renderPostContent(postInfo);
          }
        };
        document.getElementById("blog-posts").appendChild(cardElement);
      }
    });
    // contents 영역을 보이지 않게 처리
    document.getElementById("contents").style.display = "none";
  } else {
    // 검색 keyword가 없을 경우
    document.getElementById("blog-posts").style.display = "grid";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("blog-posts").innerHTML = "";

    postsToRender.forEach((post, index) => {
      const postInfo = extractFileInfo(post.name);
      if (postInfo) {
        const cardElement = createCardElement(postInfo, index);

        cardElement.onclick = (event) => {
          event.preventDefault();
          renderPostContent(postInfo);
        };
        document.getElementById("blog-posts").appendChild(cardElement);
      }
    });

    // contents 영역을 보이지 않게 처리
    document.getElementById("contents").style.display = "none";
  }
}

function renderOtherContents(menu) {
  /*
    menu에 다른 콘텐츠, 예를 들어 about이나 contect를 클릭했을 때 렌더링 하는 함수
    */
  // main 영역에 blog.md를 제외한 다른 파일을 렌더링
  document.getElementById("blog-posts").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("contents").style.display = "block";
  
  // contents 영역 내용 초기화
  document.getElementById("contents").innerHTML = "";

  // 만약 menu가 string type 이라면 download_url, name을 menu로 설정
  if (typeof menu === "string") {
    menu = {
      download_url: origin + "menu/" + menu,
      name: menu.split("/")[menu.split("/").length - 1],
    };
  }
  // console.log(menu)
  // console.log(menu.download_url)
  let menuDownloadUrl;
  if (!isLocal && localDataUsing) {
    menuDownloadUrl =
      menu.download_url = `${url.origin}/${siteConfig.repositoryName}${menu.download_url}`;
  } else {
    menuDownloadUrl = menu.download_url;
  }
  try {
    fetch(menuDownloadUrl)
      .then((response) => response.text())
      .then((text) => styleMarkdown("menu", text, undefined))
      .then(() => {
        // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
        const url = new URL(origin);
        url.searchParams.set("menu", menu.name);
        window.history.pushState({}, "", url);
      });
  } catch (error) {
    styleMarkdown("menu", "# Error입니다. 파일명을 확인해주세요.", undefined);
  }
}

function renderBlogCategory() {
  /*
    blogList에서 카테고리를 소문자로 추출하여 카테고리 목록을 aside 항목으로 렌더링
    */
  const categoryList = {};
  blogList.forEach((post) => {
    const postInfo = extractFileInfo(post.name);
    if (postInfo) {
      if (categoryList[postInfo.category.toLowerCase()]) {
        categoryList[postInfo.category.toLowerCase()] += 1;
      } else {
        categoryList[postInfo.category.toLowerCase()] = 1;
      }
    }
  });
  const categoryArray = Object.keys(categoryList);
  categoryArray.sort();

  const categoryContainer = document.querySelector("#category-menu");
  categoryContainer.innerHTML = "";
  categoryContainer.classList.add(
    "space-y-2"
  );

  const categoryWrapper = document.querySelector(".category-aside");
  // 기존 사이드바 관련 요소들이 없으므로 조건부로 처리
  const categoryTitle = categoryWrapper?.querySelector(".aside-tit");
  const categoryButton = document.getElementById("aside-button");
  
  // 사이드바 토글 기능이 필요한 경우에만 이벤트 리스너 추가
  if (categoryButton && categoryTitle) {
    window.addEventListener("click", (evt) => {
      // categoryButton을 눌렀을 때
      if (evt.target === categoryButton) {
        categoryWrapper.classList.toggle("active");
        categoryTitle.classList.toggle("sr-only");
        categoryContainer.classList.toggle("md:flex");
      } else if (
        categoryWrapper.classList.contains("active") &&
        !categoryWrapper.contains(evt.target)
      ) {
        categoryWrapper.classList.remove("active");
        categoryTitle.classList.add("sr-only");
        categoryContainer.classList.remove("md:flex");
      }
    });
  }

  categoryArray.unshift("All");

  categoryArray.forEach((category) => {
    // category div
    const categoryItem = document.createElement("div");

    // category count span
    const categoryCount = document.createElement("span");

    if (categoryList[category]) {
      categoryItem.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "px-4",
        "py-3",
        "bg-card",
        "backdrop-blur-sm",
        "border",
        "border-border/20",
        "rounded-xl",
        "text-sm",
        "font-medium",
        "text-text",
        "hover:bg-white/50",
        "hover:border-primary/30",
        "transition-all",
        "duration-200",
        "cursor-pointer"
      );
      categoryItem.textContent = category;
      categoryItem.onclick = (event) => {
        search(category, "category");
      };

      categoryCount.classList.add(
        "text-xs",
        "text-textSecondary",
        "bg-primary/10",
        "text-primary",
        "px-2",
        "py-1",
        "rounded-full",
        "font-medium"
      );
      categoryCount.textContent = categoryList[category];
    } else {
      categoryItem.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "px-4",
        "py-3",
        "bg-card",
        "backdrop-blur-sm",
        "border",
        "border-border/20",
        "rounded-xl",
        "text-sm",
        "font-medium",
        "text-text",
        "hover:bg-white/50",
        "hover:border-primary/30",
        "transition-all",
        "duration-200",
        "cursor-pointer"
      );
      categoryItem.textContent = category;
      categoryItem.onclick = (event) => {
        search();
      };

      categoryCount.classList.add(
        "text-xs",
        "text-textSecondary",
        "bg-primary/10",
        "text-primary",
        "px-2",
        "py-1",
        "rounded-full",
        "font-medium"
      );
      categoryCount.textContent = blogList.length;
    }

    categoryItem.appendChild(categoryCount);
    categoryContainer.appendChild(categoryItem);
  });
}

function initPagination(totalPage) {
  const pagination = document.getElementById("pagination");

  pagination.style.display = "flex";

  // iMac style pagination
  pagination.classList.add(
    "justify-center",
    "items-center",
    "space-x-2",
    "mt-8",
    "mb-8"
  );

  const prevButton = document.createElement("button");
  prevButton.setAttribute("id", "page-prev");
  prevButton.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "w-10",
    "h-10",
    "rounded-xl",
    "bg-card",
    "backdrop-blur-sm",
    "border",
    "border-border/20",
    "text-textSecondary",
    "hover:text-text",
    "hover:bg-white/50",
    "transition-all",
    "duration-200",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed"
  );
  
  const pageNav = document.createElement("nav");
  pageNav.setAttribute("id", "pagination-list");
  pageNav.classList.add(
    "flex",
    "items-center",
    "space-x-1"
  );
  
  const docFrag = document.createDocumentFragment();
  for (let i = 0; i < totalPage; i++) {
    if (i === 7) {
      break;
    }

    const page = document.createElement("button");
    page.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "w-10",
      "h-10",
      "rounded-xl",
      "bg-card",
      "backdrop-blur-sm",
      "border",
      "border-border/20",
      "text-textSecondary",
      "hover:text-text",
      "hover:bg-white/50",
      "transition-all",
      "duration-200",
      "font-medium"
    );
    docFrag.appendChild(page);
  }
  pageNav.appendChild(docFrag);

  const nextButton = document.createElement("button");
  nextButton.setAttribute("id", "page-next");
  nextButton.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "w-10",
    "h-10",
    "rounded-xl",
    "bg-card",
    "backdrop-blur-sm",
    "border",
    "border-border/20",
    "text-textSecondary",
    "hover:text-text",
    "hover:bg-white/50",
    "transition-all",
    "duration-200",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed"
  );

  if (!pagination.innerHTML) {
    pagination.append(prevButton, pageNav, nextButton);
  }
  if (totalPage <= 1) {
    pagination.style.display = "none";
    return;
  }
}

function renderPagination(totalPage, currentPage, targetList = null) {
  const prevButton = document.getElementById("page-prev");
  const nextButton = document.getElementById("page-next");
  
  if (currentPage === 1) {
    prevButton.setAttribute("disabled", true);
    nextButton.removeAttribute("disabled");
  } else if (currentPage === totalPage) {
    nextButton.setAttribute("disabled", true);
    prevButton.removeAttribute("disabled");
  } else {
    prevButton.removeAttribute("disabled");
    nextButton.removeAttribute("disabled");
  }
  
  prevButton.onclick = (event) => {
    event.preventDefault();
    renderBlogList(targetList, currentPage - 1);
    renderPagination(totalPage, currentPage - 1, targetList);
  };
  nextButton.onclick = (event) => {
    event.preventDefault();
    renderBlogList(targetList, currentPage + 1);
    renderPagination(totalPage, currentPage + 1, targetList);
  };

  const pageNav = document.querySelector("#pagination nav");
  const pageList = pageNav.querySelectorAll("button");

  if (totalPage <= 7) {
    pageList.forEach((page, index) => {
      page.textContent = index + 1;
      if (index + 1 === currentPage) {
        page.classList.remove("text-textSecondary", "bg-card");
        page.classList.add(
          "bg-primary",
          "text-white",
          "border-primary"
        );
      } else {
        page.classList.remove("bg-primary", "text-white", "border-primary");
        page.classList.add("text-textSecondary", "bg-card");
      }
      
      page.onclick = (event) => {
        event.preventDefault();
        renderBlogList(targetList, index + 1);
        renderPagination(totalPage, index + 1, targetList);
      };
    });
  } else {
    ellipsisPagination(pageList, totalPage, targetList);
  }
}

function ellipsisPagination(pageList, totalPage, targetList = null) {
  const currentPage = parseInt(document.querySelector("#pagination button.bg-primary")?.textContent) || 1;
  
  let indexList;
  if (currentPage <= 4) {
    indexList = [1, 2, 3, 4, 5, "...", totalPage];
  } else if (currentPage > totalPage - 4) {
    indexList = [1, "...", totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
  } else {
    indexList = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage];
  }

  pageList.forEach((page, index) => {
    page.textContent = indexList[index];
    
    if (indexList[index] === currentPage) {
      page.classList.remove("text-textSecondary", "bg-card");
      page.classList.add("bg-primary", "text-white", "border-primary");
    } else {
      page.classList.remove("bg-primary", "text-white", "border-primary");
      page.classList.add("text-textSecondary", "bg-card");
    }
    
    if (indexList[index] === "...") {
      page.style.pointerEvents = "none";
      page.onclick = (event) => {
        event.preventDefault();
      };
    } else {
      page.style.pointerEvents = "all";
      page.onclick = (event) => {
        event.preventDefault();
        renderBlogList(targetList, indexList[index]);
        renderPagination(totalPage, indexList[index], targetList);
      };
    }
  });
}

// 초기화 함수
async function initialize() {
  /*
    최초 실행 함수, URLparsing은 이 영역에서 담당하지 않고 index.html에서 로드 될 때 실행, blogList와 blogMenu는 initData.js에서 정의되고 로드될 때 실행. 다만 함수의 흐름을 파악하고자 이곳으로 옮겨올 필요성이 있음
    
    TODO: URL 파싱 결과 상세 블로그나 메뉴상태이면 검색 버튼을 누르기 전까지는 initDataBlogList()를 실행시킬 필요 없음. 이를 통해 API 호출 한 번을 아낄 수 있음.
    */
  if (!url.search.split("=")[1] || url.search.split("=")[1] === "blog.md") {
    // 메뉴 로딩
    await initDataBlogMenu();
    renderMenu();

    // 블로그 리스트 로딩
    await initDataBlogList();
    renderBlogList();

    // 블로그 카테고리 로딩
    renderBlogCategory();
  } else {
    // 메뉴 로딩
    await initDataBlogMenu();
    renderMenu();

    // 블로그 상세 정보 로딩
    if (url.search.split("=")[0] === "?menu") {
      document.getElementById("blog-posts").style.display = "none";
      document.getElementById("contents").style.display = "block";
      try {
        fetch(origin + "menu/" + url.search.split("=")[1])
          .then((response) => response.text())
          .then((text) => styleMarkdown("menu", text))
          .then(() => {
            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
            const url = new URL(window.location.href);
            window.history.pushState({}, "", url);
          });
      } catch (error) {
        styleMarkdown("menu", "# Error입니다. 파일명을 확인해주세요.");
      }
    } else if (url.search.split("=")[0] === "?post") {
      document.getElementById("contents").style.display = "block";
      document.getElementById("blog-posts").style.display = "none";
      postNameDecode = decodeURI(url.search.split("=")[1]).replaceAll("+", " ");
      // console.log(postNameDecode);
      postInfo = extractFileInfo(postNameDecode);
      try {
        if (!postInfo) {
          throw new Error("Post info is null");
        }
        fetch(origin + "blog/" + postNameDecode)
          .then((response) => response.text())
          .then((text) =>
            postInfo.fileType === "md"
              ? styleMarkdown("post", text, postInfo)
              : styleJupyter("post", text, postInfo)
          )
          .then(() => {
            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
            const url = new URL(window.location.href);
            window.history.pushState({}, "", url);
          });
      } catch (error) {
        styleMarkdown("post", "# Error입니다. 파일명을 확인해주세요.");
      }
    }
  }
}

initialize();
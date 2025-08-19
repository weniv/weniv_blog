### 250810

### 오늘의 목표

- 코드트리의 알고리즘 문제 1개 풀이 작성하기
- CURSOR AI 활용하여 블로그 UI 수정하기




## 📝 **Cursor를 통한 블로그 UI 수정 내용 정리**

### 🎯 **주요 수정 목표**
- 블로그 UI 개선 및 오류 수정
- 메뉴 페이지 전환 시 내용 누적 문제 해결
- 반응형 디자인 개선

---

## 🛠 **1. HTML 구조 오류 수정**

### **수정된 파일: `index.html`**

**문제점:**
- HTML 속성에 공백 누락으로 인한 구문 오류

**수정 내용:**
```html
<!-- 수정 전 -->
<meta name="viewport"content="width=device-width, initial-scale=1.0"/>
<link rel="shortcut icon"href="img/icon/favicon.svg"type="image/x-icon"/>

<!-- 수정 후 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="shortcut icon" href="img/icon/favicon.svg" type="image/x-icon"/>
```

**추가 개선사항:**
- 모바일용 카테고리 토글 버튼 추가
- 모바일용 카테고리 메뉴 영역 추가
- 검색 컨테이너에 ID 추가
- 그리드 레이아웃 최적화 (`justify-items-stretch` → `items-stretch`)

---

## 🎨 **2. CSS 스타일링 개선**

### **수정된 파일: `style/style.css`**

**버튼 스타일링 개선:**
```css
/* 메뉴 토글 버튼 */
#menu-button {
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 검색 버튼 */
#search-button {
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 카테고리 토글 버튼 추가 */
#category-toggle {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8d9299;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  -webkit-mask-image: url("../img/icon/icon-chapter.svg");
  /* ... 마스크 속성들 */
}
```

---

## ⚙ **3. JavaScript 기능 개선**

### **수정된 파일: `js/render.js`**

**메뉴 페이지 전환 문제 해결:**
```javascript
function renderOtherContents(menu) {
  // contents 영역 내용 초기화 추가
  document.getElementById("contents").innerHTML = "";
  
  // pagination 영역도 숨김 처리
  document.getElementById("pagination").style.display = "none";
}

// 블로그 포스트 클릭 시에도 contents 초기화
cardElement.onclick = (event) => {
  // contents 영역 내용 초기화
  document.getElementById("contents").innerHTML = "";
}
```

**메뉴 클릭 시 블로그 리스트로 돌아가기:**
```javascript
if (menu.name === "blog.md") {
  // contents 영역 숨기기
  document.getElementById("contents").style.display = "none";
  // ... 블로그 리스트 렌더링
}
```

### **수정된 파일: `js/mobileMenuToggle.js`**
- 모바일 메뉴 기능 추가
- 카테고리 토글 버튼 기능
- 검색창 토글 기능
- 모바일 카테고리 클릭 이벤트
- 검색 입력 필드 이벤트 리스너

### **수정된 파일: `js/URLparsing.js`**
```javascript
// 블로그 리스트로 돌아갈 때
document.getElementById("contents").style.display = "none";

// 메뉴 페이지 로딩 시
document.getElementById("contents").innerHTML = "";

// 블로그 포스트 로딩 시
document.getElementById("contents").innerHTML = "";
```

---

## 🎨 **4. 스타일 시스템 개선**

### **수정된 파일: `style/globalStyle.js`**

**블로그 카드 디자인 개선:**
```javascript
const bloglistCardStyle = 'w-full h-[450px] overflow-hidden bg-white/50 hover:bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer col-span-1 rounded-lg flex flex-col';

const bloglistCardImgStyle = 'w-full h-[220px] object-cover object-center overflow-hidden transition duration-300 ease-in-out transform hover:scale-102';

const bloglistCardTitleStyle = 'text-gray-800 font-bold text-lg mb-2 hover:text-primary transition duration-200 ease-in-out line-clamp-2';
const bloglistCardDescriptionStyle = 'text-gray-700 text-sm font-normal leading-snug h-auto line-clamp-3 mb-2 flex-grow';
```

**페이지네이션 스타일 개선:**
```javascript
const pageNumberStyle = 'relative inline-flex items-center w-10 h-10 px-4 py-2 text-md font-normal text-graylv3 hover:text-primary hover:bg-graylv1 rounded-lg transition duration-200 ease-in-out cursor-pointer';
const pageNumberActiveStyle = 'text-primary font-bold bg-activation rounded-lg';
```

**카테고리 스타일 개선:**
```javascript
const categoryItemStyle = 'text-base font-normal px-5 py-[9px] cursor-pointer hover:bg-graylv1 hover:text-primary transition duration-200 ease-in-out rounded-lg';
```

---

## 🚀 **5. 배포 및 버전 관리**

### **Git 명령어 실행:**
```bash
git add .
git commit -m "블로그 UI 개선: 모바일 반응형 디자인, 검색 기능, 카드 레이아웃 최적화"
git push origin main

git add .
git commit -m "메뉴 페이지 전환 시 contents 영역 초기화하여 페이지 완전 전환 구현"
git push origin main
```

---

## ✅ **최종 결과**

### **해결된 문제들**
1. ✅ HTML 구문 오류 수정
2. ✅ 메뉴 페이지 전환 시 내용 누적 문제 해결
3. ✅ 모바일 반응형 디자인 개선
4. ✅ 검색 기능 모바일 최적화
5. ✅ 블로그 카드 레이아웃 및 호버 효과 개선
6. ✅ 페이지네이션 및 카테고리 스타일 개선
7. ✅ 브라우저 뒤로가기/앞으로가기 정상 작동

### **개선된 사용자 경험**
- 📄 메뉴 클릭 시 완전한 페이지 전환
- 📱 모바일에서 카테고리 및 검색 기능 접근성 향상
- 🎨 더 현대적이고 일관된 디자인
- ⚡ 부드러운 애니메이션 및 호버 효과
- 🔍 향상된 검색 기능

### **배포 완료**
- 🌐 GitHub Pages에 성공적으로 배포
- 🔗 블로그 URL: `https://simhyeongseop.github.io/weniv_blog/`



### 느낀 점
지금까지 홈페이지 UI를 수정 할 때, 오픈형 AI의 도움을 받아 홈페이지 관련 코드를 수정하기는 했지만
이번에 CURSOR AI를 통해서 코드를 수정하다보니 이전보다 더 정확하고 내가 원하는 방향대로 정확하게 수정해줘서 놀랐다.
구체적으로는 기존에는 내가 수시로 나의 코드를 입력해서 수정할 부분을 찾아야하는 번거로움이 있었으나 CURSOR에서는 아예 나의 코드를 다 인지하고 있어 교류하기 편리했다.
실제 현업에서도 CURSOR AI를 활용하여 생산성이 많이 늘었다고 들었는데 직접 체감해보니 느낌이 다르다.

아무래도 앞으로는 개발자가 단순히 코딩을 잘하기 보다는 이런 AI TOOL들을 어떻게 잘 활용하는가가 생산성에서 가치를 높일 수 있을거 같다고 느꼈다.
이런 급박한 변화를 잘 적응해보자.